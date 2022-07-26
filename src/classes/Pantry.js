class Pantry {
    constructor( pantryData, ingredientsData, recipeData ) {
      this.userPantry = pantryData.userPantry;
      this.ingredienstList = ingredientsData.ingredientsList;
      this.recipeIngredients = recipeData.recipeIngredients;

    };
  
    
    
  }
  
  export default Pantry;


// Determine whether a user’s pantry has enough ingredients to cook a given recipe.

// Determine the amount of missing ingredients still needed to cook a given recipe, 
// based on what’s in the user’s pantry.