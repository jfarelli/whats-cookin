import Recipe from '../classes/Recipe';

class Pantry {
    constructor( pantryData, ingredientData ) {
        // console.log('PANTRYDATA: ', pantryData.pantry)
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

getPantryItemsWithNames( pantryItem , ingredientList ){
    console.log('PANTRYITEM', pantryItem)
    // console.log('INGREDIENTLIST', ingredientList)
    let stuff = pantryItem.map( pantryIngredient => { 
        // console.log('COMPARE: ', pantryIngredient.name = ingredientList.find( ing =>  pantryIngredient.ingredient === ing.id))
        pantryIngredient.name = ingredientList.find( ing =>  pantryIngredient.ingredient === ing.id)
        return pantryIngredient.name
    });     
    // console.log('STUFF: ', stuff)
    return stuff  
    // console.log('CURR USERS PANTRY: ', this.currentUsersPantry)
};

// getPantryItemsWithNames( userPantry, ingredientList ) {
//     return userPantry.reduce( ( acc, userIngredient ) => {
//         console.log('USERINGREDIENT BEFORE: ', userIngredient)
//         ingredientList.forEach( ingredient => {
//             if( !acc[ ingredient.name ] && ingredient.id === userIngredient.ingredient ) acc[ ingredient.name ]
//             acc[ userIngredient.name ] = ingredient.name
//         })
//         // console.log('NEWARRAY: ', newArray)
//         // return userIngredient
//         console.log('USERINGREDIENT AFTER: ', userIngredient)
//         return acc
//         }, { } )
//     };      
};
  
  export default Pantry;

//   if( ingredient.id === userIngredient.ingredient ) {
//     userIngredient.name = ingredient.name
// }
// // console.log('USERINGREDIENT AFTER: ', userIngredient)
// newArray.push( userIngredient )