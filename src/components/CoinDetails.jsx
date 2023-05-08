import { Badge, Box, Button, Container, HStack, Image, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { server } from '../index'
import axios from 'axios'
import ErrorMessage from './ErrorMessage'
import { useParams } from 'react-router-dom'
import CustomBar from './CustomBar'
import Item from './Item'
import Chart from './Chart'

const CoinDetails = () => {

  const param = useParams()

  const [coin,setCoin] = useState({})
  const [loading,setLoading] = useState(true)
  const [err,setErr] = useState(false)
  const [currency,setCurrency] = useState('inr')
  const [days,setDays] = useState("24h")   // given int the documentation of chartjs on how to send days in API
  const [chartArray,setChartArray] =useState([])

  const currencySymbol= currency === 'inr'? '₹' : currency==='eur'? '€' : '$';

  const btns=["24h","7d","14d","30d","60d","200d","365d","max"]


  useEffect(()=>{
    const fetchCoin =async ()=>{

        try {                
            const {data} = await axios.get(`${server}/coins/${param.id}`)
            const {data:chartData} = await axios.get(`${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`)
            setCoin(data);
            setChartArray(chartData.prices)
            setLoading(false);                  
        } catch (error) {
            setErr(true)
            setLoading(false) 
        }
    }
    fetchCoin()
},[param.id,currency,days])

if(err){
  return <ErrorMessage message={"Error While fetching data about the coin"}/>
}


  return (
    // Container is used to constrain a content's width to the current breakpoint, while keeping it fluid.
    <Container maxW={'container.lg'}>    
      {
        loading ? <Loader/> :
        (
          <>
            {/* Box is like a div element */}
            <Box width={'full'} mt={8} >
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p={2} justifyContent={'space-evenly'} overflowX={'auto'} >
                {
                  btns.map(btn=>(
                    <Button key={btn} onClick={()=>{setDays(btn); setLoading(true);}}>{btn}</Button>
                  ))
                }
            </HStack>

            <RadioGroup value={currency} p={8} onChange={setCurrency} >  
                  <HStack spacing={10} justifyContent={'center'}>
                      <Radio colorScheme='green' value={'inr'}>INR</Radio>
                      <Radio colorScheme='green' value={'usd'}>USD</Radio>
                      <Radio colorScheme='green' value={'eur'}>EUR</Radio>
                  </HStack>
            </RadioGroup>

            <Text fontSize={'md'} alignSelf={"center"} textAlign={'center'} opacity={0.8}>
                  Last Updated On {Date(coin.market_data.last_updated).split('G')[0]}
                </Text>

            <HStack justifyContent={'center'} p={10} spacing="200px" w={'full'} >
            {/* By default alignItems={'center'} for VStack so we do not change it here */}
                <VStack textAlign={"center"} >

                    <Image src={coin.image.large} w={28} h={'28'} objectFit={'contain'} />

                    <Stat>
                      <StatLabel fontSize={"lg"}>{coin.name}</StatLabel>
                      {/* const obj={ x : 'good' } then obj.x will be equal to 'good' & obj['x'] will also be equal to 'good' */}
                      <StatNumber fontSize={"md"}>
                        {currencySymbol}{coin.market_data.current_price[currency]}
                      </StatNumber>
                      <StatHelpText>
                        <StatArrow type={coin.market_data.market_cap_change_percentage_24h>0 ? 'increase' : 'decrease'}/>{coin.market_data.market_cap_change_percentage_24h}%
                      </StatHelpText>
                    </Stat>

                    <Badge fontSize={'lg'} bgColor={'blackAlpha.800'} color={'white'}>
                      #{coin.market_cap_rank}
                    </Badge>
                </VStack>

            </HStack>

            <CustomBar currencySymbol={currencySymbol} high={coin.market_data.high_24h[currency]} low={coin.market_data.low_24h[currency]}/>
            
            <Box w={'full'} mt='30px' p={4} >
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
              <Item title={'Market Cap'}  value={`${currencySymbol}${coin.market_data.market_cap[currency]}` } />
              <Item title={'All Time High'} value={ `${currencySymbol}${coin.market_data.ath[currency]}` } />
              <Item title={'All Time Low'} value={ `${currencySymbol}${coin.market_data.atl[currency]}` } />
            </Box>
          </>
        )
      }
    </Container>
  )
}

export default CoinDetails
