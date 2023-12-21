ARG CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX
FROM $CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX/node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn
COPY prisma/schema.prisma prisma/schema.prisma

RUN corepack enable \
    && yarn --immutable

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# See src/lib/config/index.ts for NEXT_BUILD explanation
RUN corepack enable \
    && NEXT_BUILD=true yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

# With output: 'standalone', next creates a minimal server.js and adds the required node_modules to the folder .next/standalone
# The public static files are either located to /public or .next/static, which can be added to a CDN (cloud CDN, cloudfront, cloudflare...)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

