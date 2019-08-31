This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `How to deploy`

```sh
ssh -i /d/bikemail.pem ubuntu@ec2-18-191-195-77.us-east-2.compute.amazonaws.com
```
```sh
cd bikemail
```
```sh
sh frontend.sh
```

```sh
sh backend.sh
```
Open [http://bikemail.io] to view it in the browser.
