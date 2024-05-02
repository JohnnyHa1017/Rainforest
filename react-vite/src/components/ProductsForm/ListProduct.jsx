import CreateProductForm from './ProductsForm';

const ListProduct = () => {
  const buttonName = 'List New Product';

  // Initialize an empty product object for creating a new product
  const newProduct = {
    name: '',
    price: '',
    category: '',
    quantity_available: '',
    image: '',
    body: ''
  };

  return (
    <div className="list-product-container">
      <h1>Create a New Product Listing</h1>
      <CreateProductForm updatingProduct={newProduct} buttonName={buttonName} />
    </div>
  );
};

export default ListProduct;
