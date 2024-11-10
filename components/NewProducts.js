import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin: 50px 0 30px;
  position: relative;

  /* Effet de ligne sous le texte */
  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 4px;
    background-color: #333;
    margin: 10px auto 0;
    border-radius: 2px;
  }
`;

const SectionWrapper = styled.div`
  padding: 60px 0; /* Espacement généreux autour de la section */
  background-color: #f9f9f9; /* Couleur de fond douce pour contraster */
`;

export default function NewProducts({ products }) {
  return (
    <SectionWrapper>
      <Center>
        <Title>New Arrivals</Title>
        <ProductsGrid products={products} />
      </Center>
    </SectionWrapper>
  );
}
