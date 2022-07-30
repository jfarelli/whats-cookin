import Recipe from '../classes/Recipe';

class Pantry {
    constructor( pantryData, ingredientData ) {
        this.currentUsersPantry = pantryData.pantry;
        this.ingredientsList = ingredientData;  
    };

getMissingIngredients( recipe, ingredientData ) {
    let ingredientsNeeded = [ ];
    let newRecipe = new Recipe( recipe, ingredientData )
        recipe.ingredients.forEach( recipeIngredient => {
            let foundIngredients = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id )
            if( !foundIngredients ) {
                ingredientsNeeded.push
                ( 
                    { 
                        name: recipeIngredient.name = newRecipe.getIngredientsWithNames( [recipeIngredient], ingredientData )[0],
                        id: recipeIngredient.id,
                        quantity: recipeIngredient.quantity
                    }
                )
            } 
            
        } )
        return ingredientsNeeded
}


getIngredientAmountNeeded( recipe, ingredientData ) {
    let ingredientAmountNeeded = [ ];
    let newRecipe = new Recipe( recipe, ingredientData )
    recipe.ingredients.forEach( recipeIngredient => {
        let foundIngredientAmountDifference = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id && pantryItem.amount < recipeIngredient.quantity.amount )
        if( foundIngredientAmountDifference ) {
            ingredientAmountNeeded.push
            ( 
                { 
                    name: recipeIngredient.name = newRecipe.getIngredientsWithNames( [recipeIngredient], ingredientData )[0],
                    id: recipeIngredient.id,
                    quantity: ( recipeIngredient.quantity.amount - foundIngredientAmountDifference.amount )
                }
            )
        } 
    }) 
    return ingredientAmountNeeded
}


getPantryItemsWithNames( recipe, ingredientList ) {
    return recipe.ingredients.map( recipeIngredient => {
        recipeIngredient.name = ingredientList.filter( ingredient => ingredient.id === recipeIngredient.id )[0].name
        return recipeIngredient
        } )
    };      
};
  
  export default Pantry;