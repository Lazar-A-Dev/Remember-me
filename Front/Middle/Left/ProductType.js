export class ProductType{
    constructor(id, name, descripton, picture){
        this.id = id;
        this.name = name;
        this.descripton = descripton;

        this.container = null;
        this.listOfExistingProducts = [];
    }

    AddTolistOfExistingProducts(pro){
        this.listOfExistingProducts.push(pro);
    }
}