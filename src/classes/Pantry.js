import Recipe from '../classes/Recipe';

class Pantry {
    constructor( pantryData ) {
        this.currentUsersPantry = pantryData.pantry;
        this.ingredientsNeeded = [ ];      
    };



   // Determine whether a user’s pantry has enough ingredients to cook a given recipe.
getNeededIngredients( recipe ) {
        recipe.recipeIngredients.forEach( recipeIngredient => {
            let foundIngredients = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id )
            if( !foundIngredients ) {
                this.ingredientsNeeded.push( recipeIngredient )
            } 
        } )
        return this.ingredientsNeeded
}

// Determine the AMOUNT of missing ingredients still needed to cook a given recipe, 
// based on what’s in the user’s pantry.

    // else if( foundIngredients.amount < recipeIngredient.quantity.amount ) {
            //     this.ingredientsNeeded.push( { name: recipeIngredient.name, id: recipeIngredient.id, amount: recipeIngredient.quantity.amount - foundIngredients.amount } )
            //     console.log('THIS.INGREDIENTSNEEDED: ', this.ingredientsNeeded)
            // }

// checkUserStock(recipe, ingredientsData) {
//     let missingIngredients = recipe.singleRecipe.ingredients;

//     recipe.singleRecipe.ingredients.forEach((recipeIngredient, index) => {
//         this.pantry.forEach((pantryIngredient) => {
//         if (recipeIngredient.id === pantryIngredient.ingredient && pantryIngredient.amount >= recipeIngredient.quantity.amount) {
//             missingIngredients[index].quantity.amount = 0;
//         } else if (recipeIngredient.id === pantryIngredient.ingredient && pantryIngredient.amount < recipeIngredient.quantity.amount ) {
//             missingIngredients[index].quantity.amount = recipeIngredient.quantity.amount - pantryIngredient.amount;
//         }
//         });
//     });
//     return this.finishStockCheck(missingIngredients, ingredientsData);
//     }

  }
  
  export default Pantry;


