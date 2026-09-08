# syntax=docker/dockerfile:1
# Multi-stage Dockerfile for viavitae-demos.
# Each template is independently deployable via the TEMPLATE build ARG.

ARG NODE_VERSION=20
ARG TEMPLATE=basilica

# ── Base ────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-slim AS base
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

# ── Dependencies ────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY config/package.json ./config/
COPY shared/package.json ./shared/
COPY templates/${TEMPLATE}/package.json ./templates/${TEMPLATE}/
RUN pnpm install --frozen-lockfile

# ── Build ───────────────────────────────────────────────────────────────
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo run build --filter=${TEMPLATE}...

# ── Production ──────────────────────────────────────────────────────────
FROM base AS production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=build /app/templates/${TEMPLATE}/.next ./templates/${TEMPLATE}/.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

USER node

EXPOSE 3000
CMD ["pnpm", "next", "start", "--dir", "templates/${TEMPLATE}"]
