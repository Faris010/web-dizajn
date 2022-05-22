let foods = [];

fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food')
    .then(res => res.json())
    .then(data => {
        renderFoods(data)
        foods=data;
    })


const renderFoods = (foods) => {
    const foodsRow = document.getElementById('foods-row');
    let resultFoodsHtml = '';

    foods.forEach(food => {
        resultFoodsHtml += 
        `<div class="col-xs-8 col-sm-4">
            <div class="card" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${food.imageUrl}');">
                <div class="card-description">
                    <h2>${food.name}</h2>
                    <p>${food.price} KM</p>
                    <button class="edit" id="edit-btn" onclick="editOpen(${food.id})">Edit</button>
                    <button class="delete" id="delete-btn">Delete</button>
                </div>
            </div>
        </div>`
    });

    foodsRow.innerHTML = resultFoodsHtml;
}

const btn = document.getElementById('add-food')
const cancelBtn = document.getElementById('cancel-btn')
btn.addEventListener('click', () => {
    document.getElementById('dialog-hid').style.display = "block"
})

cancelBtn.addEventListener('click', () => {
    document.getElementById('dialog-hid').style.display = "none"
})

const nameInp = document.getElementById('food-name')
const priceInp = document.getElementById('food-price')
const imgUrlInp = document.getElementById('food-imgUrl')

const cancel = () => {
    document.getElementById('dialog-hid').style.display = "none"
    nameInp.value = "";
    priceInp.value = "";
    imgUrlInp.value = "";
}

const addFood = () => {

    let id = Math.round(Math.random() * 1000)
    fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            name: nameInp.value,
            price: priceInp.value,
            imageUrl: imgUrlInp.value
        })
    })
    .then(res => console.log(res))

    const foodsRow = document.getElementById('foods-row');
    let resultFoodsHtml = '';
        resultFoodsHtml += 
        `<div class="col-xs-8 col-sm-4">
            <div class="card" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${imgUrlInp.value}');">
                <div class="card-description">
                    <h2>${nameInp.value}</h2>
                    <p>${priceInp.value} KM</p>
                    <button class="edit" id="edit-btn" onclick="editOpen(${id})">Edit</button>
                    <button class="delete" id="delete-btn">Delete</button>
                </div>
            </div>
        </div>`

    foodsRow.innerHTML += resultFoodsHtml;
    document.getElementById('dialog-hid').style.display = "none"
    nameInp.value = "";
    priceInp.value = "";
    imgUrlInp.value = "";
}

const editBtn = document.getElementById('edit-btn')
const nameInpEdit = document.getElementById('food-name-edit')
const priceInpEdit = document.getElementById('food-price-edit')
const imgUrlInpEdit = document.getElementById('food-imgUrl-edit')

let findId;

const editOpen = (foodId) => {
    findId = foodId
    document.getElementById('dialog-edit-hid').style.display = "block"
    const food = foods.find(food => food.id === foodId)
    nameInpEdit.value = food.name;
    priceInpEdit.value = food.price;
    imgUrlInpEdit.value = food.imageUrl;
}

const editFood = () => {
    fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameInpEdit.value,
            price: priceInpEdit.value,
            imageUrl: imgUrlInpEdit.value
        })
    })
    .then(res => console.log(res))
    foods[findId-1].name = nameInpEdit.value
    foods[findId-1].price = priceInpEdit.value
    foods[findId-1].imageUrl = imgUrlInpEdit.value
    const foodsRow = document.getElementById('foods-row');
    let resultFoodsHtml = '';

    foods.forEach(food => {
        resultFoodsHtml += 
        `<div class="col-xs-8 col-sm-4">
            <div class="card" id="food-image-id"  style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('${food.imageUrl}');">
                <div class="card-description">
                    <h2 id="food-name-id">${food.name}</h2>
                    <p id="food-price-id">${food.price} KM</p>
                    <button class="edit" id="edit-btn" onclick="editOpen(${food.id})">Edit</button>
                    <button class="delete" id="delete-btn">Delete</button>
                </div>
            </div>
        </div>`
    });

    foodsRow.innerHTML = resultFoodsHtml;
    document.getElementById('dialog-edit-hid').style.display = "none"
}