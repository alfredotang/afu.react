import { useEffect } from 'react'
import type { FieldErrors, FieldValues } from 'react-hook-form'

/**
 * @description auto scroll to error
 * @param errors react-hook-form -> const { formState: { errors }} = (useForm | useFormContext)
 */
function useScrollToError<T extends FieldValues>(errors: FieldErrors<T>): void {
  useEffect(() => {
    const keys = Object.keys(errors)
    if (keys.length === 0) return
    console.log({ ALL_ERROR: errors })
  }, [errors])
}

export default useScrollToError
