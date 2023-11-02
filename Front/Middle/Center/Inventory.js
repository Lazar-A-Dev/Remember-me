import { TopPart } from "../../Top/TopPart.js";
import { BottomPart } from "../../Bottom/BottomPart.js";
import { Achievement } from "../../Top/Achievement.js";
import { LeftPart } from "../Left/LeftPart.js";
import { RightPart } from "../Right/RightPart.js";

export class Inventory {
    constructor() {

        this.container = null;
        this.listOfProductTypes = [];//List of product types such as vegetables, fruits, etc
        this.listOfRecipeTypes = [];//List of recipe types such as salads, pastas, etc
        this.listOfBoughtProducts = [];//List of products the user bought
        this.listOfExistingProducts = [];//List of products that can be bought, that exist in the database

        this.leftPart = new LeftPart(); //The left part is for viewing, editing, deleting bought products
        this.rightPart = new RightPart();//The right part is for viewing, editing, deleting recipes
    }

    AddToListOfProductTypes(pt) {
        this.listOfProductTypes.push(pt)
    }

    AddToListOfRecipeTypes(rec) {
        this.listOfRecipeTypes.push(rec);
    }

    AddToListOfBoughtProducts(pro) {
        this.listOfBoughtProducts.push(pro);
    }


    async drawInventory(host) {
        //Main part-----------------------------------------------------------------------------|
        this.container = document.createElement("div");
        this.container.className = "head";
        host.appendChild(this.container);

        // the 3 pieces that make the whole interface

        //1# Top part
        var top = new TopPart();
        top.drawTopPart(this.container);

        //2# middle part
        var middle = document.createElement("div");
        middle.className = "middle";
        this.container.appendChild(middle);

        //3# bottom part
        var bottom = new BottomPart();
        bottom.drawBottomPart(this.container);

        // the middle part that is devided in to 3 parts

        //a) left part
        var left = document.createElement("div");
        left.className = "left";
        middle.appendChild(left);

        localStorage.setItem("leftElementKey", "left");

        //b) center part
        var center = document.createElement("div");
        center.className = "center";
        middle.appendChild(center);

        localStorage.setItem("centerElementKey", "center");

        //c) right part
        var right = document.createElement("div");
        right.className = "right";
        middle.appendChild(right);

        localStorage.setItem("rightElementKey", "right");



        //Center part-----------------------------------------------------------------------------|
        var centerRow1 = document.createElement("div");
        centerRow1.className = "centerRow1";
        center.appendChild(centerRow1);

        var addBPBtn = document.createElement("button");//add a bought product button
        addBPBtn.className = "addBPBtn";
        addBPBtn.innerHTML = "Add bought product";
        centerRow1.appendChild(addBPBtn);

        localStorage.setItem("addBPBtnElementKey", "addBPBtn");

        var addRecipeBtn = document.createElement("button");//add a recipe button
        addRecipeBtn.className = "addRecipeBtn";
        addRecipeBtn.innerHTML = "Add recipe";
        centerRow1.appendChild(addRecipeBtn);

        localStorage.setItem("addRecipeBtnElementKey", "addRecipeBtn");

        var bPInfo = document.createElement("div");//bought product info
        bPInfo.className = "bPInfo";
        center.appendChild(bPInfo);

        localStorage.setItem("bPInfoElementKey", "bPInfo");


        addBPBtn.addEventListener("click", (ev) => {
            addBPBtn.style.display = "none";
            addRecipeBtn.style.display = "none";
            this.InsertBougthProduct(bPInfo, addBPBtn, addRecipeBtn);
        });

        addRecipeBtn.addEventListener("click", (ev) => {
            addBPBtn.style.display = "none";
            addRecipeBtn.style.display = "none";
            this.InsertRecipe(bPInfo, addBPBtn, addRecipeBtn);
        });


        //Left part-----------------------------------------------------------------------------|
        this.leftPart.drawLeftPart(this.container, left, this.listOfProductTypes, center, addBPBtn, addRecipeBtn, bPInfo, this.listOfExistingProducts);


        //Right part-----------------------------------------------------------------------------|
        this.rightPart.drawRightPart(this.container, right, this.listOfRecipeTypes, center, bPInfo);
    }

