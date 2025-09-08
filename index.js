const category = (trees) => {
    const categoryContainer = document.getElementById("category-list");
    
    trees.forEach(tree => {
        const list = document.createElement("div");
        list.innerHTML = `
        <button class="border-none my-1 btn flex justify-start items-center text-lg bg-[#f0fdf4] w-62  rounded-md h-9 hover:bg-[#15803d] hover:text-white">${tree.category_name}</button>
        `;

        categoryContainer.append(list);

    })
}

const getCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => category(json.categories));

}





getCategory();

