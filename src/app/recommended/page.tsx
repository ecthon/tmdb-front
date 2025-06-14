import { RecommendedMovies } from "@/components/recommended-movies";
import { Info } from "lucide-react";

export default function Recomendados() {
  return (
    <div className="flex flex-col p-4">
      <div className="bg-background">
        <h2 className="text-3xl font-bold mb-6">Filmes Sugeridos</h2>
        <div className="flex items-center bg-muted gap-2 mb-4 border border-gray-200 rounded-md p-2">
          <Info className="w-4 h-4 text-yellow-500" />
          <p className="text-sm text-muted-foreground text-foreground">
            Detalhes sobre os critérios de elaboração das recomendações estão{' '}
            <a href="https://github.com/ecthon/tmdb-api/blob/main/README.md" target="_blank" className="text-blue-500 hover:underline">aqui</a>.
          </p>
        </div>
        <RecommendedMovies />
      </div>
    </div>
  );
} 