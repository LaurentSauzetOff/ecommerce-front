import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9em;
  margin: 5px 0 0 0;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des produits du panier",
            error
          );
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function validateForm() {
    const newErrors = {};

    // Validation du nom
    if (!name.trim()) {
      newErrors.name = "Le nom est requis.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Le nom doit comporter au moins 2 caractères.";
    }

    // Validation de l'email
    if (!email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = "L'email n'est pas valide.";
    }

    // Validation de la ville
    if (!city.trim()) {
      newErrors.city = "La ville est requise.";
    }

    // Validation du code postal
    if (!postalCode.trim()) {
      newErrors.postalCode = "Le code postal est requis.";
    } else if (!/^\d{4,10}$/.test(postalCode.trim())) {
      newErrors.postalCode = "Le code postal n'est pas valide.";
    }

    // Validation de l'adresse
    if (!streetAddress.trim()) {
      newErrors.streetAddress = "L'adresse est requise.";
    }

    // Validation du pays
    if (!country.trim()) {
      newErrors.country = "Le pays est requis.";
    }

    setErrors(newErrors);

    // Si l'objet newErrors est vide, le formulaire est valide
    return Object.keys(newErrors).length === 0;
  }

  async function goToPayment() {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Erreur lors du passage en caisse :", error);
      // Vous pouvez afficher un message d'erreur à l'utilisateur ici
    }
  }

  const total = cartProducts.reduce((sum, productId) => {
    const product = products.find((p) => p._id === productId);
    return sum + (product?.price || 0);
  }, 0);

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const quantity = cartProducts.filter(
                      (id) => id === product._id
                    ).length;
                    return (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>{quantity}</QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </td>
                        <td>${quantity * product.price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total : ${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  goToPayment();
                }}
              >
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </div>
                <CityHolder>
                  <div style={{ flex: 1 }}>
                    <Input
                      type="text"
                      placeholder="City"
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                    {errors.city && <ErrorText>{errors.city}</ErrorText>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Input
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                    {errors.postalCode && (
                      <ErrorText>{errors.postalCode}</ErrorText>
                    )}
                  </div>
                </CityHolder>
                <div>
                  <Input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    name="streetAddress"
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                  />
                  {errors.streetAddress && (
                    <ErrorText>{errors.streetAddress}</ErrorText>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Country"
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  {errors.country && <ErrorText>{errors.country}</ErrorText>}
                </div>
                <Button black block type="submit">
                  Continue to payment
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
