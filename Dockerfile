# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ENV NEXT_IGNORE_ESLINT=1
ENV NEXT_IGNORE_TYPE_ERRORS=1

RUN npm run build

# Etapa 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/components.json ./
COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000

CMD ["npm", "start"] 