# Welcome on the ![Orinoco's Logo](./frontend/images/orinoco-logo.svg) Project !
## Backend
### Prerequisites
You will need to have **Node** and **npm** installed locally on your machine.

### Installation
Clone this repo. From within the project folder **/backend**, run **npm install**. You can then run the server with **node server**. The server should run on localhost with default port 3000. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. Listening on port 3001.

## FrontEnd
![Orinours Logo](./frontend/images/orinours-logo.svg)
![Index page of Orinours](./frontend/images/screen.png)
I choose to start on the teddies products, but this API is thinked to be scalable.
You can change category in "**change_category.js**" file and writting **"cameras" instead of "teddies"**.
Informations : Only teddies and cameras are implemented, the design is set for teddies for the moment.
I know that it should be a JSON or env file but possibilities were limitates in JS vanilla and without host. I tried to be the most faithful to the JSON format for this change_category.js file. On purpose, the function will be replaced by templating.
Open **/frontend/index.html** and enjoy ;)

</br></br>

### Terms of reference
* JavaScript vanilla (HTML & CSS)
* White mark powered by Orinoco
* First MVP to show how it works
* 4 pages
    * Index with the product list
    * Product clicked by user, options in drop-down menu (not sent to server) and added to cart
    * Shopping cart with list of LS products, total price, quantity management, contact form formatted and verified before sending, order button.
    * Thanks page with order number and total.
* Backend provided.
* Free design

</br></br></br>

### White mark
Anticipation of the evolutions of the application:
* Code neutralized to adapt to different Orinoco's categories.
* Dynamically generated products
* Possibility to put more than one option per product without touching the code.
* Possibility to add properties to products (materials, manufacturer, etc...)
* Visual identity of the category and lexical field developed on the theme.
* Indicate the "powered by Orinoco" in the page

</br></br></br>

### Pages
* Index
    * index.html
        * head *<=== change with change_category.js (function fillHtml())*
        * header *<=== Same on each page, change with change_category.js (function fillHtml())*
        * figure *<=== for an upcoming svg animation (wip)*
        * main *<=== Empty part filled in JS*
        * 2 sections *<=== (for exemple quality guarantee and contact), change with change_category.js (function fillHtml())*
        * footer *<=== Same on each page*
    * change_category.js
        * configData = {...} *<=== An object containing the category and all HTML information based on the category*
        * function fillHtml(page) *<=== fill the html of the parametered page with elements of the configData*
    * index.js
        * Class Product
        * function createCardProduct(product) *<=== append to <main> a new card with the product data*
        * Onload *<=== out of functions*
            * fetch(category/)  *<=== defined route to GET array with all the caterory's products and their dataServer*
            * Call the function createCardProduct *<=== for each product in the array fetched* 
            * Call fillHtml(‘index’) *<=== Use function fillHtml in change-category.js with the index informations*
<br><br>

* Product (LS = localStorage)
    * product.html
        * head *<=== change with change_category.js (function fillHtml())*
        * header *<=== Same on each page, change with change_category.js (function fillHtml())*
        * main
            * form
                * div for options
            * button add to cart
            * Invisible div displayed when added to cart
        * footer *<=== Same on each page*
    * change_category.js
        * configData = {...} *<=== An object containing the category and all HTML information based on the category*
        * function fillHtml(page) *<=== fill the html of the parametered page with elements of the configData*
    * product.js
        * let productID *<=== get the product id in the URL*
        * function createField(key, value, productName) *<=== create a new field in the form, for some type of key, field is différent*
            * array = option with label and select
            * imageURL = image with src and alt
            * name = h1
            * price = h2
            * _id = input text invisible
            * else = p
        * onload  *<=== out of functions*
        * fetch(category/productID) *<=== defined route to GET product informations on backend server thanks to the productID*
        * Call function createField *<=== for each parameter in the product fetched*
        * Call fillHtml(‘productPage’) *<=== Use function fillHtml in change-category.js with the productPage informations*
        * Listens for clicks on "add to cart"
            * Adds an object in the LS if the association id and selected options is not already present.
            * Increases the quantity in the LS if the association is already present.

<br><br>

* Shopping Cart
    * shopping_cart.html
        * head *<=== change with change_category.js (function fillHtml())*
        * header *<=== Same on each page, change with change_category.js (function fillHtml())*
        * main 
            * section introduction *<=== just a title and a small text*
            * section cart *<=== with all products in the LS and total price*
            * section contact *<=== consumer identity, this is validate and sent to the server on order*
        * footer *<=== Same on each page*
    * change_category.js
        * configData = {...} *<=== An object containing the category and all HTML information based on the category*
        * function fillHtml(page) *<=== fill the html of the parametered page with elements of the configData*
    * shopping_cart.js
        * function checkEmptyCart() *<=== check if the cart in the lS is empty and display a message*
        * function totalPriceCalculate() *<=== add each product price x quantity and /100*
        * function changeQuantity(id, options,quantity) *<=== quantity is a select, then change quantity in the LS*
            * call totalPriceCalculate
        * function deleteProduct(id, options, domSelector) *<=== delete a product in the LS*
            * call checkEmptyCart
            * call totalPriceCalculate *<=== if cart is not empty*
        * function appendProductCardCart(apiSData, options, quantity) *<=== add a card with the product data, selected options and quantity*
            * Add eventListener on change quantity and delete.
        * function sendOrder()
            * stringify products and contact
            * fetch(category/order) *<=== defined route to POST order to server*
            * then locate to ordered *<=== with orderId and total in parameters*
       * Onload *<=== out of functions*
            * fetch(category/)  *<=== defined route to GET array with all the caterory's products and their dataServer*
            * Call the function checkEmptyCart
            * If not empty, call appendProductCardCart *<=== for each product in the LS* 
            * Call the function totalPriceCalculate
            * add an eventListner to the send order button
            * Call fillHtml(‘shopping_cartPage’) *<=== Use function fillHtml in change-category.js with the shopping_cartPage informations*

<br><br>

* Thanks for order
    * ordered.html
        * head *<=== change with change_category.js (function fillHtml())*
        * header *<=== Same on each page, change with change_category.js (function fillHtml())*
        * main *<=== include thanks, order Id, total order, table of ordered products, see you soon and return to index button*
        * footer *<=== Same on each page*
    * change_category.js
        * configData = {...} *<=== An object containing the category and all HTML information based on the category*
        * function fillHtml(page) *<=== fill the html of the parametered page with elements of the configData*
    * ordered.js
        * display order Id *<=== get it in the document location*
        * display total price *<=== get it in the document location*
        * Call fillHtml('orderedPage') *<=== timeout 200ms Use function fillHtml in change-category.js with the shopping_cartPage informations*
        * desabled quantity selector 
        * Clear the LS.






