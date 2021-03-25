/* 
    Custom Logger
*/

const getTimeStamp = (): string => {
    return new Date().toISOString();
}

const log = (type: string) => {
    return (namespace: string, msg: string, object?: any) => {
        if (object) {
            console.log(`[${getTimeStamp()}] [${type}] [${namespace}] ${msg}`, object);
        } else {
            console.log(`[${getTimeStamp()}] [${type}] [${namespace}] ${msg}`);
        }
    }
}

const info = log("INFO");
const error = log("ERROR");
const warn = log("WARN");
const debug = log("DEBUG");

export default {
    info, warn, error, debug
}