import { expect } from 'chai'; 
import Ingredient from '../src/classes/Ingredient';
import Pantry from '../src/classes/Pantry';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';
import usersData from '../src/sample-data/user-sample-data';
import recipeData from '../src/sample-data/recipe-sample-data';
import ingredientsData from '../src/sample-data/ingredient-sample-data';


describe('Pantry', ( ) => {

    let user1;
    let recipe1;
    let pantry1;
    let ingredients1

    beforeEach( ( ) => {
        user1 = new User( usersData[0] )
        ingredients1 = new Ingredient( ingredientsData )
        recipe1 = new Recipe( recipeData[0] )
        pantry1 = new Pantry( user1, ingredients1, recipe1 );
            
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
    
    it( 'should take in a list of INGREDIENTS', ( ) => {
        expect( pantry1.ingredientsList.id ).to.equal( ingredientsData )
    } );
    
    it( 'should take in a list of RECIPE ingredients', ( ) => {
        console.log('RECIPEDATA[0]: ', recipeData[0].ingredients)
        expect( pantry1.recipeIngredients ).to.equal( recipeData[0].ingredients )
    } );
} );