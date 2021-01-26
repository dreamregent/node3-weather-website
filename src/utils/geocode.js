const request = require('postman-request')

// geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
//         encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHJlYW1yZWdlbnQiLCJhIjoiY2trOThteWFsMDJ1bzJ2bWZ6aTNyMGF6NyJ9.is5C7EfDJqEgkwkURADIqA&limit=1'

//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location! Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }

/* USING OBJECT DESTRUCTURING */

geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
        encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHJlYW1yZWdlbnQiLCJhIjoiY2trOThteWFsMDJ1bzJ2bWZ6aTNyMGF6NyJ9.is5C7EfDJqEgkwkURADIqA&limit=1'

    request({ url, json: true}, (error, {body:msgBody}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (msgBody.features.length === 0) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: msgBody.features[0].center[1],
                longitude: msgBody.features[0].center[0],
                location: msgBody.features[0].place_name
            })
        }
    })
}

module.exports = geocode