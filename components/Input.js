import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Transition douce */

  &:hover {
    border-color: #888; /* Couleur de bordure légèrement plus foncée au survol */
  }

  &:focus {
    border-color: #4361ee; /* Couleur primaire pour le focus */
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.3); /* Effet de halo autour de l'input */
    outline: none; /* Supprime l'outline par défaut */
  }

  /* Style d'erreur si la prop error est présente */
  ${(props) =>
    props.error &&
    `
      border-color: #e63946;
      box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.3); /* Halo rouge pour les erreurs */
    `}
`;

export default function Input({ error, ...props }) {
  return <StyledInput {...props} error={error} />;
}
