    FROM node:20-alpine AS builder

    ARG APP
    WORKDIR /app
    COPY . .

    RUN npm install --legacy-peer-deps
    RUN npm run build -- $APP

    FROM node:20-alpine
    WORKDIR /app

    ARG APP
    COPY --from=builder /app/dist/apps/$APP ./dist
    COPY package.json .
    RUN npm install --legacy-peer-deps --omit=dev

    RUN if [ "$APP" = "gateway" ]; then \
    EXPOSE 3000 \
    fi

    CMD ["node", "dist/main.js"]
