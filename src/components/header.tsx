import { ChartSpline, Clapperboard, Home, ListCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <Clapperboard className='h-6 w-6 text-yellow-500'/>
                <Separator orientation="vertical" className="h-6"/>
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground">
                        <Home className="h-4 w-4"/>
                        Início
                    </Link>
                    <Link href="/recommended" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground">
                        <ListCheck className="h-4 w-4"/>
                        Recomendados
                    </Link>
                    <Link href="/per-year" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground">
                        <ChartSpline className="h-4 w-4"/>
                        Lançamentos/Ano
                    </Link>
                </nav>
            </div>
        </div>
    )
}