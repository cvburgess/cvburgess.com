import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const Top = styled.footer`
  border-top: 30px solid #ff9c28;
  height: 100px;
  padding: 0 50px;
  margin-top: 125px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 100px;
  grid-auto-flow: dense;

  background-color: #363537;
  color: #fafafa;

  @media (max-width: 579px) {
    background: blue;
  }
`;

const Container = styled.footer`
  border-bottom: 30px solid #ff9c28;
  height: 300px;
  padding: 0 50px;
  margin-bottom: 125px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 100px;
  grid-auto-flow: dense;

  background-color: #363537;
  color: #fafafa;

  @media (max-width: 579px) {
    background: blue;
  }
`;

const Dexter = styled.div`
  text-align: center;
  align-self: flex-start;
  margin-top: -225px;
`;

const Footer = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "dexter.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(height: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <>
      <Top>
        <div />
        <Dexter>
          <Img fixed={data.file.childImageSharp.fixed} />
        </Dexter>
      </Top>
      <Container>
        <div>
          <p>© {new Date().getFullYear()}</p>
        </div>
        <div>
          <p>© {new Date().getFullYear()}</p>
        </div>
        <div>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </Container>
    </>
  );
};

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
