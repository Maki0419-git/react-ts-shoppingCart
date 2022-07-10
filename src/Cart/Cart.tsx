import React from 'react'
// styles
import styled from 'styled-components'
import { CartItemType } from '../App'
import CartItem from './CartItem';

type Props={
    cartItems:CartItemType[];
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
}

const Wrapper = styled.div`
  width: 500px;
  padding: 20px;
`
const Cart = ({cartItems,addToCart,removeFromCart}:Props) => {
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length===0?<p>No items in cart.</p>:null}
      {
        cartItems.map(item=>(
            <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
        ))
      }
    </Wrapper>
  )
}

export default Cart
