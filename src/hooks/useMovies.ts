import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/api/axios';
import { IMovieRow } from '@/types/movie.type';

export function useMovies() {
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

  const recommendedMoviesQuery = useQuery({
    queryKey: ['recommended-movies'],
    queryFn: async () => {
      const response = await api.get('/movies/recommend');
      return response.data;
    }
  });

  const perYearQuery = useQuery({
    queryKey: ['per-year'],
    queryFn: async () => {
      const response = await api.get('/movies/per-year');
      return response.data;
    }
  });

  const getMovieById = (id: string) => useQuery({
    queryKey: ['movie-by-id', id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}`); 
      return response.data;
    }
  });

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

  return {
    movies,
    isLoading,
    error,
    page,
    setPage,
    pagination,
    search,
    genre,
    handleFilter,
    handlePrevious,
    handleNext,
    recommendedMovies: recommendedMoviesQuery.data,
    isLoadingRecommended: recommendedMoviesQuery.isLoading,
    errorRecommended: recommendedMoviesQuery.error,
    perYear: perYearQuery.data,
    isLoadingPerYear: perYearQuery.isLoading,
    errorPerYear: perYearQuery.error,
    getMovieById,
  };
} 