// Constants
const API_KEY = "88e08adc44da4fc1b22b5ad18789fbee"

const cuisineSelect = document.querySelector("#cuisineSelect")
const mealTypeSelect = document.querySelector("#mealTypeSelect")
const complexitySelect = document.querySelector("#complexitySelect")
const vibeSelect = document.querySelector("#vibeSelect")

const searchBtn = document.querySelector("#searchBtn")
const recipeGrid = document.querySelector("#recipeGrid")

const favoritesGrid = document.querySelector("#favoritesGrid")

let favorites = JSON.parse(localStorage.getItem("favorites")) || []

// Fetch Recipes

const fetchRecipes = async () => {

    //Gather user input
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

// Extract Instructions from API source

const extractInstructions = async (recipeUrl) => {

    try {

        const response = await fetch(
            `https://api.spoonacular.com/recipes/extract?apiKey=${API_KEY}&url=${encodeURIComponent(recipeUrl)}`
        )

        const data = await response.json()

        if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {

            return data.analyzedInstructions[0].steps
                .map(step => step.step)
                .join("<br>")

        }

        if (data.instructions) {
            return data.instructions
        }

        return "Instructions unavailable."

    } catch (error) {

        console.log("Instruction extraction failed:", error)
        return "Instructions unavailable."

    }

}

// Display found recipes

const displayRecipes = async (recipes) => {

    recipeGrid.innerHTML = ""

    for (const recipe of recipes) {
        // Destructure properties from the recipe object
        const { id, image, title, readyInMinutes, sourceUrl } = recipe

        // Fetch instructions
        let instructions = await extractInstructions(sourceUrl)

        // Create recipe card
        const card = `
        <div class="recipe-card">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p><strong>Ready in:</strong> ${readyInMinutes} minutes</p>
            <p class="instructions">${instructions}</p>
            
            <a href="${sourceUrl}" target="_blank">Full Recipe</a>

            <button class="favoriteBtn"
                data-id="${id}"
                data-title="${title}"
                data-image="${image}"
                data-url="${sourceUrl}">
                ❤️ Add Favorite
            </button>
        </div>
        `

        recipeGrid.innerHTML += card
    }

}

// Save Favorite Recipes

const saveFavorite = (recipe) => {

    favorites.push(recipe)

    localStorage.setItem("favorites", JSON.stringify(favorites))

    renderFavorites()

    console.log("Recipe added to favorites!")

}

// Remove Favorite Recipes
const removeFavorite = (id) => {

    favorites = favorites.filter(recipe => recipe.id !== id)

    localStorage.setItem("favorites", JSON.stringify(favorites))

    renderFavorites()

    console.log("Recipe removed from favorites!")

}

// Render Favorite Recipes

const renderFavorites = () => {
    favoritesGrid.innerHTML = ""

    favorites.forEach(recipe => {
        // Object destructuring
        const { id, title, image, url } = recipe

        const card = `
        <div class="recipe-card">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>

            <a href="${url}" target="_blank">Full Recipe</a>

            <button class="removeFavoriteBtn" data-id="${id}">
               💔 Remove Favorite
            </button>
        </div>
        `
        favoritesGrid.innerHTML += card
    })
}


// Event Listeners
// --> search button triggers the API search

searchBtn.addEventListener("click", fetchRecipes)

// --> "favorite" button adds recipe card to favorites list, stored locally
recipeGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("favoriteBtn")) {
        const { id, title, image, url } = event.target.dataset

        const recipe = { id, title, image, url }
        saveFavorite(recipe)
    }
})

// Remove Favorite Button Listener
// --> removeFavorite button removes recipe card to favorites list

favoritesGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("removeFavoriteBtn")) {
        removeFavorite(event.target.dataset.id)
    }
})

// Load Local-saved Favorites

renderFavorites()

console.log("Recipe Surfer ready!")