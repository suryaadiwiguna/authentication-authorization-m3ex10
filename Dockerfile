FROM node:18.19.0

#Configurations
COPY package.json /app/
COPY tsconfig.json /app/

#Main codes
COPY src /app/
COPY controllers /app/
COPY middlewares /app/
COPY routers /app/

#Database ORM
COPY prisma /app/