"use client"
import { useMovies } from "@/hooks/useMovies"
import { useState, useEffect } from "react"
import { MovieList } from "./RecommendedMovies/movie-list"
import { MovieDetailsCard } from "./RecommendedMovies/movie-details-card"
import { Atom } from "react-loading-indicators"
import { Loading } from "./loading"

export interface Movie {
  id: string
  movie_id: number
  title: string
  original_title: string
  overview: string
  tagline: string
  status: string
  release_date: string
  runtime: number
  adult: boolean
  original_language: string
  homepage: string
  imdb_id: string
  budget: number
  revenue: number
  vote_average: number
  vote_count: number
  popularity: number
  backdrop_path: string
  poster_path: string
  genres: string[]
  production_companies: string[]
  production_countries: string[]
  spoken_languages: string[]
  keywords: string[]
  inserted_at: string
  updated_at: string
}

interface RecommendedMovies {
  movie: Movie
}

export function RecommendedMovies() {
  const { recommendedMovies, isLoadingRecommended } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (recommendedMovies && recommendedMovies.length > 0 && !selectedMovie) {
      setSelectedMovie(recommendedMovies[0]);
    }
  }, [recommendedMovies, selectedMovie]);

  if (isLoadingRecommended) {
    return <Loading />;
  }

  return (
    <div className="flex w-full gap-4 items-center">
      <div className="w-1/2">
        <MovieList
          movies={recommendedMovies}
          selectedMovie={selectedMovie}
          onSelect={setSelectedMovie}
        />
      </div>
      <div className="w-1/2 flex items-center">
        <MovieDetailsCard movie={selectedMovie} />
      </div>
    </div>
  )
}
