import type { FC, ReactElement, ReactNode } from 'react'
import type { Theme } from '@mui/material/styles'
import { memo } from 'react'
import { Grid } from '@mui/material'

function returnColor(theme: Theme, isDisabled: boolean, isError: boolean) {
  if (isDisabled) {
    return theme.palette.text.disabled
  }

  if (isError) {
    return theme.palette.error.main
  }

  return theme.palette.text.primary
}

interface WordCounterProps {
  children: ReactElement
  value: any
  maxLength?: number
  error?: boolean
  helperText?: ReactNode | string
  disabled?: boolean
}

/**
 * @name WordCounter
 * @description 字數計算 wrapper
 * @param {WordCounterProps} props
 * @note 使用方式
 * <WordCounter
 *    value={inputValue}
 *    maxLength={20}
 *    error={error}
 *    helperText={helperText}>
 *  <Input maxLength={20} value={inputValue} type="text"/>
 * </WordCounter>
 */
const WordCounter = ({
  children,
  value,
  maxLength,
  error = false,
  helperText,
  disabled = false,
}: WordCounterProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        alignItems="flex-end"
        justifyContent="flex-end"
        display="flex"
        sx={{
          color: theme => returnColor(theme, disabled, error),
          position: error && helperText ? 'relative' : 'static',
          top: '-20px',
        }}
      >
        ({value.length}/{maxLength})
      </Grid>
    </Grid>
  )
}

export default memo(WordCounter)
