using System.ComponentModel.DataAnnotations;

namespace Models{
    public class Achievement{
        [Key]
        public int ID{get; set;}
        public string? Name{get; set;}
        public string? Description{get; set;}
        public bool Used{get; set;}
        public string? Picture{get; set;}
        
        
    }
}