import { BoughtProduct } from "./Middle/Left/BoughtProduct.js";
import { ExistingProduct } from "./Middle/Left/ExistingProduct.js";
import { ProductType } from "./Middle/Left/ProductType.js";
import { Ingredient } from "./Middle/Right/Ingredient.js";
import { Recipe } from "./Middle/Right/Recipe.js";
import { RecipeType } from "./Middle/Right/RecipeType.js";
import { Inventory } from "./Middle/Center/Inventory.js";

var response = await fetch("http://localhost:5063/BoughtProduct/ReturnAllBoughtProducts");
var data = await response.json();

var inventory = new Inventory();

//Retriving data for bought product
data.forEach(async b => {

    var boughtProd = new BoughtProduct(b["id"], b["type"], b["description"], b["picture"], b["quantity"], b["weight"], b["boughtData"], b["expirationDate"]);
    inventory.AddToListOfBoughtProducts(boughtProd);

    //console.log(boughtProd);
});

response = await fetch("http://localhost:5063/ProductType/ReturnAllProductTypes");
data = await response.json();

//Retriving data for product types
data.forEach(async pt => {

    var productType = new ProductType(pt["id"], pt["name"], pt["description"]);
    inventory.AddToListOfProductTypes(productType);

    //console.log(productType);
});

response = await fetch("http://localhost:5063/RecipeType/ReturnAllRecipeTypes");
data = await response.json();

//Retriving data for recipe types
data.forEach(async pt => {

    var recipeType = new RecipeType(pt["id"], pt["name"], pt["description"]);
    inventory.AddToListOfRecipeTypes(recipeType);

    //console.log(recipeType);
});

window.addEventListener('load', function() {
    const video = document.getElementById('background-video');
    video.play();
});

inventory.drawInventory(document.body);

