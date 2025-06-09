"use client";
import { useParams, useRouter } from "next/navigation";
import { useMovies } from "@/hooks/useMovies";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, DollarSign, ArrowLeft } from "lucide-react";
import { formatCurrency, formatRuntime } from "@/utils/format";
import { Loading } from "@/components/loading";
import Image from "next/image";

export default function FilmeDetalhesPage() {
  const params = useParams();
  const id = params?.id as string;
  const { getMovieById } = useMovies();
  const router = useRouter();
  const { data: movie, isLoading, error } = getMovieById(id);

  if (isLoading) return <Loading />;
  if (error || !movie) return <div className="p-8 text-center text-red-500">Filme não encontrado.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg mt-10">
      <div className="relative -mx-6 -mt-6 mb-6 h-64 rounded-t-md overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          {movie.tagline && <p className="text-lg italic opacity-90">{movie.tagline}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-medium">{movie.vote_average?.toFixed(1)}</span>
          <span className="text-muted-foreground">({movie.vote_count?.toLocaleString()} votos)</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{movie.release_date ? new Date(movie.release_date).toLocaleDateString("pt-BR") : ""}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{movie.runtime ? formatRuntime(movie.runtime) : ""}</span>
        </div>
        {movie.budget > 0 && (
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{formatCurrency(movie.budget)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genres?.map((genre: string) => (
          <Badge key={genre} variant="secondary">
            {genre}
          </Badge>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sinopse</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{movie.overview}</p>
      </div>
      {movie.production_companies?.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Produtoras</h3>
          <p className="text-sm text-muted-foreground">{movie.production_companies.join(", ")}</p>
        </div>
      )}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mt-6 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </button>
    </div>
  );
} 