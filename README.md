# Rainforest Database Schema
[![Rainforest-Schema.png](https://i.postimg.cc/ZKyG9Fb6/Rainforest-Schema.png)](https://postimg.cc/3dYSVGDw)

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

#### Reviews
> Create, Read, Update, Delete

**View Reviews**:
- As a user, logged in or logged out, I want to view all reviews on a product.
    - When I am on the `/product/:productId` page, I should be able to view the product information along with all its reviews.

**Create Review**:
- As a logged-in user, I want to create a review on a product.
- On the `/product/:productId` page, there should be a 'Create Review' button prompting a new review window.
    - The review window should allow me to input a review rating and description.

**Update Review**:
- As a logged-in user, I want to update my existing review by clicking an 'Edit' button.
- When I am on the `/product/:productId` page, I can click on an 'Edit' button associated with my review to make changes.

**Delete Review**:
- As a logged-in user, I want to delete my existing review by clicking a 'Delete' button.
    - A `'Delete'` button next to my review should allow me to remove it from the product page.

#### Cart
> Create, Read, Update, Delete

**Create Cart**:
- As a logged-in user, I want to be able to add products to my cart.
    - On the `/product/:productId` page, there should be an `'Add to Cart'` button for adding products.

**View Cart**:
- In the navigation bar, I should be able to view my cart.
    - Clicking on the `'View Cart'` button should redirect me to `/user/:userId/cart`, displaying all items in my cart.

**Update Cart**:
- As a logged-in user, I want to update my cart item quantity.
    - Typing in a number into a text box or clicking the `'+/ -'` key and clicking `'Update'` should adjust the quantity and subtotal of my cart.

**Delete Cart**:
- While I'm the logged-in user, I want to be able to delete products from my cart with a delete button.
    - Clicking 'Delete' should update the subtotal and remove the item(s) from the cart.

### Feature Overview
> Quick and General Rundown of features available to Rainforest

- **Reviews**:
  - Logged-in users can create, view, edit, and delete their reviews.
    - Logged-out users can view all reviews.

- **Cart**:
  - Logged-in users can create, view, edit, and delete items within their cart.

- **Order History (Bonus)**:
  - Logged-in users can view their order history once a cart has been checked out.
    - Redirecting them to `/user/:userId/orders`

- **Search (Bonus)**:
  - Users can search for specific products and category of product(s).
    - This feature should work regardless if they're logged in or logged out.
