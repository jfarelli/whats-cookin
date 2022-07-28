// IMPORTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import './styles.css';
import './images/nav-background.jpg';
import { getData } from './apiCalls';
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
let welcomeUserMessage = document.getElementById( 'welcomeUserMessage' );
let recipeContainer = document.querySelector( '.recipe-grid-container' );
let recipeCardGridContainer = document.getElementById( "gridContainer" );
let navViewProfileButton = document.querySelector( '.view-profile-button' );
let searchInput = document.getElementById("searchInput");
let pantryButton = document.querySelector('.view-pantry-button')

// EVENT LISTENERS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
window.addEventListener( 'load', loadData );
searchButton.addEventListener( "click", searchRecipe );
recipeContainer.addEventListener( 'click' , displayRecipeInfo );
navViewProfileButton.addEventListener( 'click' , showCookingProfile );
pantryButton.addEventListener( 'click', showPantry );

recipeCardGridContainer.addEventListener( 'click', ( e ) => {
    if ( e.target.classList == 'save-button' ) {
        // let btn = document.getElementsByClassName('save-button');
        // for (var i = 0; i < btn.length; i++) {
        //     (function (index) {
        //     //   btn[index].addEventListener("click", function () {
        //         // console.log("Clicked Button: " + index);
      
        //         let isPresent = false;
      
        //         //   Check if the class is present or not
        //         this.classList.forEach(function (e, i) {
        //           if (e == 'save-button') {
        //             isPresent = true;
        //           } else {
        //             isPresent = false;
        //           }
        //         });
      
        //         //   toggle the presence of class on the basis of the isPresent variable
        //         if (isPresent) {
        //           this.classList.remove("button-focus");
        //         } else {
        //           this.classList.add("button-focus");
        //         }
        //     //   });
        //     })(i);
        //   }
        return saveRecipeToRecipesToCook( e );
    };
} );


// let btn = document.getElementsByClassName("btn");

//     for (var i = 0; i < btn.length; i++) {
//       (function (index) {
//         btn[index].addEventListener("click", function () {
//           console.log("Clicked Button: " + index);

//           let isPresent = false;

//           //   Check if the class is present or not
//           this.classList.forEach(function (e, i) {
//             if (e == "button-focus") {
//               isPresent = true;
//             } else {
//               isPresent = false;
//             }
//           });

//           //   toggle the presence of class on the basis of the isPresent variable
//           if (isPresent) {
//             this.classList.remove("button-focus");
//           } else {
//             this.classList.add("button-focus");
//           }
//         });
//       })(i);
//     }

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
    userList = data[ 0 ].usersData;
    recipeList = data[ 1 ].recipeData;
    ingredientList = data[ 2 ].ingredientsData;
    currentUser = new User( userList[ Math.floor( Math.random( ) * userList.length ) ] );
    ingredientClass = new Ingredient( ingredientList.map(ingredient => ingredient.id), ingredientList.map(ingredient => ingredient.name ), ingredientList.map( ingredient =>  ingredient.estimatedCostInCents ) );
    recipeClass = new Recipe( recipeList, ingredientList );
    recipeRepository = new RecipeRepository( recipeList );
    pantryClass = new Pantry( currentUser, ingredientList )
    displayRandomUserName( );
    displayAllRecipesOnPage( );
    } );
}


function displayRandomUserName( ) {
    welcomeUserMessage.innerText = `Welcome, ${ currentUser.name.split( ' ' )[ 0 ] }!`;
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
    newRecipe = new RecipeRepository( recipeList );
    newRecipe.recipes.map( dish  => {
        if( e.target.id == dish.id ){
            recipeClass = new Recipe( dish, dish.ingredients );
            recipeClass.getIngredientsWithNames( dish.ingredients, ingredientList );
            h4.innerText = dish.name;  
            instructionText.innerText = dish.instructions.map( task => `${ task.number }: ${ task.instruction }` ).join( ' \n \n ' );
            ingredientText.innerText = dish.ingredients.map( foodItem => ` ${ ( foodItem.quantity.amount ).toFixed( 2 ) } ${ foodItem.quantity.unit } ${ foodItem.name }` ).join( ' \n \n ');
            totalCost.innerText = `Total Cost: $${ parseFloat( recipeClass.getCostOfIngredients( dish.ingredients, ingredientList ) * .01 ).toFixed( 2 ) }`;
            return 
        };       
    });
};


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
        console.log("before deletion/view array", currentUser.recipesToCook)
        return recipeContainer.innerHTML = result;
    }
    if( e.target.innerText == 'Return Home' ){
        searchButton.id = 'search';
        returnHome( );
    }
}



// function deleteRecipeFromRecipesToCook( e ) { 
//     if( e.target.classList.contains( "remove-button" ) ) {
//         newRecipe.recipes.forEach( removeDish => {
//             ;
//             return currentUser.removeRecipeFromRecipesToCook( removeDish );
//         } )  
//         // console.log("outside function",currentUser.recipesToCook)
//     };
//     return currentUser.recipesToCook;
// }

function deleteRecipeFromRecipesToCook(e){
    if (e.target.classList.contains( "remove-button" )) {
        e.target.closest( 'section' ).remove( )
        currentUser.removeRecipeFromRecipesToCook(e.target.id)
    }
    console.log(currentUser.recipesToCook)
    return currentUser.recipesToCook
}

function returnHome(  ) {
    navViewProfileButton.innerText = "View Your Cooking Profile";
    displayAllRecipesOnPage(  );
}

function showPantry( e ) {
    pantryClass = new Pantry( currentUser )
    pantryClass.getPantryItemsWithNames( ingredientList )
    if( e.target.innerText == 'View Your Pantry' ) {
        // newRecipe = new Recipe( item, ingredientList)
        recipeContainer.innerText = ""
        pantryClass.currentUsersPantry.map( item => {
                recipeContainer.innerText +=` ${ ( item.amount ).toFixed( 2 ) } ${ item.name } \n \n `}).join('')
    }
        return result
}