    async InsertBougthProduct(bPInfo, addBPBtn, addRecipeBtn) {
        bPInfo.innerHTML = '';

        //row1 Product type

        var bpRow1 = document.createElement("div");
        bpRow1.className = "bpRow1";
        bPInfo.appendChild(bpRow1);

        var ProTypeLab = document.createElement("label");//Existing product type label
        ProTypeLab.className = "ProTypeLab";
        ProTypeLab.innerHTML = "Product type: ";
        bpRow1.appendChild(ProTypeLab);

        var ProTypeSelect = document.createElement("select");//Existing product type select
        ProTypeSelect.className = "ProTypeSelect";
        bpRow1.appendChild(ProTypeSelect);

        this.listOfProductTypes.forEach((pt, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = pt.name;
            ProTypeSelect.appendChild(option);
        });

        ProTypeSelect.onclick = (ev) => this.FindExistingProducts(exProSelect);

        //row2 Existing product

        var bpRow2 = document.createElement("div");
        bpRow2.className = "bpRow2";
        bPInfo.appendChild(bpRow2);

        var exProLab = document.createElement("label");//Existing product label
        exProLab.className = "exProLab";
        exProLab.innerHTML = "Product: ";
        bpRow2.appendChild(exProLab);

        var exProSelect = document.createElement("select");//Existing product select
        exProSelect.className = "exProSelect";
        bpRow2.appendChild(exProSelect);

        //row3 - name

        var bpRow3 = document.createElement("div");
        bpRow3.className = "bpRow3";
        bPInfo.appendChild(bpRow3);

        var bpNameLab = document.createElement("label");
        bpNameLab.className = "bpNameLab";
        bpNameLab.innerHTML = "Name: ";
        bpRow3.appendChild(bpNameLab);

        var bpNameInsert = document.createElement("input");
        bpNameInsert.className = "bpNameInsert";
        bpRow3.appendChild(bpNameInsert);

        //row4 - description

        var bpRow4 = document.createElement("div");
        bpRow4.className = "bpRow4";
        bPInfo.appendChild(bpRow4);

        var bpDescLab = document.createElement("label");
        bpDescLab.className = "bpDescLab";
        bpDescLab.innerHTML = "Description: ";
        bpRow4.appendChild(bpDescLab);

        var bpDescInsert = document.createElement("input");
        bpDescInsert.className = "bpDescInsert";
        bpRow4.appendChild(bpDescInsert);

        //row5 - quantity

        var bpRow5 = document.createElement("div");
        bpRow5.className = "bpRow5";
        bPInfo.appendChild(bpRow5);

        var bpQuanLab = document.createElement("label");
        bpQuanLab.className = "bpQuanLab";
        bpQuanLab.innerHTML = "Quantity: ";
        bpRow5.appendChild(bpQuanLab);

        var bpQuanInsert = document.createElement("input");
        bpQuanInsert.className = "bpQuanInsert";
        bpQuanInsert.type = 'number';
        bpQuanInsert.min = 1;
        bpRow5.appendChild(bpQuanInsert);

        //row6 - weight

        var bpRow6 = document.createElement("div");
        bpRow6.className = "bpRow6";
        bPInfo.appendChild(bpRow6);

        var bpWeightLab = document.createElement("label");
        bpWeightLab.className = "bpWeightLab";
        bpWeightLab.innerHTML = "Weight(g): ";
        bpRow6.appendChild(bpWeightLab);

        var bpWeightInsert = document.createElement("input");
        bpWeightInsert.className = "bpWeightInsert";
        bpWeightInsert.type = 'number';
        bpWeightInsert.min = 1;
        bpRow6.appendChild(bpWeightInsert);

        //row7 - bought date

        var bpRow7 = document.createElement("div");
        bpRow7.className = "bpRow7";
        bPInfo.appendChild(bpRow7);

        var bpBDateLab = document.createElement("label");
        bpBDateLab.className = "bpBDateLab";
        bpBDateLab.innerHTML = "Day of purchase: ";
        bpRow7.appendChild(bpBDateLab);

        var bpBDateInsert = document.createElement("input");
        bpBDateInsert.className = "bpBDateInsert";
        bpBDateInsert.type = 'date';
        bpRow7.appendChild(bpBDateInsert);

        //row8 - Expiration date

        var bpRow8 = document.createElement("div");
        bpRow8.className = "bpRow8";
        bPInfo.appendChild(bpRow8);

        var bpExDateLab = document.createElement("label");
        bpExDateLab.className = "bpExDateLab";
        bpExDateLab.innerHTML = "Expiration date: ";
        bpRow8.appendChild(bpExDateLab);

        var bpExDateInsert = document.createElement("input");
        bpExDateInsert.className = "bpExDateInsert";
        bpExDateInsert.type = 'date';
        bpRow8.appendChild(bpExDateInsert);

        //row9 - Save cancel

        var bpRow9 = document.createElement("div");
        bpRow9.className = "bpRow9";
        bPInfo.appendChild(bpRow9);

        var saveBpBtn = document.createElement("button");//Save bought product
        saveBpBtn.className = "saveBpBtn";
        saveBpBtn.innerHTML = "Save product";
        bpRow9.appendChild(saveBpBtn);

        var cancelBpBtn = document.createElement("button");//Cancel
        cancelBpBtn.className = "cancelBpBtn";
        cancelBpBtn.innerHTML = "Cancel";
        bpRow9.appendChild(cancelBpBtn);

        cancelBpBtn.addEventListener("click", (ev) => {
            bPInfo.innerHTML = ''; // Isprazni bPInfo
            addBPBtn.style.display = "block";
            addRecipeBtn.style.display = "block";
        });


        saveBpBtn.addEventListener("click", (ev) => {
            this.SaveBougthProduct();

        });

    }

