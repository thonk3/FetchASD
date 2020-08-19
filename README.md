# Amateur Sausage Deli

[![Codeship Status for doppeltwirkend/AmatuerSausageDeli](https://app.codeship.com/projects/be207d10-bda5-0138-63db-360f77155614/status?branch=master)](https://app.codeship.com/projects/405472)

---

## Availiable scripts

install required node_modules

```
npm install
```

run the frontend(react) for development

```
npm run dev-react
```

run the backend(express) for development

```
npm run dev-express
```

to build and deploy
```
npm run build
npm run start
```

> **Note**: A MongoDb connection string is required  for the variable `ATLAS_URI` in `express/.env` file to run the express server.

<!-- ## Old scripts

run `sh install_deps.sh` to install the required node modules

### Development build

> remember to to run the install dependancies script when you first cloned the repo

react
```
cd react
npm run start
```

express
```
cd express
nodemon
```

> NOTE: `nodemon` may need to be installed globaly in your system
>
> to install: `npm i -g nodemon` -->


<!-- 
### Deployment build

1. build the react static files.
   - in the react dir `npm run build`
2. run the express server
   - in the express dir `node sever.js`

<<<<<<< HEAD
the page will be run on port `5000` (just for now)

Yeet
=======
the page will be run on port `5000` (just for now) -->
>>>>>>> a135fde15e8c07aa13bee767b210eed6de26037b
