using System.ComponentModel.DataAnnotations;

namespace Models{
    public class UserFeedback{
        [Key]
        public int ID{get; set;}
        public string? Type{get; set;}//Technical problems, bugs or ideas
        public string? Description{get; set;}
        
        
    }
}