import Header from "@/components/Header";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  color: #e63946;
  font-size: 0.9em;
  margin: 5px 0 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Activer l'état côté client après le montage du composant
    setIsClient(true);

    if (session) {
      // Placeholder for loading user info if available
      setEmail(session.user.email);
    }
  }, [session]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google", {
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };

    // Simple client-side validation example
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!city) newErrors.city = "City is required";
    if (!postalCode) newErrors.postalCode = "Postal code is required";
    if (!streetAddress) newErrors.streetAddress = "Street address is required";
    if (!country) newErrors.country = "Country is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.put("/api/address", data);
        alert("Address saved successfully");
      } catch (error) {
        alert("Failed to save address");
      }
    }
  }

  useEffect(() => {
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            {/* Utilisation conditionnelle de RevealWrapper après le montage côté client */}
            {isClient ? (
              <RevealWrapper delay={0}>
                <WhiteBox>
                  <SectionTitle>Wishlist</SectionTitle>
                  <p>Your wishlist will appear here.</p>
                </WhiteBox>
              </RevealWrapper>
            ) : (
              <WhiteBox>
                <SectionTitle>Wishlist</SectionTitle>
                <p>Your wishlist will appear here.</p>
              </WhiteBox>
            )}
          </div>
          <div>
            {isClient ? (
              <RevealWrapper delay={100}>
                <WhiteBox>
                  <SectionTitle>Account Details</SectionTitle>
                  {!loaded && <Spinner fullWidth={true} />}
                  {loaded && (
                    <>
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
                      {errors.country && (
                        <ErrorText>{errors.country}</ErrorText>
                      )}
                      <Button black block onClick={saveAddress}>
                        Save
                      </Button>
                      <hr />
                    </>
                  )}

                  {session ? (
                    <Button primary onClick={logout}>
                      Logout
                    </Button>
                  ) : (
                    <Button primary onClick={login}>
                      Login
                    </Button>
                  )}
                </WhiteBox>
              </RevealWrapper>
            ) : (
              <WhiteBox>
                <SectionTitle>Account Details</SectionTitle>
                <div>Loading...</div>
              </WhiteBox>
            )}
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
