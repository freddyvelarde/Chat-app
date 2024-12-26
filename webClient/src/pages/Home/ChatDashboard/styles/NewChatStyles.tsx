import styled from "styled-components";

export const NewChatStyles = styled.div`
  // background: blue;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const UsersCard = styled.div`
  border-radius: 10px;
  margin-top: 5px;
  // min-height: 100px;
  width: 19%;
  background: ${(props) => props.theme.bg};
  position: fixed;
  padding: 5px;
  .card {
    color: ${(props) => props.theme.btn};
    transition: 0.2s ease-in-out;
    padding: 2px;
    cursor: pointer;
    &:hover {
      color: grey;
    }
  }
`;

export const InputStyles = styled.input`
  // padding: 10px;
  width: 100%;
  border-radius: 30px;
  border: none;
  background: ${(props) => props.theme.fg};
  color: ${(props) => props.theme.mainText};
  padding: 12px;
  font-size: 16px;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border-color: none;
  }
`;

export const CloseBtn = styled.button`
  right: 3%;
  top: 2%;
  color: white;
  position: absolute;
  width: 10%;
  background: none;
  border: none;
  cursor: pointer;
`;
