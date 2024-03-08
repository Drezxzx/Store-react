import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartNoti, setCartNoti] = useState(false);

  const activeNotiCart = () => {
    setCartNoti(!cartNoti);
  };

  return (
    <CartContext.Provider value={{ cartNoti, activeNotiCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {useContext(CartContext)};
