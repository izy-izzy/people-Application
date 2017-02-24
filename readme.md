## Synopsis

## Installation and start

npm run setup
node httpserver.js (for local HTTP server)
access http://localhost:8080 

## Requirements
Ruby, Ruby gem, NodeJS, JAVA SDK 1.8

## Technology
Angular.js (1.6+), GULP, CSS3, SCSS, HTML5, Karma, Jasmine, Protractor, 

## Tests

### E2E tests

Not completed. There are more scenarios that needs to be tested:
* Removing the user
* Editing the user
* Filtering users
* Correct routing of the appliation

Install JDK 1.8 according to OS.
'''
npm run setup
node httpserver.js (for local HTTP server) (run on a separate console)
npm run e2e 
'''

Another way is to run server in a separate console and protractor in a separate console.
console 1:
'''
webdriver-manager start
'''

console 2:
'''
protractor
'''

### Unit tests
Not completed. Missing tests for the component and some more testing of the service should be done.

'''
npm install setup
npm run karma
'''
## Contributors

lukaskalcok@gmail.com (Lukas Kalcok)
this application is allso accesible on a domain : 

people.lukaskalcok.com


