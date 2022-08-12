import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea
} from '@chakra-ui/react'
import { useField } from 'formik'
import type { NextPage } from 'next'
import { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  //   children?: ReactNode
  name: string
  label: string
  textarea?: boolean
}

const InputField: NextPage<InputFieldProps> = ({
  label,
  size: _,
  textarea = false,
  ...props
}) => {
  const [field, { error }] = useField(props)
  let InputOrTextArea: any = Input
  if (textarea) {
    InputOrTextArea = Textarea
  }
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextArea
        {...props}
        {...field}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default InputField
