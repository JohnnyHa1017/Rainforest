import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { loadClientOwnedThunk, deleteAProductThunk } from "../../redux/products";
import './ProductManagement.css'

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner"></div>
    </div>
  );
};

const ProductManagement = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.session?.user);
  const products = useSelector((state) => state?.products?.products);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(loadClientOwnedThunk());
  }, [dispatch]);

  // Function to handle form submission for adding a new product
  const handleAddProduct = () => {
    window.location.href = `/products/manage/new`
  };

  // Function to handle editing an existing product
  const handleEditProduct = (productId) => {
    window.location.href = `/products/manage/${productId}/edit`
  };

  // Function to open deletion modal
  const openDeleteModal = (productId) => {
    setModalContent(
      <>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this product?</p>
          <div className="modal-buttons">
            <button className="modal-button-cancel" onClick={closeModal}>Cancel</button>
            <button className="modal-button-confirm" onClick={() => handleDeleteProduct(productId)}>Confirm</button>
          </div>
        </div>
      </>
    );
  };


  // Function to handle deleting a product
  const handleDeleteProduct = async (productId) => {
    if (productId) {
      setModalContent(<LoadingSpinner />);
      await dispatch(deleteAProductThunk(productId));

      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  if (!products || !currentUser) {
    return <LoadingSpinner />
  }

  return (
    <div className="product-management-container">
      <h1 className="welcome-title">Welcome, {currentUser.first_name}!</h1>
      <h4 className="page-title">Manage your Products</h4>
      {products.map((product) => (
        product.user_id === currentUser.id && (
          <div key={product.id} className="product-item">
            <NavLink to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-image" />
            </NavLink>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-category">Marketed In: {product.category}</p>
              <p className="product-body">{product.body}</p>
              <p className="product-quantity">Quantity Available: {product.quantity_available}</p>
              <div className="product-actions">
                <button className="edit-button" onClick={() => handleEditProduct(product.id)}>Edit</button>
                <button className="delete-button" onClick={() => openDeleteModal(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        )
      ))}
      <h5 className="adding-title">Want to add a new product?</h5>
      <button className="add-product-button" onClick={() => handleAddProduct()}>List New Product</button>
    </div>
  );
};

export default ProductManagement;
