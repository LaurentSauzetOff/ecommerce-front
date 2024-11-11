import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: rgba(34, 34, 34, 0.95); 
  backdrop-filter: blur(5px); 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold; 
  letter-spacing: 1px; 
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
    opacity: 1;
    transform: translateY(0);
    transition: transform 0.3s ease, opacity 0.3s ease;
  `
      : `
    display: none;
    opacity: 0;
    transform: translateY(-20px);
  `}
  gap: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: rgba(34, 34, 34, 0.95);
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    opacity: 1;
    transform: translateY(0);
    padding: 0;
    background-color: transparent;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #ddd;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 0;
  transition: color 0.3s ease; 
  
  &:hover {
    color: #fff; 
  }
  
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  transition: transform 0.3s ease; 
  
  &:hover {
    transform: rotate(90deg); 
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>TechSphere</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length || 0})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
