let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.getElementById('toy-collection');
  const toyUrl = "http://localhost:3000/toys";

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

function fetchToys() {
  fetch(toyUrl)
  .then(response => response.json())
  .then(data => displayToys(data))
};

function displayToys(toys) {
  toys.forEach(toy => {
    const toyCard = document.createElement("div");
    toyCard.className = "card";

    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;

    const toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.alt = toy.name;
    toyImg.className = "toy-avatar";

    const toyLikes = document.createElement("p");
    toyLikes.textContent = `${toy.likes} likes`;

    const likeButton = document.createElement("button")
    likeButton.className = "like-btn";
    likeButton.textContent = "Like";
    likeButton.addEventListener("click", updateToyLikes());

    toyCard.appendChild(toyName);
    toyCard.appendChild(toyImg);
    toyCard.appendChild(toyLikes);
    toyCard.appendChild(likeButton);
    toyCollectionDiv.appendChild(toyCard);

    function updateToyLikes(toy, toyLikesElement) {
      const newNumberOfLikes = toy.likes + 1;

      fetch: ("http://localhost:3000/toys/.id", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({"likes": newNumberOfLikes}
      .then (response => response.json())
      .then(updatedToy => {
        toy.likes = updatedToy.likes;
        toyLikesElement.textContent = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error('Error updating likes:', error))
    )
    });  
  }};

function addNewToy(toys){
  fetch(toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
    .then(response => response.json())
      .then(newToy => {
        createToyCard(newToy);
        form.reset();
      })
      .catch(error => console.error('Error adding toy:', error))

    })
};



addNewToy(toys);
fetchToys();
}});



