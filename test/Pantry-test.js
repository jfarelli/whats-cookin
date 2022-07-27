mport { expect } from 'chai'; 
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

        recipe1 = new Recipe( recipeData[0], ingredientsData )
        // console.log('ingredientsData: ', ingredientsData)
        pantry1 = new Pantry( user1, recipe1 );
        
        } );
        
    it( 'should be a function', ( ) => {
        expect( Pantry ).to.be.a( 'function' );
    } );
    
    it( 'should be an instance of Pantry', ( ) => {
        expect( pantry1 ).to.be.an.instanceOf( Pantry )
    } );
    
    it( 'should take in a user\'s PANTRY ingredients', ( ) => {
        expect( pantry1.currentUsersPantry ).to.deep.equal( usersData[0].pantry )
    } );

    it( 'should get missing ingredients needed for recipe', ( ) => {
        expect( pantry1.getNeededIngredients( recipe1, ingredientsData ) ).to.deep.equal
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
        expect( pantry1.getIngredientAmountNeeded( recipe1, ingredientsData ) ).to.deep.equal( [ { name: 'instant vanilla pudding', id: 19206, quantity: 1 } ] )
    } );
} );