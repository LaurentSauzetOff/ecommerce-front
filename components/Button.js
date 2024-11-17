import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 10px 20px;
  border-radius: 8px; /* Coins légèrement plus arrondis */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease; /* Transition douce pour toutes les modifications */

  svg {
    height: 16px;
    margin-right: 8px;
    transition: transform 0.3s ease; /* Animation pour les icônes */
  }

  &:hover {
    svg {
      transform: scale(1.1); /* Légère augmentation de l’icône au survol */
    }
  }

  &:focus {
    outline: 3px solid rgba(0, 123, 255, 0.5); /* Mise en évidence pour l'accessibilité */
    outline-offset: 2px;
  }

  /* Style pour les boutons principaux */
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre douce */

      &:hover {
        background-color: #005bb5; /* Couleur de survol */
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Accentuation de l'ombre au survol */
      }
    `}

  /* Style pour les boutons principaux avec bordure */
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};

      &:hover {
        background-color: ${primary};
        color: #fff;
      }
    `}

  /* Style pour les boutons blancs */
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
      border: 1px solid #ddd;

      &:hover {
        background-color: #f0f0f0; /* Couleur de survol */
      }
    `}

  /* Style pour les boutons blancs avec bordure */
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;

      &:hover {
        background-color: #fff;
        color: #000;
      }
    `}

  /* Style pour les boutons noirs */
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;

      &:hover {
        background-color: #333;
      }
    `}

  /* Style pour les boutons noirs avec bordure */
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    `}

  /* Style pour les grands boutons */
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 12px 24px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
