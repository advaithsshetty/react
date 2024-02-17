import React, { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';

const cartContext = createContext();

const initialState = {
    cartItems: []
};

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (item) => {
        return dispatch({
            type: 'ADD_TO_CART',
            payload: { item }
        });
    };

    const removeItem = (itemId) => {
        return dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { itemId }
        });
    };

    const incrementItem = (itemId) => {
        return dispatch({
            type: 'INCREMENT_ITEM',
            payload: { itemId }
        });
    };

    const decrementItem = (itemId) => {
        return dispatch({
            type: 'DECREMENT_ITEM',
            payload: { itemId }
        });
    };

    const values = {
        ...state,
        addItem,
        removeItem,
        incrementItem,
        decrementItem
    };

    return (
        <cartContext.Provider value={values}>
            {children}
        </cartContext.Provider>
    );
};


export default cartContext;
export { CartProvider };