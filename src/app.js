// core modules
const path = require('path')

// npm modules
const express = require('express')
const hbs = require('hbs')

// user-created modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
// after changing the views dir name to templates
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Center',
        helpText: "Lorem ipsum dolor sit amet.",
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    // when the user loads the page with a
    //      query string, access the address
    //      value from the query string
    if (!req.query.address) {
        return res.send({
            error: 'Error: You must provide a location.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about
// the 404 error routes go last before the listener

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: "Help article not found",
        name: 'Andrew Mead'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: "Page not found",
        name: 'Andrew Mead'
    })
})

app.listen(3000, () => {
    console.log('The server is up on port 3000.')
})