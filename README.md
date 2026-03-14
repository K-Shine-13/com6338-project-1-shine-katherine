# com6338-project-1-shine-katherine
# Project 1 - Create a Web Application Using ES6 and New JavaScript Features

## Project Purpose:
    This application is intended to allow the user to search for recipes based on criteria such as cuisine type, meal category, and preparation complexity. Recipe results are retrieved from the Spoonacular API and displayed as dynamic recipe cards containing images, preparation time, and cooking instructions.
    
    In addition to displaying search results, here is also a favorites system included that allows users to save preferred recipes that they see. These favorites are stored using the browser's localStorage, and can be removed at the user's liesure with the click of a button.

## Where ES6 features were implemented in this application:
### - Async / Await
    Occurs in the following functions:
    - fetchRecipes() ==> Lines 18, 74-75
    - extractInstructions() ==> Lines 93, 97, 101,
    - displayRecipes() ==> Lines 128, 137

### - Template Literals
    Occurs in the following functions:
    - fetchRecipes() ==> Line 54, 58, 64, 
    - extractInstructions() ==> Line 98
    - displayRecipes() ==> Line 140
    - renderFavorites() ==> Line 200

### Object or Array Destructing
    Occurs in the following functions:
    - displayRecipes() ==> Line 134
    - renderFavorites() ==> Line 198
    - recipeGrid Event Listener ==> Line 225

### - Arrow Functions
    Occurs in the following functions:
    - fetchRecipes() ==> Line 18
    - extractInstructions() ==> Line 93
    - displayRecipes() ==> Line 128
    - saveFavorite() ==> Line 166
    - removeFavorite() ==> Line 179
    - renderFavorites() ==> Line 193

    Event Listeners
    - Add Favorite ==> Line 223
    - Remove Favorite ==> Line 235

### - Let and Const
    - Global Scope ==> Lines 2 - 14

    Occurs in the following functions:
    - fetchRecipes() ==> Lines 21-25, 74-75, 
    - extractInstructions() ==> Lines 97, 101 
    - displayRecipes() ==> Line 134
    - renderFavorites() ==> Line 198
    
    Event Listener:
    - Add Favorite ==> Line 225

## Where local storage was implemented:
    Utilized in the following functions:
    - saveFavorite() ==> Line 170
    - removeFavorite() ==> Line 183

