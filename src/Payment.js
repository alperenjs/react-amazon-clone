import React from "react";
import { useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import { getBasketTotal } from "./reducer";
import CreditCardInput from "react-credit-card-input";
import swal from "sweetalert";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [{ cardNumber, expiry, cvc }, setCard] = useStateValue();

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* devliery addres */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email || "test@gmail.com"}</p>
            <p>123 React Lane</p>
            <p>Denizli / Turkey</p>
          </div>
        </div>

        {/* review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
            <p className="total__payment">
              <strong>Order Total: {getBasketTotal(basket)}</strong>
            </p>
          </div>
          <div className="payment__details">
            <CreditCardInput
              cardNumberInputProps={{
                value: cardNumber,
                onChange: setCard.handleCardNumberChange,
              }}
              cardExpiryInputProps={{
                value: expiry,
                onChange: setCard.handleCardExpiryChange,
              }}
              cardCVCInputProps={{
                value: cvc,
                onChange: setCard.handleCardCVCChange,
              }}
              fieldClassName="input"
            />
          </div>

          <button
            onClick={(e) => {
              swal(
                "This demo was only for React Context API test.",
                "Thanks for being here."
              );
            }}
            className="buy_button"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
