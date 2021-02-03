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

const _token = () => {
    try {
        let tkpl = localStorage.getItem("tokens").split('.')[1]
        return JSON.parse(atob(tkpl));
    } catch (e) {
        console.log("token err: ", e);
        return null;
    }
};
const token = {
    getToken: () => _token().id,
    getID: () => _token().id,
    getName: () => _token().name,
    isStaff: () => _token().staff,

}

export default token;