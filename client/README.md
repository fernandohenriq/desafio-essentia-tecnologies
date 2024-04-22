# HOMES-ANGULAR-EXAMPLE

This is an example of how to use Angular with the [Angular.io guide](https://angular.io/tutorial/first-app).

## Setup

- In root directory, install all the dependencies:

  ```
  npm install
  ```

  or

  ```
  yarn
  ```

- Now install globally `json-server` (if not already installed):

  ```
  npm i -g json-server
  ```

  or

  ```
  yarn global add json-server
  ```

## Run

- Run the following command with terminal in the root directory to start the `json-server` server:

  ```
  json-server --watch db.json
  ```

  - Open http://localhost:3000 in your browser to see the example.

- Run the following command with another terminal in the root directory to start the application:

  ```
  ng serve
  ```

  - Open http://localhost:4200 in your browser to see the application.

## Conclusion

Well done, the application is running! 🚀
