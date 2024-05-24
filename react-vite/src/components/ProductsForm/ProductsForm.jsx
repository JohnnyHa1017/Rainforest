import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listNewThunk, editAProductThunk } from '../../redux/products';
import './ProductsForm.css';

const CreateProductForm = ({ buttonName, updatingProduct }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [name, setName] = useState(updatingProduct?.name || '');
  const [price, setPrice] = useState(updatingProduct?.price || '');
  const [category, setCategory] = useState(updatingProduct?.category || '');
  const [quantity_available, setQuantity] = useState(updatingProduct?.quantity_available || '');
  const [image_url, setImage] = useState(null);
  const [body, setBody] = useState(updatingProduct?.body || '');
  const [validations, setValidations] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price);
      setCategory(updatingProduct.category);
      setQuantity(updatingProduct.quantity_available);
      setImage(updatingProduct.image_url);
      setBody(updatingProduct.body);
    }
  }, [updatingProduct]);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!price || price <= 0) errors.price = 'Price must be a positive number.';
    if (!category.trim()) errors.category = 'Category is required.';
    if (!quantity_available || quantity_available <= 0) errors.quantity = 'Quantity must be a positive number.';
    if (body.length <= 10) errors.body = 'Description must be greater than 10 characters.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setValidations(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', parseFloat(price));
    formData.append('category', category);
    formData.append('quantity_available', parseInt(quantity_available));
    formData.append('body', body);

    if (image_url !== null) {
      formData.append('image_url', image_url);
    } else {
      formData.image_url = updatingProduct.image;
    }

    setImageLoading(true);

    if (!productId) {
      await dispatch(listNewThunk(formData));
      nav('/manage');
    } else {
      await dispatch(editAProductThunk(productId, formData));
      nav(`/products/${productId}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType='multipart/form-data' className='create-update-product-form'>
        <label>
          Name:
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          {submitted && validations.name && <p style={{ color: 'red' }}>{validations.name}</p>}
        </label>
        <label>
          Price:
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
          {submitted && validations.price && <p style={{ color: 'red' }}>{validations.price}</p>}
        </label>
        <label>
          Category:
          <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} />
          {submitted && validations.category && <p style={{ color: 'red' }}>{validations.category}</p>}
        </label>
        <label>
          Quantity Available:
          <input type='number' value={quantity_available} onChange={(e) => setQuantity(e.target.value)} />
          {submitted && validations.quantity && <p style={{ color: 'red' }}>{validations.quantity}</p>}
        </label>
        <textarea
          className='body-textarea'
          type='text'
          name='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Enter product description...'
          rows={7}
          cols={70}
        />
        {submitted && validations.body && <p style={{ color: 'red' }}>{validations.body}</p>}
        <div className='image-file-field'>
          <label htmlFor='image'>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
        <div className='Product-Btn-container'>
          <button
            type='submit'
            className='Product-Submit-btn'
          >
            {buttonName}
          </button>
          {productId && (
            <button className='back-to-product' onClick={() => nav(`/products/${productId}`)}>Back to Product</button>
          )}
          {imageLoading && <p>Loading...</p>}
        </div>
      </form>
    </>
  );
};

export default CreateProductForm;
