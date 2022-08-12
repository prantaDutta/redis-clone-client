import { Box, Button, Flex, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../util/isServer'

interface NavbarProps {
  children?: ReactNode
}

const Navbar: NextPage<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  })
  let body = null
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={'/login'}>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href={'/register'}>
          <Link mr={2}>Register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Box>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => logout()}
          variant="link"
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Box>
    )
  }
  return (
    <Flex position="sticky" top="0" zIndex={1} p="4" bg="tan">
      <Box ml="auto">{body}</Box>
    </Flex>
  )
}

export default Navbar
