import { createContext, useContext, useReducer } from "react";
// Crear el contexto
const CartContext = createContext();

// Definir el estado inicial del carrito
const initialState = {
  cartItems: [],
};

// Definir el reducer para manejar las acciones
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      // si ya existe aumentar la cantidad
      const exist = state.cartItems.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== action.payload
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "iNIZIALIZE_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    // Otros casos como 'REMOVE_FROM_CART', 'CLEAR_CART', etc.
    default:
      return state;
  }
}

// Proveedor del contexto
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useCart() {
  return useContext(CartContext);
}
