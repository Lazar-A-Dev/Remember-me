export class BoughtProduct{
    constructor(id, type, name, descripton, picture, quantity, weight, boughtDate, expirationDate){
        this.id = id;
        this.type = type;
        this.name = name;
        this.descripton = descripton;
        this.picture = picture;
        this.quantity = quantity;
        this.weight = weight;
        this.boughtDate = boughtDate;
        this.expirationDate = expirationDate;

        this.container = null;
    }
}