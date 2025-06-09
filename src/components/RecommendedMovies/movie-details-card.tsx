import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { Movie } from "../recommended-movies"
import { formatDate, formatRuntime } from "@/utils/format"

interface MovieDetailsCardProps {
  movie: Movie | null
}

export function MovieDetailsCard({ movie }: MovieDetailsCardProps) {
  if (!movie) return null;
  return (
    <Card className="p-0 w-full rounded-md max-w-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Poster */}
          <div className="relative w-full md:w-48 h-80 md:h-96 flex-shrink-0 flex items-center justify-center">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/placeholder.svg?height=400&width=300"}
              alt={movie.title}
              fill
              className="object-cover rounded-l-md"
              sizes="(max-width: 768px) 200vw, 192px"
            />
          </div>
          {/* Content */}
          <div className="flex-1 p-6 space-y-4">
            {/* Title and Rating */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground line-clamp-2">{movie.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{movie.vote_average.toFixed(1)}</span>
                  <span>({movie.vote_count.toLocaleString()} votos)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>
            </div>
            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
            {/* Overview */}
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 