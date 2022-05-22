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
                        <h2 id="food-name-id">${food.name}</h2>
                        <p id="food">${food.price} KM</p>
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

    const editOpen = (foodId) => {
        document.getElementById('dialog-edit-hid').style.display = "block"
        const food = foods.find(food => food.id === foodId)
        nameInpEdit.value = food.name;
        priceInpEdit.value = food.price;
        imgUrlInpEdit.value = food.imageUrl;
    }

    const editFood = () => {

    }

    // const fillEditData = (foodId) => {
    //     const food = foods.find(food => food.id === foodId);
    //     const foodFormId = document.getElementById('food-id');
    //     const foodFormName = document.getElementById('food-name');
    //     const foodFormImage = document.getElementById('food-image');
    //     const foodFormPrice = document.getElementById('food-price');
    
    //     foodFormId.value = food.id;
    //     foodFormName.value = food.name;
    //     foodFormImage.value = food.imageUrl;
    //     foodFormPrice.value = food.price;
    // }
    
    // const editFood = () => { 
    //     const foodFormId = document.getElementById('food-id').value;
    //     const foodFormName = document.getElementById('food-name').value;
    //     const foodFormImage = document.getElementById('food-image').value;
    //     const foodFormPrice = document.getElementById('food-price').value;
    
    //     fetch(`${BASE_URL}/api/Food`, {
    //         method: 'PUT', 
    //         headers: new Headers({'content-type': 'application/json'}),
    //         body: JSON.stringify({
    //             id: foodFormId,
    //             name: foodFormName,
    //             imageUrl: foodFormImage,
    //             price: foodFormPrice
    //         })
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             console.log(`Status code: ${res.status}`);
    
    //             let kartica = document.getElementById(foodFormId);
    //             kartica.children[0].src = foodFormImage;
    //             kartica.children[1].children[0].innerHTML = foodFormName;
    //             kartica.children[1].children[1].innerHTML = foodFormPrice;
    //         }
    //     })
    // }