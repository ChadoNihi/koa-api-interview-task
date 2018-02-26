# Warning: i'm still a Docker noob and cannot guarantee this file correctness.

# Set the base image
FROM node:9.4.0
# Define working directory
WORKDIR /var/www/api
# Install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn
# Install node_modules with yarn
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /var/www/api && cd /var/www/api && ln -s /tmp/node_modules
# Copy app
COPY . /var/www/api
ENV NODE_ENV production
ENV NODE_PORT 8000
# Expose port
EXPOSE ${NODE_PORT}
# Run app
CMD ["npm","start"]