    async FindExistingProducts(exProSelect) {
        exProSelect.innerHTML = '';
        this.listOfExistingProducts = [];//Without this, the list will just keep growing by the number of existing products
        var TypeSelectValue = parseInt(this.container.querySelector(".ProTypeSelect").value);
        //console.log(TypeSelectValue);

        var response = await fetch(`http://localhost:5063/ProductType/ReturnAllProductsOfOneType/${TypeSelectValue + 1}`);
        var data = await response.json();

        data.forEach((p, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = p.name;
            exProSelect.appendChild(option);
            this.listOfExistingProducts.push(p);
        });


    }

    async FindExistingProductsForIng(ProTypeSelect, exProSelectId) {
        const exProSelect = document.getElementById(exProSelectId);

        // Sada možete koristiti exProSelect kao odgovarajući element za taj sastojak
        exProSelect.innerHTML = '';
        this.listOfExistingProducts = [];

        var TypeSelectValue = parseInt(ProTypeSelect.value);
        var response = await fetch(`http://localhost:5063/ProductType/ReturnAllProductsOfOneType/${TypeSelectValue + 1}`);
        var data = await response.json();

        data.forEach((p, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = p.name;
            exProSelect.appendChild(option);
            this.listOfExistingProducts.push(p);
        });
    }


    async SaveBougthProduct() {

        var val = parseInt(this.container.querySelector(".exProSelect").value);
        var type = parseInt(this.container.querySelector(".ProTypeSelect").value) + 1;
        var picture = this.listOfExistingProducts[val].picture;

        var name = this.container.querySelector(".bpNameInsert").value;
        var description = this.container.querySelector(".bpDescInsert").value;
        if (description == "") {
            description = "No description";
        }
        var quantity = parseInt(this.container.querySelector(".bpQuanInsert").value);
        var weight = parseInt(this.container.querySelector(".bpWeightInsert").value);
        var boughtDate = this.container.querySelector(".bpBDateInsert").value;
        var expirationDate = this.container.querySelector(".bpExDateInsert").value;

        var ach = new Achievement();
        ach.drawAchievement(2);


        var response = await fetch(`http://localhost:5063/BoughtProduct/ManuallyInsertBoughtProduct/${type}/${name}/${description}/${picture}/${quantity}/${weight}/${boughtDate}T17:32:28Z/${expirationDate}T17:32:28Z`, {
            method: "POST"
        });

        //This is where we reload the left part so the user can see the bought product in real time
        var leftElementKey = localStorage.getItem("leftElementKey");
        var left = document.querySelector("." + leftElementKey);
        left.innerHTML = '';

        var centerElementKey = localStorage.getItem("centerElementKey");
        var center = document.querySelector("." + centerElementKey);

        var addBPBtnElementKey = localStorage.getItem("addBPBtnElementKey");
        var addBPBtn = document.querySelector("." + addBPBtnElementKey);

        var addRecipeBtnElementKey = localStorage.getItem("addRecipeBtnElementKey");
        var addRecipeBtn = document.querySelector("." + addRecipeBtnElementKey);

        var bPInfoElementKey = localStorage.getItem("bPInfoElementKey");
        var bPInfo = document.querySelector("." + bPInfoElementKey);

        this.leftPart.drawLeftPart(this.container, left, this.listOfProductTypes, center, addBPBtn, addRecipeBtn, bPInfo, this.listOfExistingProducts);
        var data = await response.json();

    }

