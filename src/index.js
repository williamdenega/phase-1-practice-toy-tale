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

  //adding the existing toys when the DOM loads
  fetch('http://localhost:3000/toys')
  .then(toy => toy.json())
  .then(arry => arry.forEach(toy => renderToy(toy)))
  //form submit 
  let form = document.querySelector('.add-toy-form')
  form.addEventListener('submit',makeToy)
});

function renderToy(toy){
  const toyCollection = document.getElementById('toy-collection')
  const div = document.createElement('div')
  div.innerHTML= `
  <h2>${toy.name}</h2>
  <img src = "${toy.image}" class = "toy-avatar"/>
  <p id= "${toy.name}">${toy.likes} Likes </p>
  <div id="outer">
  <button class="like-btn" id="${toy.id}">LIKE ❤️</button>
  <button class="like-btn" id="${toy.id}D"> DELETE  </button>
  </div>
  `

  div.className = 'card'
  toyCollection.appendChild(div)
  let btn = document.getElementById(`${toy.id}`)
  let dlt = document.getElementById(`${toy.id}D`)

  dlt.addEventListener('click', function(){
    div.remove()
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': "applicatin/json",
      }
    })
  })

  btn.addEventListener('click',function(){
    let likes = toy.likes
    likes ++
    toy.likes = likes
    let likes1 = document.getElementById(toy.name)
    likes1.innerHTML = `${likes} Likes`
    fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify({
      'likes': `${likes}`
    })
    })
  } )
  
  
}


function updateLikes(toy){
  console.log(toy)
  let likes = document.getElementById(toy.name)
  console.log(likes)
}

//addding the clicker
function makeToy(e){
  e.preventDefault()
  //console.log(e)
  const toyName = document.getElementById("toy-name")
  const toyUrl = document.getElementById('toy-url')
  let toyObj = {
    'name': toyName.value,
    'image': toyUrl.value,
    'likes': "0"
  }
  if (toyUrl === null){

  }else{

  }

  fetch("http://localhost:3000/toys",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => renderToy(toy))
  e.target.reset()
}