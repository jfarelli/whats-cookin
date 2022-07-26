import { expect } from 'chai'; 
import Pantry from '../src/classes/Pantry';
import usersData from '../src/sample-data/user-sample-data';
import recipeData from '../src/sample-data/recipe-sample-data';
import ingredientsData from '../src/sample-data/ingredient-sample-data';

describe('Pantry', ( ) => {
    let pantry;

    beforeEach( ( ) => {
        
        pantry = new Pantry( usersData, ingredientsData, recipeData );
    } );
    console.log(pantry)
} );