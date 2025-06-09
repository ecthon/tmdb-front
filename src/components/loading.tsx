import { Atom } from "react-loading-indicators";

export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Atom color="#32cd32" size="small" text="Carregando..." textColor="" />
    </div>
  )
}