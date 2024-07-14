import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-dom';
import { fetchProductById } from './redux/producsSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const product = useSelector((state) => state.products.product);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    cartItems.forEach((items) => {
        dispatch(fetchProductById(items.id));
    });
  }, [cartItems, dispatch]);

  if (loading) {
    return <div>Loading product data...</div>;
  }

  if (error) {
    return <div>Error fetching product data: {error}</div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          {product && product.id === item.id ? (
            <div>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;