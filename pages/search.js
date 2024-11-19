import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SearchInput = styled(Input)`
  padding: 5px 15px;
  border-radius: 5px;
  margin: 30px 0 30px;
  font-size: 1.4rem;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
useEffect(() => {
    if(phrase.length > 0) {
        axios.get('/api/products?phrase='+encodeURIComponent(phrase)).then(response => {
            console.log(response.data);
        });
    }
  }, [phrase]);
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          value={phrase}
          onChange={(ev) => setPhrase(ev.target.value)}
          autoFocus
          placeholder="Sreach for product"
        />
      </Center>
    </>
  );
}
