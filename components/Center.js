import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 1200px; /* Limite la largeur maximale pour une meilleure lisibilité */
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 40px; /* Ajout de padding vertical */
  padding-bottom: 40px;

  @media screen and (min-width: 768px) {
    padding: 0 40px; /* Augmente le padding sur les écrans plus larges */
    padding-top: 60px;
    padding-bottom: 60px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1400px; /* Permet d’occuper un peu plus d’espace sur les très grands écrans */
  }
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
