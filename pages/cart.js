import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { Link } from "next/link";
import dynamic from "next/dynamic";

const RevealWrapper = dynamic(
  () => import("next-reveal").then((mod) => mod.RevealWrapper),
  {
    ssr: false,
  }
);

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 5px;
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
  font-weight: bold;

  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 10px;
`;

const ErrorText = styled.p`
  color: #e63946;
  font-size: 0.9em;
  margin: 5px 0 0;
`;

const SectionWrapper = styled.div`
  padding: 60px 0; /* Espacement généreux autour de la section */
  background-color: #f9f9f9; /* Couleur de fond douce pour contraster */
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
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des produits du panier",
            error
          )
        );
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
    })
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function validateForm() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Le nom est requis.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim()))
      newErrors.email = "L'email n'est pas valide.";
    if (!city.trim()) newErrors.city = "La ville est requise.";
    if (!postalCode.trim() || !/^\d{4,10}$/.test(postalCode.trim()))
      newErrors.postalCode = "Le code postal n'est pas valide.";
    if (!streetAddress.trim())
      newErrors.streetAddress = "L'adresse est requise.";
    if (!country.trim()) newErrors.country = "Le pays est requis.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function goToPayment() {
    if (!validateForm()) return;

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
      if (response.data.url) window.location = response.data.url;
    } catch (error) {
      console.error("Erreur lors du passage en caisse :", error);
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
        <SectionWrapper>
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Thanks for your !</h1>
                <p>We will email you when your order will be sent.</p>
              </Box>
            </ColumnsWrapper>
          </Center>
        </SectionWrapper>
      </>
    );
  }

  return (
    <>
      <Header />
      <SectionWrapper>
        <Center>
          <ColumnsWrapper>
            <RevealWrapper delay={0}>
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
                                <img
                                  src={product.images[0]}
                                  alt={product.title}
                                />
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
            </RevealWrapper>

            {!!cartProducts?.length && (
              <RevealWrapper delay={100}>
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
                        onChange={(ev) => setName(ev.target.value)}
                      />
                      {errors.name && <ErrorText>{errors.name}</ErrorText>}
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                      />
                      {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    </div>
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      {errors.city && <ErrorText>{errors.city}</ErrorText>}
                      <Input
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                      {errors.postalCode && (
                        <ErrorText>{errors.postalCode}</ErrorText>
                      )}
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    {errors.streetAddress && (
                      <ErrorText>{errors.streetAddress}</ErrorText>
                    )}
                    <Input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                    {errors.country && <ErrorText>{errors.country}</ErrorText>}
                    <Button black block type="submit">
                      Continue to payment
                    </Button>
                  </form>
                </Box>
              </RevealWrapper>
            )}
          </ColumnsWrapper>
        </Center>
      </SectionWrapper>
    </>
  );
}
