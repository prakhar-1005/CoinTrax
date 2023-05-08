import { Box, Button, HStack, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' 
import logo from '../images/img11.png'

const Desktop = () => {
  return (
    <Box w={"full"} justifyContent={'center'} pt={'16'} bgColor={"blackAlpha.900"} color={"white"} h={'100vh'}>
      <HStack spacing={'20'} justifyContent={'center'} alignItems={'center'} >
          <Heading fontFamily={'Poppins'} ml={20} w={'full'} textAlign={"left"} fontSize={'6xl'} lineHeight={'tall'}>€oinTrax 
          <Text fontFamily={'Poppins'} fontSize={'3xl'}>Tracking the pulse of the crypto <br /> market . . . .</Text>
          <Link to='/coins'><Button mr={7} colorScheme='teal' px={6}>Coins</Button></Link>
          <Link to='/exchanges'><Button px={5} colorScheme='teal'>Exchanges</Button></Link>
          </Heading>
          <motion.div animate={{translateY:'20px'}} transition={{duration:1, repeat:Infinity,repeatType:'reverse'}}><Image src={logo} h={'md'}  w={'8xl'} filter={'grayscale(1)'} /></motion.div>
      </HStack>
    </Box>
  )
}

export default Desktop
