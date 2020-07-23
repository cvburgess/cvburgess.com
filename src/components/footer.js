import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

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
    <footer
      style={{
        borderTop: `30px solid #FF9C28`,
        borderBottom: `30px solid #FF9C28`,
        height: "586px",
        display: "flex",
        margin: `125px 0`,
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <p>© {new Date().getFullYear()}</p>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: `-225px`,
        }}
      >
        <Img fixed={data.file.childImageSharp.fixed} />
      </div>
    </footer>
  );
};

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
