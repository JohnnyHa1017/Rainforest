// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../redux/carts";

// const CartPersistenceWrapper = ({ children }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state);

//   // TODO: NEED TO FIGURE OUT AND DEBUG WRAPPER ISSUES, ASSUMING ITS DUE
//   // TODO: TO CART NOT BEING FULLY DEFINED, RENDERING ERRORS
//     // !; COME BACK TO THIS ONCE THE REST IS COMPLETED
//   console.log(cart, 'CART IN WRAPPER')

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       dispatch(addToCart(JSON.parse(savedCart)));
//     }
//   }, [dispatch]);

//   return children;
// };

// export default CartPersistenceWrapper;
