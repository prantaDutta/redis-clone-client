import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'
import { createUrqlClient } from '../util/createUrqlClient'
import { toErrorMap } from '../util/toErrorMap'

interface RegisterProps {
  children?: ReactNode
}

const Register: NextPage<RegisterProps> = ({}) => {
  const [, register] = useRegisterMutation()
  const router = useRouter()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values })
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            // worked
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                type="password"
                label="Password"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                type="email"
                label="Email"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Register)
