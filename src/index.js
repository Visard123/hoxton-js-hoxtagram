// write your code here
const state = {
  images: [],
};

const imageContainer = document.querySelector(".image-container");

function getImages() {
  return fetch("http://localhost:3000/images").then((response) =>
    response.json()
  );
}
getImages().then(function (imagesFromServer) {
  state.images = imagesFromServer;

  render();
});

function render() {
  imageContainer.innerHTML = "";
  for (const image of state.images) {
    const imageCard = document.createElement("article");
    imageCard.setAttribute("class", "image-card");

    const titleOfCard = document.createElement("h2");
    titleOfCard.setAttribute("class", "title");
    titleOfCard.textContent = image.title;

    const imageEl = document.createElement("img");
    imageEl.setAttribute("class", "image");
    imageEl.setAttribute("src", image.image);

    const likesSection = document.createElement("div");
    likesSection.setAttribute("class", "likes-section");

    const likeSpan = document.createElement("span");
    likeSpan.setAttribute("class", "likes");
    likeSpan.textContent = image.likes;

    const likesButton = document.createElement("button");
    likesButton.setAttribute("class", "like-button");
    likesButton.textContent = "♥";

    likesSection.append(likeSpan, likesButton);

    const commentsList = document.createElement("ul");
    commentsList.setAttribute("class", "comments");

    for (const comment of image.comments) {
      const listEl = document.createElement("li");
      listEl.textContent = comment.content;
      commentsList.append(listEl);
    }
    imageCard.append(titleOfCard, imageEl, likesSection, commentsList);
    imageContainer.append(imageCard);
  }
}
