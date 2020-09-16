/* 
    helper functions to parse token, get data from token
*/


/**
 * returns the parse payload from jwt token
 * 
 * current obj
 * {
 *      id,
 *      email
 * }
 */
function token() {
    try {
        let tkpl = localStorage.getItem("tokens").split('.')[1]
        return JSON.parse(atob(tkpl));
    } catch (e) {
        console.log("token err: ", e);
        return null;
    }
}

export default token