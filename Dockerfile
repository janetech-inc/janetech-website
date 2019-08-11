FROM node:alpine

ENV NODE_ENV production
ENV PORT 3000

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
RUN npm run build
# ~~~

# ~~~ Run command
EXPOSE ${PORT}
CMD [ "npm", "start" ]
# ~~~

