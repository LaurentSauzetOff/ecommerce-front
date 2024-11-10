import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Remplit l’espace en conservant le ratio */
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  width: 50px;
  height: 50px; /* Dimension fixe pour chaque vignette */
  border: 2px solid ${(props) => (props.active ? "#4361ee" : "transparent")};
  padding: 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: border-color 0.3s ease, transform 0.2s ease;

  &:hover {
    border-color: #4361ee; /* Couleur primaire */
    transform: scale(1.05);
  }

  img {
    border-radius: 5px;
  }
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Main product image" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="Product thumbnail" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