    InsertRecipe(bPInfo, addBPBtn, addRecipeBtn) {
        bPInfo.innerHTML = '';

        //recipe row1 - recipe type
        var rRow1 = document.createElement("div");
        rRow1.className = "rRow1";
        bPInfo.appendChild(rRow1);

        var RecTypeLab = document.createElement("label");//Existing product type label
        RecTypeLab.className = "RecTypeLab";
        RecTypeLab.innerHTML = "Recipe type: ";
        rRow1.appendChild(RecTypeLab);

        var RecTypeSelect = document.createElement("select");//Existing product type select
        RecTypeSelect.className = "RecTypeSelect";
        rRow1.appendChild(RecTypeSelect);

        this.listOfRecipeTypes.forEach((pt, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = pt.name;
            RecTypeSelect.appendChild(option);
        });

        //recipe row2 - recipe name

        var rRow2 = document.createElement("div");
        rRow2.className = "rRow2";
        bPInfo.appendChild(rRow2);

        var rNameLab = document.createElement("label");
        rNameLab.className = "rNameLab";
        rNameLab.innerHTML = "Name: ";
        rRow2.appendChild(rNameLab);

        var rNameInsert = document.createElement("input");
        rNameInsert.className = "rNameInsert";
        rRow2.appendChild(rNameInsert);

        //recipe row3 - recipe description

        var rRow3 = document.createElement("div");
        rRow3.className = "rRow3";
        bPInfo.appendChild(rRow3);

        var rDescLab = document.createElement("label");
        rDescLab.className = "rDescLab";
        rDescLab.innerHTML = "Description: ";
        rRow3.appendChild(rDescLab);

        var rDescInsert = document.createElement("textarea");
        rDescInsert.className = "rDescInsert";
        rRow3.appendChild(rDescInsert);

        //recipe row4 - recipe picture

        var rRow4 = document.createElement("div");
        rRow4.className = "rRow4";
        bPInfo.appendChild(rRow4);

        var rPicLab = document.createElement("label");
        rPicLab.className = "rPicLab";
        rPicLab.innerHTML = "Picture: ";
        rRow4.appendChild(rPicLab);

        var rPicInput = document.createElement("input");
        rPicInput.className = "rPicInput";
        rPicInput.type = "file"; // Postavljanje tipa na "file" omogućava unos slika
        rRow4.appendChild(rPicInput);

        //recipe row5 - add ingredient

        var rRow5 = document.createElement("div");
        rRow5.className = "rRow5";
        bPInfo.appendChild(rRow5);

        var rIngLab = document.createElement("label");
        rIngLab.className = "rIngLab";
        rIngLab.innerHTML = "Ingredient ";
        rRow5.appendChild(rIngLab);

        var addIngBtn = document.createElement("button");//Add new ingredient button
        addIngBtn.className = "addIngBtn";
        addIngBtn.innerHTML = "Add an ingredient";
        rRow5.appendChild(addIngBtn);

        //recipe row6 - ingredient row
        var rRow6 = document.createElement("div");
        rRow6.className = "rRow6";
        bPInfo.appendChild(rRow6);


        addIngBtn.addEventListener("click", (ev) => {
            var ingredientRow = document.createElement("div");
            ingredientRow.className = "ingredient-row";
            rRow6.appendChild(ingredientRow);

            this.createIngredientRow(rRow6, ingredientRow, rRow6.children.length);
        });

        //row9 - Save cancel

        var rRow9 = document.createElement("div");
        rRow9.className = "rRow9";
        bPInfo.appendChild(rRow9);

        var saveRBtn = document.createElement("button");//Save bought product
        saveRBtn.className = "saveRBtn";
        saveRBtn.innerHTML = "Save recipe";
        rRow9.appendChild(saveRBtn);

        var cancelRBtn = document.createElement("button");//Cancel
        cancelRBtn.className = "cancelRBtn";
        cancelRBtn.innerHTML = "Cancel";
        rRow9.appendChild(cancelRBtn);

        cancelRBtn.addEventListener("click", (ev) => {
            bPInfo.innerHTML = ''; // Isprazni bPInfo
            addBPBtn.style.display = "block";
            addRecipeBtn.style.display = "block";
        });


        saveRBtn.addEventListener("click", (ev) => {
            this.SaveRecipe();
        });
    }

