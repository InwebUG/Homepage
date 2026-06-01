# Node host image for the inweb website (Remix 3 SSR server).
# Pinned to the Node version whose bundled npm (10.9.2) matches package-lock.json,
# so `npm ci` stays reproducible across hosts.
FROM node:24.16.0-slim

WORKDIR /app
ENV NODE_ENV=production

# Install dependencies against the committed lockfile (reproducible).
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# App source.
COPY . .

# The server reads PORT from the environment (hosts inject their own).
ENV PORT=8080
EXPOSE 8080

CMD ["npm", "start"]
