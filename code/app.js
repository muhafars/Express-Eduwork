// import 
const router = require('./routes').router;
const log = require('./middlewares/logger');

// Inisialisasi
const express = require('express');
const app= express();

// membuat servers
const port = require('./routes').port;
const server= app.listen(port, () => {console.log(`server listening.. on port ${port}`)});

// membuat routing
// middlewres diatas res agar berjalan
app.use(log);
// mengembalikan nilai body yang dikirim dari postman api
app.use(express.urlencoded({ extended: true }));
app.use(router);
// handling error router
app.use((req, res, next) => {
    res.status(404);//tampil ke console web browser 
    // membuat tampil ke layar
    res.send({
        status: "failed",
        message: "Resource" +req.originalUrl + "Not Found"
    });
    next();
    
});