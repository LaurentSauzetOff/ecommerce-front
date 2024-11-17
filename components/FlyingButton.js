import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import {primary} from "@/lib/colors";
import FlyingButtonOriginal from "react-flying-item";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";


const FlyingButtonWrapper = styled.div`
  button{
  ${ButtonStyle}
  background-color: transparent;
  border: 1px solid ${primary};
  color:${primary}
  }
`;


export default function FlyingButton(props) {
    const { addProduct } = useContext(CartContext);
    return (<FlyingButtonWrapper outline onClick={() => addProduct(props._id)}>
        <FlyingButtonOriginal {...props}  src={images?.[0]}
              targetTop={"5%"}
              targetLeft={"90%"}
              flyingItemStyling={{width: 'auto', height:'auto', maxWidth: "60px", maxHeight: "60px", borderRadius: 0, }}/>
    </FlyingButtonWrapper>)
}