import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IMovieRow } from "@/types/movie.type";
import { MovieTableRow } from "@/components/movie-table-row";
import React from "react";

interface MoviesTableProps {
  movies: IMovieRow[];
}

export function MoviesTable({ movies }: MoviesTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-zinc-200">
          <TableRow>
            <TableHead className="w-[64px]">Detalhes</TableHead>
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
            movies.map((movie) => (
              <MovieTableRow key={movie.id} movie={movie} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 