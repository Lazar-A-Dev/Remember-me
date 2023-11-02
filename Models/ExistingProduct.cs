using System.ComponentModel.DataAnnotations;

namespace Models{
    public class ExistingProduct{
        [Key]
        public int ID{get; set;}
        public string? Name{get; set;}
        public string? Description{get; set;}
        public string? Picture{get; set;}
        
        
    }
}