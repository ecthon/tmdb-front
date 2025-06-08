'use client'
import { api } from "@/api/axios";
import { MovieTableRow } from "@/components/movie-table-row";
import { MoviesFilters } from "@/components/movies-filters";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IMovieRow } from "@/types/movie.type";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const handleFilter = (filtros: { search: string; genre: string }) => {
    setSearch(filtros.search);
    setGenre(filtros.genre);
    setPage(1);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', page, search, genre],
    queryFn: async () => {
      const params: any = { page };
      if (search) params.q = search;
      if (genre) params.genre = genre;
      if (search || genre) {
        const response = await api.get('/movies/search', { params });
        return response.data;
      } else {
        const response = await api.get('/movies', { params });
        return response.data;
      }
    }
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao buscar filmes</div>;

  const moviesArray = Array.isArray(data)
    ? data
    : data?.movies || [];

  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const movies: IMovieRow[] = moviesArray.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    imdbRating: movie.vote_average,
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : '',
    age: movie.status,
    genres: Array.isArray(movie.genres) && movie.genres.length > 0
      ? movie.genres.map((g: any) => typeof g === 'string' ? g : g.name)
      : [],
    duration: movie.runtime ? `${movie.runtime} min` : '',
  }));

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, pagination.totalPages));

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">IMDB Database.</h1>    
            <div className="space-y-2.5 mt-4">
              <MoviesFilters onFilter={handleFilter} />
              <div className="border rounded-md">
                  <Table>
                      <TableHeader className="bg-zinc-200">
                          <TableRow>
                              <TableHead className="w-[64px]"></TableHead>
                              <TableHead className="w-[180px]">Título</TableHead>
                              <TableHead className="w-[180px]">Título Original</TableHead>
                              <TableHead className="w-[80px]">Nota IMDB</TableHead>
                              <TableHead className="w-[80px]">Duração</TableHead>
                              <TableHead className="w-[60px]">Ano</TableHead>
                              <TableHead className="w-[80px]">Staus</TableHead>
                              <TableHead className="w-[164px]">Gênero</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                        {movies.length === 0 ? (
                          <TableRow>
                            <TableHead colSpan={8}>Nenhum filme encontrado.</TableHead>
                          </TableRow>
                        ) : (
                          movies.map((movie: IMovieRow) => (
                            <MovieTableRow key={movie.id} movie={movie}/>
                          ))
                        )}
                      </TableBody>
                  </Table>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={e => { e.preventDefault(); handlePrevious(); }} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink hidden={pagination.page === 1} href="#" onClick={e => { e.preventDefault(); setPage(1); }}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      {pagination.page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      {pagination.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" onClick={e => { e.preventDefault(); handleNext(); }} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
        </div>
    </div>
  );
}
