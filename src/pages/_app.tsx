import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@src/providers'
import { Header, Sidebar } from '@src/components'
import Box from '@mui/material/Box'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Afu React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <Header />
        <Box display="flex" minHeight="200vh">
          <Box component="aside" flexBasis="25%">
            <Sidebar />
          </Box>
          <Box component="main" flexBasis="75%" p="1em">
            <Component {...pageProps} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
