FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

LABEL org.opencontainers.image.source="https://github.com/mariamh99/almaerid_ver1.0"

CMD ["npm", "run", "dev"]
