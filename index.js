const env = process.env;
const express = require('express');
const app = express();
const port = env.SERVICE_PORT || 3000;
const server = env.SERVICE_SERVER || 'http://localhost'
const carRegistrationRouter = require('./routes/carRegistration');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.json({'endpoints': ['/car/makes', '/car/models?make=ford&year=1999', '/car/info?vin=3N1AB6AP7BL729215']});
})

app.use('/car', carRegistrationRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});

  return;
});

app.listen(port, () => {
  console.log(`Car Registration Info app listening at ${server}:${port}`)
});
