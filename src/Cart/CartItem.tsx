import React from 'react'
// styles
import styled from 'styled-components'
import { Button, IconButton } from '@mui/material';
import { CartItemType } from '../App';

const Wrapper = styled.div`

    border-bottom: 1px solid skyblue;
    padding-bottom: 20px;

    div{
        flex:1
    }
    
    .info,.btn{
       display: flex;
       justify-content: space-between;
    }

    img{
        max-width: 80px;
        object-fit: cover;
        margin-left: 40px;
    }
`

type Props={
    item:CartItemType;
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
}

const CartItem = ({item,addToCart,removeFromCart}:Props) => {
  return (
    <Wrapper>
      <h3>{item.title}</h3>
      <div className='info'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount*item.price).toFixed(2)}</p>
      </div>
      <div className='btn'>
        <Button size='small' disableElevation variant='contained' onClick={()=>removeFromCart(item.id)
        }>
         -
        </Button>
        <p>{item.amount}</p>
        <Button size='small' disableElevation variant='contained' onClick={()=>addToCart(item)
        }>
         +
        </Button>
      </div>
      <img src={item.image} alt={item.title}/>
    </Wrapper>
  )
}

export default CartItem
