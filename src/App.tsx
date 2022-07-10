import {useState} from 'react';
import {useQuery} from 'react-query'
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Item from './Item/Item'
import Badge from '@mui/material/Badge';
// styles
import styled from 'styled-components'
import { IconButton } from '@mui/material';
import Cart from './Cart/Cart';

const Wrapper = styled.div`
  margin: 40px;
`
const StyledButton=styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top:20px;
`
//types

export type CartItemType={
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const getProducts=async():Promise<CartItemType[]>=>await( await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [cartOpen,setCartOpen]=useState(false)
  const [cartItems,setCartItems]=useState([] as CartItemType[])
  const {data,isLoading,error}=useQuery<CartItemType[]>(
    'products',
    getProducts
  )
  console.log(data)
  const getTotalItems=(items:CartItemType[])=>items.reduce((acc:number,item)=>acc+item.amount,0);
  const handleAddToCart=(clickedItem:CartItemType)=>{
    setCartItems(prev=>{
      // the item already in cart
      const isItemInCart=prev.find(item=>item.id===clickedItem.id)
      if(isItemInCart){
        return prev.map(item=>item.id===clickedItem.id?{...item,amount:item.amount+1}:item)
      }
      return [...prev,{...clickedItem,amount:1}]
    })
  };
  const handleRemoveFromCart=(id:number)=>{
    setCartItems(prev=>{
       return prev.reduce((acc:CartItemType[],item)=>{
        if(item.id===id){
          if(item.amount===1) return acc
          return [...acc,{...item,amount:item.amount-1}]
        }else{
          return [...acc,item]
        }
       },[] as CartItemType[])
    })
  };

  if(isLoading) return <LinearProgress/>
  if(error) return <div>Something wrong</div>
  return (
    <Wrapper >
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}><Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/></Drawer>
      <StyledButton onClick={()=>setCartOpen(true)}><Badge badgeContent={getTotalItems(cartItems)} color='error'><AddShoppingCartIcon/></Badge></StyledButton>
    <Grid container spacing={3}>
    {
    data?.map(item=><Grid item key={item.id} xs={12} sm={3}><Item item={item} handleAddToCart={handleAddToCart}/></Grid>)
   }
    </Grid>
    </Wrapper>
  );
}

export default App;
