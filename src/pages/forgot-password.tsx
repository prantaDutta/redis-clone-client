import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { ReactNode, useState } from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrqlClient } from '../util/createUrqlClient'

interface ForgotPasswordProps {
  children?: ReactNode
}

const ForgotPassword: NextPage<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false)
  const [, forgotPassword] = useForgotPasswordMutation()
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword(values)
          setComplete(true)
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we will send you an email
              with a link
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                label="Email"
              />
              <Button
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(ForgotPassword)
