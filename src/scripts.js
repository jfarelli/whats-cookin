// IMPORTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import './styles.css';
import './images/nav-background.jpg';
import { getData } from './apiCalls';
import { postData } from './apiCalls';
import User from './classes/User';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import RecipeRepository from './classes/RecipeRepository';
import MicroModal from 'micromodal';
import Pantry from './classes/Pantry';


// GLOBAL VARIABLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let userList;
let recipeList;
let recipeClass;
let ingredientList;
let ingredientClass;
let recipeRepository;
let currentUser;
let newRecipe;
let pantryClass;
let matchingTagConditions = [ ];
let matchingNameConditions = [ ];
let savedTagCondits = [ ];
let savedNameCondits = [ ];


// QUERY SELECTORS / ELEMENTS BY ID <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let h4 = document.querySelector( '.rec-name' );
let overlay = document.getElementById('overlay');
let totalCost = document.querySelector( '.dish-cost' );
let searchBox = document.querySelector( ".recipe-search" );
let searchButton = document.querySelector( ".search-button" );
let closeModalButton = document.getElementById( "closeModal" );
let ingredientText = document.querySelector( '.modal-ingredients' );
let instructionText = document.querySelector( '.modal-instructions' );
let spanText = document.querySelector('.pantry-check')
let welcomeUserMessage = document.getElementById( 'welcomeUserMessage' );
let recipeContainer = document.querySelector( '.recipe-grid-container' );
let recipeCardGridContainer = document.getElementById( "gridContainer" );
let navViewProfileButton = document.querySelector( '.view-profile-button' );
let searchInput = document.getElementById("searchInput");
let pantryButton = document.querySelector('.view-pantry-button')
let letsCookButton = document.querySelector( '.lets-cook-button' );
let youNeedMorePrompt = document.getElementById('youNeedMore');
let ingredientsDropDownMenu = document.getElementById('ingredientID');

// EVENT LISTENERS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
window.addEventListener( 'load', loadData );
searchButton.addEventListener( "click", searchRecipe );
recipeContainer.addEventListener( 'click' , displayRecipeInfo );
navViewProfileButton.addEventListener( 'click' , showCookingProfile );
pantryButton.addEventListener( 'click', (e) => {
    showPantry(e)
} );

recipeCardGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'save-button' ) {
        return saveRecipeToRecipesToCook( e );
    };
} );

recipeCardGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'remove-button' ) {
        return deleteRecipeFromRecipesToCook( e );
    };
} );

recipeCardGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'lets-make-it-button' ) {
        MicroModal.show( 'recipeModal' );
            overlay.classList.add( 'active' );
    }  
} );

closeModalButton.addEventListener( 'click', ( ) => {
    MicroModal.close( 'recipeModal' );
        overlay.classList.remove( 'active' );
} );

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
            document.getElementById("search").click();
  }
});
// DOM MANIPULATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function loadData( ) {
    Promise.all( [ getData( 'users' ), getData( 'recipes' ), getData( 'ingredients' ) ] ).then( data => {
        userList = data[ 0 ];
        recipeList = data[ 1 ];
        ingredientList = data[ 2 ];
        currentUser = new User( userList[ Math.floor( Math.random( ) * userList.length ) ] );
        console.log('CURRENTUSE: ', currentUser)
        ingredientClass = new Ingredient( ingredientList.map(ingredient => ingredient.id), ingredientList.map(ingredient => ingredient.name ), ingredientList.map( ingredient =>  ingredient.estimatedCostInCents ) );
        recipeClass = new Recipe( recipeList, ingredientList );
        recipeRepository = new RecipeRepository( recipeList );
        pantryClass = new Pantry( currentUser, ingredientList )
            displayRandomUserName( );
            displayAllRecipesOnPage( );
            displayUserInfoForPost( );
            displayIngredientsInDropDown( );
        } );
}

function displayRandomUserName( ) {
    welcomeUserMessage.innerText = `Welcome, ${ currentUser.name.split( ' ' )[ 0 ] }!`;
}

 // POST DATA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
