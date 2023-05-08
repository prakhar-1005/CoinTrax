import { Box, Button, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' 
import logo from '../images/img11.png'

const Mobile = () => {
  return (
    <Box w={"full"} justifyContent={'center'} pt={'20'} bgColor={"blackAlpha.900"} color={"white"} h={'100vh'}>
      <VStack spacing={'12'} justifyContent={'center'} alignItems={'center'} >
          <Heading fontFamily={'Poppins'} w={'full'} textAlign={"center"} fontSize={'5xl'} lineHeight={'tall'}>€oinTrax 
          <Text fontFamily={'Poppins'} fontSize={'2xl'}>Tracking the pulse of the crypto <br /> market . . . .</Text>
          <Link to='/coins'><Button mr={9} colorScheme='teal' px={6}>Coins</Button></Link>
          <Link to='/exchanges'><Button px={4} colorScheme='teal'>Exchanges</Button></Link>
          </Heading>
          <motion.div animate={{translateY:'20px'}} transition={{duration:1, repeat:Infinity,repeatType:'reverse'}}><Image src={logo} h={'xs'}  w={'lg'} filter={'grayscale(1)'} /></motion.div>
      </VStack>
    </Box>
  )
}

export default Mobile
