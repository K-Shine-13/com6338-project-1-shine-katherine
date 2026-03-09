// Constants
const API_KEY = "88e08adc44da4fc1b22b5ad18789fbee"

const cuisineSelect = document.querySelector("#cuisineSelect")
const mealTypeSelect = document.querySelector("#mealTypeSelect")
const complexitySelect = document.querySelector("#complexitySelect")
const vibeSelect = document.querySelector("#vibeSelect")

const searchBtn = document.querySelector("#searchBtn")
const recipeGrid = document.querySelector("#recipeGrid")


// Fetch Recipes

const fetchRecipes = async () => {

    //Gather user
    const cuisine = cuisineSelect.value
    const mealType = mealTypeSelect.value
    const complexity = complexitySelect.value

    let complexityParam = ""


    // Complexity Converter
    // -- Converts user's selection of complexity level into a "Ready Time" equivalent that the API can search by

    //Easy meal = ready in 20 minutes or less
    if (complexity === "easy") {

        complexityParam = "&maxReadyTime=20"

    }

    //Medium meal = ready in 45 minutes or less
    if (complexity === "medium") {

        complexityParam = "&maxReadyTime=45"

    }

    //Complex meal = ready in an hour (60 minutes) or less
    if (complexity === "complex") {

        complexityParam = "&minReadyTime=60"

    }

    //Create and modify API URL

    let url = `https://api.spoonacular.com/recipes/complexSearch?number=4&addRecipeInformation=true&apiKey=${API_KEY}`

    if (cuisine) {

        url += `&cuisine=${cuisine}`

    }

    if (mealType) {

        url += `&type=${mealType}`

    }

    url += complexityParam


    //Attempt to fetch recipes and return error upon catch
    try {

        const response = await fetch(url)
        const data = await response.json()

        console.log("API response:", data)

        displayRecipes(data.results)

        
    //return an error if unable to fetch recipes
    } catch (error) {

        console.log("Error fetching recipes:", error)

    }

}


// Display found recipes

const displayRecipes = (recipes) => {

    recipeGrid.innerHTML = ""

    //Loop through returned recipes & display card element w/ information on each one

    recipes.forEach(recipe => {

        let instructions = "Instructions!"


        // Create Recipe Card
        const card = `
<div class="recipe-card">

<img src="${recipe.image}" alt="${recipe.title}">

<h3>${recipe.title}</h3>

<p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>

<p class="instructions">${instructions}</p>

<a href="${recipe.sourceUrl}" target="_blank">Full Recipe</a>

</div>
`
        // Insert cards into the DOM
        recipeGrid.innerHTML += card
        console.log("Here's a recipe!")

    })

}


// Event Listener --> search button triggers the API search

searchBtn.addEventListener("click", fetchRecipes)
console.log("Let's surf some recipes!")