let postedUserData;
let whatIngredientsDoYouNeed = document.querySelector('.what-ingredients')

function displayUserInfoForPost( ) {
    whatIngredientsDoYouNeed.innerText = `What Ingredients \n Do You Need, \n ${ currentUser.name.split( ' ' )[ 0 ] }?`;
}

let postTripInputButton = document.querySelector( '.form-input-container' );
    postTripInputButton.addEventListener( 'submit', getUpdatedUserIngredientsFromPost );

function getUpdatedUserIngredientsFromPost( event ) {
    event.preventDefault( );
    console.log('EVENT.TARGET: ', event.target)
    displayIngredientsInDropDown(  );
    let updatedUser = getPostedUserDataFromForm( event );
    let postUserIngredients = postData( updatedUser );
    let fetchMeThatPromise = getData( 'users' );
        Promise.all( [ postUserIngredients, fetchMeThatPromise ] )
        .then( response => {
            console.log('RESPONSE: ', response)
            pantryClass = new Pantry( response[ 1 ] );
        } )
        .then( getData('users').then(data => currentUser = data.find( userData => userData.id === currentUser.id)
        ) )
        .catch( error => console.log( error ) );
};

function getPostedUserDataFromForm( event ) {
    postedUserData = new FormData( event.target ); 
    let updateUserPantry = {
        userID: currentUser.id,
        ingredientID: parseFloat( postedUserData.get('ingredientID') ), 
        ingredientModification: parseFloat( postedUserData.get('ingredient-amount') ), 
    };
    event.target.reset( );
        return updateUserPantry
}
 
function searchRecipe( e ) {
    if ( e.target.id == 'search-cooking' ) {
        filterCookProf( );
    } else if ( !searchBox.value ) {
      displayAllRecipesOnPage( );
    }
    const tagSearched = recipeRepository.filterRecipeByTag( searchBox.value );
    const nameSearched = recipeRepository.filterRecipeByName( searchBox.value );
    if ( tagSearched.length > 0 ) {
        matchingTagConditions = tagSearched;
        displayFilteredRecipesByTagOnPage(  );
    } else if ( nameSearched.length > 0 ) {
        matchingNameConditions = nameSearched;
        return displayFilteredRecipesByNameOnPage( );
    } else {
        return displayAllRecipesOnPage( );
    }
}

function filterCookProf( ) {
    const tagSearched = currentUser.filterRecipesToCookByTag( searchBox.value );
    const nameSearched = currentUser.filterRecipesToCookByName( searchBox.value );
        if ( tagSearched.length > 0 ) {
            savedTagCondits = tagSearched;
            const result = savedTagCondits.map( recipe => {
                return `<section class='recipe-card' id=${ recipe.id }>
                <img src="${ recipe.image }" class="recipe-image" alt="">
                <h3>${ recipe.name }</h3>
                <button class="lets-make-it-button" id="${ recipe.id }">Let's Make It!</button>
                <div>
                <button class="save-button" id= ${ recipe.id }>Save to cooking profile!</button>
                </div>
                </section>`
            } ).join( '' );
            savedTagCondits = recipeContainer;
                return recipeContainer.innerHTML = result;
        } else if ( nameSearched.length > 0 ) {
            savedNameCondits = nameSearched;
                const result = savedNameCondits.map( recipe => {
                    return `<section class='recipe-card' id=${ recipe.id }>
                    <img src=${ recipe.image } class="recipe-image" alt="">
                    <h3>${ recipe.name }</h3>
                    <button class="lets-make-it-button" id="${ recipe.id }">Let's Make It!</button>
                    <div>
                    <button id=${ recipe.id } class="save-button">Save to cooking profile!</button>
                    </div>
                    </section>`
                } ).join( '' );
                savedNameCondits = recipeContainer;
                    return recipeContainer.innerHTML = result;
        } else {
            return;
        }
}

