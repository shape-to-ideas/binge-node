FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json tsconfig.json firebase.json ./
COPY app app
COPY public public
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]