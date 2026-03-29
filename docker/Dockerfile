FROM node:22-alpine

RUN corepack enable

WORKDIR /opt/app
COPY package.json pnpm-lock.yaml ./
RUN corepack prepare pnpm@10.30.3 --activate && pnpm install --frozen-lockfile

COPY docker/entrypoint-dev.sh /usr/local/bin/entrypoint-dev.sh
RUN chmod +x /usr/local/bin/entrypoint-dev.sh

COPY . .
RUN chown -R node:node /opt/app
USER node

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
CMD ["pnpm", "run", "dev"]
