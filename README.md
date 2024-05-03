
# [ Rainforest, an Amazon Clone ]
[My GitHub Profile](https://github.com/JohnnyHa1017)

**Introducing Rainforest:**
> “Enter Rainforest's shopping cart— a sleek and intuitive space, inspired by the convenience of Amazon's design. Nestled neatly within the interface, 'Your Shopping Cart' offers a user-friendly side panel for effortless browsing, item selection, and checkout. Rainforest is supported by Amazon S3 for storage and Google OAuth for security, it enhances your online shopping experience.”

##### Follow Rainforest Live
[Live Link to Rainforest](https://rainforest-r7d3.onrender.com)

### Technologies at Play:
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![GithubPages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Google Cloud Platform](https://img.shields.io/badge/Google_Cloud_Platform-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

# Rainforest API Documentation

Welcome to the Rainforest API documentation. This guide will help you understand the endpoints available and how to interact with them.

## Base URL:
> https://rainforest-r7d3.onrender.com/

All endpoints are relative to the base URL above.

## Authentication

Authentication is required for certain endpoints. You can obtain an API token by signing up or logging in through the website.

**Signing Up and In with Google:**
> Sign Up or Sign In seamlessly with Google OAuth

[![signing-up-with-google.gif](https://i.postimg.cc/rppM6Bh6/signing-up-with-google.gif)](https://postimg.cc/21gPhKRT)

## Endpoints
#### `POST /signup`

Create a new user account.

Request Body:

```json
{
  "username": "example_user",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "examplePassword"
}
```

#### Sign Up
**Users**:
- As an unregistered user, I want to sign up for the website via a sign-up form.
- When I am on the `/signup` page, I should be able to enter my username, email, first name, last name, and password on a form.
- Upon successful completion of the sign-up form, the website should log me in.
- If I enter invalid data on the sign-up form, I expect the website to inform me of the failed validations and repopulate the form with my previous entries for correction.
- Additionally, I'd like a button to redirect me to the sign-up page if I'm already an existing user.

#### `POST /login`
Log in to an existing account.

Request Body:

```json
{
  "username": "example_user",
  "password": "examplePassword"
}
```

#### Log In
**Users**:
- As a registered user, I want to log in to the website via a log-in form.
- When I am on the `/login` page, I should be able to enter my username and password on a form.
- If I enter invalid data on the log-in form, the website should inform me of the failed validations and repopulate the form with my invalid entries for correction.

#### Demo User
**Signing In with Demo User:**
> Demo Rainforest with our Preset Demo Account

[![signing-in-with-demo.gif](https://i.postimg.cc/WzZsW05h/signing-in-with-demo.gif)](https://postimg.cc/sGVF1Gdr)

- As an unregistered user, I would like a button on the login page that allows me to visit the site as a guest without signing up or logging in.
- The Demo User button should log me in and grant access to the site's features and functionality for testing purposes.

#### Log Out
**Users**:
- As a logged-in user, I want to log out via a log-out button in the navigation bar.
- While on any page of the site, clicking the log-out button should log me out of my account and redirect me to the landing page.

## Reviews
**Review Management:**
> Create, Update, or Delete Reviews

[![review-management.gif](https://i.postimg.cc/3x1Yc8FC/review-management.gif)](https://postimg.cc/qNNPtdYz)

#### `POST /products/:productId/reviews/new`
Create a New Review on a Product

Request Body:
```json
{
  "rating": 4,
  "description": "Great product! Highly recommended."
}
```

##### Create Review
- As a logged-in user, I want to be able to create a review upon a product.
- If I have purchased the item, my Review will be marked as 'Verified Purchase'
- On the `/product/:productId` page, there should be a 'Create Review' button prompting a new review window.
    - The review window should allow me to input a review rating and description.

##### Read Reviews
- As a user I want to be able to view all reviews of a product, regardless if I'm logged in or out.
    - When I am on the `/product/:productId` page, I should be able to view the product in detail along with all its reviews.

#### `PUT /products/:productId/reviews/edit`
Edit an Existing Review on a Product

Request Body:
```json
{
  "rating": 5,
  "description": "Updated review description."
}
```

##### Update Review
- As a logged-in user and owner of my review, I want to have the ability to update my existing review by clicking an 'Edit' button.
- When I am on the `/product/:productId` page, I can click on an 'Edit' button associated with my review to make changes.

##### Delete Review
- As a logged-in user, I want to delete my existing review by clicking a 'Delete' button.
    - A `'Delete'` button next to my review should allow me to remove it from the product page.

## Cart
**Cart Management:**
> Add to Cart, Update Quantity, Save for Later, Checkout Cart, or Delete from Cart

[![cart-management.gif](https://i.postimg.cc/TYrRnqys/cart-management.gif)](https://postimg.cc/6ypJXZfV)

##### Create Cart
- As a logged-in user, I want to be able to add products to my cart.
    - On the `/product/:productId` page, there should be an `'Add to Cart'` button for adding products.

##### Read Cart
- In my navigation bar, I should be able to view my cart in detail (Product(s), Quantity, Subtotal).
    - Clicking on the `'View Cart'` button should redirect me to `/user/:userId/cart`, displaying all items in my cart.

##### Update Cart
- As a logged-in user, I want to update my cart item quantity.
    - Typing in a number into a text box or clicking the `'+/ -'` key and clicking `'Update'` should adjust the quantity and subtotal of my cart.

##### Delete Cart
- While I'm the logged-in user, I want to be able to delete products from my cart with a delete button.
    - Clicking 'Delete' should update the subtotal and remove the item(s) from the cart.

## Products
**Product Management:**
> Create a New Listing, Update a Product Listing, or Delete a Product Listing

[![product-management.gif](https://i.postimg.cc/y6368z7s/product-management.gif)](https://postimg.cc/7bDrKdCW)

### Endpoints

#### Load All Products

- **GET /products**
  - Description: Retrieve all products.
  - Thunk: `loadAllThunk()`

#### Load One Product

- **GET /products/:productId**
  - Description: Retrieve details of a specific product.
  - Thunk: `loadOneThunk(productId)`

#### Load Products Listed by Client

- **GET /products/manage**
  - Description: Retrieve products listed by the current user.
  - Thunk: `loadClientOwnedThunk()`

#### List New Product

- **POST /products/new**
  - Description: Add a new product.
  - Thunk: `listNewThunk(newProduct)`

#### Edit a Product

- **PUT /products/:productId/edit**
  - Description: Update an existing product.
  - Thunk: `editAProductThunk(productId, productToEdit)`

#### Delete a Product

- **DELETE /products/:productId**
  - Description: Delete a product.
  - Thunk: `deleteAProductThunk(productId)`

#### Shop by Category

- **GET /products/categories/:category**
  - Description: Retrieve products by category.
  - Thunk: `shopCategoriesThunk(category)`

# `MVP Feature List`
##### Reviews
 - Create: Logged-in users can create reviews.
 - Read: Users can view all reviews for a product.
 - Update: Logged-in users can update their reviews.
 - Delete: Logged-in users can delete their reviews.

##### Cart
 - Create: Logged-in users can add items to their cart.
 - Read: Users can view the items in their cart.
 - Update: Logged-in users can update the quantity of items in their cart.
 - Delete: Logged-in users can remove items from their cart.

##### Products
 - Create: Logged-in users can add a new product listing.
 - Read: Users can view products on landing page and a further detailed page.
 - Update: Logged-in users can edit their existing product listings.
 - Delete: Logged-in users can delete their existing product listings.

##### Image Hosting
- Image hosting is fulfilled by Amazon Web Services.
