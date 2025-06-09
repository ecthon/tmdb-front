"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Atom } from "react-loading-indicators";
import { Loading } from "./loading";

interface PerYearItem {
  year: number;
  movies: number;
}

interface DashboardReleasesPerYearsProps {
  perYear: PerYearItem[];
}

export default function DashboardReleasesPerYears({ perYear }: DashboardReleasesPerYearsProps) {
  const totalByYear = perYear.reduce((sum: number, item: { year: number; movies: number }) => sum + item.movies, 0)
  const peakYear = perYear.reduce(
    (prev: { year: number; movies: number }, current: { year: number; movies: number }) =>
      prev.movies > current.movies ? prev : current
  )
  const averagePerYear = Math.round(totalByYear / perYear.length)

  if (!Array.isArray(perYear) || perYear.length === 0) {
    return <Loading />;
  }

  console.log(perYear)

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Timeline de Lançamentos</h1>
        <p className="text-gray-600">Quantidade de filmes lançados por ano</p>
      </div>

      {/* Timeline de Lançamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Filmes Lançados por Ano
            <span className="text-sm font-normal text-gray-500">Total: {totalByYear.toLocaleString()} filmes</span>
          </CardTitle>
          <CardDescription>Evolução dos lançamentos cinematográficos ao longo dos anos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              movies: {
                label: "Filmes Lançados",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[500px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perYear} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tickFormatter={(value) => value.toString()} fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [`${value} filmes`, "Lançamentos"]}
                  labelFormatter={(label) => `Ano: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="movies"
                  stroke="gray"
                  strokeWidth={3}
                  dot={{ fill: "blue", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "var(--color-movies)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cards de Estatísticas do Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600">{totalByYear.toLocaleString()}</div>
            <p className="text-sm text-gray-600 mt-1">Total de Filmes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-600">{peakYear.movies}</div>
            <p className="text-sm text-gray-600 mt-1">Pico em {peakYear.year}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600">{averagePerYear}</div>
            <p className="text-sm text-gray-600 mt-1">Média por Ano</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
