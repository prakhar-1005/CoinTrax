import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

const Item = ({title,value}) => {
  return (
    <HStack justifyContent={'space-between'} w={'full'} my={4}>
        <Text fontFamily={'Bebas Neue'} fontSize={'lg'} letterSpacing={'widest'}>{title}</Text>
        <Text>{value===null? 'NA' :value}</Text>
    </HStack>
  )
}

export default Item
