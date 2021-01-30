# purpose 

the purpose of this is to clean up the code and just have more practice on js.
adding new bits and pieces of new stuff ive learned.

- generally I also need to also redo the README

---

# frontend(react)

things i need to worry about

- folder structure
- changing stuff to `jsx`
- how things are organised
- have a second look at context
- set up some testing
- listing the dependencies
- cleaning up the styling, maybe use materialUI better or use emotionJS

## frontend notes

aside from the testing deps

- materialui/core
- materialui/icons
- materialui/lab
- materialui/picker
- axios
- clsx - combining react namespace
- moment - time format
- react
- react-dom
- react-router-dom
- react-scripts

removed deps for not being used

- react-toastify

## folder structure OK

current
```
- app
- assets
- common
- context
- helpers
- routes
```

new 
```
- app -ok
- assets - ok
- components - ok
- context - ok
- utils - ok
- pages - ok
```
everything seems ok, it ends up being general renaming of things

## Cleaning up checklist

- [ ] /app folder
  - [x] converting everything to jsx
  - [x] Rename cleanup
  - [x] App cleanup
  - [x] UserRoute cleanup
  - [x] AdminRoute cleanup
  - [ ] AppContainer cleanup
- [ ] edit public/html meta data

## Notes
- need a way to return to front page (both public/logged in)

---

# backend(express)

- rethink of the structure
- rewrite to check if the request is authenticated
- had some trouble with adding some testing, lets try again, but AFTER the important things are done
