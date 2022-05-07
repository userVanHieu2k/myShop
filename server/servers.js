const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const db = require('./db')
const movieRouter = require('./routes/movie-router')
const loginRouter = require('./routes/login-router')
const productRouter = require('./routes/product-router')
const storeRouter = require('./routes/store-router')
const addressRouter = require('./routes/address-router')
const OrderRouter = require('./routes/order-router');
const NotifyRouter = require('./routes/notify-router');
const PaymentRouter = require('./routes/payment');
const EmployeeRouter = require('./routes/employee-router');
const ProductHightLightRouter = require('./routes/productHightLight-router');
const app = express();
const path = require('path');
const Order = require('./models/order-model');
const Notify = require('./models/notify-model');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, { origins: 'https://shoptranh.herokuapp.com' });
const apiPort = process.env.PORT || 3001
const portSocket = process.env.PORTSOCKET || 3002
// proxy middleware options
let interval;
let countAccess = 0;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json());
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use('/api', movieRouter)
app.use('/api', loginRouter)
app.use('/api', productRouter)
app.use('/api', storeRouter)
app.use('/api', addressRouter)
app.use('/api', OrderRouter)
app.use('/api', NotifyRouter)
app.use('/api', PaymentRouter)
app.use('/api', EmployeeRouter);
app.use('/api', ProductHightLightRouter);
app.listen(apiPort, () => console.log(`Server running on port server ${apiPort}`));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('client/build'));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}
io.listen(portSocket, () => console.log(`Server running on port ${apiPort}`));
