using System.ComponentModel.DataAnnotations;

namespace Models{
    public class ProductType{
        [Key]
        public int ID{get; set;}
        public string? Name{get; set;}
        public string? Description{get; set;}
        public List<ExistingProduct>? ExistingProducts{get; set;}

        //You have to build this manually
    }
}