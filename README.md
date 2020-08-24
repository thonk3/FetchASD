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

> **Note**: `nodemon` is required to run the dev-react script
>
> to install: `npm i -g nodemon`

to build and deploy

```
npm run build
npm run start
```

> **Note**: A MongoDb connection string is required  for the variable `ATLAS_URI` in `express/.env` file to run the express server.
