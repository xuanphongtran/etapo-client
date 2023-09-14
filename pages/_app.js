import { CartContextProvider } from '@/components/CartContext'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #ffffff;
    padding: 0;
    margin: 0;
    font-family: 'Quicksand', sans-serif;
    font-size: 14px;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
