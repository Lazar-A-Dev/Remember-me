using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Recipe{
        [Key]
        public int ID{get; set;}
        public string? Name{get; set;}
        public string? Description{get; set;}//optional
        public string? Picture{get; set;}//optional
        public List<Ingredient>? Ingredients{get; set;}
    }
}