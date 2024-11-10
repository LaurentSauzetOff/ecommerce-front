import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const SectionWrapper = styled.div`
  padding: 60px 0; /* Espacement généreux autour de la section */
  background-color: #f9f9f9; /* Couleur de fond douce pour contraster */
`;

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <SectionWrapper>
        <Center>
          <Title>All products</Title>
          <ProductsGrid products={products} />
        </Center>
      </SectionWrapper>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
