import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700; /* Style audacieux pour un impact visuel */
  color: #333;
  text-align: center; /* Centré pour une meilleure symétrie */
  margin: 40px 0 20px;
  position: relative;

  /* Effet de ligne décorative sous le titre */
  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 4px;
    background-color: #333; /* Couleur en accord avec la charte */
    margin: 10px auto 0;
    border-radius: 2px;
  }

  @media screen and (min-width: 768px) {
    font-size: 2.5rem; /* Plus grand sur les écrans larges */
  }
`;

export default Title;
