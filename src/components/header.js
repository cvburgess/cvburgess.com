import React from "react";
import PropTypes from "prop-types";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const Header = ({ siteTitle }) => {
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
    <header
      style={{
        background: `#363537`,
        borderBottom: `30px solid #FF9C28`,
        height: "586px",
        display: "flex",
          marginBottom: `125px`,
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: `-125px`,
        }}
      >
        <Img fixed={data.file.childImageSharp.fixed} />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <h1
          style={{
            marginTop: "100px",
            color: `#00C8B6`,
            lineHeight: 1.4,
            textDecoration: `none`,
          }}
        >
          Hey there, I'm Charles
        </h1>
        <p
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: "22px",
            color: "#FFFFFF",
          }}
        >
          Welcome to your new Gatsby site.
          <br />
          Now go build something great.
          <br />
          Welcome to your new Gatsby site.
        </p>
        <p
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: "22px",
            color: "#FFFFFF",
          }}
        >
          Yoga. Technology. Teacher.
        </p>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
