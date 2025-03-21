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
        if (!SECRET_KEY && SECRET_KEY == null) {
            return res.status(500).json({ 
                message: 'Invalid 0r missing API key' 
            })
        };


        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${SECRET_KEY}`);
        
        // create an instance
        const { name, main, weather, wind } = response.data
        
        const weatherData = {
                cityName: name,
                temperature: main.temp,
                weatherConditin: weather[0].description,
                windSpeed: wind.speed
        }
    
    res.status(200).json({
        message: `This is weatherData of: ${cityName}`,
        data: {
            cityName: cityName,
                temperature: main.temp,
                weatherConditin: weather[0].description,
                windSpeed: wind.speed
        }
    })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}