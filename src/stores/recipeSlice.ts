import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/recipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"


export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modalOpen: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>
    selectRecipe: (id : Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    modalOpen: false,
    selectedRecipe: {} as Recipe,
    fetchCategories: async () => {
        const categories = await getCategories()

        set({
            categories : categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks: drinks
        })
    },
    selectRecipe: async (id) => {
        const recipe = await getRecipeById(id)
        set({
            selectedRecipe: recipe,
            modalOpen: true
        })
    },
    closeModal: () => {
        set({
            modalOpen: false,
            selectedRecipe: {} as Recipe
        })
    }
})
