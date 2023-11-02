import { Achievement } from "../../Top/Achievement.js";
export class LeftPart {
    constructor() {

    }

    async drawLeftPart(container, left, listOfProductTypes, center, addBPBtn, addRecipeBtn, bPInfo, listOfExistingProducts) {
        //Left part-----------------------------------------------------------------------------|
        var leftSearchBlock = document.createElement("div");//block for left search
        leftSearchBlock.className = "leftSearchBlock";
        left.appendChild(leftSearchBlock);

        var leftSearchBlockRow1lab = document.createElement("label");//Label for type of product
        leftSearchBlockRow1lab.innerHTML = "Type of product:";
        leftSearchBlockRow1lab.className = "leftSearchBlockRow1lab";
        leftSearchBlock.appendChild(leftSearchBlockRow1lab);

        var leftSearchBlockRow1 = document.createElement("div");//first row for left search
        leftSearchBlockRow1.className = "leftSearchBlockRow1";
        leftSearchBlock.appendChild(leftSearchBlockRow1);


        var leftSearchBlockRow1Select = document.createElement("select");//types of products for searching
        leftSearchBlockRow1Select.className = "leftSearchBlockRow1Select";
        leftSearchBlockRow1.appendChild(leftSearchBlockRow1Select);

        // Custom added atribute for returning all bought products
        const allOption = document.createElement("option");
        allOption.value = -1;
        allOption.text = "All Products";
        leftSearchBlockRow1Select.appendChild(allOption);

        //Selection of existing product types
        listOfProductTypes.forEach((ep, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = ep.name;
            leftSearchBlockRow1Select.appendChild(option);
        });

        var leftSearchBlockRow2lab = document.createElement("label");//Label for type of product
        leftSearchBlockRow2lab.innerHTML = "Product name:";
        leftSearchBlockRow2lab.className = "leftSearchBlockRow2lab";
        leftSearchBlock.appendChild(leftSearchBlockRow2lab);

        var leftSearchBlockRow2 = document.createElement("div");//second row for left search
        leftSearchBlockRow2.className = "leftSearchBlockRow2";
        leftSearchBlock.appendChild(leftSearchBlockRow2);

        var leftSearchBlockRow2Input = document.createElement("input");//Input the name of the product
        leftSearchBlockRow2Input.className = "leftSearchBlockRow2Input";
        leftSearchBlockRow2.appendChild(leftSearchBlockRow2Input);

        var leftSearchBlockBtn = document.createElement("button");//This button is used for advanced searching
        leftSearchBlockBtn.innerHTML = "Search";
        leftSearchBlockBtn.className = "leftSearchBlockBtn";
        leftSearchBlock.appendChild(leftSearchBlockBtn);

        var leftReturnResultBlock = document.createElement("div");//This contains number of return results
        leftReturnResultBlock.className = "leftReturnResultBlock";
        left.appendChild(leftReturnResultBlock);

        var leftReturnResultBlockLab = document.createElement("label");
        leftReturnResultBlock.appendChild(leftReturnResultBlockLab);

        var leftShowBlock = document.createElement("div");//This contains all of the bought product cards
        leftShowBlock.className = "leftShowBlock";
        left.appendChild(leftShowBlock);

        var response = await fetch("http://localhost:5063/BoughtProduct/ReturnAllBoughtProducts");
        var data = await response.json();

        leftSearchBlockBtn.addEventListener("click", async (ev) => {
            try {
                leftShowBlock.innerHTML = '';
                var idprod = parseInt(left.querySelector(".leftSearchBlockRow1Select").value) + 1;
                var nameprod = left.querySelector(".leftSearchBlockRow2Input").value;
                if (nameprod == "")
                nameprod = "empty";

                response = await fetch(`http://localhost:5063/BoughtProduct/AdvancedSearchForBoughtProducts/${idprod}/${nameprod}`);
                data = await response.json();
                ShowBoughtProucts(data);

            } catch (error) {
                console.error("An error has accured during your advanced search for bought products", error);
            }
        });



        var centerViewBP = document.createElement("div");
        centerViewBP.className = "centerViewBP";
        center.appendChild(centerViewBP); //main for viewing product part

        ShowBoughtProucts(data);

        async function ShowBoughtProucts(data) {
            data.forEach(e => {
                var bPCard = document.createElement("div");
                bPCard.className = "bPCard";
                leftShowBlock.appendChild(bPCard);

                //leftrow1
                var leftRow1 = document.createElement("div");
                leftRow1.className = "leftRow1";
                bPCard.appendChild(leftRow1);

                var bPName = document.createElement("label");
                bPName.className = "bPName";
                bPName.innerHTML = e.name;
                leftRow1.appendChild(bPName);

                var bpPicture = document.createElement("img");
                bpPicture.className = "bpPicture";
                bpPicture.src = `Pictures/Products/${e.picture}.jpg`
                leftRow1.appendChild(bpPicture);

                //leftrow2
                var leftRow2 = document.createElement("div");
                leftRow2.className = "leftRow2";
                bPCard.appendChild(leftRow2);

                var labelState = document.createElement("label");
                labelState.className = "labelState";
                labelState.innerHTML = "States: "
                leftRow2.appendChild(labelState);

                // State block safe
                var productBlock1 = document.createElement("button");
                productBlock1.className = "productBlock1";
                productBlock1.disabled = true;
                leftRow2.appendChild(productBlock1);

                // State block warry
                var productBlock2 = document.createElement("button");
                productBlock2.className = "productBlock2";
                productBlock2.disabled = true;
                leftRow2.appendChild(productBlock2);

                // State block danger
                var productBlock3 = document.createElement("button");
                productBlock3.className = "productBlock3";
                productBlock3.disabled = true;
                leftRow2.appendChild(productBlock3);

                //Date of purchase and date of expiration
                var purchaseDate = new Date(e.purchaseDate);
                var expirationDate = new Date(e.expirationDate);
                var currentDate = new Date();

                //Difference between dates in days
                var daysUntilExpiration = Math.ceil((expirationDate - purchaseDate) / (1000 * 60 * 60 * 24) - 1);
                var daysPast = Math.ceil((currentDate - purchaseDate) / (1000 * 60 * 60 * 24));

                
                // Check for correct date
                if (daysPast <= daysUntilExpiration/2) {
                    productBlock1.classList.add("green");
                    productBlock2.classList.remove("yellow");
                    productBlock3.classList.remove("red");
                    productBlock1.title = "Just" + (Math.round(daysUntilExpiration/2) - daysPast) + " days left";
                    //console.log(daysPast + "<=" +  daysUntilExpiration/2);

                }
                else if (daysPast > daysUntilExpiration/2 && daysPast < daysUntilExpiration) {
                    productBlock2.classList.add("yellow");
                    productBlock1.classList.remove("green");
                    productBlock3.classList.remove("red");
                    productBlock2.title = "Just" + ((daysUntilExpiration) - daysPast) + " days left";
                    //console.log(daysPast + ">" +  daysUntilExpiration/2 + "|" + daysPast + ">" + daysUntilExpiration);
                }
                else if (daysPast >= daysUntilExpiration) {
                    productBlock3.classList.add("red");
                    productBlock1.classList.remove("green");
                    productBlock2.classList.remove("yellow");
                }
                
                

                //leftrow3
                var leftRow3 = document.createElement("div");
                leftRow3.className = "leftRow3";
                bPCard.appendChild(leftRow3);

                function dateDiffInDays(a, b) {
                    const _MS_PER_DAY = 24 * 60 * 60 * 1000; // number of miliseconds in one day
                    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
                    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

                    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
                }

                const daysDifference = dateDiffInDays(purchaseDate, currentDate);


                var daysInKitchenLab = document.createElement("label");
                daysInKitchenLab.className = "daysInKitchenLab";
                daysInKitchenLab.innerHTML = "Days in kitchen: " + daysDifference;
                leftRow3.appendChild(daysInKitchenLab);

                //leftrow4
                var leftRow4 = document.createElement("div");
                leftRow4.className = "leftRow4";
                bPCard.appendChild(leftRow4);

                var editProductBtn = document.createElement("button");//Edit bought product button
                editProductBtn.className = "editProductBtn";
                editProductBtn.innerHTML = "Edit";
                leftRow4.appendChild(editProductBtn);

                var viewProductBtn = document.createElement("button");//View bought product button
                viewProductBtn.className = "viewProductBtn";
                viewProductBtn.innerHTML = "View";
                leftRow4.appendChild(viewProductBtn);

                var deleteProductBtn = document.createElement("button");//Delete bought product button
                deleteProductBtn.className = "deleteProductBtn";
                deleteProductBtn.innerHTML = "delete";
                leftRow4.appendChild(deleteProductBtn);

                //Delete bought product
                deleteProductBtn.addEventListener("click", function () {
                    var confirmDelete = confirm("Are you sure you want to delete this product: " + e.name + " ?");

                    if (confirmDelete) {
                        // Pozovite funkciju za brisanje
                        DeleteBoughtProduct(e.id);
                    }
                });

                //View bought product
                viewProductBtn.addEventListener("click", (ev) => {
                    centerViewBP.innerHTML = '';
                    ViewBoughtProduct(e.name, e.picture, e.description, e.quantity, e.weight, e.purchaseDate, e.expirationDate, daysDifference, centerViewBP, bPInfo);

                    //Hiding 2 buttons from the center part
                    addBPBtn.style.display = "none";
                    addRecipeBtn.style.display = "none";
                });

                //Edit bought product
                editProductBtn.addEventListener("click", (ev) => {
                    centerViewBP.innerHTML = '';
                    EditBoughtProduct(bPInfo, e);

                    addBPBtn.style.display = "none";
                    addRecipeBtn.style.display = "none";
                });

            });

            leftReturnResultBlockLab.innerHTML = "Number of results: " + data.length;//Update number of returns

        }


        //Delte bought product
        async function DeleteBoughtProduct(idProd) {
            var response = await fetch(`http://localhost:5063/BoughtProduct/DeleteBoughtProduct/${idProd}`, {
                method: "DELETE"
            });
            var ach = new Achievement();
            ach.drawAchievement(1006);
            UpdateBoughtProducts();

            var data = await response.json();

        }

        async function UpdateBoughtProducts() {
            var response = await fetch("http://localhost:5063/BoughtProduct/ReturnAllBoughtProducts");
            var data = await response.json();
            leftShowBlock.innerHTML = '';
            ShowBoughtProucts(data);
        }

        //View bought product
        async function ViewBoughtProduct(name, picture, description, quantity, weight, purchaseDate, expirationDate, daysDifference, centerViewBP, bPInfo) {
            bPInfo.innerHTML = '';//If the user has the insert new bought product window open now it will shut down and open the view bought product window

            // var centerViewBP = document.createElement("div");
            // centerViewBP.className = "centerViewBP";
            // center.appendChild(centerViewBP); //main for viewing product part || note to anyone reading this, this part of the code was added at line 92. That was the only way i got it to work

            var centerViewBPRow1 = document.createElement("div");//row 1
            centerViewBPRow1.className = "centerViewBPRow1";
            centerViewBP.appendChild(centerViewBPRow1);

            var centerViewBPRow1Picture = document.createElement("img");//bought product picture for viewing
            centerViewBPRow1Picture.className = "centerViewBPRow1Picture";
            centerViewBPRow1Picture.src = `Pictures/Products/${picture}.jpg`;
            centerViewBPRow1.appendChild(centerViewBPRow1Picture);

            var centerViewBPRow2 = document.createElement("div");//row 2
            centerViewBPRow2.className = "centerViewBPRow2";
            centerViewBP.appendChild(centerViewBPRow2);

            var centerViewBPRow2NameLab = document.createElement("label");//bought product name for viewing
            centerViewBPRow2NameLab.className = "centerViewBPRow1NameLab";
            centerViewBPRow2NameLab.innerHTML = "Name: " + name;
            centerViewBPRow2.appendChild(centerViewBPRow2NameLab);

            var centerViewBPRow2QuantLab = document.createElement("label");//bought product quantity for viewing
            centerViewBPRow2QuantLab.className = "centerViewBPRow2QuantLab";
            centerViewBPRow2QuantLab.innerHTML = "Quantity: " + quantity;
            centerViewBPRow2.appendChild(centerViewBPRow2QuantLab);

            var centerViewBPRow2WeightLab = document.createElement("label");//bought product weight for viewing
            centerViewBPRow2WeightLab.className = "centerViewBPRow2WeightLab";
            centerViewBPRow2WeightLab.innerHTML = "Weight: " + weight + "g";
            centerViewBPRow2.appendChild(centerViewBPRow2WeightLab);

            var centerViewBPRow3 = document.createElement("div");//row 3
            centerViewBPRow3.className = "centerViewBPRow3";
            centerViewBP.appendChild(centerViewBPRow3);

            var centerViewBPRow3Description = document.createElement("label");//bought product description for viewing
            centerViewBPRow3Description.className = "centerViewBPRow3Description";
            centerViewBPRow3Description.innerHTML = description;
            centerViewBPRow3.appendChild(centerViewBPRow3Description);

            var centerViewBPRow4 = document.createElement("div");//row 4
            centerViewBPRow4.className = "centerViewBPRow4";
            centerViewBP.appendChild(centerViewBPRow4);

            var centerViewBPRow4PurchaseDate = document.createElement("label");//bought product purchaseDate for viewing
            centerViewBPRow4PurchaseDate.className = "centerViewBPRow4PurchaseDate";
            var formatedPD = new Date(purchaseDate);
            centerViewBPRow4PurchaseDate.innerHTML = "Purchase date: " + formatedPD.toISOString().split('T')[0];
            centerViewBPRow4.appendChild(centerViewBPRow4PurchaseDate);

            var centerViewBPRow4ExpirationDate = document.createElement("label");//bought product expirationDate  for viewing
            centerViewBPRow4ExpirationDate.className = "centerViewBPRow4ExpirationDate";
            var formatedED = new Date(expirationDate);
            centerViewBPRow4ExpirationDate.innerHTML = "Expiration date: " + formatedED.toISOString().split('T')[0];
            centerViewBPRow4.appendChild(centerViewBPRow4ExpirationDate);

            var centerViewBPRow4Days = document.createElement("label");//bought product days in kitchen  for viewing
            centerViewBPRow4Days.className = "centerViewBPRow4Days";
            centerViewBPRow4Days.innerHTML = "At home: " + daysDifference + " days";
            centerViewBPRow4.appendChild(centerViewBPRow4Days);

            var centerViewBPRow5 = document.createElement("div");//row 5
            centerViewBPRow5.className = "centerViewBPRow5";
            centerViewBP.appendChild(centerViewBPRow5);

            var returnToNormalCenterBtn = document.createElement("button");//return button
            returnToNormalCenterBtn.className = "returnToNormalCenterBtn";
            returnToNormalCenterBtn.innerHTML = "Return";
            centerViewBPRow5.appendChild(returnToNormalCenterBtn);

            returnToNormalCenterBtn.addEventListener("click", (ev) => {
                centerViewBP.innerHTML = '';
                addBPBtn.style.display = "block";
                addRecipeBtn.style.display = "block";
            });
        }

        async function EditBoughtProduct(bPInfo, e) {
            bPInfo.innerHTML = '';

            //row1 Existing product type

            var bpRow1 = document.createElement("div");
            bpRow1.className = "bpRow1";
            bPInfo.appendChild(bpRow1);

            var ProTypeLab = document.createElement("label");//Existing product type label
            ProTypeLab.className = "ProTypeLab";
            ProTypeLab.innerHTML = "New product type: ";
            bpRow1.appendChild(ProTypeLab);

            var EditProTypeSelect = document.createElement("select");//Existing product type select
            EditProTypeSelect.className = "EditProTypeSelect";

            bpRow1.appendChild(EditProTypeSelect);

            listOfProductTypes.forEach((pt, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.text = pt.name;
                EditProTypeSelect.appendChild(option);
            });

            EditProTypeSelect.value = e.type - 1;

            EditProTypeSelect.addEventListener("click", (ev) => {
                FindExistingProducts(editExProSelect);
            });


            //row2 Existing product

            var bpRow2 = document.createElement("div");
            bpRow2.className = "bpRow2";
            bPInfo.appendChild(bpRow2);

            var exProLab = document.createElement("label");//Existing product label
            exProLab.className = "exProLab";
            exProLab.innerHTML = "New Product: ";
            bpRow2.appendChild(exProLab);

            var editExProSelect = document.createElement("select");//Existing product select
            editExProSelect.className = "editExProSelect";
            bpRow2.appendChild(editExProSelect);

            FindExistingProducts(editExProSelect);


            //row3 - name

            var bpRow3 = document.createElement("div");
            bpRow3.className = "bpRow3";
            bPInfo.appendChild(bpRow3);

            var bpNameLab = document.createElement("label");
            bpNameLab.className = "bpNameLab";
            bpNameLab.innerHTML = "New name: ";
            bpRow3.appendChild(bpNameLab);

            var editBpNameInsert = document.createElement("input");
            editBpNameInsert.className = "editBpNameInsert";
            editBpNameInsert.value = e.name;//Auto set to old name
            bpRow3.appendChild(editBpNameInsert);


            //row4 - description

            var bpRow4 = document.createElement("div");
            bpRow4.className = "bpRow4";
            bPInfo.appendChild(bpRow4);

            var bpDescLab = document.createElement("label");
            bpDescLab.className = "bpDescLab";
            bpDescLab.innerHTML = "New description: ";
            bpRow4.appendChild(bpDescLab);

            var editBpDescInsert = document.createElement("input");
            editBpDescInsert.className = "editBpDescInsert";
            editBpDescInsert.value = e.description;//Auto set to old description
            bpRow4.appendChild(editBpDescInsert);

            //row5 - quantity

            var bpRow5 = document.createElement("div");
            bpRow5.className = "bpRow5";
            bPInfo.appendChild(bpRow5);

            var bpQuanLab = document.createElement("label");
            bpQuanLab.className = "bpQuanLab";
            bpQuanLab.innerHTML = "New quantity: ";
            bpRow5.appendChild(bpQuanLab);

            var editBpQuanInsert = document.createElement("input");
            editBpQuanInsert.className = "editBpQuanInsert";
            editBpQuanInsert.type = 'number';
            editBpQuanInsert.min = 1;
            editBpQuanInsert.value = e.quantity;//Auto set to old quantity
            bpRow5.appendChild(editBpQuanInsert);

            //row6 - weight

            var bpRow6 = document.createElement("div");
            bpRow6.className = "bpRow6";
            bPInfo.appendChild(bpRow6);

            var bpWeightLab = document.createElement("label");
            bpWeightLab.className = "bpWeightLab";
            bpWeightLab.innerHTML = "New weight(g): ";
            bpRow6.appendChild(bpWeightLab);

            var editBpWeightInsert = document.createElement("input");
            editBpWeightInsert.className = "editBpWeightInsert";
            editBpWeightInsert.type = 'number';
            editBpWeightInsert.min = 1;
            editBpWeightInsert.value = e.weight;//Auto set to old weight
            bpRow6.appendChild(editBpWeightInsert);

            //row7 - bought date

            var bpRow7 = document.createElement("div");
            bpRow7.className = "bpRow7";
            bPInfo.appendChild(bpRow7);

            var bpBDateLab = document.createElement("label");
            bpBDateLab.className = "bpBDateLab";
            bpBDateLab.innerHTML = "New day of purchase: ";
            bpRow7.appendChild(bpBDateLab);

            var editFormatedPD = new Date(e.purchaseDate);

            var editBpBDateInsert = document.createElement("input");
            editBpBDateInsert.className = "editBpBDateInsert";
            editBpBDateInsert.type = 'date';
            editBpBDateInsert.value = editFormatedPD.toISOString().split('T')[0];//Auto set to old bought date
            bpRow7.appendChild(editBpBDateInsert);

            //row8 - Expiration date

            var bpRow8 = document.createElement("div");
            bpRow8.className = "bpRow8";
            bPInfo.appendChild(bpRow8);

            var bpExDateLab = document.createElement("label");
            bpExDateLab.className = "bpExDateLab";
            bpExDateLab.innerHTML = "New expiration date: ";
            bpRow8.appendChild(bpExDateLab);

            var editFormatedED = new Date(e.expirationDate);

            var editBpExDateInsert = document.createElement("input");
            editBpExDateInsert.className = "editBpExDateInsert";
            editBpExDateInsert.type = 'date';
            editBpExDateInsert.value = editFormatedED.toISOString().split('T')[0];//Auto set to old Expiration date
            bpRow8.appendChild(editBpExDateInsert);

            //row9 - Save cancel

            var bpRow9 = document.createElement("div");
            bpRow9.className = "bpRow9";
            bPInfo.appendChild(bpRow9);

            var editSaveBpBtn = document.createElement("button");//Save bought product
            editSaveBpBtn.className = "editSaveBpBtn";
            editSaveBpBtn.innerHTML = "Save edited product";
            bpRow9.appendChild(editSaveBpBtn);

            var cancelBpBtn = document.createElement("button");//Cancel
            cancelBpBtn.className = "cancelBpBtn";
            cancelBpBtn.innerHTML = "Cancel";
            bpRow9.appendChild(cancelBpBtn);

            cancelBpBtn.addEventListener("click", (ev) => {
                bPInfo.innerHTML = '';
                addBPBtn.style.display = "block";
                addRecipeBtn.style.display = "block";
            });


            editSaveBpBtn.addEventListener("click", (ev) => {
                SaveEditedBougthProduct(e);
            });

            async function FindExistingProducts(editExProSelect) {
                editExProSelect.innerHTML = '';
                listOfExistingProducts = [];//Without this, the list will just keep growing by the number of existing products
                var TypeSelectValue = parseInt(EditProTypeSelect.value);


                var response = await fetch(`http://localhost:5063/ProductType/ReturnAllProductsOfOneType/${TypeSelectValue + 1}`);
                var data = await response.json();

                data.forEach((p, index) => {
                    const option = document.createElement("option");
                    option.value = index;
                    option.text = p.name;
                    editExProSelect.appendChild(option);
                    listOfExistingProducts.push(p);
                });

                var optionToSelect = Array.from(editExProSelect.options).find(option => option.text === e.picture);
                if (optionToSelect)
                    optionToSelect.selected = true;
            }

            async function SaveEditedBougthProduct(e) {
                //var val = parseInt(this.container.querySelector(".exProSelect").value);

                var val = parseInt(container.querySelector(".editExProSelect").value);
                var type = parseInt(container.querySelector(".EditProTypeSelect").value) + 1;

                var picture = listOfExistingProducts[val].picture;

                var name = container.querySelector(".editBpNameInsert").value;
                var description = container.querySelector(".editBpDescInsert").value;
                if (description == "") {
                    description = "No description";
                }
                var quantity = parseInt(container.querySelector(".editBpQuanInsert").value);
                var weight = parseInt(container.querySelector(".editBpWeightInsert").value);
                var boughtDate = container.querySelector(".editBpBDateInsert").value;
                var expirationDate = container.querySelector(".editBpExDateInsert").value;

                var ach = new Achievement();
                ach.drawAchievement(6);


                var response = await fetch(`http://localhost:5063/BoughtProduct/ManuallyEditBoughtProduct/${e.id}/${type}/${name}/${description}/${picture}/${quantity}/${weight}/${boughtDate}T17:32:28Z/${expirationDate}T17:32:28Z`, {
                    method: "PUT"
                });
                UpdateBoughtProducts();
                var data = await response.json();


            }
        }



    }
}