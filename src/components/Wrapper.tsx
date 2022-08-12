import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { ReactNode } from 'react'

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
  children?: ReactNode
  variant?: WrapperVariant
}

const Wrapper: NextPage<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box maxW={'800px'} w={variant === 'regular' ? '800px' : '400px'} mx="auto">
      {children}
    </Box>
  )
}

export default Wrapper
