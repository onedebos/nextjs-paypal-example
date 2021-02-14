import '../styles/globals.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {PAYPAL_CLIENT_ID} from '../utils/constants'

function MyApp({ Component, pageProps }) {
  return(
    <PayPalScriptProvider options= {{"client-id": PAYPAL_CLIENT_ID.clientId }}>
        <Component {...pageProps} />
    </PayPalScriptProvider>
  ) 
}

export default MyApp
