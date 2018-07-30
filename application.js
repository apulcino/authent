const fetch = require('node-fetch');
const express = require('express');
const application = express();
const apiConnect = 'https://connect.afpforum.com:443/v0.9';

// https://connect.afpforum.com:443/v0.9/api/user/login
application.post('/api/user/login', (req, res) => {
    console.log('POST : /api/user/login');
    fetch(apiConnect + '/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({Login: "apulcino", Password: "afwinw!se444"})
    }).then(response => {
        return response.json();
    }).then(function(json){
        console.log(json);
        res.end(JSON.stringify(json));
    }).catch(err => {
        console.log(err);
    });
})

// application.get('/api/user', (req, res) => {
//     console.log('GET : /api/user');
//     fetch(apiConnect, {
//         method: 'GET',
//         headers: {'Content-Type': 'application/json'},
//     }).then(response => {
//         return response.json();
//     }).catch(err => {
//         console.log(err);
//     });
// })

// req.params.itemNature
// application.get('/api/user/products/:itemNature', function (req, res) {

// })

module.exports = application;