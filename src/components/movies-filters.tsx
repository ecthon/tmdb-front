import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

interface MoviesFiltersProps {
    onFilter: (filter: { search: string; genre: string }) => void;
}

export function MoviesFilters({ onFilter }: MoviesFiltersProps) {
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("all");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter({ search, genre: genre === "all" ? "" : genre });
    };

    const handleRemoveFilters = () => {
        setSearch("");
        setGenre("all");
        onFilter({ search: "", genre: "" });
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <span className="text-sm font-semibold">Filtros:</span>
            <Input
                placeholder="Nome do Filme"
                className="h-8 w-[320px]"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os gêneros</SelectItem>
                    <SelectItem value="adventure">Aventura</SelectItem>
                    <SelectItem value="comedy">Comédia</SelectItem>
                    <SelectItem value="documentary">Documentário</SelectItem>
                    <SelectItem value="mystery">Mistério</SelectItem>
                    <SelectItem value="horror">Terror</SelectItem>
                    <SelectItem value="family">Família</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" variant="secondary" size="sm">
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>

            <Button type="button" variant="outline" size="sm" onClick={handleRemoveFilters}>
                <X className="mr-2 h-4 w-4" />
                Remover Filtros
            </Button>
        </form>
    );
}