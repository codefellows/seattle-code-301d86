'use strict';

// jwt - Json web token (pronounced Jot)
const jwt = require('jsonwebtoken');

// jwks - json web key set (pronounced Ja-wick)
const jwksClient = require('jwks-rsa');

// the jwks uri comes from Auth0 account page -> Advanced Settings -> Endpoins -> 0Auth -> JSON Web Key Set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// I need a getKey function to make things works
// from the jsonwebtoke docs: https://www.npmjs.com/package/jsonwebtoken
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// We are writing this function to verify that the user on routte has the right do make the reqest. This is just how we do it:

function verifyUser(req, errorFirstOrUseTheUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // from the json web token docs:
    jwt.verify(token, getKey, {}, errorFirstOrUseTheUserCallbackFunction);
  } catch(error) {
    errorFirstOrUseTheUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser
