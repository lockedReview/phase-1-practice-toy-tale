let addToy = false;
  
document.addEventListener("DOMContentLoaded", () => {
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


const collection= document.getElementById('toy-collection');



fetch("http://localhost:3000/toys")
.then(function(res){
  
  return res.json();
})
.then(function(data){
  

  for (const item of data){
    const card = document.createElement('div');
    card.className = "card";

    const nameTag = document.createElement("h2");
    nameTag.textContent = item.name;

    const toyImg = document.createElement('img');
    toyImg.src = item.image;
    toyImg.width= 250;

    toyLikes = document.createElement("p");
    toyLikes.textContent = item.likes;

    const toyButton = document.createElement('button');
    toyButton.className = "like-btn";
    toyButton.id = item.id;
    toyButton.textContent = "Like";
    toyButton.addEventListener("click", clickMe);

    card.appendChild(nameTag);
    card.appendChild(toyImg);
    card.appendChild(toyLikes);
    card.appendChild(toyButton);
    collection.appendChild(card);


  }
})
 console.log(collection)


// part 2
 
const toyFormContainer = document.querySelector(".add-toy-form");
const newToyName = toyFormContainer.querySelector("input[name='name']");
const newToyImage = toyFormContainer.querySelector("input[name='image']");
const addToyBtn = toyFormContainer.querySelector(".submit");
addToyBtn.addEventListener('click',clickAdd);

function clickAdd(event) {
  event.preventDefault();

  const postingObj= {
    method: 'post',
    headers:{
      "content-type": "application/json",
      accept: "application/json"
    },
  
    body:JSON.stringify({
      "name": newToyName.value,
      "image": newToyImage.value,
      "likes": 0
      })
  }
 
  fetch("http://localhost:3000/toys", postingObj)
  .then(function(res){
    return res.json();
    })
  .then(function(toy){
    addToyToDOM(toy);        
  });

}

function addToyToDOM(toy){
  const card = document.createElement('div');
    card.className = "card";

    const nameTag = document.createElement("h2");
    nameTag.textContent = toy.name;

    const toyImg = document.createElement('img');
    toyImg.src = toy.image;
    toyImg.width= 250;

    toyLikes = document.createElement("p");
    toyLikes.textContent = toy.likes;

    const toyButton = document.createElement('button');
    toyButton.className = "like-btn";
    toyButton.id = toy.id;
    toyButton.textContent = "Like";
    toyButton.addEventListener("click", clickMe);

    card.appendChild(nameTag);
    card.appendChild(toyImg);
    card.appendChild(toyLikes);
    card.appendChild(toyButton);
    collection.appendChild(card);
}

function clickMe(event){
  console.log("click")
  const card = event.target.parentNode; 
  const toyLikes = card.querySelector("p");
  const toyButton = card.querySelector('button');
  toyLikes.textContent = parseInt(toyLikes.textContent) + 1; 
  updateLike(event.target.id, toyLikes.textContent); 
}

function updateLike(toy,likes){
  console.log(toy)

 fetch(`http://localhost:3000/toys/${toy}`, {method: 'patch',
    headers:{
      "content-type": "application/json",
      accept: "application/json"
    },

    body: JSON.stringify({
      "likes": parseInt(likes)
    })
  })
  .then(res=> res.json)
  .then(data=>console.log(data))

}



