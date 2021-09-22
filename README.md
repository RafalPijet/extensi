## Project description

The form consists of four fields and the RadioBox gender selection option.
The fields 'surname', 'birthDate' and 'email' are required.
The 'name' field and gender selection are optional

Project consist with backend and frontend.
You have to run local database MongoDB with default settings:

# mongodb://localhost:27017

## Project installation

In the selected directory you have to type:

### `git clone https://github.com/RafalPijet/extensi`

### `cd extensi`

### `npm i`

### `cd client`

Create .env file. Set for REACT_APP_BACKEND_URL key value:

### `http://localhost:3005`

Save the change

### `cd ..`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Attention

Sometimes after installation, the server needs to be restarted for the first time. This is the result of creating the 'build' directory
