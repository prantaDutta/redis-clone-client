import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { createUrqlClient } from '../util/createUrqlClient'
import { toErrorMap } from '../util/toErrorMap'

interface LoginProps {
  children?: ReactNode
}

const Login: NextPage<LoginProps> = ({}) => {
  const [, login] = useLoginMutation()
  const router = useRouter()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username Or Email"
              label="Username Or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                type="password"
                label="Password"
              />
            </Box>
            <Flex justify="space-between" alignItems="center">
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Login
              </Button>

              <NextLink href="/forgot-password">
                <Link>Forgot Password?</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Login)
