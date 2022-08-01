class User {
    constructor( user ) {
        this.name = user.name;
        this.id = user.id;
        this.pantry = user.pantry;
        this.recipesToCook = [ ];
    };

    addRecipeToRecipesToCook( recipe ) {
        return this.recipesToCook.push( recipe )
    }

    removeRecipeFromRecipesToCook( recipeId  ) {
        this.recipesToCook.forEach((dish, index) => {
            if (dish.id === parseFloat(recipeId)) {
                this.recipesToCook.splice(index, 1)
            }
        })
    }

    filterRecipesToCookByTag( userInput ){
        let tagMatches = this.recipesToCook.filter( recipe => {
            return recipe.tags.includes( userInput.toLowerCase( ) )
        });
            return tagMatches;
    };
      
    filterRecipesToCookByName( userSearch ){
        let nameMatches = this.recipesToCook.filter( recipe => {
            return recipe.name.includes( userSearch )
        })
            return nameMatches
      };
  };

  export default User;