const ratingForm = document.getElementById("rating-form");
const modal = document.getElementById("thank-you-modal");
const scoreOutput = document.getElementById("rating-score");


ratingForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let score = ratingForm.elements.score.value;
    if (!score) {
        alert("Please select a score!");
        return
    }
    scoreOutput.textContent = score;
    modal.showModal();
})
modal.addEventListener("close", ()=>{
    ratingForm.reset();
})