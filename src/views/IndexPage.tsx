import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"

export const IndexPage = () => {

  const drinks = useAppStore((state) => state.drinks)

  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks])
  
  return (
    <>
        <h1 className="text-6xl font-extrabold">Inicio</h1>
        {hasDrinks ? (
          <>
            {drinks.drinks.map((drink) => (
              <div key={drink.idDrink} className="flex gap-4 my-4">
                <img className="w-32 h-32 object-cover" src={drink.strDrinkThumb} alt={drink.strDrink} />
                <div>
                  <h2 className="text-2xl font-bold">{drink.strDrink}</h2>
                </div>
              </div>
            ))}
          </>
          ): (
            <p className="my-10 text-center text-2xl">
              No hay bebidas aun utiliza el formulario para buscar bebidas
            </p>

          )}
    </>
  )
}
