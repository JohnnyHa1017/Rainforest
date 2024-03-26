# Rainforest Database Schema
[![Rainforest-Schema.png](https://i.postimg.cc/8zCVFm4D/Rainforest-Schema.png)](https://postimg.cc/gn17QR1B)

### User Stories
> Final Capstone Clone Project by Johnny Ha
[My GitHub Profile](https://github.com/JohnnyHa1017)

#### Sign Up
**Users**:
- As an unregistered user, I want to sign up for the website via a sign-up form.
- When I am on the `/signup` page, I should be able to enter my username, email, first name, last name, and password on a form.
- Upon successful completion of the sign-up form, the website should log me in.
- If I enter invalid data on the sign-up form, I expect the website to inform me of the failed validations and repopulate the form with my previous entries for correction.
- Additionally, I'd like a button to redirect me to the sign-up page if I'm already an existing user.

#### Log In
**Users**:
- As a registered user, I want to log in to the website via a log-in form.
- When I am on the `/login` page, I should be able to enter my username and password on a form.
- If I enter invalid data on the log-in form, the website should inform me of the failed validations and repopulate the form with my invalid entries for correction.

#### Demo User
**Users**:
- As an unregistered user, I would like a button on the login page that allows me to visit the site as a guest without signing up or logging in.
- The Demo User button should log me in and grant access to the site's features and functionality for testing purposes.

#### Log Out
**Users**:
- As a logged-in user, I want to log out via a log-out button in the navigation bar.
- While on any page of the site, clicking the log-out button should log me out of my account and redirect me to the landing page.

### Reviews
> Create, Read, Update, Delete

##### Create Review
- As a logged-in user, I want to be able to create a review upon a product.
- If I have purchased the item, my Review will be marked as 'Verified Purchase'
- On the `/product/:productId` page, there should be a 'Create Review' button prompting a new review window.
    - The review window should allow me to input a review rating and description.

##### Read Reviews
- As a user I want to be able to view all reviews of a product, regardless if I'm logged in or out.
    - When I am on the `/product/:productId` page, I should be able to view the product in detail along with all its reviews.

##### Update Review
- As a logged-in user and owner of my review, I want to have the ability to update my existing review by clicking an 'Edit' button.
- When I am on the `/product/:productId` page, I can click on an 'Edit' button associated with my review to make changes.

##### Delete Review
- As a logged-in user, I want to delete my existing review by clicking a 'Delete' button.
    - A `'Delete'` button next to my review should allow me to remove it from the product page.

### Cart
> Create, Read, Update, Delete

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

### MVP Feature List
> Quick and General Rundown of features available to Rainforest

#### Reviews
  - Logged-in users can create, view, edit, and delete their reviews.
    - Logged-out users can view all reviews.

#### Cart
  - Logged-in users can create, view, edit, and delete items within their cart.

#### Image Hosting
  - Image hosting to be fulfilled by Amazon Web Services

##### Order History (Bonus)
  - Logged-in users can view their order history once a cart has been checked out.
    - Redirecting them to `/user/:userId/orders`

##### Search (Bonus)
  - Users can search for specific products and category of product(s).
    - This feature should work regardless if they're logged in or logged out.

### Wireframing
> General overview and styling of the Landing Page (Left)

> General overview and styling of the Shopping Cart Page (Right)

#### Note:
- Additional features such as:
    - `Prime Video`
    - `Offers`
    - `Deal of the Day`
    - `Browsing History`
    - `Saved for Later`
- These are __potential__ features that could be added in the future
    - Placeholder Images and Redirect links will be hosted there momentarily __IF__ implemented from wireframe

[![Screenshot-2024-03-25-at-11-11-05-PM.png](https://i.postimg.cc/t4tnjMcT/Screenshot-2024-03-25-at-11-11-05-PM.png)](https://postimg.cc/hXvt8pcW)

### Example Review Modal
> Below is an example of the Review Window to be populated

[![Screenshot-2024-03-25-at-11-12-38-PM.png](https://i.postimg.cc/JzWHSLPv/Screenshot-2024-03-25-at-11-12-38-PM.png)](https://postimg.cc/RNX0njrL)
