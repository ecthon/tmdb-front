import React from "react"
import { Movie } from "../recommended-movies"

interface MovieListProps {
  movies: Movie[]
  selectedMovie: Movie | null
  onSelect: (movie: Movie) => void
}

export function MovieList({ movies, selectedMovie, onSelect }: MovieListProps) {
  if (!movies || movies.length === 0) {
    return <p>Nenhum filme recomendado encontrado.</p>
  }
  return (
    <ul className="flex flex-col gap-1">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={`cursor-pointer px-3 py-1.5 rounded-md transition-colors
            ${selectedMovie?.id === movie.id
              ? 'bg-primary text-primary-foreground font-bold shadow'
              : 'bg-muted hover:bg-accent hover:text-accent-foreground'}
          `}
          onClick={() => onSelect(movie)}
        >
          {movie.title}
        </li>
      ))}
    </ul>
  )
} 