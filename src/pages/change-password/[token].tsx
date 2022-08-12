import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import InputField from '../../components/InputField'
import Wrapper from '../../components/Wrapper'
import { useChangePasswordMutation } from '../../generated/graphql'
import { createUrqlClient } from '../../util/createUrqlClient'
import { toErrorMap } from '../../util/toErrorMap'

interface ChangePasswordProps {
  children?: ReactNode
}

const ChangePassword: NextPage<ChangePasswordProps> = () => {
  const [, changePassword] = useChangePasswordMutation()
  const router = useRouter()
  const [tokenError, setTokenError] = useState('')
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const token = router.query.token
          const response = await changePassword({
            newPassword: values.newPassword,
            token: typeof token === 'string' ? token : ''
          })
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            // worked
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New Password"
              label="New Password"
              type="password"
            />

            {tokenError && (
              <Flex>
                <Box mr={2} color="red">
                  {tokenError}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>Click Here to get a new one</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
