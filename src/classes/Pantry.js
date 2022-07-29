import Recipe from '../classes/Recipe';

class Pantry {
    constructor( pantryData, ingredientData ) {
        this.currentUsersPantry = pantryData.pantry;
        this.ingredientsList = ingredientData;
        // after running the naming function - this.ingredientsList is returning as undefined, but the pantry is assigning names.  
        // i don't know if that impacts us further downstream, but help would be appreciated understanding this one.
        // i could see it being a result of the map() but not entirely sure 
        this.ingredientsNeeded = [ ];      
    };

   // Determine whether a user's pantry has enough ingredients to cook a given recipe.
getNeededIngredients( recipe, ingredientData ) {
    // console.log("pantry class recipe: ", recipe)
    let newRecipe = new Recipe( recipe, ingredientData )
        recipe.ingredients.forEach( recipeIngredient => {
            let foundIngredients = this.currentUsersPantry.find( pantryItem => {
                // console.log(pantryItem)
                pantryItem.ingredient === recipeIngredient.id })
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
    recipe.ingredients.forEach( recipeIngredient => {
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
    }) 
}

getPantryItemsWithNames( ingredientList ) {
    let namedPantryIngredient = this.currentUsersPantry.map( ingredient => { 
        ingredient.name = ingredientList.find( ing => ing.id == ingredient.ingredient ).name;
        return ingredient.name;
        });
        return namedPantryIngredient
    };      
};
  
  export default Pantry;