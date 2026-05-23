import React, { useState, useEffect } from "react";
import UserLayout from "../../components/UserLayout";
import {
  ShoppingCartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

function Cart() {

  const [cart, setCart] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

  }, []);

  const removeItem = (indexToRemove) => {

    const updatedCart = cart.filter(
      (_, index) => index !== indexToRemove
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const prices = {
    Burger: 45,
    Pizza: 60,
    Juice: 20,
  };

  const total = cart.reduce(
    (sum, item) => sum + prices[item],
    0
  );

  const handleOrder = () => {

    // COMMANDES EXISTANTES
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // NOUVELLE COMMANDE
    const newOrder = {
      items: cart,
      total: total,
      date: new Date().toLocaleDateString(),
      status: "Livrée",
    };

    // AJOUT
    existingOrders.push(newOrder);

    // SAVE
    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    );

    // SUCCESS
    setSuccess(true);

    // CLEAR CART
    localStorage.removeItem("cart");

    setCart([]);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <UserLayout>

      <div
        style={{
          padding: "30px",
          paddingBottom: "140px",
        }}
      >

        <h1
          style={{
            fontSize: "40px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          Votre Panier

          <ShoppingCartIcon
            style={{
              width: "35px",
              color: "#ff3131",
            }}
          />
        </h1>

        {
          cart.length === 0 ? (

            <div
              style={{
                background: "#fff",
                borderRadius: "25px",
                padding: "60px",
                textAlign: "center",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >

              <ShoppingCartIcon
                style={{
                  width: "70px",
                  color: "#ff3131",
                  marginBottom: "20px",
                }}
              />

              <h2
                style={{
                  color: "#555",
                }}
              >
                Panier vide
              </h2>

            </div>

          ) : (

            <>
              {
                cart.map((item, index) => (

                  <div
                    key={index}
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      padding: "20px",
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxShadow:
                        "0 5px 20px rgba(0,0,0,0.08)",
                    }}
                  >

                    <div>

                      <h2>{item}</h2>

                      <p
                        style={{
                          color: "#777",
                        }}
                      >
                        {prices[item]} DH
                      </p>

                    </div>

                    <button
                      onClick={() => removeItem(index)}
                      style={{
                        background: "#ff3131",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Supprimer
                    </button>

                  </div>

                ))
              }

              <div
                style={{
                  marginTop: "40px",
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "25px",
                  boxShadow:
                    "0 5px 20px rgba(0,0,0,0.08)",
                }}
              >

                <h2
                  style={{
                    fontSize: "30px",
                    marginBottom: "10px",
                  }}
                >
                  Total : {total} DH
                </h2>

                <button
                  onClick={handleOrder}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "16px",
                    border: "none",
                    borderRadius: "16px",
                    background: "#ff3131",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >

                  <CheckCircleIcon
                    style={{
                      width: "24px",
                    }}
                  />

                  Passer la commande

                </button>

                {
                  success && (

                    <div
                      style={{
                        marginTop: "20px",
                        background: "#22c55e",
                        color: "white",
                        padding: "15px",
                        borderRadius: "14px",
                        textAlign: "center",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >

                      <CheckCircleIcon
                        style={{
                          width: "22px",
                        }}
                      />

                      Commande confirmée

                    </div>

                  )
                }

              </div>
            </>

          )
        }

      </div>

    </UserLayout>
  );
}

export default Cart;