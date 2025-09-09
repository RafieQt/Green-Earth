const DisplayCategory = (trees) => {
    const categoryContainer = document.getElementById("category-list");

    trees.forEach(tree => {
        const list = document.createElement("div");

        list.innerHTML = `
        <button id="category-${tree.id}" onclick="selectCategory('${tree.category_name}'); active(${tree.id})" class="cat border-none my-1 btn flex justify-start items-center text-lg bg-[#f0fdf4] w-62  rounded-md h-9 hover:bg-[#15803d] hover:text-white">${tree.category_name}</button>
        `;

        categoryContainer.append(list);

    })
}

active = (id) => {
    const cat = document.getElementById(`category-${id}`);
    remove();
    cat.classList.add("active");

}
remove = () => {
    const cat = document.querySelectorAll(".cat");
    cat.forEach(cats => {
        cats.classList.remove("active");
    })
}

const getCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => DisplayCategory(json.categories));
}


const getPlants = () => {

    managespinner(true);
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(json => {
            displayPlants(json.plants);
        })
}
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500

const cardDetails = (plant) => {
    const url = `https://openapi.programming-hero.com/api/plant/${plant}`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayDetails(json.plants);
        })

}

const managespinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    }
    else {
        document.getElementById("card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}
// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500


const displayDetails = (details) => {
    const getModalBox = document.getElementById("modal-box");
    console.log(details)
    getModalBox.innerHTML = `
    <div class="bg-white h-fit w-full rounded-lg p-4 space-y-4">
                    <h3 class="font-bold text-3xl">${details.name}</h3>
                    <img class="rounded-lg h-46 w-full" src="${details.image}" alt="">
                    <p class=""><h1 class="font-semibold inline">Description :</h1>${details.description}</p>
                    <div class="">
                        <div class=" "><h1 class="font-semibold ">Category :</h1> ${details.category}</div>
                        <div class=" "><h1 class="font-semibold ">Price :</h1> ৳ ${details.price}</div>
                    </div>
                    
                    
                </div>
    `;
    document.getElementById("detailModal").showModal();
}

addCart = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(json => {
            displayCart(json.plants);
        })
}
let priceTotal = 0;
displayCart = (plants) => {
    const container = document.getElementById("cart-container");


    const card = document.createElement("div");
    card.classList.add("cart-item");
    card.innerHTML = `
    <div class="bg-[#f0fdf4] flex justify-between items-center px-3 my-3 rounded-md">
    <div>
    <h1 class="text-[#1f2937] font-semibold">${plants.name}</h1>
    <h1 class="text-[#1f293780]"><span>${plants.price}</span></h1>
    </div>
    <div><i onclick="cross(${plants.price},this)" class="fa-solid fa-xmark opacity-45"></i></div>
    </div>
    `;


    priceTotal += parseInt(plants.price);


    const totalContainer = document.getElementById("total-price");
    totalContainer.innerHTML = ""
    container.append(card);
    updateTotal(priceTotal);


}

cross = (cancel, el) => {
    el.closest(".cart-item").remove();
    priceTotal -= cancel;
    updateTotal(priceTotal);
}

const updateTotal = () => {
    const totalContainer = document.getElementById("total-price");
    totalContainer.innerHTML = ""
    const totalPrice = document.createElement("div")
    totalPrice.innerHTML = `
    <div id="total" class="flex justify-between items-center">
                    <h2 class="text-xl text-[#1f2937]">Total:</h2>
                    <h2 class="text-xl text-[#1f2937]">${priceTotal}</h2>
    `
    totalContainer.append(totalPrice);
}

const displayPlants = (plants) => {

    const cardContainer = document.getElementById("card-container");
    selectCategory = (selected) => {
        managespinner(true);

        cardContainer.innerHTML = "";
        
        const filtered = plants.filter(plant => plant.category === selected);

        filtered.forEach(plant => {
            const card = document.createElement("div");
            card.innerHTML = `
        <div class="bg-white h-fit w-85 rounded-lg p-4 space-y-3">
                    <img class="rounded-lg h-46 w-full" src="${plant.image}" alt="">
                    <h3 onclick="cardDetails(${plant.id})" class="font-semibold">${plant.name}</h3>
                    <p class="line-clamp-2">${plant.description}</p>
                    <div class="flex justify-between ">
                        <div class="font-semibold text-[#15803D] bg-[#DCFCE7] w-fit px-3 rounded-lg">${plant.category}</div>
                        <div class="font-semibold ">৳ ${plant.price}</div>
                    </div>
                    <div>
                        <button onclick="addCart(${plant.id})" id=cart-${plant.id} class="border-none my-1 btn flex items-center text-lg text-white bg-[#15803d] w-full font-light rounded-2xl h-9 hover:bg-[#f0fdf4] hover:text-black">Add to Cart</button>
                    </div>
                </div>
        `;
            cardContainer.append(card);
        })
        

        managespinner(false); 
    }
    


    plants.forEach(plant => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white h-full w-85 rounded-lg p-4 space-y-3">
                    <img class="rounded-lg h-46 w-full" src="${plant.image}" alt="">
                    <h3 onclick="cardDetails(${plant.id})" class="font-semibold">${plant.name}</h3>
                    <p class="line-clamp-2">${plant.description}</p>
                    <div class="flex justify-between ">
                        <div class="font-semibold text-[#15803D] bg-[#DCFCE7] w-fit px-3 rounded-lg">${plant.category}</div>
                        <div class="font-semibold ">৳ ${plant.price}</div>
                    </div>
                    <div>
                        <button onclick="addCart(${plant.id})" id=cart-${plant.id} class="border-none my-1 btn flex items-center text-lg text-white bg-[#15803d] w-full font-light rounded-2xl h-9 hover:bg-[#f0fdf4] hover:text-black">Add to Cart</button>
                    </div>
                </div>
        `;
        cardContainer.append(card);

    })
    managespinner(false);
}

getPlants();
getCategory();

