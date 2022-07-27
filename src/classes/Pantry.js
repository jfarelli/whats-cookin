import Recipe from '../classes/Recipe';

class Pantry {
    constructor( pantryData, ingredientData ) {
        this.currentUsersPantry = pantryData.pantry;
        this.ingredientsList = ingredientData;
        // console.log(ingredientData)
        this.ingredientsNeeded = [ ];      
    };



   // Determine whether a user's pantry has enough ingredients to cook a given recipe.
getNeededIngredients( recipe, ingredientData ) {
    let newRecipe = new Recipe( recipe, ingredientData )
        recipe.recipeIngredients.forEach( recipeIngredient => {
            let foundIngredients = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id )
            if( !foundIngredients ) {
                this.ingredientsNeeded.push
                ( 
                    { 
                        name: recipeIngredient.name = newRecipe.getIngredientsWithNames( [recipeIngredient], ingredientData )[0],
                        id: recipeIngredient.id,
                        quantity: recipeIngredient.quantity
                    }
                )
            } 
        } )
        return this.ingredientsNeeded
}

// Determine the AMOUNT of missing ingredients still needed to cook a given recipe, 
// based on what's in the user's pantry.

getIngredientAmountNeeded( recipe, ingredientData ) {
    let newRecipe = new Recipe( recipe, ingredientData )
    recipe.recipeIngredients.forEach( recipeIngredient => {
        let foundIngredients = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id )
        if( foundIngredients && recipeIngredient.quantity.amount >= foundIngredients.amount ) {
            this.ingredientsNeeded.push
                ( 
                    { 
                        name: recipeIngredient.name = newRecipe.getIngredientsWithNames( [recipeIngredient], ingredientData )[0],
                        id: recipeIngredient.id,
                        quantity: recipeIngredient.quantity.amount - foundIngredients.amount
                    }
                )
        }
    } )
    console.log(this.ingredientsNeeded)
    return this.ingredientsNeeded
}


    
}
  
  export default Pantry;