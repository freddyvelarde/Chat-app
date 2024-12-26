import styled from "styled-components";

export const ConversationsStyles = styled.div`
  .conversation {
    border: none;
    cursor: pointer;
    padding: 10px 3px;
    display: flex;
    justify-content: space-between;
    &:hover {
      transition: 0.2s ease-in-out;
      background: ${(props) => props.theme.btn};
    }
  }
`;

export const TrashBtn = styled.button`
  background-color: ${(props) => props.theme.fg};
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 20px;
`;
