export class Recipe{
    constructor(id, name, descripton, picture){
        this.id = id;
        this.name = name;
        this.descripton = descripton;
        this.picture = picture;

        this.container = null;
        this.listOfIngredients = [];
    }

    AddToListOfIngredients(ing){
        this.listOfIngredients.push(ing);
    }
}