function displayFilteredRecipesByTagOnPage( ) {
    const result = matchingTagConditions.map( recipe => {
        return `<section class='recipe-card' id=${ recipe.id }>
        <img src=${ recipe.image } class="recipe-image" alt="">
        <h3>${ recipe.name }</h3>
        <button class="lets-make-it-button" id=${ recipe.id }>Let's Make It!</button>
        <div>
        <button class="save-button" id=${ recipe.id }>Save to cooking profile!</button>
        </div>
        </section>`
    } ).join( '' );
    matchingTagConditions = recipeContainer;
        return recipeContainer.innerHTML = result;
}

function displayFilteredRecipesByNameOnPage( ) {
    const result = matchingNameConditions.map( recipe => {
        return `<section class='recipe-card' id=${recipe.id}>
        <img src=${ recipe.image } class="recipe-image" alt="">
        <h3>${ recipe.name }</h3>
        <button class="lets-make-it-button" id=${ recipe.id }>Let's Make It!</button>
        <div>
        <button id=${recipe.id} class="save-button">Save to cooking profile!</button>
        </div>
        </section>`
    } ).join( '' );
    matchingNameConditions = recipeContainer;
        return recipeContainer.innerHTML = result;
}

function displayAllRecipesOnPage( e ) {
    let recipeCards = recipeContainer;
    newRecipe = new RecipeRepository( recipeList  )
    const result = newRecipe.recipes.map( recipe => {
        return `<section class='recipe-card' id=${ recipe.id }>
        <img src=${ recipe.image } class="recipe-image" alt="">
        <h3>${ recipe.name }</h3>
        <button class="lets-make-it-button" id=${ recipe.id }>Let's Make It!</button>
        <div>
        <button id=${ recipe.id } class="save-button">Save to cooking profile!</button>
        </div>
        </section>`
    } ).join( '' );
    return recipeCards.innerHTML = result;
};

function displayRecipeInfo( e ){
    ingredientText.innerText = ''
    return newRecipe.recipes.map( dish  => {
        if( e.target.id == dish.id ){
            recipeClass = new Recipe( dish, ingredientList );
            recipeClass.getIngredientsWithNames( dish.ingredients, ingredientList );
            pantryClass = new Pantry( currentUser, ingredientList );
            h4.innerText = dish.name; 
            totalCost.innerText = `Total Cost: $${ parseFloat( recipeClass.getCostOfIngredients( dish.ingredients, ingredientList ) * .01 ).toFixed( 2 ) }`;
            instructionText.innerText = dish.instructions.map( task => `${ task.number }: ${ task.instruction }` ).join( ' \n \n ' );
            let pantryObj = pantryClass.currentUsersPantry.reduce( ( acc, pantryItem ) => {
                acc[ pantryItem.ingredient ] = pantryItem.amount
                return acc
            }, { } )
            return dish.ingredients.map( recipeItem => { 
                let doIHaveEnoughIngredients = dish.ingredients.every( recipeIngredient => recipeIngredient.quantity.amount <= pantryObj[ recipeIngredient.id ] )
                if( doIHaveEnoughIngredients ) {
                    letsCookButton.hidden = false;
                    youNeedMorePrompt.innerText = "You have all the ingredients.  Let's cook!"
                    letsCookButton.addEventListener( 'click', ( ) => {
                        letsCookButton.hidden = true

                        // youNeedMorePrompt.innerText = `Get more Ingredients to Cook this!`
                        
                        return currentUser.pantry.map( pantryItem => {
                            if( pantryItem.ingredient === recipeItem.id ) {
                                return pantryItem.amount = pantryItem.amount - recipeItem.quantity.amount
                            }
                        } )
                    } );
                } else {
                    letsCookButton.hidden = true;
                    youNeedMorePrompt.innerText = `Get more Ingredients to Cook this!`
                }
                if( !pantryObj[ recipeItem.id ]){
                    ingredientText.innerText += 
                    `\n \n[   ${ recipeItem.quantity.amount } ${ recipeItem.quantity.unit } ${ recipeItem.name } - You don't have any ${ recipeItem.name }   ]\n \n`
                } else if( pantryObj[ recipeItem.id ] && recipeItem.quantity.amount > pantryObj[ recipeItem.id ] ) {
                    ingredientText.innerText += 
                    `\n \n[   ${ recipeItem.quantity.amount } ${ recipeItem.quantity.unit } ${ recipeItem.name } - You need to purchase ${ recipeItem.quantity.amount - pantryObj[ recipeItem.id ]} ${ recipeItem.quantity.unit } of ${ recipeItem.name }    ]\n \n`
                } else if( pantryObj[ recipeItem.id ] && recipeItem.quantity.amount < pantryObj[ recipeItem.id ] ){
                    ingredientText.innerText +=
                    `\n \n[   ${ recipeItem.quantity.amount } ${ recipeItem.quantity.unit } ${ recipeItem.name } - You have enough ${recipeItem.name}    ]\n \n`
                } 
                
            } )
        };
    } );
}

