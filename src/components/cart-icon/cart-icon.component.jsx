import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

function CartIcon() {
    const { isCartOpen, setIsOpen, cartCount } = useContext(CartContext);

    function toggleIsCartOpen() {
        setIsOpen(!isCartOpen);
    }

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    );
}

export default CartIcon;