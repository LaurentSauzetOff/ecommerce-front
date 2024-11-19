import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";

const SearchInput = styled(Input)`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-color: #aaa;
  }
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 10px 0;
  background-color: #eeeeeeaa;
  z-index: 100;
`;

const NoResultsMessage = styled.h2`
  font-size: 1.5rem;
  color: #555;
  text-align: center;
  margin-top: 50px;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
        <SearchInput
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          autoFocus
          placeholder="Search for product"
        />
        </InputWrapper>
        {!isLoading && phrase !== "" && products.length === 0 && (
           <NoResultsMessage>Aucun produit trouvé pour la requête &quot;{phrase}&quot;</NoResultsMessage>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
