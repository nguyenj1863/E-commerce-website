import { createContext, useState, useEffect } from "react";

export function addCartItem(cartItems, cartItemToAdd) {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1}];
};

export function removeCartItem(cartItems, cartItemToRemove) {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    )

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id === cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
};

export function clearCartItem(cartItems, cartItemToClear) {
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export function CartProvider({children}) {
    const [isCartOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    function addItemToCart(cartItemToAdd) {
        setCartItems(addCartItem(cartItems, cartItemToAdd));
    }

    function removeItemToCart(cartItemToRemove) {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    function clearItemFromCart(cartItemToClear) {
        setCartItems(clearCartItem(cartItems, cartItemToClear));

    }

    const value = {
        isCartOpen, 
        setIsOpen, 
        addItemToCart, 
        removeItemToCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount, 
        cartTotal,
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}