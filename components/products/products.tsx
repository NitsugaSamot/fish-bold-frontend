import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axiosClient from '@/config/axiosClient';
import { initMercadoPago, Wallet } from '../../node_modules/@mercadopago/sdk-react/index'  // Asegúrate de tener el path correcto para importar el SDK

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('APP_USR-deda6147-6c62-40e3-98c9-2254fca1afea');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axiosClient.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  const handleBuy = async () => {
    try {
      const response = await axiosClient.post('/mercadopago/order', { products: selectedProducts });
      setPreferenceId(response.data.preferenceId);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    
      <div className='main-products'>
        <div className='cards-product'>
          {products.map(product => (
            <div className='card-product' key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Brand: {product.brand}</p>
              <button onClick={() => {
                setSelectedProducts([...selectedProducts, product]);
                console.log('Product added to cart:', product);
              }} className='btn-buy'>
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
        <div className="cart">
            <button onClick={handleBuy} className='btn-buy'>BUY SELECTED</button>
            {preferenceId && (
              <div id="wallet_container">
                <Wallet
                  initialization={{ preferenceId }}
                />
              </div>
            )}
        </div>

      </div>
    
  );
}

export default Products;