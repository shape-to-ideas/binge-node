FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json pnpm-lock.yaml tsconfig.json firebase.json ./
COPY app app
COPY public public
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
CMD ["pnpm","start"]