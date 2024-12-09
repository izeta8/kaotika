import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import Cart from '../components/shop/Cart';
import { ItemData } from '@/_common/interfaces/ItemData';
import { CartItem } from '@/_common/interfaces/CartItem';
import Player from '@/database/models/playerModel';



const mockCartItems = [
    { _id: '1', name: 'Helmet', image: 'helmet.png', value: 500, quantity: 1, type: 'Helmet' },
    { _id: '2', name: 'Shield', image: 'shield.png', value: 300, quantity: 2, type: 'Shield' },
  ];

  const mockPlayerData = { gold: 1000 };

describe('Cart Component', () => {
  // Test: Render cart with correct data
  test('renders Cart with correct data', () => {
    const setItemsInCart = jest.fn((items: CartItem[]) => {});
    const confirmPurchase = jest.fn((items: CartItem[]) => {});
    const onClose = jest.fn();

    render(
      <Cart
        isOpen={true}
        onClose={onClose}
        cartItems={mockCartItems}
        setItemsInCart={setItemsInCart}
        confirmPurchase={confirmPurchase}
        playerData={mockPlayerData}
      />
    );

    // Check that all cart items are rendered
    expect(screen.getByText('Helmet')).toBeInTheDocument();
    expect(screen.getByText('Shield')).toBeInTheDocument();

    // Check item prices and quantities
    expect(screen.getByText('500')).toBeInTheDocument(); 
    expect(screen.getByText('600')).toBeInTheDocument(); 

    // Check total price
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('1100')).toBeInTheDocument(); 
  });
});




//Añadir producto al carrito
/*- Al hacer click en ADD TO Cart, el producto debe aparecer en el carrito.*/

/*- El total acumulado debe actualizarse correctamente*/

//Eliminar producto del carrito
/*- Al hacer click en el boton "Remove" de un producto, debe eliminarse del carrito. */

/*- El total acumulado debe reflejar el cambio*/
