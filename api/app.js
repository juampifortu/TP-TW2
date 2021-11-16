const express = require('express');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

const cognito = require('./src/cognito');

const AWS = require('aws-sdk');

global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : "us-east-2_zYu3aWlOC", // Your user pool id here    
    ClientId : "6c8s326j80vdcsilue5q9nq8ul" // Your client id here
    }; 
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return "hello world";
});
app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body.email));
    console.log(JSON.stringify(req.body.password));
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : req.body.email,
        Password : req.body.password
    });
    var userData = {
        Username : req.body.email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            // console.log('id token + ' + result.getIdToken().getJwtToken());
            // console.log('refresh token + ' + result.getRefreshToken().getToken());
            
            res.json({token: `${result.getAccessToken().getJwtToken()}` });
        },
        onFailure: function(err) {
            console.log(err);
            res.json({error : `${err}`});
        }

    });

});
app.post('/registro', (req, res) => {
    console.log(JSON.stringify(req.body));
    //console.log(atributos);
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address", Value: req.body.direccion}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name", Value: req.body.nombre}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email", Value: req.body.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name", Value: req.body.apellido}));
    
    userPool.signUp(req.body.email, req.body.password, attributeList, null,
    function  (error, result){
        if (error) {
            console.log(err);
            return;
        }
        user = result.user;
        console.log('user name is ' + result.user.getUsername());
        res.json({ usuario: `${user.getUsername()}` })
        });
    
});


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});