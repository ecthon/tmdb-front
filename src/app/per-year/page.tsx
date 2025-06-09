"use client"

import DashboardReleasesPerYears from "@/components/dashboard-releases-per-years";
import { Loading } from "@/components/loading";
import { useMovies } from "@/hooks/useMovies";
import { Atom } from "react-loading-indicators";

export default function PerYear() {
  const { perYear, isLoadingPerYear } = useMovies();

  if (isLoadingPerYear || !perYear) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col p-4">
      <DashboardReleasesPerYears perYear={perYear} />
    </div>
  );
}