const request = require('postman-request')

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=af9a4a7aba8444a0df78dac23e996a46&query=' +
        encodeURIComponent(latitude) + ',' +
        encodeURIComponent(longitude) + '&units=f'

    request({ url, json: true }, (error, {body:msgBody}) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined)
        } else if (msgBody.error) {
            callback("The location provided was invalid!", undefined)
        } else {
            callback(undefined, msgBody.current.weather_descriptions[0] + 
                ". It is currently " + msgBody.current.temperature +
                " degrees out. " + msgBody.current.precip +
                " inches of rain has fallen.")
        }
    })
}

module.exports = forecast