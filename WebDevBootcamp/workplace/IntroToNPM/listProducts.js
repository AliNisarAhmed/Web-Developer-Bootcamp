var faker = require("faker");

console.log("=====WELCOME TO MY SHOP======")
for(let i = 0; i < 10; i++){
    let randomProduct = faker.commerce.productName();
    let randomPrice = faker.commerce.price();
    
    console.log(`Product Name: ${randomProduct}, Price: Rs.${randomPrice}`);
}