
#### 1) What is the difference between var, let, and const?
        Var: var is old and it can be changed anytime
        let: it can be changed but cannot be initialized twice in same scope
        const: it cannot be changed and initialized twice 
#### 2) What is the difference between map(), forEach(), and filter()? 
        map: map loop through an array and create a new array with transform elements.
        forEach: Loop through an array and perform for each but does not return anything.
        filter:Loop through an array and create a new array with those elements that satisfies the conditions.
#### 3) What are arrow functions in ES6?
        No need to write the keyword "function" and it automatically returns if there is no curly bracket. Example-
        dispayCart=(cart)=> console.log(cart);
        
#### 4) How does destructuring assignment work in ES6?
        It helps to get values from array and object much easily.
        const num= [1,2,3,4];
        const [a,b,c]=num; //here a,b,c get the first three values of the array
        we can even skip an element like this below-
        const [a, , c]=num; //here a=1, c= 3 . we skipped 2 here
        we can even swap values easiliy
        p= 1; q=2;
        [p,q]=[q,p] // this swaps the value

        We can do things with objects too-
        const user = {
        name: "rafi",
        age: 23,
        country: "Bangladesh"
        };
        const {name,age} = user; here we can get name, age from object without doing this everytime- user.name,user.age
        we can even give alias like this-
        const { name: userName, country: location } = user;

#### 5) Explain template literals in ES6. How are they different from string concatenation?
        instead of using "" and '', a new way to write is using back tick ``,unlike conventional "",'' this backtick can take variable inside the string without using +
        it also help for multi line strings.
