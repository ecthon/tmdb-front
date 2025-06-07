'use client'
import { api } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await api.get('/movies');
      console.log(response.data);
      return response.data;
    }
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao buscar filmes</div>;

  return (
    <div>
      {movies && movies.map && movies.map((movie: any) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
      <Button>Hello</Button>
    </div>
  );
}
