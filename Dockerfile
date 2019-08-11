FROM node:alpine

ENV NODE_ENV production
ENV PORT 4100

# ~~~ Bundle app source
WORKDIR /usr/src/app
COPY package*.json ./
# ~~~

# ~~~ Install app dependencies
RUN npm install
# ~~~

# ~~~ Copying source files
COPY . .
# ~~~

# ~~~ Build the project
RUN PATH=$(npm bin):$PATH
RUN npm run build:ssr
# ~~~

# ~~~ Run command
EXPOSE ${PORT}
CMD [ "npm", "start" ]
# ~~~

