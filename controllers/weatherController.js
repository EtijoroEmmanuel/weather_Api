const axios = require('axios');
const SECRET_KEY = process.env.OPENWEATHER_SECRET_KEY;
// const formattedDate = new Date().toLocaleSting();

exports.readWeather = async(req, res)=>{
    try {
     
         const {cityName} = req.query
        // check if city name is inputued
        if(cityName === null){
            res.status(404).json({
                message: "Invalid city"
            })  
        };

        // check if API key is Entered
        if (!SECRET_KEY){
            return res.status(500).json({ 
                message: 'Invalid 0r missing API key' 
            })
        };


        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${SECRET_KEY}`);
        
        // create an instance
        const { name, main, weather, wind, humidity, sys } = response.data
        console.log(response)
        
        const weatherData = {
                city: ` ${name}, ${sys.country}`,
                temperature: main.temp,
                condition: weather[0].description,
                wind_speed: wind.speed,
                humidity: main.humidity
                 
        }
    
    res.status(200).json({
        message: `This is weatherData of: ${cityName}`,
        data: {
            cityName:` ${name}, ${sys.country}`,
                temperature: main.temp,
                weatherConditin: weather[0].description,
                windSpeed: wind.speed,
                humidity: main.humidity    
        }
    })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}