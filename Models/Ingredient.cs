using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Ingredient{
        [Key]
        public int ID{get; set;}
        public int? Type{get; set;} //existing product id
        public string? Description{get; set;}//optional
        public int? Quantity{get; set;}//optional
        public int? Weight{get; set;}//optional
    }
}