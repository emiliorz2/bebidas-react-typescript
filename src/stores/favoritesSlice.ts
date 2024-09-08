import { StateCreator } from "zustand";
import { Recipe } from "../types";



export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromLocalStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter((fav) => fav.idDrink !== recipe.idDrink)
            })

            )

        }else{
            set({
                favorites: [...get().favorites, recipe]
            })
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some((fav) => fav.idDrink === id)
    },
    loadFromLocalStorage: () => {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            set({
                favorites: JSON.parse(favorites)
            })
        }
    }
})
