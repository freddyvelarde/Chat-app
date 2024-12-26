import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
list-style:none;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: ${(props) => props.theme.bg};
color: ${(props) => props.theme.mainText};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
  }

p {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

@media (max-width: 760px) {
p{
font-size: 1rem;
}
}

  a {
color: inherit;
    text-decoration: none;

  font-family: "Montserrat", sans-serif;
  // font-family: "Poppins", sans-serif;
  font-weight: 500;
  // font-style: italic;
  font-style: normal;
  }
`;
export default GlobalStyle;
