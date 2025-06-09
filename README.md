# TMDB Front

Projeto front-end desenvolvido em Next.js para exibição de informações de filmes, utilizando a API do TMDB.

## Tecnologias Utilizadas
- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Recharts](https://recharts.org/)

## Estrutura do Projeto
- `src/app`: Páginas e layouts principais do projeto
- `src/components`: Componentes reutilizáveis (ex: tabelas, filtros, gráficos)
- `src/hooks`: Hooks customizados para lógica de dados
- `src/api`: Configuração de integração com APIs (ex: Axios)
- `src/utils`: Funções utilitárias
- `src/types`: Tipos TypeScript customizados
- `public`: Imagens e arquivos estáticos

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
2. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Como rodar com Docker

1. Construa a imagem Docker:
   ```bash
   docker build -t tmdb-front .
   ```
2. Rode o container:
   ```bash
   docker run -p 3000:3000 tmdb-front
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

