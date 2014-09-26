Creating an OAuth server in Node.JS that gives access to user phone no. and addresses.
=====================================================================================

This is an example of the oAuth authorization grant flow using oauth2orize, express 4 and mongoDB.

##### Installation

```
git clone https://github.com/gsrivast31/userify.git
npm install
node app.js
```

##### Usage (with cURL)

###### 0 - Register a client

Navigate to /client/registration. Register a new client.

###### 1 - Register a user

Navigate to /registration. Register a new user.

###### 2 - Get authorization token

Navigate to /login?clientId=&lt;clientId&gt;&redirectUri=&lt;redirectUri&gt;. Login with username and password. Then allow the client to access your account.
If everything works the authorization code is returned.

###### 3 - Exchange the authorization code for a access token

```
curl  -v  -H "Content-Type: application/json" -X POST <IP>:<PORT>/oauth/token -u <clientId>:<clientSecret> -d '{"code": "<authorization_code>", "grant_type": "authorization_code"}'
```

###### 4 - Access a restricted resource using the access token

```
curl -X GET <IP>:<PORT>/restricted -v -H "Authorization: Bearer <accessToken>"
```

