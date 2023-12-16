import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({});

  const setProduct = (data) => {
    setProductData(data);
  };

  return (
    <ProductContext.Provider value={{ productData, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
