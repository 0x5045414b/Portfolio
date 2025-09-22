FROM oven/bun:1.2.22

COPY . ./

RUN bun install
RUN bun run build

ENV NODE_ENV production

ENTRYPOINT [ "bun", "run", "build/index.js" ]