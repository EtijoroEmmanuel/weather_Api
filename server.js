const express = require('express');
require('./config/database');
const weatherRouter = require('./routes/weatherRoutes')

const PORT = 1127;

const app = express();
app.use(express.json())
app.use(weatherRouter)

app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT:${PORT}`)
})