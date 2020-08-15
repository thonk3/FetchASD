#!/bin/bash

react_dep() {
    cd react;
    echo "[REACT] installing dependencies, give this asec";
    npm i > /dev/null 2>&1;

    echo "[REACT] instalation complete";
}

express_dep() {
    cd express;
    echo "[EXPRS] installing dependencies";
    npm i > /dev/null 2>&1;

    echo "[EXPRS] instalation complete";
}



# letsa go
react_dep &
express_dep &


wait
echo "\ndependencies istallation complete"