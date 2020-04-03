API-backend-pos http://100.24.31.79:8080/
<h1 align="center">ExpressJS - POS RESTfull API</h1>



POS is a Point of sales application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name post, and Import file [post.sql](post.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT=8080
HOST=localhost
USER=root // default
PASS= // default
DATABASE=post 
```
## Release

<a href="http://100.24.31.79:8080">
  <img src="https://img.shields.io/endpoint?color=red&label=visite%20on%20the&logo=test&logoColor=green&style=plastic&url=http%3A%2F%2F100.24.31.79%3A8080%2Fapi%2F"/>
  <img src="https://img.shields.io/badge/Visit%20on%20the-100.24.31.79-blue.svg?style=popout&logo=amazon-aws"/>
</a>

## End Point
<p>pagination</p> 
<span>http://100.24.31.79:8080/api/pagination/products?page=1&limit=2</span>



