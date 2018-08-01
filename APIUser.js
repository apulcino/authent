const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
const apiConnect = 'https://connect.afpforum.com:443/v0.9';

//------------------------------------------------------------------------------
// http://localhost:3000/api/user/login
//------------------------------------------------------------------------------
router.post('/login', (req, res) => {
    console.log('POST : /api/user/login');
    getApiUserLogin('apulcino', 'afwinw!se444').then(resp => {
        var allPromise = Promise.all([ 
            getApiUser(resp.Data.AuthToken), 
            getApiUserProducts(resp.Data.AuthToken, 'Text'),
            getApiUserProducts(resp.Data.AuthToken, 'Picture')
         ])
        allPromise.then((respArray => {
            resp.Data.Culture = respArray[0].Culture;
            resp.Data.Email = respArray[0].Email;
            resp.Data.IsPasswordEditable = respArray[0].IsPasswordEditable;
            resp.Data.IsAuthTokenExpired = respArray[0].IsAuthTokenExpired;
            resp.Data.TokenIssueDateUtc = respArray[0].TokenIssueDateUtc;
            resp.Data.TokenExpirationDateUtc = respArray[0].TokenExpirationDateUtc;

            resp.Data.hasAccessToTexts = (respArray[1].length !== 0);
            resp.Data.hasAccessToPictures = (respArray[2].length !== 0);
            resp.Data.password = '...';

            res.end(JSON.stringify(resp));
        })).catch(err => {
            console.log('Error 0 : ', err);                        
        });
    }).catch(err => {
        console.log('Error 1 : ', err);            
    });
})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
router.get('/', (req, res) => {
    getApiUser(req.query.auth).then(respData => {
        res.send(respData);        
    }).catch(err => {
        console.log('Error 2 :', err);
    });
})

//------------------------------------------------------------------------------
// 
//------------------------------------------------------------------------------
router.get('/products/:itemNature', function (req, res) {
    getApiUserProducts(req.query.auth, req.params.itemNature).then(respData => {
        res.send(respData);        
    }).catch(err => {
        console.log('Error 2 :', err);
    });
})

//------------------------------------------------------------------------------
// https://connect.afpforum.com:443/v0.9/api/user/products/Picture?auth=F43D...FEC5
//------------------------------------------------------------------------------
function getApiUserProducts(token, itemNature) {
    let url = apiConnect + '/api/user/products/{itemNature}?auth=' + token;
    url = url.replace('{itemNature}', itemNature);
    console.log('GET : /api/user/products : ', url);
    return new Promise(function (resolve, reject) {
        fetch( url , {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            return response.json();
        }).then(function(json){
            console.log('getApiUserProducts : ', json);            
            resolve(json.Data[0].Products);
        }).catch(err => {
            console.log('getApiUserProducts : Error : ', err);                        
            resolve([]);
        });
    });
}
//------------------------------------------------------------------------------
// https://connect.afpforum.com:443/v0.9/api/user?auth=F43D311F
//------------------------------------------------------------------------------
// "Data": {
//     "Login": "apulcino",
//     "Culture": "fr-FR",
//     "Email": "Alfredo.PULCINO@afp.com",
//     "IsPasswordEditable": false,
//     "IsAuthTokenExpired": false,
//     "TokenIssueDateUtc": "2018-07-31T08:53:26",
//     "TokenExpirationDateUtc": "2018-07-31T11:53:26"
//   },
//------------------------------------------------------------------------------
function getApiUser(token) {
    let url = apiConnect + '/api/user?auth=' + token;
    console.log('GET : /api/user : ', url);
    return new Promise(function (resolve, reject) {
        fetch( url , {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            return response.json();
        }).then(function(json){
            console.log('getApiUser : ', json);
            resolve(json.Data);
        }).catch(err => {
            console.log('getApiUser : Error : ', err);                        
            resolve({});
        });
    });
}
//------------------------------------------------------------------------------
// https://connect.afpforum.com:443/v0.9/api/user/login
//------------------------------------------------------------------------------
// "Data": {
//     "Login": "apulcino",
//     "AuthToken": "F50B3F201A4073F1F4F3AC5CCB0600000C64AA539A877A6D7BC9CD706E89607C030730089B539E32E2DE42637034B85BA3730E227742C6CFB594DF297AB4D58B4DCC8947275B633F77DD53177EAEF3EC",
//     "ExpirationUtcDate": "2018-07-31T11:54:03",
//     "UserPath": "UserIF.UserAFP.Technic.Admin"
//   },
//------------------------------------------------------------------------------
function getApiUserLogin(login, password) {
    console.log('POST : /api/user/login');
    return new Promise(function (resolve, reject) {
        fetch(apiConnect + '/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AFP-IGNORE-IP': 'true'
            },
            body: JSON.stringify({Login: login, Password: password})
        }).then(response => {
            return response.json();
        }).then(function(json){
            console.log('getApiUserLogin : ', json);
            resolve(json);
        }).catch(err => {
            console.log('Error 2 :', err);
            reject(err);
        });    
    });        
}

module.exports = router;