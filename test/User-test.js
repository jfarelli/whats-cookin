import { expect } from 'chai'; 
import User from '../src/classes/User'; 
import usersData from '../src/sample-data/user-sample-data';
import recipeData from '../src/sample-data/recipe-sample-data';

describe('User', ( ) => {
  let user1;
  let user2;
  beforeEach( ( ) => {
        
    user1 = new User( usersData[0] );
    user2 = new User( usersData[1] );

  } );

  it( 'should be a function', ( ) => {
    expect( User ).to.be.a('function');
  } );

  it( 'should be an instance of User', ( ) => {
    expect( user1 ).to.be.an.instanceOf( User );

    expect( user2 ).to.be.an.instanceOf( User );
  } );

  it( 'should take in a user name', ( ) => {
    expect( user1.name ).to.be.a( "string" );
    expect( user1.name ).to.equal( usersData[0].name );

    expect( user2.name ).to.be.a( "string" );
    expect( user2.name ).to.equal( usersData[1].name );
  } );

  it( 'should take in an user id', ( ) => {
    expect( user1.id ).to.be.a( "number" );
    expect( user1.id ).to.equal( usersData[0].id );

    expect( user2.id ).to.be.a( "number" );
    expect( user2.id ).to.equal( usersData[1].id );
  } );

  it( 'should take in a user pantry', ( ) => {
    expect( user1.pantry ).to.be.a( "array" );
    expect( user1.pantry ).to.deep.equal( usersData[0].pantry );

    expect( user2.pantry ).to.be.a( "array" );
    expect( user2.pantry ).to.deep.equal( usersData[1].pantry );
  } ); 

  it( 'should be able to take in recipesToCook', ( ) => {
    expect( user1.recipesToCook ).to.be.a( "array" );
    expect( user1.recipesToCook ).to.deep.equal( [ ] );

    expect( user2.recipesToCook ).to.be.a( "array" );
    expect( user2.recipesToCook ).to.deep.equal( [ ] );
  } ); 

  it( 'should be able to save a recipe in recipesToCook array', ( ) => {
    user1.addRecipeToRecipesToCook( recipeData[0] );
    expect( user1.recipesToCook.length ).to.deep.equal( 1 );
    expect( user1.recipesToCook ).to.be.a( "array" );
    expect( user1.recipesToCook ).to.deep.equal( [ recipeData[0] ] );

    user2.addRecipeToRecipesToCook( recipeData[1] );
    expect( user2.recipesToCook.length ).to.deep.equal( 1 );
    expect( user2.recipesToCook ).to.be.a( "array" );
    expect( user2.recipesToCook ).to.deep.equal( [ recipeData[1] ] );
  } );

  it( 'should remove a saved recipes from recipesToCook array', ( ) => {
    user1.addRecipeToRecipesToCook( recipeData[0] );
    user1.removeRecipeFromRecipesToCook( recipeData[0].id );
    expect( user1.recipesToCook ).to.be.a( "array" );
    expect( user1.recipesToCook ).to.deep.equal( [  ] );

    user2.addRecipeToRecipesToCook( recipeData[1] );
    user2.removeRecipeFromRecipesToCook( recipeData[1].id );
    expect( user2.recipesToCook ).to.be.a( "array" );
    expect( user2.recipesToCook ).to.deep.equal( [  ] );
  } );

  it( 'should filter recipes by tag', ( ) => {
    user1.addRecipeToRecipesToCook( recipeData[0] );
    user1.filterRecipesToCookByTag( 'snack' );
    user1.filterRecipesToCookByTag( 'antipasti' );
    expect( user1.recipesToCook ).to.be.a( "array" );
    expect( user1.recipesToCook ).to.deep.equal(  [recipeData[0]]  );

    user2.addRecipeToRecipesToCook( recipeData[1] );
    user2.filterRecipesToCookByTag( 'snack' );
    user2.filterRecipesToCookByTag( 'antipasti' );
    expect( user2.recipesToCook ).to.be.a( "array" );
    expect( user2.recipesToCook ).to.deep.equal(  [recipeData[1]]  );
  } );

  it( 'should filter recipes by name', ( ) => {
    user1.addRecipeToRecipesToCook( recipeData[0] );
    user1.filterRecipesToCookByTag( 'Chocolate' );
    user1.filterRecipesToCookByTag( 'Loaded Chocolate Chip Pudding Cookie Cups' );
    expect( user1.recipesToCook ).to.be.a( "array" );
    expect( user1.recipesToCook ).to.deep.equal( [ recipeData[0] ] );

    user2.addRecipeToRecipesToCook( recipeData[1] );
    user2.filterRecipesToCookByTag( 'Chocolate' );
    user2.filterRecipesToCookByTag( 'Loaded Chocolate Chip Pudding Cookie Cups' );
    expect( user2.recipesToCook ).to.be.a( "array" );
    expect( user2.recipesToCook ).to.deep.equal( [ recipeData[1] ] );
  } );

});