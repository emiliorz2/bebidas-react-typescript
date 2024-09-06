import { Drink } from "../types"

type DrinkCardProps = {
    drink : Drink
}

export const DrinkCard = ({drink} : DrinkCardProps) => {
  return (
    <div className="border shadow-lg">
        <div className="overflow-hidden">
            
        <img 
        className="hover:scale-125 transition-transform hover:rotate-2" 
        src={drink.strDrinkThumb} 
        alt={`imagen de ${drink.strDrink}`}
         
        />
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-black truncate">{drink.strDrink}</h2>
          <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
          >
            Ver Receta
          </button>
        </div>
    </div>
  )
}
