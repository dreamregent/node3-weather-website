// * basic example of using fetch()
// * this is a client-side js function
// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json().then((data) => {
//             console.log(data)
//         })
//     })

// fetch('http://localhost:3000/weather?address=boston')
//     .then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 return console.log(data.error)
//             }
//             console.log(data.location)
//             console.log(data.forecast)
//         })
//     })

const weatherForm = document.querySelector('form')
const searchString = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchString.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    return
                }
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            })
        })
})