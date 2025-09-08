const DisplayCategory = (trees) => {
    const categoryContainer = document.getElementById("category-list");

    trees.forEach(tree => {
        const list = document.createElement("div");
        list.innerHTML = `
        <button onclick="selectCategory('${tree.category_name}')" class="border-none my-1 btn flex justify-start items-center text-lg bg-[#f0fdf4] w-62  rounded-md h-9 hover:bg-[#15803d] hover:text-white">${tree.category_name}</button>
        `;

        categoryContainer.append(list);

    })
}



const getCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => DisplayCategory(json.categories));

}


const getPlants = () => {
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
const displayPlants = (plants) => {
    const cardContainer = document.getElementById("card-container");

    selectCategory = (selected) => {
        cardContainer.innerHTML="";
        const filtered = plants.filter(plant => plant.category=== selected);

        filtered.forEach(plant=>{
            const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white h-fit w-85 rounded-lg p-4 space-y-3">
                    <img class="rounded-lg h-46 w-full" src="${plant.image}" alt="">
                    <h3 class="font-semibold">${plant.name}</h3>
                    <p class="line-clamp-2">${plant.description}</p>
                    <div class="flex justify-between ">
                        <div class="font-semibold text-[#15803D] bg-[#DCFCE7] w-fit px-3 rounded-lg">${plant.category}</div>
                        <div class="font-semibold ">৳ ${plant.price}</div>
                    </div>
                    <div>
                        <button class="border-none my-1 btn flex items-center text-lg text-white bg-[#15803d] w-full font-light rounded-2xl h-9 hover:bg-[#f0fdf4] hover:text-black">Add to Cart</button>
                    </div>
                </div>
        `;
        cardContainer.append(card);
        })
        
    }

    plants.forEach(plant => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white h-full w-85 rounded-lg p-4 space-y-3">
                    <img class="rounded-lg h-46 w-full" src="${plant.image}" alt="">
                    <h3 class="font-semibold">${plant.name}</h3>
                    <p class="line-clamp-2">${plant.description}</p>
                    <div class="flex justify-between ">
                        <div class="font-semibold text-[#15803D] bg-[#DCFCE7] w-fit px-3 rounded-lg">${plant.category}</div>
                        <div class="font-semibold ">৳ ${plant.price}</div>
                    </div>
                    <div>
                        <button class="border-none my-1 btn flex items-center text-lg text-white bg-[#15803d] w-full font-light rounded-2xl h-9 hover:bg-[#f0fdf4] hover:text-black">Add to Cart</button>
                    </div>
                </div>
        `;
        cardContainer.append(card);

    })
}

getPlants();
getCategory();

