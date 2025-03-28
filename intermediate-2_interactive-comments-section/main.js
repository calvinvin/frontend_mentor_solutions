attachHandleSelectUser();
attachHandleSubmitReply();
attachHandleClickResetButton();
let localData = localStorage.getItem("data");
if (localData) {
  renderPage();
} else {
  loadData();
}

function attachHandleSelectUser() {
  const selectUserForm = document.getElementById("select-user-form");
  selectUserForm.addEventListener("change", handleSelectUser);
}
function attachHandleSubmitReply() {
  document
    .querySelector("form.reply-form")
    .addEventListener("submit", handleSubmitReply);
}
function attachHandleClickResetButton() {
  document
    .getElementById("reset-button")
    .addEventListener("click", handleClickResetButton);
}
async function loadData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  localStorage.setItem("data", JSON.stringify(data));
  renderPage();
}
function renderPage() {
  renderUserOptions();
  renderCurrentUser();
  renderComments();
}
function renderUserOptions() {
  const { users } = JSON.parse(localStorage.getItem("data"));
  const usersSelectElement = document.getElementById("users-select");
  renderLogOption();
  users.forEach((user) => {
    const userOptionElement = UserOption(user);
    if (user.username === localStorage.getItem("username"))
      userOptionElement.querySelector("option").selected = true;
    usersSelectElement.appendChild(userOptionElement);
  });
}
function renderLogOption() {
  const loggedIn = Boolean(localStorage.getItem("username"));
  const templateLogOptions = document.getElementById("template-log-options");
  const clonedLogOptions = templateLogOptions.content.cloneNode(true);
  if (!loggedIn) clonedLogOptions.getElementById("log-out-option").remove();
  if (loggedIn) clonedLogOptions.getElementById("log-in-option").remove();
  const usersSelectElement = document.getElementById("users-select");
  usersSelectElement.textContent = "";
  usersSelectElement.appendChild(clonedLogOptions);
}
function renderCurrentUser() {
  const data = JSON.parse(localStorage.getItem("data"));
  const currentUsername = localStorage.getItem("username");
  if (!data) return;
  if (!currentUsername) return;
  let currentUser = getUserByUsername(currentUsername, data);
  const currentUserAvatars = document.querySelectorAll(".current-user.avatar");
  const currentUserInputs = document.querySelectorAll("input[name='author']");
  currentUserAvatars.forEach((avatarElement) => {
    avatarElement.src = currentUser.image.webp;
    avatarElement.alt = currentUser.username;
  });
  currentUserInputs.forEach((inputElement) => {
    inputElement.setAttribute("value", currentUser.username);
    inputElement.value = currentUser.username;
  });
}
function renderComments() {
  const commentsList = document.getElementById("comments-list");
  commentsList.textContent = "";
  const { comments } = JSON.parse(localStorage.getItem("data"));
  if (comments.length === 0) return;
  comments.forEach((comment) =>
    commentsList.appendChild(CommentListItem(comment))
  );
}
function reRenderRepliedComment(replyObject) {
  const { originPostId } = replyObject;
  if (!originPostId) {
    // console.log(replyObject);
    document
      .getElementById("comments-list")
      .appendChild(CommentListItem(replyObject));
    return;
  }
  const originPostElement = document.querySelector(
    `article[data-id="${originPostId}"]`
  );
  const liElementToBeReplaced = originPostElement.closest("li");
  liElementToBeReplaced.replaceWith(
    CommentListItem(
      JSON.parse(localStorage.getItem("data")).comments.filter(
        (comment) => comment.id === Number(originPostId)
      )[0]
    )
  );
}
function getUserByUsername(username) {
  return JSON.parse(localStorage.getItem("data")).users.filter(
    (user) => user.username === username
  )[0];
}
function setCurrentUsername(username) {
  localStorage.setItem("username", username);
}
function setValueOfInputElement(inputElement, value) {
  inputElement.setAttribute("value", value);
  inputElement.value = value;
}
function setUserAvatarImg(imgElement, user) {
  imgElement.src = user.image.webp;
  imgElement.alt = user.username;
}
function saveData(object) {
  localStorage.setItem("data", JSON.stringify(object));
}
function replyDataObject(replyObject) {
  const { originPostId, ...postObject } = replyObject;
  const { comments, ...otherProperties } = JSON.parse(
    localStorage.getItem("data")
  );
  const newComments = comments
    .map((comment) => comment.id)
    .includes(Number(originPostId))
    ? comments.map((comment) => {
        if (Number(originPostId) === comment.id) {
          comment.replies.push(replyObject);
          return comment;
        }
        return comment;
      })
    : [...comments, replyObject];
  return { comments: newComments, ...otherProperties };
}
function deleteDataObject(deletePostId) {
  const { comments, ...otherProperties } = JSON.parse(
    localStorage.getItem("data")
  );
  const deleteOriginPost = comments
    .map((comment) => comment.id)
    .includes(Number(deletePostId));
  if (deleteOriginPost) {
    const newComments = comments.filter(
      (comment) => comment.id !== Number(deletePostId)
    );
    return { comments: newComments, ...otherProperties };
  } else {
    const originPostId = comments.filter((comment) =>
      comment.replies.map((reply) => reply.id).includes(Number(deletePostId))
    )[0].id;
    const newComments = comments.map((comment) => {
      if (comment.id === originPostId) {
        const { replies, ...otherPropertiesOfComment } = comment;
        const newReplies = replies.filter(
          (reply) => reply.id !== Number(deletePostId)
        );
        return { replies: newReplies, ...otherPropertiesOfComment };
      } else {
        return comment;
      }
    });
    return { comments: newComments, ...otherProperties };
  }
}
function handleSelectUser(e) {
  const selectedOptionElement = e.target.querySelector("option:checked");
  if (selectedOptionElement.id === "log-out-option") {
    localStorage.removeItem("username");
    window.location.reload();
    return;
  }
  const selectedUsername = selectedOptionElement.value;
  setCurrentUsername(selectedUsername);
  renderUserOptions();
  renderCurrentUser();
  renderComments();
}
function handleClickResetButton(e) {
  loadData();
}
function handleClickDeleteButton(e) {
  const deletePostId = Number(e.target.closest("article[data-id]").dataset.id);
  const data = JSON.parse(localStorage.getItem("data"));
  const deleteArticleElement = document.querySelector(
    `article[data-id="${deletePostId}"]`
  );
  const deleteOriginPost = data.comments
    .map((comment) => comment.id)
    .includes(deletePostId);
  if (deleteOriginPost) {
    deleteArticleElement.closest("li").remove();
  } else {
    const originPost = data.comments.filter((comment) =>
      comment.replies.map((reply) => reply.id).includes(deletePostId)
    )[0];
    const deleteOnlyReply = originPost.replies.length === 1;
    if (deleteOnlyReply) {
      deleteArticleElement
        .closest("div.wrapper[data-content='replies']")
        .remove();
    } else {
      deleteArticleElement.remove();
    }
  }
  saveData(deleteDataObject(deletePostId));
}
function handleClickEditButton(e) {}

