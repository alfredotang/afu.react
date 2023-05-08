import type { DeepMap, FieldError } from 'react-hook-form'
import { useEffect } from 'react'

type FormScrollToErrorWrapperProps = {
  errors: DeepMap<any, FieldError>
  children: React.ReactNode
}

const ScrollToErrorWrapper = ({ errors, children }: FormScrollToErrorWrapperProps) => {
  useEffect(() => {
    // console.log({ ALL_ERROR: errors });
    const keys = Object.keys(errors)
    if (keys.length > 0) {
      errors[keys[0]]?.ref?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [errors])

  return <>{children}</>
}

export default ScrollToErrorWrapper
