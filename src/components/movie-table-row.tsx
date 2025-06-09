"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Star } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { IMovieRow } from "@/types/movie.type";

type MovieTableRowProps = {
    movie: IMovieRow;
}

export function MovieTableRow({ movie }: MovieTableRowProps) {
    const router = useRouter();

    const handleGoToDetails = () => {
        router.push(`/movie-details/${movie.id}`);
    };

    return (
        <TableRow>
            <TableCell>
                <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={handleGoToDetails}
                >
                    <Search className="h-3 w-3" />
                    <span className="sr-only">Detalhes do filme</span>
                </Button>
            </TableCell>
            <TableCell className="font-mono text-xs font-medium">
                {movie.title}
            </TableCell>
            <TableCell className="text-muted-foreground">
                {movie.originalTitle}
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium font-bold text-muted-foreground">
                        <strong>{movie.imdbRating}</strong>/10
                    </span>
                </div>
            </TableCell>
            <TableCell>{movie.duration}</TableCell>
            <TableCell className="font-medium">{movie.year}</TableCell>
            <TableCell className="font-medium">{movie.age}</TableCell>
            <TableCell className="font-medium">
                {movie.genres.length > 0 ? movie.genres.join(", ") : "-"}
            </TableCell>
        </TableRow>
    );
}