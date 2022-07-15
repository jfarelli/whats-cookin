import './styles.css';
import './images/turing-logo.png';
import { getData } from './apiCalls';
import User from './classes/User'
import Recipe from './classes/Recipe'
import Ingredient from './classes/Ingredient'
import RecipeRepository from './classes/RecipeRepository'


let userList;
let recipeList;
let recipeClass;
let ingredientList;
let ingredientClass;
let recipeRepository;
let currentUser;
let newRecipe;
let matchingTagConditions = [];
let matchingNameConditions = [];


// Query Selectors <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let searchButton = document.querySelector(".search-button");
let searchBox = document.querySelector(".recipe-search")
let welcomeUserMessage = document.getElementById( 'welcomeUserMessage' );
// let favoriteRecipeButton = document.querySelector('.favorite-button');
let recipeCard = document.querySelector(".recipe-grid-container");


// Event Listeners <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
searchButton.addEventListener("click", searchRecipe);
window.addEventListener( 'load', loadData );
// favoriteRecipeButton.addEventListener('click', addToFaves);


function loadData( ) {
Promise.all( [ getData( 'users' ), getData( 'recipes' ), getData( 'ingredients' ) ] ).then( data => {
        userList = data[ 0 ].usersData;
        recipeList = data[ 1 ].recipeData;
        ingredientList = data[ 2 ].ingredientsData;
        currentUser = new User( userList[ Math.floor( Math.random() * userList.length ) ] );
        ingredientClass = new Ingredient( ingredientList.map(ingredient => ingredient.id), ingredientList.map(ingredient => ingredient.name), ingredientList.map(ingredient =>  ingredient.estimatedCostInCents) );
        recipeClass = new Recipe( recipeList[0], ingredientList );
        recipeRepository = new RecipeRepository( recipeList );
        displayRandomUserName( );
        displayAllRecipesOnPage( );
    } );
}


function displayRandomUserName( ) {
    welcomeUserMessage.innerText = `Welcome, ${ currentUser.name.split( ' ' )[ 0 ] }!`
}


function searchRecipe() {
    if ( !searchBox.value ) {
      displayAllRecipesOnPage( );
    }
    const tagSearched = recipeRepository.filterRecipeByTag( searchBox.value );
    const nameSearched = recipeRepository.filterRecipeByName( searchBox.value);
    if ( tagSearched.length > 0 ) {
        console.log( 'tagSearched: ', tagSearched )
        matchingTagConditions = tagSearched 
        displayFilteredRecipesByTagOnPage(  )

    } else if ( nameSearched.length > 0 ) {
        console.log( 'nameSearched: ', nameSearched )
        matchingNameConditions = nameSearched 
        return displayFilteredRecipesByNameOnPage(  )
    } else {
      return displayAllRecipesOnPage( );
    }
  }


  function displayFilteredRecipesByTagOnPage( ) {
    const result = matchingTagConditions.map( recipe => {
        console.log( 'TAG RECIPE: ', recipe)
        return `<section class='recipe-card' id="recipeCard">
        <img src="${ recipe.image }" class="recipe-image" alt="">
        <h3>${ recipe.name }</h3>
        <button id="${ recipe.id }">Let's Make It!</button>
        <div>
        <button class="favorite-button">Favorite!</button>
        <button class="save-button">Save it!</button>
        </div>
        </section>`
    } );
    matchingTagConditions = recipeCard;
    return recipeCard.innerHTML = result;
}


function displayFilteredRecipesByNameOnPage( ) {
    const result = matchingNameConditions.map( recipe => {
        console.log( 'NAME RECIPE: ', recipe)
        return `<section class='recipe-card' id="recipeCard">
        <img src="${ recipe.image }" class="recipe-image" alt="">
        <h3>${ recipe.name }</h3>
        <button id="${ recipe.id }">Let's Make It!</button>
        <div>
        <button class="favorite-button">Favorite!</button>
        <button class="save-button">Save it!</button>
        </div>
        </section>`
    } );
    console.log('NEW MATCHING NAMES ARRAY: ', matchingNameConditions )
    matchingNameConditions = recipeCard;
    return recipeCard.innerHTML = result;
}


function displayAllRecipesOnPage(  ) {
    let recipeCards = recipeCard;
    newRecipe = new RecipeRepository( recipeList  )
    const result = newRecipe.recipes.map( recipe => {
        return `<section class='recipe-card' id="recipeCard">
        <img src="${ recipe.image }" class="recipe-image" alt="">
        <h3>${ recipe.name }</h3>
        <button id="${ recipe.id }">Let's Make It!</button>
        <div>
        <button class="favorite-button">Favorite!</button>
        <button class="save-button">Save it!</button>
        </div>
        </section>`
    } ).join('');
    return recipeCards.innerHTML = result;
};






let recipeModal = document.querySelector( '.recipe-modal' );
let recipeContainer = document.querySelector( '.recipe-grid-container' );
let h4 = document.querySelector( '.rec-name' )
let totalCost = document.querySelector( '.dish-cost' )
recipeContainer.addEventListener( 'click' , displayModal );

function show(element) {
    element.classList.remove('hidden')
}

function displayModal( e ){
    newRecipe = new RecipeRepository( recipeList )
    newRecipe.recipes.map(( dish ) => {
        if( e.target.id == dish.id ){
            recipeModal.classList.remove('hidden')
            recipeModal.id = dish.id  
            h4.innerText = dish.name        
            // recipeClass = new Recipe(dish, dish.ingredients)
            // console.log(recipeClass)
            // totalCost.innerText = recipeClass.totalCost
            return 
        }       
    })
}

function assignCost(dish) {
    
}

function hide(element) {
    element.classList.add('hidden')
}


function viewFaves () {

}

// function addToFaves (e) {
//     const favorites = []
//     let recipeCards = recipeCard; //<<<< need this to access the grid conatiner
//     //without this, null error persists
//     //will need to access both this and an event listener for the faves botton?????
//     //how to pull these id's on click on this button to push into array
//     newRecipe.recipes.map((favoriteDish) => {
//         if(e.target.id == favoriteDish.id) {
//             favorites.push(favoriteDish)
//         }
//     })
//     console.log(favorites)
//     return favorites
// }

//As a user, I should be able to view a list of all recipes.
// As a user, I should be able to click on a recipe to view more information including directions, ingredients needed, and total cost.
// As a user, I should be able to filter recipes by a tag. (Extension option: by multiple tags)
// As a user, I should be able to search recipes by their name. (Extension option: by name or ingredients)

//consider using the filter function written by 
//Farelli in Ideabox: https://github.com/jfarelli/ideabox/blob/main/Idea.js



