import styled from "styled-components";

export default function Icon({ color, children }) {
  return <StyledIcon background={color}>{children}</StyledIcon>;
}

const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease-in-out; 

  &:hover {
    transform: scale(1.1); /* Increase size on hover */
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.2s ease-in-out; 
  }

  &:hover svg {
    transform: scale(1.5); /* Increase size on hover */
  }
`;
