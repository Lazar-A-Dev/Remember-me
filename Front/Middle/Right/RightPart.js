import { Achievement } from "../../Top/Achievement.js";
export class RightPart {
    constructor() {

    }

    async drawRightPart(container, right, listOfRecipeTypes, center, bPInfo) {
        //Right part-----------------------------------------------------------------------------|
        var rightSearchBlock = document.createElement("div");//block for right search
        rightSearchBlock.className = "rightSearchBlock";
        right.appendChild(rightSearchBlock);

        var rightSearchBlockRow1lab = document.createElement("label");//Label for type of recipe
        rightSearchBlockRow1lab.innerHTML = "Type of recipe:";
        rightSearchBlockRow1lab.className = "rightSearchBlockRow1lab";
        rightSearchBlock.appendChild(rightSearchBlockRow1lab);

        var rightSearchBlockRow1 = document.createElement("div");//first row for right search
        rightSearchBlockRow1.className = "rightSearchBlockRow1";
        rightSearchBlock.appendChild(rightSearchBlockRow1);


        var rightSearchBlockRow1Select = document.createElement("select");//types of recipes for searching
        rightSearchBlockRow1Select.className = "rightSearchBlockRow1Select";
        rightSearchBlockRow1.appendChild(rightSearchBlockRow1Select);

        

        // Custom added atribute for returning all recipes
        const allOption = document.createElement("option");
        allOption.value = -1;
        allOption.text = "All Recipes";
        rightSearchBlockRow1Select.appendChild(allOption);

        // Custom added atribute for returning makeable recipes
        const makeOption = document.createElement("option");
        makeOption.value = -2;
        makeOption.text = "Makable recipes";
        rightSearchBlockRow1Select.appendChild(makeOption);



        //Selection of recipe types
        listOfRecipeTypes.forEach((ep, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = ep.name;
            rightSearchBlockRow1Select.appendChild(option);
        });

        var rightSearchBlockRow2lab = document.createElement("label");//Label for recipe name
        rightSearchBlockRow2lab.innerHTML = "Recipe name:";
        rightSearchBlockRow2lab.className = "rightSearchBlockRow2lab";
        rightSearchBlock.appendChild(rightSearchBlockRow2lab);

        var rightSearchBlockRow2 = document.createElement("div");//second row for right search
        rightSearchBlockRow2.className = "rightSearchBlockRow2";
        rightSearchBlock.appendChild(rightSearchBlockRow2);

        var rightSearchBlockRow2Input = document.createElement("input");//Input the name of the product
        rightSearchBlockRow2Input.className = "rightSearchBlockRow2Input";
        rightSearchBlockRow2.appendChild(rightSearchBlockRow2Input);

        var rightSearchBlockBtn = document.createElement("button");//This button is used for advanced searching
        rightSearchBlockBtn.innerHTML = "Search";
        rightSearchBlockBtn.className = "rightSearchBlockBtn";
        rightSearchBlock.appendChild(rightSearchBlockBtn);

        var rightReturnResultBlock = document.createElement("div");//This contains number of return results
        rightReturnResultBlock.className = "rightReturnResultBlock";
        right.appendChild(rightReturnResultBlock);

        var rightReturnResultBlockLab = document.createElement("label");
        rightReturnResultBlock.appendChild(rightReturnResultBlockLab);

        var rightShowBlock = document.createElement("div");//This contains all of the bought product cards
        rightShowBlock.className = "rightShowBlock";
        right.appendChild(rightShowBlock);

        var response = await fetch("http://localhost:5063/Recipe/ReturnAllRecipes");
        var data = await response.json();

        rightSearchBlockBtn.addEventListener("click", async (ev) => {
            try {
                rightShowBlock.innerHTML = '';
                var idRec = parseInt(right.querySelector(".rightSearchBlockRow1Select").value) + 1;
                var nameRec = right.querySelector(".rightSearchBlockRow2Input").value;
                if (nameRec == "")
                    nameRec = "empty";

                // console.log(idRec + "|" + nameRec);

                response = await fetch(`http://localhost:5063/Recipe/AdvancedSearchForRecipes/${idRec}/${nameRec}`);
                data = await response.json();
                ShowRecipes(data);

            } catch (error) {
                console.error("An error has accured during your advanced search for bought products", error);
            }
        });



        var centerViewRec = document.createElement("div");
        centerViewRec.className = "centerViewRec";
        center.appendChild(centerViewRec); //main for viewing product part

        ShowRecipes(data);

        async function ShowRecipes(data) {
            data.forEach(e => {
                var recCard = document.createElement("div");
                recCard.className = "recCard";
                rightShowBlock.appendChild(recCard);

                //right row1
                var rightRow1 = document.createElement("div");
                rightRow1.className = "rightRow1";
                recCard.appendChild(rightRow1);

                var recName = document.createElement("label");
                recName.className = "recName";
                recName.innerHTML = e.name;
                rightRow1.appendChild(recName);

                var recPicture = document.createElement("img");
                recPicture.className = "recPicture";
                recPicture.src = `Pictures/Recipes/${e.picture}.jpg`
                rightRow1.appendChild(recPicture);

                //right row 2
                var rightRow2 = document.createElement("div");
                rightRow2.className = "rightRow2";
                recCard.appendChild(rightRow2);

                var editRecipeBtn = document.createElement("button");//Edit bought product button
                editRecipeBtn.className = "editRecipeBtn";
                editRecipeBtn.innerHTML = "Edit";
                rightRow2.appendChild(editRecipeBtn);

                var viewRecipetBtn = document.createElement("button");//View bought product button
                viewRecipetBtn.className = "viewRecipeBtn";
                viewRecipetBtn.innerHTML = "View";
                rightRow2.appendChild(viewRecipetBtn);

                var deleteRecipetBtn = document.createElement("button");//Delete bought product button
                deleteRecipetBtn.className = "deleteRecipeBtn";
                deleteRecipetBtn.innerHTML = "delete";
                rightRow2.appendChild(deleteRecipetBtn);

                deleteRecipetBtn.addEventListener("click", function () {
                    var confirmDelete = confirm("Are you sure you want to delete this product: " + e.name + " ?");

                    if (confirmDelete) {
                        // Call the function for deletion
                        DeleteRecipe(e.id);
                    }
                });
            });

            rightReturnResultBlockLab.innerHTML = "Number of results: " + data.length;//Update number of returns
        }

        //Delete recipe
        async function DeleteRecipe(idRec) {
            var response = await fetch(`http://localhost:5063/Recipe/DeleteRecipe/${idRec}`, {
                method: "DELETE"
            });
            var ach = new Achievement();
            ach.drawAchievement(5);
            UpdateRecipes();

            var data = await response.json();

        }

        async function UpdateRecipes() {
            var response = await fetch("http://localhost:5063/Recipe/ReturnAllRecipes");
            var data = await response.json();
            rightShowBlock.innerHTML = '';
            ShowRecipes(data);
        }

    }
}