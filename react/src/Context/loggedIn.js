/* 
    use to set the overal logged in state, for nav/ pogin page redirect
*/

import { createContext, useContext } from 'react'

export const LoggedInContext = createContext();

export function useLoggedIn() {
    return useContext(LoggedInContext);
}

