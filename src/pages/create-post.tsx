import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { createUrqlClient } from '../util/createUrqlClient'
import { useIsAuth } from '../util/useIsAuth'

interface CreatePostProps {
  children?: ReactNode
}

const CreatePost: NextPage<CreatePostProps> = ({}) => {
  const router = useRouter()
  useIsAuth()
  const [, createPost] = useCreatePostMutation()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values })
          if (!error) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="teal"
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(CreatePost)
