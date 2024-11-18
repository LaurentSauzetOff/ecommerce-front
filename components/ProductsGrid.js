import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import dynamic from "next/dynamic";

const RevealWrapper = dynamic(
  () => import("next-reveal").then((mod) => mod.RevealWrapper),
  {
    ssr: false,
  }
);

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 25px;
    padding: 30px;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
    padding: 40px;
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid interval={100}>
      {products?.length > 0 &&
        products.map((product, index) => (
          <RevealWrapper key={product._id} delay={index*100}>
            <ProductBox {...product} />
          </RevealWrapper>
        ))}
    </StyledProductsGrid>
  );
}
