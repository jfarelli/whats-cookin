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

getIngredientAmountNeeded( recipe ) {
    // console.log(recipe)
    // let newRecipe = new Recipe( [recipe], [this.currentUsersPantry.pantry] )
    recipe.recipeIngredients.forEach( recipeIngredient => {
        let foundIngredients = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id )
        if( foundIngredients && recipeIngredient.quantity.amount >= foundIngredients.amount ) {
            this.ingredientsNeeded.push
                ( 
                    { 
                        // name: newRecipe.getIngredientsWithNames( recipe, this.currentUsersPantry.panty ),
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


