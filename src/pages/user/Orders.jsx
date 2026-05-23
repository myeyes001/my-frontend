import React from "react";
import UserLayout from "../../components/UserLayout";
import {
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

function Orders() {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <UserLayout>

      <div
        style={{
          padding: "30px",
          paddingBottom: "140px",
        }}
      >

        {/* TITLE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "35px",
          }}
        >

          <ClipboardDocumentListIcon
            style={{
              width: "42px",
              color: "#ff3131",
            }}
          />

          <h1
            style={{
              fontSize: "42px",
            }}
          >
            Mes commandes
          </h1>

        </div>

        {
          orders.length === 0 ? (

            <div
              style={{
                background: "#fff",
                padding: "60px",
                borderRadius: "30px",
                textAlign: "center",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >

              <ClipboardDocumentListIcon
                style={{
                  width: "80px",
                  color: "#ff3131",
                  marginBottom: "20px",
                }}
              />

              <h2
                style={{
                  color: "#555",
                }}
              >
                Aucune commande
              </h2>

            </div>

          ) : (

            orders
              .slice()
              .reverse()
              .map((order, index) => (

                <div
                  key={index}
                  style={{
                    background: "#fff",
                    borderRadius: "28px",
                    padding: "30px",
                    marginBottom: "25px",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >

                  {/* HEADER */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "25px",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >

                    <div>

                      <h2
                        style={{
                          color: "#ff3131",
                          marginBottom: "8px",
                        }}
                      >
                        Commande #{orders.length - index}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#777",
                        }}
                      >

                        <CalendarDaysIcon
                          style={{
                            width: "18px",
                          }}
                        />

                        {order.date}

                      </div>

                    </div>

                    <div
                      style={{
                        background: "#22c55e",
                        color: "white",
                        padding: "10px 18px",
                        borderRadius: "14px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >

                      <CheckBadgeIcon
                        style={{
                          width: "20px",
                        }}
                      />

                      Livrée

                    </div>

                  </div>

                  {/* ITEMS */}

                  <div
                    style={{
                      background: "#f8f8f8",
                      padding: "20px",
                      borderRadius: "18px",
                    }}
                  >

                    {
                      order.items.map((item, i) => (

                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "12px",
                          }}
                        >

                          <span>{item}</span>

                          <span
                            style={{
                              color: "#777",
                            }}
                          >
                            ✓
                          </span>

                        </div>

                      ))
                    }

                  </div>

                  {/* TOTAL */}

                  <div
                    style={{
                      marginTop: "25px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >

                    <h3
                      style={{
                        color: "#555",
                      }}
                    >
                      Total
                    </h3>

                    <h2
                      style={{
                        color: "#ff3131",
                        fontSize: "30px",
                      }}
                    >
                      {order.total} DH
                    </h2>

                  </div>

                </div>

              ))

          )
        }

      </div>

    </UserLayout>
  );
}

export default Orders;