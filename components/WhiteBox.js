import styled from "styled-components";

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 12px; /* Coins plus arrondis */
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Ombre douce */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transition fluide */

  &:hover {
    transform: translateY(-5px); /* Légère montée au survol */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* Ombre accentuée au survol */
  }
`;

export default WhiteBox;
