export class Ingredient{
    constructor(id, productId, descripton, quantity){
        this.id = id;
        this.productId = productId;
        this.descripton = descripton;
        this.quantity = quantity;

        this.container = null;
    }
}