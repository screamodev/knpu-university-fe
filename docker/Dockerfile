FROM node:22-alpine

WORKDIR /opt/app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN chown -R node:node /opt/app
USER node

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
CMD ["npm", "run", "dev"]
