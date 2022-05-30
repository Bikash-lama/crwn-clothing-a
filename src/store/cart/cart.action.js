import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from '../../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItems = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);

    if(existingCartItems){
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? 
        { ...cartItem, quantity: cartItem.quantity + 1}
        : cartItem)
    }

    return [...cartItems, { ...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItems = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id);

    if(existingCartItems.quantity ===1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem)=> cartItem.id === cartItemToRemove.id ? 
        { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}


export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


export const addItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItems = addCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToAdd) => {
    const newCartItems = removeCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
    
    
    