import styled from "styled-components";

export const ConversationsStyles = styled.div`
  .online {
    width: 10px;
    height: 10px;
    background-color: #5ce65c;
    border-radius: 50%;
    position: relative;
    right: -20%;
  }
  .conversation {
    border: none;
    cursor: pointer;
    padding: 10px 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      transition: 0.2s ease-in-out;
      background: ${(props) => props.theme.btn};
    }
  }
  li {
    align-items: center;
    display: flex;
    flex-direction: colum;
  }
`;

export const TrashBtn = styled.button`
  background-color: ${(props) => props.theme.fg};
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 20px;
`;
