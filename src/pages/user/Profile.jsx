import React, { useState, useEffect } from "react";
import UserLayout from "../../components/UserLayout";

import {
  UserCircleIcon,
  EnvelopeIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  StarIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

function Profile() {

  const [editing, setEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedUser =
      JSON.parse(localStorage.getItem("user"));

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    if (savedUser) {
      setUserData(savedUser);
    }

    setCart(savedCart);
    setOrders(savedOrders);

  }, []);

  // STATS

  const cartCount = cart.length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  let rating = 0;

  if (orders.length >= 1) rating = 3.5;
  if (orders.length >= 3) rating = 4.2;
  if (orders.length >= 5) rating = 4.7;
  if (orders.length >= 10) rating = 5;

  // SAVE PROFILE

  const handleSave = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setEditing(false);

    window.location.reload();

  };

  return (
    <UserLayout>

      <div
        style={{
          padding: "30px",
          paddingBottom: "140px",
        }}
      >

        {/* PROFILE CARD */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#ff3131,#ff6b6b)",
            borderRadius: "35px",
            padding: "40px",
            color: "white",
            boxShadow:
              "0 15px 40px rgba(255,49,49,0.25)",
            marginBottom: "35px",
            position: "relative",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,0.12)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >

            {/* LEFT SIDE */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                flexWrap: "wrap",
              }}
            >

              {/* AVATAR */}

              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ff3131",
                  fontSize: "55px",
                  fontWeight: "bold",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                {
                  userData?.name
                    ?.charAt(0)
                    ?.toUpperCase()
                }
              </div>

              {/* INFOS */}

              <div>

                <h1
                  style={{
                    fontSize: "52px",
                    marginBottom: "10px",
                  }}
                >
                  {userData?.name}
                </h1>

                <p
                  style={{
                    fontSize: "22px",
                    opacity: 0.9,
                  }}
                >
                  Étudiant • Université
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background:
                      "rgba(255,255,255,0.18)",
                    padding: "10px 18px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                  }}
                >

                  <StarIcon
                    style={{
                      width: "22px",
                      color: "#ffe066",
                    }}
                  />

                  Premium Client

                </div>

              </div>

            </div>

            {/* BUTTON */}

            {
              editing ? (

                <button
                  onClick={handleSave}
                  style={{
                    background: "#22c55e",
                    border: "none",
                    color: "white",
                    padding: "14px 22px",
                    borderRadius: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  <CheckIcon
                    style={{
                      width: "20px",
                      display: "inline",
                      marginRight: "6px",
                    }}
                  />
                  Sauvegarder
                </button>

              ) : (

                <button
                  onClick={() => setEditing(true)}
                  style={{
                    background: "white",
                    border: "none",
                    color: "#ff3131",
                    padding: "14px 22px",
                    borderRadius: "16px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  <PencilSquareIcon
                    style={{
                      width: "20px",
                      display: "inline",
                      marginRight: "6px",
                    }}
                  />
                  Modifier
                </button>

              )
            }

          </div>

        </div>

        {/* CONTENT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >

          {/* INFORMATIONS */}

          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              padding: "30px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                color: "#ff3131",
                marginBottom: "30px",
                fontSize: "32px",
              }}
            >
              Informations personnelles
            </h2>

            {/* NAME */}

            <div
              style={{
                marginBottom: "25px",
              }}
            >

              <p
                style={{
                  color: "#999",
                  marginBottom: "8px",
                }}
              >
                Nom complet
              </p>

              {
                editing ? (

                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "16px",
                      border: "1px solid #ddd",
                      fontSize: "18px",
                    }}
                  />

                ) : (

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >

                    <UserCircleIcon
                      style={{
                        width: "28px",
                        color: "#ff3131",
                      }}
                    />

                    {userData.name}

                  </div>

                )
              }

            </div>

            {/* EMAIL */}

            <div>

              <p
                style={{
                  color: "#999",
                  marginBottom: "8px",
                }}
              >
                Email
              </p>

              {
                editing ? (

                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "16px",
                      border: "1px solid #ddd",
                      fontSize: "18px",
                    }}
                  />

                ) : (

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "20px",
                    }}
                  >

                    <EnvelopeIcon
                      style={{
                        width: "25px",
                        color: "#ff3131",
                      }}
                    />

                    {userData.email}

                  </div>

                )
              }

            </div>

          </div>

          {/* ACTIVITY */}

          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              padding: "30px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                color: "#ff3131",
                marginBottom: "30px",
                fontSize: "32px",
              }}
            >
              Activité
            </h2>

            {/* CARD 1 */}

            <div
              style={{
                background: "#f8f8f8",
                borderRadius: "22px",
                padding: "25px",
                marginBottom: "20px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <ShoppingBagIcon
                  style={{
                    width: "35px",
                    color: "#ff3131",
                  }}
                />

                <h1
                  style={{
                    color: "#ff3131",
                    fontSize: "42px",
                  }}
                >
                  {cartCount}
                </h1>

              </div>

              <p
                style={{
                  marginTop: "10px",
                  color: "#555",
                }}
              >
                Produits dans le panier
              </p>

            </div>

            {/* CARD 2 */}

            <div
              style={{
                background: "#f8f8f8",
                borderRadius: "22px",
                padding: "25px",
                marginBottom: "20px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <CurrencyDollarIcon
                  style={{
                    width: "35px",
                    color: "#ff3131",
                  }}
                />

                <h1
                  style={{
                    color: "#ff3131",
                    fontSize: "42px",
                  }}
                >
                  {totalSpent} DH
                </h1>

              </div>

              <p
                style={{
                  marginTop: "10px",
                  color: "#555",
                }}
              >
                Total dépensé
              </p>

            </div>

            {/* CARD 3 */}

            <div
              style={{
                background: "#f8f8f8",
                borderRadius: "22px",
                padding: "25px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <StarIcon
                  style={{
                    width: "35px",
                    color: "#ff3131",
                  }}
                />

                <h1
                  style={{
                    color: "#ff3131",
                    fontSize: "42px",
                  }}
                >
                  {rating} ★
                </h1>

              </div>

              <p
                style={{
                  marginTop: "10px",
                  color: "#555",
                }}
              >
                Évaluation
              </p>

            </div>

          </div>

        </div>

      </div>

    </UserLayout>
  );
}

export default Profile;