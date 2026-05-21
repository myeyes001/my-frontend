import React, { useEffect, useState } from "react";
import UserLayout from "../../components/UserLayout";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

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
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          Mes commandes 📦
        </h1>

        {orders.length === 0 ? (

          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "24px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Aucune commande 😢</h2>

            <p
              style={{
                color: "#777",
                marginTop: "10px",
              }}
            >
              Vous n'avez pas encore passé de commande.
            </p>
          </div>

        ) : (

          orders.map((order, index) => (

            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "25px",
                marginBottom: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >

              <h2
                style={{
                  marginBottom: "15px",
                }}
              >
                Commande #{index + 1}
              </h2>

              <div
                style={{
                  color: "#555",
                  marginBottom: "15px",
                }}
              >
                {order.items.join(" , ")}
              </div>

              <h3
                style={{
                  color: "#ff3131",
                }}
              >
                Total : {order.total} DH
              </h3>

              <p
                style={{
                  marginTop: "10px",
                  color: "#22c55e",
                  fontWeight: "bold",
                }}
              >
                ✔ Commande confirmée
              </p>

            </div>

          ))
        )}

      </div>

    </UserLayout>
  );
}

export default Orders;