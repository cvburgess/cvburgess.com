import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components"

const StyledHeader = styled.header`
  border-bottom: 30px solid #FF9C28;
  height: 586px;
  padding: 0 50px;
  margin-bottom: 125px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 100px;
  grid-auto-flow: dense;

  @media (max-width: 579px) {
    background: blue;
  }
`;

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "charles.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(height: 450) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <StyledHeader>
      <div
        style={{
          textAlign: "center",
          alignSelf: "flex-end",
          marginBottom: `-125px`,
          gridRow: 1,
        }}
      >
        <Img fixed={data.file.childImageSharp.fixed} />
      </div>
      <div>
        <h1>Hey there, I'm Charles</h1>
        <p>
          Welcome to your new Gatsby site.
          <br />
          Now go build something great.
          <br />
          Welcome to your new Gatsby site.
        </p>
        <p>Yoga. Technology. Teacher.</p>
      </div>
    </StyledHeader>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
