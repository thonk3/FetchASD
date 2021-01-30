/* 
    Context to handle auth 
*/
import { createContext, useContext } from 'react'

// create context obj
export const AuthContext = createContext();

// similar to react hooks, returns obj
// { thing, useThing }
export function useAuth() {
    return useContext(AuthContext);
}


