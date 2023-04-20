let addToy = false;

function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => data);
}

function renderToys(toys) {
  const toyCollection = document.querySelector("#toy-collection");
  toys.forEach((toy) => {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    const toyName = document.createElement("h2");
    toyName.innerText = toy.name;
    const toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";
    const toyLikes = document.createElement("p");
    toyLikes.innerText = `${toy.likes} Likes`;
    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.innerText = "Like <3";
    likeButton.addEventListener("click", () => {
      toy.likes++;
      updateToy(toy);
      toyLikes.innerText = `${toy.likes} Likes`;
    });
    toyCard.append(toyName, toyImage, toyLikes, likeButton);
    toyCollection.appendChild(toyCard);
  });
}

function createToy(toy) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  })
    .then((response) => response.json())
    .then((data) => data);
}

function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toy),
  })
    .then((response) => response.json())
    .then((data) => data);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchToys().then((toys) => renderToys(toys));

  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;
    const toyLikes = 0;
    createToy({ name: toyName, image: toyImage, likes: toyLikes }).then(
      (newToy) => {
        renderToys([newToy]);
        toyForm.reset();
      }
    );
  });

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
