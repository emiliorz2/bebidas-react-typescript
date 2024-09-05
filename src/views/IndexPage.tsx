import { useAppStore } from "../stores/useAppStore"

export const IndexPage = () => {

  useAppStore((state) => state.categories)
  
  return (
    <>
        <h1>Inicio</h1>
    </>
  )
}