function handleClickReplyButton(e) {
  const loggedIn = localStorage.getItem("username");
  if (!loggedIn) {
    alert("Please choose a user to log in to reply first.");
    document.getElementById("users-select").focus();
    return;
  }
  const articleWrapper = e.target.closest("div.wrapper[data-content='article'");
  const articleElement = articleWrapper.closest("article[data-id]");
  const alreadyReplying = articleElement.querySelector("form.reply-form");
  if (alreadyReplying) return;
  const commentWrapper = articleElement.closest(
    "div.wrapper[data-content='comment'"
  );
  const originPostId = commentWrapper.querySelector("article").dataset.id;
  const replyType = articleWrapper.dataset.type;
  const replyingTo = articleElement.querySelector(
    "h2.metadata__author"
  ).textContent;
  console.log(replyingTo);
  articleElement.appendChild(
    ReplyForm(
      getUserByUsername(localStorage.getItem("username")),
      replyType,
      originPostId,
      replyingTo
    )
  );
}
function handleSubmitReply(e) {
  e.preventDefault();
  const loggedIn = localStorage.getItem("username");
  if (!loggedIn) {
    alert("Please choose a user to log in to reply first.");
    document.getElementById("users-select").focus();
    return;
  }
  const replyForm = e.target;
  const formObject = Object.fromEntries(new FormData(replyForm).entries());
  const replyObject = {
    id:
      Math.max(
        ...JSON.parse(localStorage.getItem("data")).comments.reduce(
          (arrayIds, comment) =>
            arrayIds.concat(
              ...[comment.id, ...comment.replies.map((reply) => reply.id)]
            ),
          []
        )
      ) + 1,
    content: formObject.comment,
    createdAt: new Date().toLocaleDateString(),
    score: 0,
    replyingTo: formObject["replying-to"],
    user: getUserByUsername(formObject.author),
    originPostId: formObject["origin-post-id"],
  };
  console.log(replyObject.replyingTo);
  if (!replyObject.replyingTo) replyObject.replies = [];
  saveData(replyDataObject(replyObject));
  reRenderRepliedComment(replyObject);
}
function handleClickScoreButton(e) {
  const buttonElement = e.currentTarget;
  const scoreElement = buttonElement.parentNode.querySelector("p.score__score");
  const currentScore = Number(scoreElement.textContent);
  const calculation = buttonElement.dataset.function;
  const newScore =
    calculation === "plus-score" ? +currentScore + 1 : +currentScore - 1;
  scoreElement.textContent = newScore;
  const postId = Number(buttonElement.closest("article[data-id]").dataset.id);
  const data = JSON.parse(localStorage.getItem("data"));
  const { comments, ...otherProperties } = data;
  const newComments = comments.map((comment) => {
    if (
      comment.id !== postId &&
      !comment.replies.map((reply) => reply.id).includes(postId)
    ) {
      return comment;
    } else if (comment.id === postId) {
      const newComment = comment;
      newComment.score = newScore;
      return newComment;
    } else {
      const { replies, ...otherPropertiesOfComment } = comment;
      if (!replies.map((reply) => reply.id).includes(postId)) return comment;
      const newReplies = replies.map((reply) => {
        if (reply.id === postId) {
          const newReply = reply;
          newReply.score = newScore;
          return newReply;
        } else {
          return reply;
        }
      });
      return { replies: newReplies, ...otherPropertiesOfComment };
    }
  });
  saveData({ comments: newComments, ...otherProperties });
}
function UserOption(user) {
  const { username, image } = user;
  const templateUserOption = document.getElementById("template-user-option");
  const clonedUserOption = templateUserOption.content.cloneNode(true);
  const userOptionElement = clonedUserOption.querySelector("option");
  userOptionElement.value = username;
  userOptionElement.textContent = username;
  return clonedUserOption;
}
function CommentListItem(comment) {
  const { replies, ...originPost } = comment;
  const templateCommentListItem = document.getElementById(
    "template-comment-list-item"
  );
  const clonedCommentListItem = templateCommentListItem.content.cloneNode(true);
  clonedCommentListItem
    .querySelector("div.wrapper[data-content='comment'")
    .appendChild(Article(originPost));
  if (replies) {
    clonedCommentListItem
      .querySelector("div.wrapper[data-content='comment'")
      .appendChild(RepliesWrapper(replies));
  }
  return clonedCommentListItem;
}
function RepliesWrapper(replies) {
  const templateRepliesWrapper = document.getElementById(
    "template-replies-wrapper"
  );
  const clonedRepliesWrapper = templateRepliesWrapper.content.cloneNode(true);
  const replyArticlesWrapper = clonedRepliesWrapper.querySelector(
    "div.wrapper[data-content='reply-articles'"
  );
  replies.forEach((reply) => replyArticlesWrapper.appendChild(Article(reply)));
  return clonedRepliesWrapper;
}
function Article(article) {
  const {
    id,
    content,
    createdAt,
    score,
    replyingTo,
    user: { image, username },
  } = article;
  const dataType = replyingTo ? "reply" : "origin-post";
  const isAuthor = username === localStorage.getItem("username");
  const templateReplyArticle = document.getElementById("template-article");
  const clonedReplyArticle = templateReplyArticle.content.cloneNode(true);
  clonedReplyArticle.querySelector("article").dataset.id = id;
  clonedReplyArticle.querySelector("article").dataset.isAuthor = isAuthor;
  clonedReplyArticle.querySelector("div[data-content='article']").dataset.type =
    dataType;
  clonedReplyArticle.querySelector("p.score__score").textContent = score;
  clonedReplyArticle
    .querySelectorAll("button.score__button")
    .forEach((scoreButton) =>
      scoreButton.addEventListener("click", handleClickScoreButton)
    );
  clonedReplyArticle.querySelector("img.metadata__avatar").src = image.webp;
  clonedReplyArticle.querySelector("img.metadata__avatar").alt = username;
  clonedReplyArticle.querySelector("h2.metadata__author").textContent =
    username;
  if (!isAuthor) {
    clonedReplyArticle.querySelector("p.metadata__author-tag").remove();
  }
  clonedReplyArticle.querySelector("p.metadata__date").textContent = createdAt;
  if (isAuthor) {
    clonedReplyArticle.querySelector("button.menu__button.reply").remove();
  } else {
    clonedReplyArticle.querySelector("button.menu__button.delete").remove();
    clonedReplyArticle.querySelector("button.menu__button.edit").remove();
  }
  clonedReplyArticle
    .querySelectorAll("button.menu__button")
    .forEach((buttonElement) => {
      const buttonType = buttonElement.dataset.function;
      switch (buttonType) {
        case "reply":
          buttonElement.addEventListener("click", handleClickReplyButton);
          break;
        case "delete":
          buttonElement.addEventListener("click", handleClickDeleteButton);
          break;
        case "edit":
          buttonElement.addEventListener("click", handleClickEditButton);
          break;
      }
    });
  clonedReplyArticle.querySelector("p.content__reply-to").textContent =
    replyingTo;
  clonedReplyArticle.querySelector("p.content__content").textContent = content;
  return clonedReplyArticle;
}
function ReplyForm(user, datatype, originPostId, replyingTo) {
  const templateReplyForm = document.getElementById("template-reply-form");
  const clonedReplyForm = templateReplyForm.content.cloneNode(true);
  clonedReplyForm.querySelector(
    "div.wrapper[data-content='new-comment'"
  ).dataset.type = datatype;
  setValueOfInputElement(
    clonedReplyForm.querySelector("input[name='author']"),
    user.username
  );
  setValueOfInputElement(
    clonedReplyForm.querySelector("input[name='origin-post-id']"),
    originPostId
  );
  setValueOfInputElement(
    clonedReplyForm.querySelector("input[name='replying-to']"),
    replyingTo
  );
  setUserAvatarImg(
    clonedReplyForm.querySelector("img.new-comment__avatar"),
    user
  );
  clonedReplyForm
    .querySelector("form")
    .addEventListener("submit", handleSubmitReply);
  return clonedReplyForm;
}
