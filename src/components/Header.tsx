import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"


export const Header = () => {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })
    
    const {pathname} = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)


    
    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        searchRecipes(searchFilters)
    }
    
    return (
        <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="Logo" />
                    </div>

                    <nav className="flex gap-4">

                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold hover:text-gray-300 px-4' : 'text-white uppercase font-bold hover:text-gray-300 px-4'
                        }>Inicio</NavLink>

                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold hover:text-gray-300 px-4' : 'text-white uppercase font-bold hover:text-gray-300 px-4'
                        }>Favoritos</NavLink>

                    </nav>

                </div>
                {isHome && (
                    <form 
                    className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label htmlFor="ingredient"
                            className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o ingredientes</label>

                            <input type="text" 
                            id="ingredient"
                            name="ingredient"
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Buscar recetas por nombre o ingredientes"
                            value={searchFilters.ingredient}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg"
                            >Categoria</label>

                            <select 
                            id="category"
                            name="category"
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchFilters.category}
                            onChange={handleChange}
                            >
                                <option value="">Selecciona una categoria</option>
                                {categories.drinks.map(category => (
                                    <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                        type="submit" 
                        value="Buscar recetas" 
                        className="w-full bg-white text-orange-500 uppercase font-extrabold p-2 rounded-lg cursor-pointer hover:bg-gray-300" />
                    </form>
                    )}
            </div>
        </header>
    )
}