    async SaveRecipe() {

        var type = parseInt(this.container.querySelector(".RecTypeSelect").value) + 1;//Recipe type

        var name = this.container.querySelector(".rNameInsert").value;//Recipe name
        var description = this.container.querySelector(".rDescInsert").value;//Recipe description
        if (description == "") {
            description = "No description";
        }

        var ach = new Achievement();
        ach.drawAchievement(1);

        var response = await fetch(`http://localhost:5063/Recipe/ManuallyInsertRecipe/${name}/${description}/${name}`, {
            method: "POST"
        });

        var response2 = await fetch(`http://localhost:5063/Recipe/ReturnLastRecipe`);
        var data2 = await response2.json();

        var response3 = await fetch(`http://localhost:5063/RecipeType/AddRecipeToRecipeType/${type}/${data2.id}`, {
            method: "Put"
        });
        //var data3 = await response3.json();


        this.SaveIngredients(data2.id);

        //This is where we reload the left part so the user can see the bought product in real time
        var rightElementKey = localStorage.getItem("rightElementKey");
        var right = document.querySelector("." + rightElementKey);
        right.innerHTML = '';

        var centerElementKey = localStorage.getItem("centerElementKey");
        var center = document.querySelector("." + centerElementKey);

        var bPInfoElementKey = localStorage.getItem("bPInfoElementKey");
        var bPInfo = document.querySelector("." + bPInfoElementKey);

        this.rightPart.drawRightPart(this.container, right, this.listOfRecipeTypes, center, bPInfo);


    }

    async SaveIngredients(recId) {
        //Created a row for saving all requests for saving ingredints
        const ingredientRequests = [];

        //Move thrught all rows with ingredients
        for (const ingredientRow of document.querySelectorAll(".ingredient-row")) {
            const product = parseInt(ingredientRow.querySelector(".exProSelect").value) + 1;
            const quantity = ingredientRow.querySelector(".ingQuanInput").value;
            const weight = ingredientRow.querySelector(".ingWeightInput").value;
            const description = ingredientRow.querySelector(".ingDescInsert").value || "No description";

            // Request for saving ingredient
            const ingredientRequest = fetch(`http://localhost:5063/Ingredient/ManuallyInsertIngredient/${product}/${description}/${quantity}/${weight}`, {
                method: "POST"
            });

            // Waiting for the request to finish
            await ingredientRequest;

            // Get the last recipe so we can add the ingredients to it
            const response = await fetch(`http://localhost:5063/Ingredient/ReturnLastIngredient`);
            const data = await response.json();
            var recipeId = data.id;

            // Add the ingredients to the recipe
            const response2 = await fetch(`http://localhost:5063/Recipe/AddIngredientToRecipe/${recId}/${recipeId}`, {
                method: "PUT"
            });

            // Add this request to the row
            ingredientRequests.push(ingredientRequest);
        }


        // Wait for all requests for saving ingredients to finish
        await Promise.all(ingredientRequests);



    }



