FROM node:latest

WORKDIR /app

RUN npm install -g serve

COPY dist/apps/task2 ./

EXPOSE 3000

CMD ["serve", "-s", "./", "-l", "3000"]
