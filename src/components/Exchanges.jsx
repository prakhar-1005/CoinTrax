import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack} from '@chakra-ui/react'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import ErrorMessage from './ErrorMessage'

const Exchanges = () => {

    const [exchanges,setExchanges] = useState([])
    const [loading,setLoading] = useState(true)
    const [err,setErr] = useState(false)


    useEffect(()=>{
        const fetchExchanges = async()=>{

            try {
                const {data} = await axios.get(`${server}/exchanges?per_page=150`)
                setExchanges(data)
                setLoading(false)                
            } catch (error) {
                setErr(true);
                setLoading(false)                
            }
        }
        fetchExchanges()
    },[])

    if(err){
        return <ErrorMessage message={"Error while fetching exchanges data"}/>
    }

  return (
    <Container maxW={"container.xl"}>
        {loading ? <Loader/> : 
        <> 

            <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                {
                    exchanges.map(exchange=>(
                        <ExchangeCard key={exchange.id} name={exchange.name} img={exchange.image} rank={exchange.trust_score_rank} url={exchange.url} />    
                    ))
                }
            </HStack>
        </>}
    </Container>
  )
}

export default Exchanges
