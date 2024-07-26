FROM node:20-alpine3.19 as builder

WORKDIR /build
COPY . .
RUN npm ci

FROM node:20-alpine3.19
USER 1000
WORKDIR /build
COPY --from=builder /build .
EXPOSE 3000
CMD ["npm", "start"]