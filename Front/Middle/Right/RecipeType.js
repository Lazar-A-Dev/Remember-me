export class RecipeType{
    constructor(id, name, descripton){
        this.id = id;
        this.name = name;
        this.descripton = descripton;

        this.container = null;
        this.listOfRecipes = [];
    }
}