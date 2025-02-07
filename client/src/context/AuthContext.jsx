import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    user: localStorage.getItem('user') != undefined ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
};

// Corrected naming convention for createContext
const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                token: null,
                role: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
            };
        case 'LOGOUT':
            return {
                user: null,
                token: null,
                role: null,
            };

        default:
            return state;
    }
};


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
        localStorage.setItem('token', state.token);  // Do not JSON.stringify here
        localStorage.setItem('role', state.role);    // Do not JSON.stringify here
    }, [state]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                role: state.role,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };