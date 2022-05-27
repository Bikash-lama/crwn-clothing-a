import { createContext , useState, useEffect} from 'react';

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItem)=>total + cartItem.quantity, 0)
        setCartCount(newCartCount);

    }, [cartItems]);

    useEffect(()=> {
        const newCartTotal = cartItems.reduce((total, cartItem)=>total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);

    }, [cartItems]);

    const addItemToCart = (cartItemToRemove) => {
        setCartItems(addCartItem(cartItems, cartItemToRemove));
    }

    const removeItemToCart = (productToAdd) => {
        setCartItems(removeCartItem(cartItems,productToAdd));
    }

    const clearItemToCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems,cartItemToRemove));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        clearItemToCart,
        cartItems, 
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};