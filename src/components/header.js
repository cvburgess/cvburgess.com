import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import email from "../images/email.svg";
import github from "../images/gh.svg";
import instagram from "../images/ig.svg";
import linkedin from "../images/in.svg";

const icons = { email, github, instagram, linkedin };

const Background = styled.header`
  border-bottom: 30px solid #ff9c28;
  height: 586px;
  padding: 0 50px;
  margin-bottom: 125px;

  background-color: #363537;
  color: #fafafa;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  height: 586px;

  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 100px;
  grid-auto-flow: dense;
`;

const Charles = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  margin-bottom: -125px;

  @media (max-width: 720px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: #00c8b6;
`;

const Icons = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Icon = styled.a`
  display: block;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  background-image: url(${(props) => icons[props.icon]});
  background-size: 30px;
`;

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      charles: file(relativePath: { eq: "charles.png" }) {
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
    <Background>
      <Container>
        <Charles>
          <Img fixed={data.charles.childImageSharp.fixed} />
        </Charles>
        <div>
          <Title>Hey there, I'm Charles</Title>
          <p>
            Welcome to your new Gatsby site.
            <br />
            Now go build something great.
            <br />
            Welcome to your new Gatsby site.
          </p>
          <p>Yoga. Technology. Teacher.</p>
          <Icons>
            <Icon href="https://google.com" icon="email" />
            <Icon href="https://google.com" icon="instagram" />
            <Icon href="https://google.com" icon="linkedin" />
            <Icon href="https://google.com" icon="github" />
          </Icons>
        </div>
      </Container>
    </Background>
  );
};

export default Header;