    async createIngredientRow(rRow6, ingredientRow, ingredientCount) {


        var ingredientLabel = document.createElement("label");
        ingredientLabel.innerHTML = "Ingredient " + ingredientCount + ": ";
        ingredientRow.appendChild(ingredientLabel);

        //ingRow1 Product type

        var ingRow1 = document.createElement("div");
        ingRow1.className = "ingRow1";
        ingredientRow.appendChild(ingRow1);

        var ProTypeLab = document.createElement("label");//Existing product type label
        ProTypeLab.className = "ProTypeLab";
        ProTypeLab.innerHTML = "Product type: ";
        ingRow1.appendChild(ProTypeLab);

        var ProTypeSelect = document.createElement("select");//Existing product type select
        ProTypeSelect.className = "ProTypeSelect";
        ProTypeSelect.id = "ProTypeSelect_" + ingredientCount;
        ingRow1.appendChild(ProTypeSelect);

        this.listOfProductTypes.forEach((pt, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = pt.name;
            ProTypeSelect.appendChild(option);
        });

        ProTypeSelect.onclick = (ev) => this.FindExistingProductsForIng(ProTypeSelect, "exProSelect_" + ingredientCount);


        //ingRow2 Existing product

        var ingRow2 = document.createElement("div");
        ingRow2.className = "ingRow2";
        ingredientRow.appendChild(ingRow2);

        var exProLab = document.createElement("label");//Existing product label
        exProLab.className = "exProLab";
        exProLab.innerHTML = "Product: ";
        ingRow2.appendChild(exProLab);

        var exProSelect = document.createElement("select");//Existing product select
        exProSelect.className = "exProSelect";
        exProSelect.id = "exProSelect_" + ingredientCount;
        ingRow2.appendChild(exProSelect);




        //ingRow3 Quantity

        var ingRow3 = document.createElement("div");
        ingRow3.className = "ingRow3";
        ingredientRow.appendChild(ingRow3);

        var ingQuanLab = document.createElement("label");//Quantity label
        ingQuanLab.className = "ingQuanLab";
        ingQuanLab.innerHTML = "Quantity: ";
        ingRow3.appendChild(ingQuanLab);

        var ingQuanInput = document.createElement("input");//Quantity input
        ingQuanInput.className = "ingQuanInput";
        ingQuanInput.type = "number";
        ingQuanInput.min = 1;
        ingRow3.appendChild(ingQuanInput);

        //ingRow4 Weight

        var ingRow4 = document.createElement("div");
        ingRow4.className = "ingRow4";
        ingredientRow.appendChild(ingRow4);

        var ingWeightLab = document.createElement("label");//Weight label
        ingWeightLab.className = "ingWeightLab";
        ingWeightLab.innerHTML = "Weight: ";
        ingRow4.appendChild(ingWeightLab);

        var ingWeightInput = document.createElement("input");//Weight input
        ingWeightInput.className = "ingWeightInput";
        ingWeightInput.type = "number";
        ingWeightInput.min = 1;
        ingRow4.appendChild(ingWeightInput);

        //ingRow5 Description

        var ingRow5 = document.createElement("div");
        ingRow5.className = "ingRow5";
        ingredientRow.appendChild(ingRow5);

        var ingDescLab = document.createElement("label");
        ingDescLab.className = "ingDescLab";
        ingDescLab.innerHTML = "Description: ";
        ingRow5.appendChild(ingDescLab);

        var ingDescInsert = document.createElement("textarea");//Description input
        ingDescInsert.className = "ingDescInsert";
        ingRow5.appendChild(ingDescInsert);

        var addRemoveIngBtn = document.createElement("button");
        addRemoveIngBtn.innerHTML = "Remove";
        addRemoveIngBtn.className = "addRemoveIngBtn";


        addRemoveIngBtn.addEventListener("click", () => {
            var confirmRemove = confirm("Are you sure you want to remove ingredient number: " + ingredientCount + " ?");

            if (confirmRemove) {

                rRow6.removeChild(ingredientRow);
            }

        });

        ingredientRow.appendChild(addRemoveIngBtn);

        return ingredientRow;
    }

}