function saveRecipeToRecipesToCook ( e ) {
    return newRecipe.recipes.filter( favoriteDish => {
        if(( e.target.id == favoriteDish.id ) && ( !currentUser.recipesToCook.includes( favoriteDish ) ) ) {
           currentUser.addRecipeToRecipesToCook( favoriteDish );
        }
        return currentUser.recipesToCook;
    } );
}

function showCookingProfile( e ) {
    if( e.target.innerText == 'View Your Cooking Profile' ) {
        searchButton.id = 'search-cooking';
        navViewProfileButton.innerText = "Return Home";
        const result = currentUser.recipesToCook.map( recipe => {
            return `<section class='recipe-card' id=${ recipe.id }>
            <img src=${ recipe.image } class="recipe-image" alt="">
            <h3>${ recipe.name }</h3>
            <button class="lets-make-it-button" id=${ recipe.id }>Let's Make It!</button>
            <div>
            <button id=${recipe.id} class="remove-button">Remove from cooking profile!</button>
            </div>
            </section>`
        } ).join( '' );
        return recipeContainer.innerHTML = result;
    }
    if( e.target.innerText == 'Return Home' ){
        searchButton.id = 'search';
        returnHome( );
    }
}

function deleteRecipeFromRecipesToCook(e){
    if (e.target.classList.contains( "remove-button" )) {
        e.target.closest( 'section' ).remove( )
        currentUser.removeRecipeFromRecipesToCook(e.target.id)
    }
    return currentUser.recipesToCook
}

function returnHome(  ) {
    navViewProfileButton.innerText = "View Your Cooking Profile";
    displayAllRecipesOnPage(  );
}

function showPantry( e ) {
    pantryClass = new Pantry( currentUser.pantry, ingredientList )
    pantryClass.getPantryItemsWithNames( currentUser.pantry, ingredientList )
    if( e.target.innerText == 'View Your Pantry' ) {
        recipeContainer.innerText = ""
        currentUser.pantry.forEach( item => {
            console.log('ITEM: ', item)
            recipeContainer.innerText +=` ${ ( item.amount ).toFixed( 2 ) } ${ item.name.name } \n \n `} )
    }
}


function displayIngredientsInDropDown(  ) {
    // pantryClass = new Pantry( currentUser.pantry, ingredientList )
    // pantryClass.getPantryItemsWithNames( currentUser.pantry, ingredientList )
    let sortedIngredients = pantryClass.ingredientsList.sort( compare )
    return sortedIngredients.find( ingredient => {
        // console.log('INGREDIENT: ', ingredient)
        pantryClass.currentUsersPantry.forEach( pantryItem => {
            // console.log('PANTRYITEM: ', pantryItem)
            // if( pantryItem.ingredient === ingredient.id) {
                // pantryItem.ingredient = ingredient.id
                ingredientsDropDownMenu.innerHTML += `<option name='ingredient' value="${ ingredient.id }">${ ingredient.name }</option>`
            // }
        } )

    } );
}

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const ingA = a.name.toUpperCase();
    const ingB = b.name.toUpperCase();
  
    let comparison = 0;
    if (ingA > ingB) {
      comparison = 1;
    } else if (ingA < ingB) {
      comparison = -1;
    }
    return comparison;
  }