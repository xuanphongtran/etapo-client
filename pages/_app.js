import { CartContextProvider } from '@/components/CartContext'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #ffffff;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;

  }
`
function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
export default App