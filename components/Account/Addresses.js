import { useEffect, useState } from 'react'
import AddressForm from '../AddressForm'
import AXIOS from '@/lib/axios'

const Addresses = () => {
  const [info, setInfo] = useState()
  useEffect(() => {
    AXIOS.get('/auth/userinfo')
      .then((response) => {
        setInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div>
      <AddressForm info={info} isCheckout={false}></AddressForm>
    </div>
  )
}

export default Addresses
