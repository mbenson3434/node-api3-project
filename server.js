const express = require('express');

const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json())

server.use("/users", userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   console.log(
//   `[${new Data().toISOString()}] ${req.method} 
//       to ${req.url} from ${req.get('Origin')}`
//   );
//   next();
// }
// server.use(logger);

module.exports = server;
