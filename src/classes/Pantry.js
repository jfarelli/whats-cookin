import Recipe from '../classes/Recipe';

class Pantry {
    constructor( pantryData, ingredientData ) {
        this.currentUsersPantry = pantryData.pantry;
        this.ingredientsList = ingredientData;
        this.ingredientsNeeded = [ ];  
    };

    getMissingIngredients( recipe, ingredientData ) {
        // let ingredientsNeeded = [ ];
        let newRecipe = new Recipe( recipe, ingredientData )
            recipe.ingredients.forEach( recipeIngredient => {
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

    getIngredientAmountNeeded( recipe, ingredientData ) {
        // let ingredientAmountNeeded = [ ];
        let newRecipe = new Recipe( recipe, ingredientData )
        recipe.ingredients.forEach( recipeIngredient => {
            let foundIngredientAmountDifference = this.currentUsersPantry.find( pantryItem => pantryItem.ingredient === recipeIngredient.id && pantryItem.amount < recipeIngredient.quantity.amount )
            if( foundIngredientAmountDifference ) {
                this.ingredientAmountNeeded.push
                ( 
                    { 
                        name: recipeIngredient.name = newRecipe.getIngredientsWithNames( [recipeIngredient], ingredientData )[0],
                        id: recipeIngredient.id,
                        quantity: ( recipeIngredient.quantity.amount - foundIngredientAmountDifference.amount )
                    }
                )
            } 
        }) 
        return this.ingredientAmountNeeded
    }

    getPantryItemsWithNames( pantryItem , ingredientList ){
        return pantryItem.map( pantryIngredient => { 
            pantryIngredient.name = ingredientList.find( ing =>  pantryIngredient.ingredient === ing.id)
            return pantryIngredient.name
        });     
    };
   
};
  
  export default Pantry;
