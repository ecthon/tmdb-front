"use client"

import DashboardReleasesPerYears from "@/components/dashboard-releases-per-years";
import { useMovies } from "@/hooks/useMovies";

export default function PerYear() {
  const { perYear, isLoadingPerYear } = useMovies();

  if (isLoadingPerYear || !perYear) {
    return <div>Carregando recomendações...</div>;
  }

  return (
    <div className="flex flex-col p-4">
      <DashboardReleasesPerYears perYear={perYear} />
    </div>
  );
}