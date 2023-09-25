/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({})

export function CartContextProvider({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([])
  const [wishlist, setWishList] = useState([])
  //CartProduct
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts))
    }
  }, [cartProducts])
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])
  const addProduct = (productId, quantity) => {
    if (quantity <= 0) {
      return // Số lượng là 0 hoặc âm thì không làm gì cả
    }

    setCartProducts((prev) => {
      const newProducts = [...prev]
      for (let i = 0; i < quantity; i++) {
        newProducts.push(productId)
      }
      return newProducts
    })
  }
  const removeProduct = (productId) => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
  }
  const clearCart = () => {
    setCartProducts([])
  }
  //Wishlist
  useEffect(() => {
    if (wishlist?.length > 0) {
      ls?.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist])
  useEffect(() => {
    if (ls && ls.getItem('wishlist')) {
      setWishList(JSON.parse(ls.getItem('wishlist')))
    }
  }, [])

  const addWishlist = (productId) => {
    setWishList((prev) => [...prev, productId])
  }
  const removeWishlist = (productId) => {
    setWishList((prev) => {
      const pos = prev.indexOf(productId)
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev
    })
  }
  const clearWishList = () => {
    setWishList([])
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        wishlist,
        setWishList,
        addWishlist,
        removeWishlist,
        clearWishList,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
