import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/recipeService"
import type { Categories, Drinks, SearchFilter } from "../types"


export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
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
    }
})
