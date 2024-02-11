//!this container give a row flex display of his childrens
import React from "react";
import styled from "styled-components/native";
const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  fontfamily: "Roboto-Regular";
  @media (min-width: 375px) {
    flex-direction: column;
  }
`;
const RowContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};

export default RowContainer;
