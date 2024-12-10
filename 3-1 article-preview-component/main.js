const shareButton = document.getElementById('share-button');
const metadataWrapper = document.getElementById('metadata-wrapper');
shareButton.onclick = () => {
    metadataWrapper.classList.toggle('share-button-active');
};