// Imports
import jwtDecode from 'jwt-decode';
import React, {createContext, useReducer} from 'react';


// Initial state
const initialState = {
    user:null
};


// Local storage check
if (typeof window !== 'undefined'){
    if(localStorage.getItem('token')){
        const decodedToken = jwtDecode(window.localStorage.getItem('token'));
         if(decodedToken.exp > Date.now()){
            window.localStorage.removeItem('token');
        }else{
            initialState.user = decodedToken;
        }
    }
}


// Context
const AuthContext = createContext({
    user:null,
    login:userData => {},
    logout:() => {}
});


// Reducer
const AuthReducer = (state, action) => {
    switch (action.type) {
        // Login
        case 'LOGIN':
            return {
                ...state,
                user:action.payload
            }
        // Logout
        case 'LOGOUT':
            return{
                ...state,
                user:null
            }
        // Default
        default:
            return state;
    };
};


// Provider
const AuthProvider = props => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    // Login
    const login = userData => {
        localStorage.setItem('token', userData.token);
        dispatch({
            type:'LOGIN',
            payload:userData
        });
    };
    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        dispatch({
            type:'LOGOUT'
        });
    };
    return(
        <AuthContext.Provider
            value={{user:state.user, login, logout}}
            {...props}
        />
    );
};


// Export
export {AuthContext, AuthProvider};