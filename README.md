# Amateur Sausage Deli

- [Amatuer Sausage Deli](#amatuer-sausage-deli)
  - [Availiable scripts](#availiable-scripts)
    - [Development build](#development-build)
    - [Deployment build](#deployment-build)
---

## Availiable scripts

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
> to install: `npm i -g nodemon`

### Deployment build

1. build the react static files.
   - in the react dir `npm run build`
2. run the express server
   - in the express dir `node sever.js`

the page will be run on port `5000` (just for now)