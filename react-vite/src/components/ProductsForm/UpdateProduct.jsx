import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOneThunk } from '../../redux/products';
import CreateProductForm from './ProductsForm';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(state => state?.products);

  useEffect(() => {
    if (productId) {
      dispatch(loadOneThunk(productId));
    }
  }, [dispatch, productId]);

  const buttonName = 'Update Product';

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-product-container">
      <h1>Update Product</h1>
      <CreateProductForm updatingProduct={product} buttonName={buttonName} />
    </div>
  );
};

export default UpdateProduct;
