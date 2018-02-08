## Bowtie's React-Recompose Starter Kit

Welcome to Bowtie's React-Recompose Starter Kit. This starter kit is an ejected version of create-react-app and comes preloaded with the following libraries:

-react router
-recompose
-css modules
-scss loaders
-Bowtie React utilities
-Bowtie Api helper
-Bowtie React file structure
-jest-enzyme library

## File structure

The component file structure contains all components with their associated containers, tests, style modules, and jsx files. Everything relating to a specific component should be contained in it's own directory. Since this boilerplate uses recompose, the .jsx file should only contain the PureComponent with few, if any logic. The container should contain all logic and component enhancements. 

## Configuration

Api - this component is a base Api to handle all logic for fetch calls. It contains a base URL, user tokens, and stores user token. Set up a .env file with appropriate variable names.

PrivateRoute Component - when using this component, you need to pass in what ever boolean method yuo are using to authorize the user.

git clone
npm install
npm start

testing:  npm test