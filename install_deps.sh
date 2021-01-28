#!/bin/bash

## function installing react npm deps
react_dep() {
    cd react;
    echo "[REACT] installing dependencies, give this asec";
    npm i > /dev/null 2>&1;

    echo "[REACT] instalation complete";
}

## function installing backend server npm deps
express_dep() {
    cd express;
    echo "[EXPRS] installing dependencies";
    npm i > /dev/null 2>&1;

    echo "[EXPRS] instalation complete";
}

# install react and express dependencies
react_dep &
express_dep &

wait
echo "\ndependencies istallation complete"