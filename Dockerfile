#  USING BASE IMAGE TO HANDLE MULTI ENVIRONMENTS

FROM node:20.11.0 as base

FROM base as development 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm" , "run", "start-dev" ]

FROM base as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm" , "run", "start" ]

#  USING ARGS TO HANDLE MULTI ENVIRONMENTS
# ARG MODE_ENV
# RUN if [ "$MODE_ENV" = "prd" ] ; \
#     then npm install --only=production ; \
#     else npm install; \
#     fi;



