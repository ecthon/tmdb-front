'use client'
import { MoviesFilters } from "@/components/movies-filters";
import { MoviesTable } from "@/components/movies-table";
import { MoviesPagination } from "@/components/movies-pagination";
import { useMovies } from "@/hooks/useMovies";

export default function Home() {
  const {
    movies,
    isLoading,
    error,
    page,
    setPage,
    pagination,
    handleFilter,
    handlePrevious,
    handleNext,
  } = useMovies();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao buscar filmes</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mt-6 pb-6">
          <h1 className="text-3xl font-bold tracking-tighter">IMDB Database.</h1>    
            <div className="space-y-2.5 mt-4">
              <MoviesFilters onFilter={handleFilter} />
              <MoviesTable movies={movies} />
              <MoviesPagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onPageChange={setPage}
              />
            </div>
        </div>
      </div>
    </div>
  );
}
