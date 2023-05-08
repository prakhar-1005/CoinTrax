import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import CoinCard from './CoinCard'

const Coins = () => {

    const [coins,setCoins] = useState([])
    const [loading,setLoading] = useState(true)
    const [err,setErr] = useState(false)
    const [page,setPage] = useState(1)
    const [currency,setCurrency] = useState('inr')

    const currencySymbol= currency === 'inr'? '₹' : currency==='eur'? '€' : '$';

    useEffect(()=>{
        const fetchCoins =async ()=>{

            try {                
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data);
                setLoading(false);                
            } catch (error) {
                setErr(true)
                setLoading(false) 
            }
        }
        fetchCoins()
    },[currency,page])

    if(err){
        return <ErrorMessage message={"Error while fetching coins data"}/>
    }


    const handlePage =(p)=>{
        setPage(p);
        setLoading(true)
    }

    // since there are 10700 coins in this api and each page shows 100 coins, so 132 pages are needed. We create 132 buttons by declaring an array of 132 size and filling it initially with 1(can give any value initially, it doesn't matter as it will get rendered and the value will be set accordingly)
    const btns = new Array(107).fill(1)  


  return (
    <Container maxW={"container.xl"}>
        {loading ? <Loader/> : 
        <> 
            {/* onChange={setCurrency(e.target.value)} is not required as chakra ui components can handle it  */}
            <RadioGroup value={currency} p={8} onChange={setCurrency} >  
                <HStack spacing={4} justifyContent={'right'}>
                    <Radio colorScheme='green' value={'inr'}>INR</Radio>
                    <Radio colorScheme='green' value={'usd'}>USD</Radio>
                    <Radio colorScheme='green' value={'eur'}>EUR</Radio>
                </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                {
                    coins.map(coin=>(
                        <CoinCard key={coin.id} id={coin.id} name={coin.name} price={coin.current_price} img={coin.image} symbol={coin.symbol} currencySymbol={currencySymbol} />    
                    ))
                }
            </HStack>
            

            {/* pagination */}
            {/* can also write overflowX={'scroll'}*/}
            <HStack overflowX={'auto'} w={'full'} p={8} >  
              {  btns.map((item,index)=>(    // item argument is not needed but index is needed    
                    <Button key={index} onClick={()=>handlePage(index+1)} bgColor={'blackAlpha.900'} color={'white'} >{index+1}</Button>
                ))
              }
            </HStack>
        </>}
    </Container>
  )
}

export default Coins
