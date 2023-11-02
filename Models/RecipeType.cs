using System.ComponentModel.DataAnnotations;

namespace Models{
    public class RecipeType{
        [Key]
        public int ID{get; set;}
        public string? Name{get; set;}
        public string? Description{get; set;}//optional
        public List<Recipe>? Recipes{get; set;}

        //You have to build this manually
    }
}