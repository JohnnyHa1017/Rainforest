import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import CreateReview from '../components/CreateReviews/CreateReviews';
import UpdateReview from '../components/UpdateReviews/UpdateReviews';
import DeleteReview from '../components/DeleteReviews/DeleteReviews';
import AllProducts from '../components/LandingPage/LandingPage';
import ProductReviews from '../components/ProductReviews/ProductReviews';
import ProductDetailsPage from '../components/ProductDetails/ProductDetails';
import CartManagement from '../components/CartManagement/CartManagements';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/",
        element: <AllProducts />
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />
      },
      // {
      //   path: "/products",
      //   element: <ListNewProduct />
      // },
      {
        path: "products/:productId/reviews",
        element: <ProductReviews />
      },
      {
        path: "products/:productId/reviews/new",
        element: <CreateReview />
      },
      {
        path: "reviews/:reviewId/edit",
        element: <UpdateReview />
      },
      {
        path: "reviews/:reviewId/delete",
        element: <DeleteReview />
      },
      {
        path: "cart",
        element: <CartManagement />
      },
      {
        path:'*',
        element: <h1>Page not found</h1>
      }
    ],
  },
]);
