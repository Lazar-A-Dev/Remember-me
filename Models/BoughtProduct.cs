using System.ComponentModel.DataAnnotations;

namespace Models{
    public class BoughtProduct{
        [Key]
        public int ID{get; set;}
        public int? Type{get; set;}//Existing product id
        public string? Name{get; set;}
        public string? Description{get; set;}//optional
        public string? Picture{get; set;}//optional
        public int? Quantity{get; set;}//optional
        public int? Weight{get; set;}//optional
        public DateTime PurchaseDate{get; set;}
        public DateTime ExpirationDate{get; set;}
    }
}