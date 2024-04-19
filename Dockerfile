FROM cypress/included:latest

#Create the folder where our project will be stored
RUN mkdir /api-automation

#We make it our workdirectory
WORKDIR /api-automation

#Let's copy the essential files that we MUST use to run our scripts.
COPY ./package.json .
COPY ./cypress.report.js .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

#Install the cypress dependencies in the work directory
RUN npm install

#Executable commands the container will use[Exec Form]
ENTRYPOINT ["npx","cypress","run"]

#With CMD in this case, we can specify more parameters to the last entrypoint.
CMD [""]