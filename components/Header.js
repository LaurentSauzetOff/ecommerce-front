import Link from "next/link";
import styled from "styled-components";

const StyledHeader = styled.header` 
background-color: #222;
`;

const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;

export default function Header() {
    return (
        <StyledHeader>
            <Link href={'/'}>Ecommerce</Link>
            <nav>
            <Link href={'/'}>Accueil</Link>
            <Link href={'/products'}>Tous les produits</Link>
            <Link href={'/categories'}>catégories</Link>
            <Link href={'/account'}>Votre compte</Link>
            <Link href={'/cart'}>Panier (0)</Link>
            </nav>
        </StyledHeader>
    )
}