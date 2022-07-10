import React from 'react'
import { Button } from '@mui/material'
import styled from 'styled-components'
import { CartItemType } from '../App'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid blue;
  height: 100%;

  button{
    border-radius: 0 0 20px 20px;
  }

  img{
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  div{
    font-family: Arial;
    padding:1rem ;
    height: 100%;
  }
`

//type
type Props={
    item:CartItemType;
    handleAddToCart:(clickedItem:CartItemType)=>void;
}

const Item = ({item,handleAddToCart}:Props) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
    </Wrapper>
  )
}

export default Item
