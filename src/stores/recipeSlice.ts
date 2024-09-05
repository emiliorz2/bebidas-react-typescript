import { StateCreator } from "zustand"
import { getCategories } from "../services/recipeService"
import type { Categories, SearchFilter } from "../types"


export type RecipesSliceType = {
    categories: Categories
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()

        set({
            categories : categories
        })
    },
    searchRecipes: async () => {

    }
})
