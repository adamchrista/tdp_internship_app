#  Dockerfile for Node Express Backend

# Dockerfile FROM
FROM nikolaik/python-nodejs:latest

# Creating Directories
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN ls

# Including python dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Including node dependencies
COPY package*.json /usr/src/app/

RUN npm install --silent

# Copy app source code
COPY . /usr/src/app/

# Exports
EXPOSE 4000

CMD ["npm","start"]

