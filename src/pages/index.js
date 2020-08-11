import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>YOU CAN ALWAYS COME OM</h1>
    <p>

    </p>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/post/">Go to post</Link>
  </Layout>
);

export default IndexPage;
