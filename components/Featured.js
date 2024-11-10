import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  background: linear-gradient(135deg, #222, #333); /* Ajout d'un dégradé */
  color: #fff;
  padding: 60px 0;
  position: relative;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700; /* Texte plus audacieux */
  font-size: 2rem;
  line-height: 1.2;
  color: #fff;
  @media screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Desc = styled.p`
  color: #bbb; /* Un gris plus léger pour le contraste */
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px; /* Limite la largeur pour plus de lisibilité */
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 300px;
    display: block;
    margin: 0 auto;
    border-radius: 10px; /* Coins arrondis pour un style moderne */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Ombre subtile pour profondeur */
    transition: transform 0.3s ease; /* Animation au survol */

    &:hover {
      transform: scale(1.05); /* Zoom au survol */
    }
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
      max-height: 400px;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={`/product/${product._id}`}
                  outline={1}
                  white={1}
                >
                  Read more
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="../public/image.jpeg" alt={product.title} />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
