import React, { useState, useEffect } from 'react';
import axiosClient from '@/config/axiosClient';
import { initMercadoPago, Wallet } from '../../node_modules/@mercadopago/sdk-react/index';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
}

interface ProductWithQuantity extends Product {
  quantity: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

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

  useEffect(() => {
    // Calcular el total cada vez que cambien los productos seleccionados
    const newTotal = selectedProducts.reduce((acc, product) => acc + product.quantity * product.price, 0);
    setTotal(newTotal);
  }, [selectedProducts]);

  const handleQuantityChange = (productId: string, quantityChange: number) => {
    const updatedSelectedProducts = selectedProducts.map((product) =>
      product._id === productId ? { ...product, quantity: Math.max(0, product.quantity + quantityChange) } : product
    );
    setSelectedProducts(updatedSelectedProducts);
  };

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
        {products.map((product: Product) => (
          <div className='card-product' key={product._id}>
            <h3>{product.name}</h3>
            <p>Precio: ${product.price} peso arg</p>
            <p>Descripcion: {product.description}</p>
            <p>Marca: {product.brand}</p>
            <button
              onClick={() => {
                const existingProduct = selectedProducts.find((p) => p._id === product._id);

                if (existingProduct) {
                  handleQuantityChange(product._id, 1);
                } else {
                  setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
                }

                console.log('Product added to cart:', product);
              }} className='add-cart'>
              Añadir
            </button>
          </div>
        ))}
      </div>
      <div className="cart">

        <div className="cart-summary">
          
          {selectedProducts.map((product) => (
            <div className='cart-products'  key={product._id}>
              <div className='products'>
                <p>{product.name}</p>
                <p>{product.quantity}</p>
   
                <button className='btn-opp' onClick={() => handleQuantityChange(product._id, 1)}>+</button>
                <button  className='btn-opp' onClick={() => handleQuantityChange(product._id, -1)}>-</button>
              </div>


            </div>
          ))}
          <div className='div-total'>
              <p>Total: {total}</p>
          </div>

          <button onClick={handleBuy} className='btn-buy'>
          Generar compra
        </button>
        {preferenceId && (
          <div id="wallet_container">
            <Wallet initialization={{ preferenceId }} />
          </div>
        )}
          
        </div>
      </div>
    </div>
  );
};

export default Products;


// import React, { useState, useEffect } from 'react';
// import axiosClient from '@/config/axiosClient';
// import { initMercadoPago, Wallet } from '../../node_modules/@mercadopago/sdk-react/index';

// interface ProductWithQuantity extends Product {
//   quantity: number;
// }

// const Products = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([]);
//   const [preferenceId, setPreferenceId] = useState<string | null>(null);
//   const [total, setTotal] = useState<number>(0);

//   initMercadoPago('APP_USR-deda6147-6c62-40e3-98c9-2254fca1afea');

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const { data } = await axiosClient.get('/products');
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     getProducts();
//   }, []);

//   useEffect(() => {
//     // Calculate total whenever selectedProducts change
//     const newTotal = selectedProducts.reduce((acc, product) => acc + product.quantity * product.price, 0);
//     setTotal(newTotal);
//   }, [selectedProducts]);

//   const handleQuantityChange = (productId: string, quantityChange: number) => {
//     const updatedSelectedProducts = selectedProducts.map((product) =>
//       product._id === productId ? { ...product, quantity: Math.max(0, product.quantity + quantityChange) } : product
//     );
//     setSelectedProducts(updatedSelectedProducts);
//   };

//   const handleBuy = async () => {
//     try {
//       const response = await axiosClient.post('/mercadopago/order', { products: selectedProducts });
//       setPreferenceId(response.data.preferenceId);
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div className='main-products'>
//       <div className='cards-product'>
//         {products.map((product: Product) => (
//           <div className='card-product' key={product._id}>
//             <h3>{product.name}</h3>
//             <p>Price: {product.price}</p>
//             <p>Description: {product.description}</p>
//             <p>Brand: {product.brand}</p>
//             <button
//               onClick={() => {
//                 const existingProduct = selectedProducts.find((p) => p._id === product._id);

