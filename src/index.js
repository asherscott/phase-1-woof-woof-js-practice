const url = 'http://localhost:3000/pups'
let dogs = [];
let dogClicked;

const img = document.createElement('img')
const h2 = document.createElement('h2')
const btn = document.createElement('button')

const isGoodDog = (isTrue) => isTrue ? 'Good Boy!' : 'Bad Dog!'



fetch(url)
.then(res => res.json())
.then(dogsArray => {
    dogs = dogsArray
    doggo(dogs)
})



// DELIVERABLE 2
function doggo(dogs) {
    dogs.forEach(dog => listDogs(dog))

    img.src = dogs[0].image
    h2.textContent = dogs[0].name
    btn.textContent = isGoodDog(dogs[0].isGoodDog)
    dogClicked = dogs[0]


    const mainDiv = document.querySelector('#dog-info')
    mainDiv.append(img, h2, btn)

    btn.addEventListener('click', goodBoyToggle)
}



function listDogs(dog) {
    const div = document.querySelector('#dog-bar')

    const span = document.createElement('span')
    span.textContent = dog.name
    div.append(span)



    // DELIVERABLE 3
    span.addEventListener('click', () => displayDetail(dog))
}



function displayDetail(dog) {
    img.src = dog.image
    h2.textContent = dog.name
    btn.textContent = isGoodDog(dog.isGoodDog)
    dogClicked = dog
}



// DELIVERABLE 4
function goodBoyToggle() {
    dogClicked.isGoodDog = !dogClicked.isGoodDog
    btn.textContent = isGoodDog(dogClicked.isGoodDog)

    fetch(url + '/' + dogClicked.id, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dogClicked)
    })
}

window.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.querySelector('#good-dog-filter')

    let boolBtn = false;
    filterBtn.addEventListener('click', () => {
        const filteredDogs = dogs.filter(dog => dog.isGoodDog === true)


        boolBtn = !boolBtn
        if(boolBtn === true) {
            filterBtn.textContent = 'Filter good dogs: ON'

            document.querySelector('#dog-bar').innerHTML = ''
            doggo(filteredDogs)
        }else {
            filterBtn.textContent = 'Filter good dogs: OFF'

            document.querySelector('#dog-bar').innerHTML = ''
            doggo(dogs)
        }
    })
})