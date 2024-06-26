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
import ShopByCategory from '../components/SearchAndCategories/SearchAndCategories';
import ProductManagements from '../components/ProductManagement/ProductManagement';
import ListProduct from '../components/ProductsForm/ListProduct';
import UpdateProduct from '../components/ProductsForm/UpdateProduct';
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
      {
        path: "/manage",
        element: <ProductManagements />
      },
      {
        path: "/products/manage/new",
        element: <ListProduct />
      },
      {
        path: "/products/manage/:productId/edit",
        element: <UpdateProduct />
      },
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
        path: "carts",
        element: <CartManagement />
      },
      {
        path: "products/categories/:category",
        element: <ShopByCategory />
      },
      {
        path:'*',
        element: <h1>Page not found</h1>
      }
    ],
  },
]);