//                 if (existingProduct) {
//                   handleQuantityChange(product._id, 1);
//                 } else {
//                   setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
//                 }

//                 console.log('Product added to cart:', product);
//               }}
//               className='add-cart'
//             >
//               ADD TO CART
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="cart">
//         <button onClick={handleBuy} className='btn-buy'>
//           BUY SELECTED
//         </button>
//         {preferenceId && (
//           <div id="wallet_container">
//             <Wallet initialization={{ preferenceId }} />
//           </div>
//         )}
//         <div className="cart-summary">
//           <p>Total: {total}</p>
//           {selectedProducts.map((product) => (
//             <div key={product._id}>
//               <p>
//                 {product.name}: {product.quantity}
//                 <button onClick={() => handleQuantityChange(product._id, 1)}>+</button>
//                 <button onClick={() => handleQuantityChange(product._id, -1)}>-</button>
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;


// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   description: string;
//   brand: string;
// }

// import React, { useState, useEffect } from 'react';
// import axiosClient from '@/config/axiosClient';
// import { initMercadoPago, Wallet } from '../../node_modules/@mercadopago/sdk-react/index';

// const Products = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
//   const [preferenceId, setPreferenceId] = useState<string | null>(null);

//   initMercadoPago('APP_USR-deda6147-6c62-40e3-98c9-2254fca1afea');

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const { data } = await axiosClient.get('/products');
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     getProducts();
//   }, []);

//   const handleBuy = async () => {
//     try {
//       const response = await axiosClient.post('/mercadopago/order', { products: selectedProducts });
//       setPreferenceId(response.data.preferenceId);
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div className='main-products'>
//       <div className='cards-product'>
//         {products.map((product: Product) => (
//           <div className='card-product' key={product._id}>
//             <h3>{product.name}</h3>
//             <p>Price: {product.price}</p>
//             <p>Description: {product.description}</p>
//             <p>Brand: {product.brand}</p>
//             <button
//               onClick={() => {
//                 setSelectedProducts([...selectedProducts, product]);
//                 console.log('Product added to cart:', product);
//               }}
//               className='add-cart'
//             >
//               ADD TO CART
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className="cart">
//         <button onClick={handleBuy} className='btn-buy'>
//           BUY SELECTED
//         </button>
//         {preferenceId && (
//           <div id="wallet_container">
//             <Wallet initialization={{ preferenceId }} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Products;


// import React, { useState, useEffect } from 'react';
// import Layout from '@/components/Layout';
// import axiosClient from '@/config/axiosClient';
// import { initMercadoPago, Wallet } from '../../node_modules/@mercadopago/sdk-react/index'  // Asegúrate de tener el path correcto para importar el SDK

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [preferenceId, setPreferenceId] = useState(null);
//   initMercadoPago('APP_USR-deda6147-6c62-40e3-98c9-2254fca1afea');

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const { data } = await axiosClient.get('/products');
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     getProducts();
//   }, []);

//   const handleBuy = async () => {
//     try {
//       const response = await axiosClient.post('/mercadopago/order', { products: selectedProducts });
//       setPreferenceId(response.data.preferenceId);
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
    
//       <div className='main-products'>
//         <div className='cards-product'>
//           {products.map(product => (
//             <div className='card-product' key={product._id}>
//               <h3>{product.name}</h3>
//               <p>Price: {product.price}</p>
//               <p>Description: {product.description}</p>
//               <p>Brand: {product.brand}</p>
//               <button onClick={() => {
//                 setSelectedProducts([...selectedProducts, product]);
//                 console.log('Product added to cart:', product);
//               }} className='btn-buy'>
//                 ADD TO CART
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="cart">
//             <button onClick={handleBuy} className='btn-buy'>BUY SELECTED</button>
//             {preferenceId && (
//               <div id="wallet_container">
//                 <Wallet
//                   initialization={{ preferenceId }}
//                 />
//               </div>
//             )}
//         </div>

//       </div>
    
//   );
// }

// export default Products;