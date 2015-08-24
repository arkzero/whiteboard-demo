# Whiteboard Demo

Proof of concept for whiteboard feature of Canvs web project.

## Running Application

Required: [Node.js](https://nodejs.org/download/), [NPM](https://www.npmjs.com/) (which now comes bundled with Node.js), and [Bower](http://bower.io/).

### Step 1: Pull down Repo

Pull down this repo to your local machine using git clone.  `git clone git@github.com:arkzero/whiteboard-demo.git`

### Step 2: Install Bower Modules 

Install front-end bower modules first by first moving into the whiteboard-demo folder: `cd whiteboard-demo`.  Then install the bower modules using `bower install`.

### Step 3: Install http-server

Install the http-server node module in order to run the app.  `npm install -g http-server`.  NOTE: May need to add `sudo` to the front depending on your system settings.

### Step 4: Run the app

All that's left now is to run the actual application.  Move into the app directory: `cd app`, and run the application  with `http-server`.  Now you can navigate to the running application in your browser at: `localhost:8080`. 
