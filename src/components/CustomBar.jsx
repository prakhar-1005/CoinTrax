import { Badge, HStack, Progress, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const CustomBar = ({high,low,currencySymbol}) => {
  return (
    <VStack w={'full'}>
      <Progress value={50} size={'sm'} colorScheme={'teal'} w={'full'}/>
      <HStack w={'full'} justifyContent={'space-between'}>
            <Badge color={'red'}>{currencySymbol} {low}</Badge>       {/*<Badge color={'red'} children={low}/>  can also be written*/}
               <Text>24H Range</Text> 
            <Badge color={'green'}>{currencySymbol} {high}</Badge> 
      </HStack>
    </VStack>
  )
}

export default CustomBar
