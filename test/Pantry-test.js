import { expect } from 'chai'; 
import Pantry from '../src/classes/Pantry';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

import usersData from '../src/sample-data/user-sample-data';
import recipeData from '../src/sample-data/recipe-sample-data';
import ingredientsData from '../src/sample-data/ingredient-sample-data';

describe('Pantry', ( ) => {

    let user1;
    let pantry1;
    let recipe1;

    beforeEach( ( ) => {
        
        user1 = new User( usersData[0] )
        // console.log('USER1: ', user1)

        recipe1 = new Recipe( recipeData[0], ingredientsData )

        pantry1 = new Pantry( user1, ingredientsData );
        
        } );
        
    it( 'should be a function', ( ) => {
        expect( Pantry ).to.be.a( 'function' );
    } );
    
    it( 'should be an instance of Pantry', ( ) => {
        expect( pantry1 ).to.be.an.instanceOf( Pantry )
    } );
    
    it( 'should take in a user\'s PANTRY ingredients', ( ) => {
        expect( pantry1.currentUsersPantry.pantry ).to.deep.equal( usersData.pantry )
    } );

    it( 'should get MISSING ingredients needed for recipe', ( ) => {
        expect( pantry1.getMissingIngredients( recipeData[0], ingredientsData ) ).to.deep.equal
        ( 
            [
                {
                  name: 'brown sugar',
                  id: 19334,
                  quantity: { amount: 0.5, unit: 'c' }
                },
                {
                  name: 'fine sea salt',
                  id: 1012047,
                  quantity: { amount: 24, unit: 'servings' }
                }
            ] 
        )
    } );

    it( 'should get missing AMOUNT of ingredients needed for recipe', ( ) => {
        expect( pantry1.getIngredientAmountNeeded( recipeData[0], ingredientsData ) ).to.deep.equal( [ { name: 'instant vanilla pudding', id: 19206, quantity: 1 } ] )
    } );

    it( 'should get names of user\'s pantry', ( ) => {
        expect( pantry1.getPantryItemsWithNames( recipeData[0], ingredientsData ) ).to.deep.equal
        ( 
            [ 
                {
                    "id": 20081,
                    "name": "wheat flour",
                    "quantity": {
                      "amount": 1.5,
                      "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "name": "bicarbonate of soda",
                    "quantity": {
                      "amount": 0.5,
                      "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "name": "eggs",
                    "quantity": {
                      "amount": 1,
                      "unit": "large"
                    }
                },
                {
                    "id": 19335,
                    "name": "sucrose",
                    "quantity": {
                      "amount": 0.5,
                      "unit": "c"
                    }
                },
                {
                    "id": 19206,
                    "name": "instant vanilla pudding",
                    "quantity": {
                      "amount": 3,
                      "unit": "Tbsp"
                    }
                },
                {
                    "id": 19334,
                    "name": "brown sugar",
                    "quantity": {
                      "amount": 0.5,
                      "unit": "c"
                    }
                },
                {
                    "id": 2047,
                    "name": "salt",
                    "quantity": {
                      "amount": 0.5,
                      "unit": "tsp"
                    }
                },
                {
                    "id": 1012047,
                    "name": "fine sea salt",
                    "quantity": {
                      "amount": 24,
                      "unit": "servings"
                    }
                }
            ] 
        )

        expect( pantry1.getPantryItemsWithNames( recipeData[1], ingredientsData ) ).to.deep.equal
        ( 
            [ 
                {
                    "id": 1009016,
                    "name": "apple cider",
                    "quantity": {
                      "amount": 1.5,
                      "unit": "cups"
                    }
                },
                {
                    "id": 9003,
                    "name": "apple",
                    "quantity": {
                      "amount": 2,
                      "unit": ""
                    }
                },
                {
                    "id": 20027,
                    "name": "corn starch",
                    "quantity": {
                      "amount": 1,
                      "unit": "tablespoon"
                    }
                },
                {
                    "id": 1002046,
                    "name": "dijon style mustard",
                    "quantity": {
                      "amount": 1,
                      "unit": "tablespoon"
                    }
                },
                {
                    "id": 11215,
                    "name": "whole garlic clove",
                    "quantity": {
                      "amount": 1,
                      "unit": "clove"
                    }
                },
                {
                    "id": 1012046,
                    "name": "whole grain dijon mustard",
                    "quantity": {
                      "amount": 1,
                      "unit": "tablespoon"
                    }
                },
                {
                    "id": 19911,
                    "name": "maple",
                    "quantity": {
                      "amount": 0.25,
                      "unit": "cup"
                    }
                },
                {
                    "id": 16112,
                    "name": "miso",
                    "quantity": {
                      "amount": 1,
                      "unit": "tablespoon"
                    }
                },
                {
                    "id": 10010062,
                    "name": "pork chop",
                    "quantity": {
                      "amount": 24,
                      "unit": "ounce"
                    }
                }
            ] 
        )
    } );
} );