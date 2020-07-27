import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import usf from "../images/logos/usf.svg";
import perch from "../images/logos/perch.svg";
import spectrum from "../images/logos/spectrum.svg";
import sysco from "../images/logos/sysco.svg";
import lotus from "../images/logos/lotus.svg";

const logos = [perch, usf, sysco, spectrum, lotus];

const Top = styled.footer`
  border-top: 30px solid #ff9c28;
  height: 100px;
  padding: 0 50px;
  margin-top: 125px;

  background-color: #363537;
  color: #fafafa;
`;

const Container = styled.footer`
  border-bottom: 30px solid #ff9c28;
  height: 300px;
  padding: 0 50px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 100px;
  grid-auto-flow: dense;

  background-color: #363537;
  color: #fafafa;
`;

const Dexter = styled.div`
  text-align: right;
  align-self: flex-start;
  margin-top: -175px;

  @media (max-width: 579px) {
    display: none;
  }
`;

const Logos = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 50px;
  overflow: hidden;
  margin: 20px 0;
`;

const Logo = styled.img`
  display: block;
  width: auto;
  height: 30px;
  margin: 10px 20px;
`;

const Footer = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "dexter.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(height: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <>
      <Top>
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
      <Logos>
        {logos.map(src => <Logo src={src} />)}
      </Logos>
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
