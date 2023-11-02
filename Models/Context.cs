using Microsoft.EntityFrameworkCore;

namespace  Models{
    public class Context : DbContext{

        public DbSet<BoughtProduct> BoughtProducts{get; set;}
        public DbSet<ExistingProduct> ExistingProducts{get; set;}
        public DbSet<ProductType> ProductTypes{get; set;}
        public DbSet<Ingredient> Ingredients{get; set;}
        public DbSet<Recipe> Recipes{get; set;}
        public DbSet<RecipeType> RecipeTypes{get; set;}
        public DbSet<Achievement> Achievements{get; set;}
         public DbSet<UserFeedback> UserFeedbacks{get; set;}
        public Context(DbContextOptions options) : base(options){

        }
    }
}