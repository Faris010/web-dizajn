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
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
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

    const addFood = () => {

        fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameInp.value,
                price: priceInp.value,
                imageUrl: imgUrlInp.value
            })
        })
        .then(res => console.log(res))
        nameInp.value = "";
        priceInp.value = "";
        imgUrlInp.value = "";
    }