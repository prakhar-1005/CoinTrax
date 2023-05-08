import { Button, HStack, Heading } from '@chakra-ui/react'
import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <>
        
        <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"} alignItems={'center'}> 

        <Link to='/'>
            <Heading size={'lg'} color={'white'} pr={'9'} cursor={'pointer'}> €oinTrax </Heading> 
        </Link>
        
        <Button variant={"unstyled"} fontSize={'lg'} pl={4} color={"white"}>
            <Link to="/">Home</Link>
        </Button>

        <Button variant={"unstyled"} fontSize={'lg'} pl={4} color={"white"}>
            <Link to="/coins">Coins</Link>
        </Button>

        <Button variant={"unstyled"} fontSize={'lg'} pl={4} color={"white"}>
            <Link to="/exchanges">Exchanges</Link>
        </Button>

    </HStack>
    </>
  )
}

export default Header
