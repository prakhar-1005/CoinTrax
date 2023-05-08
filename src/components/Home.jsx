import React from 'react'
import Desktop from './Desktop'
import { useMediaQuery } from "@chakra-ui/media-query";
import Mobile from './Mobile'

const Home = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      {isSmallScreen ? <Mobile/> : <Desktop/>}
    </>
  )
}

export default Home



