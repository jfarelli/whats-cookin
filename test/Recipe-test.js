import { expect } from 'chai'; 
import Recipe from '../src/classes/Recipe'; 
import recipeData from '../src/sample-data/recipe-sample-data';
import ingredientData from '../src/sample-data/ingredient-sample-data';


describe('Recipe', ( ) => {
    let recipe1;
    let recipe2;

    beforeEach( ( ) => {
 
    recipe1 = new Recipe( recipeData[0], ingredientData );
    recipe2 = new Recipe( recipeData[1], ingredientData );

  } );

  it( 'should be a function', ( ) => {
    expect( Recipe ).to.be.a( 'function' );
  } );

  it( 'should be an instance of Recipe', ( ) => {
    expect( recipe1 ).to.be.an.instanceOf( Recipe );
    
    expect( recipe2 ).to.be.an.instanceOf( Recipe );
  } );

  it('should take in an id', ( ) => {
    expect( recipe1.id ).to.be.a('number');
    expect( recipe1.id ).to.equal( recipeData[0].id );

    expect( recipe2.id ).to.be.a('number');
    expect( recipe2.id ).to.equal( recipeData[1].id );
  } );

  it('should have an image', ( ) => {
    expect( recipe1.image ).to.equal( recipeData[0].image );

    expect( recipe2.image ).to.equal( recipeData[1].image );
  } );

  it( 'should contain recipe ingredients', ( ) => {
    expect( recipe1.ingredients ).to.be.a( "array" );
    expect( recipe1.ingredients ).to.deep.equal( recipeData[0].ingredients );

    expect( recipe2.ingredients ).to.be.a( "array" );
    expect( recipe2.ingredients ).to.deep.equal( recipeData[1].ingredients );
  } );

  it( 'should have recipe instructions', ( ) => {
    expect( recipe1.instructions ).to.be.a( "array" );
    expect( recipe1.instructions ).to.deep.equal( recipeData[0].instructions );

    expect( recipe2.instructions ).to.be.a( "array" );
    expect( recipe2.instructions ).to.deep.equal( recipeData[1].instructions );
  } );

  it( 'should have a recipe name', () => {
    expect( recipe1.name ).to.be.a( "string" );
    expect( recipe1.name ).to.equal( recipeData[0].name );

    expect( recipe2.name ).to.be.a( "string" );
    expect( recipe2.name ).to.equal( recipeData[1].name );
  } );

  it( 'should have recipe tags', ( ) => {
    expect( recipe1.tags ).to.be.a( "array" );
    expect( recipe1.tags ).to.deep.equal( recipeData[0].tags );

    expect( recipe2.tags ).to.be.a( "array" );
    expect( recipe2.tags ).to.deep.equal( recipeData[1].tags );
  } );

  it(' should get ingredients names from recipes', ( ) => {
    expect( recipe1.getIngredientsWithNames( recipeData[0].ingredients , ingredientData ) ).to.be.a( "array" );
    expect( recipe1.getIngredientsWithNames( recipeData[0].ingredients , ingredientData ) ).to.deep.equal
    ( 
      [
        'wheat flour',
        'bicarbonate of soda',
        'eggs',
        'sucrose',
        'instant vanilla pudding',
        'brown sugar',
        'salt',
        'fine sea salt'
      ] 
    );
    
    expect( recipe2.getIngredientsWithNames( recipeData[1].ingredients , ingredientData ) ).to.be.a( "array" );
    expect( recipe2.getIngredientsWithNames( recipeData[1].ingredients , ingredientData ) ).to.deep.equal
    ( 
      [
        "apple cider",
        "apple",
        "corn starch",
        "dijon style mustard",
        "whole garlic clove",
        "whole grain dijon mustard",
        "maple",
        "miso",
        "pork chop"
      ] 
    );
  } );

  it( 'should get cost of ingredients', ( ) => {
    expect( recipe1.getCostOfIngredients( recipeData[0].ingredients , ingredientData ) ).to.be.a( "number" );
    expect( recipe1.getCostOfIngredients( recipeData[0].ingredients , ingredientData ) ).to.equal( 16498.5 );

    expect( recipe2.getCostOfIngredients( recipeData[1].ingredients , ingredientData ) ).to.be.a( "number" );
    expect( recipe2.getCostOfIngredients( recipeData[1].ingredients , ingredientData ) ).to.equal( 24139.25 );
  } );
  
  it( 'should return directions and instructions', ( ) => {
    expect( recipe1.returnInstructions( recipeData[0].ingredients , ingredientData ) ).to.be.a( "array" );
    expect( recipe1.returnInstructions( recipeData[0].ingredients , ingredientData ) ).to.deep.equal( recipeData[0].instructions );

    expect( recipe2.returnInstructions( recipeData[1].ingredients , ingredientData ) ).to.be.a( "array" );
    expect( recipe2.returnInstructions( recipeData[1].ingredients , ingredientData ) ).to.deep.equal( recipeData[1].instructions );
  } );

} );

