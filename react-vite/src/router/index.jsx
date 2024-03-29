import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllReviews from '../components/AllReviews/AllReviews';
import CreateReview from '../components/CreateReviews/CreateReviews';
import UpdateReview from '../components/UpdateReviews/UpdateReviews';
import DeleteReview from '../components/DeleteReviews/DeleteReviews';
import AllProducts from '../components/LandingPage/LandingPage';
import Layout from './Layout';
import ProductReviews from '../components/ProductReviews/ProductReviews';
import ProductDetailsPage from '../components/ProductDetails/ProductDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products",
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
        path: "reviews/all",
        element: <AllReviews />
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
        path:'*',
        element: <h1>Page not found</h1>
      }
    ],
  },
]);
