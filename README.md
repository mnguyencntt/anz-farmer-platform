# anz-farmer-platform
## Basic e-commerce shopping-cart application built with React & Redux

This simple application prototype shows how we can use React and Redux to build a friendly user experience with instant visual updates.

## Demo
[Here](https://master.d19z9355is6mml.amplifyapp.com/)

## Features
* Login & Logout & Show UserInfo & Update UserInfo 
* Show & add & remove products 
* Edit the quantity of the items in real time
* Calculate automatically the total including the shipping (if chosen)
* Apply Payment with VISA/MASTER/AMEX card
* Apply Notification after completing Payment by Email & SMS
* Checkout with DeliveryInfo + PaymentInfo + NotificationInfo + OrderInfo

# Getting started
### Requirements

* NPM
* Reactjs

### Package installation
```bash
npm install
```
 ### Start the React App
 Excute the following command: 
```bash
npm start
```
The application will start automatically in your browser on http://localhost:3000


## AWS GUIDE
URL: https://aws.amazon.com/getting-started/hands-on/deploy-react-app-cicd-amplify/

## Paypal sandbox

URL: https://www.sandbox.paypal.com/
```bash
npm install --save react-paypal-express-checkout
```

#### Sandbox account
sb-1ru2z1497570@business.example.com

#### ClientID
AQYFFbTHr3KXd9SlfilXO6Keywm0wp2K003E3bQidDkiEKL__2WFhxWOHQHzwVJgC6gOKirKj6bK-Fo5


#### Merchant Account
email: sb-1ru2z1497570@business.example.com 
password: Tw8s@<6h

#### Buyer Account
email: sb-pxkvd1498278@personal.example.com
password: 8@X_ij1k

##### onSuccess - the returned payment object will look like:
{paid: true, cancelled: false, payerID: "H8S4CU73PFRAG", paymentID: "PAY-47J75876PA321622TLESPATA", paymentToken: "EC-8FE085188N269774L", returnUrl: "https://www.sandbox.paypal.com/?paymentId=PAY-47J75876PA321622TLESPATA&token=EC-8FE085188N269774L&PayerID=H8S4CU73PFRAG"}




