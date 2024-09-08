import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoritesSlice"

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(devtools( (...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
})))