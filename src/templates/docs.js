import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import { Layout, Link } from '$components';
import NextPrevious from '../components/NextPrevious';
import config from '../../config';
import { Edit, StyledHeading, StyledMainWrapper } from '../components/styles/Docs';

const forcedNavOrder = config.sidebar.forcedNavOrder;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;

    console.log('dataa', data);
    if (!data) {
      return this.props.children;
    }
    const { allMdx, mdx } = data;

    const githubIcon = require('../components/images/github.svg').default;
    const navItems = allMdx.edges
      .map(({ node }) => node.fields.slug)
      .filter((slug) => slug !== '/')
      .reduce(
        (acc, cur) => {
          if (forcedNavOrder.find((url) => url === cur)) {
            return { ...acc, [cur]: [cur] };
          }

          // console.log('accc', acc);
          console.log('curr', cur);

          let prefix = cur.split('/')[1];

          if (config.gatsby && config.gatsby.trailingSlash) {
            prefix = prefix + '/';
          }

          if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
            return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
          } else {
            return { ...acc, items: [...acc.items, cur] };
          }
        },
        { items: [] }
      );

    console.log('navItems', navItems);

    const nav = forcedNavOrder
      .reduce((acc, cur) => {
        return acc.concat(navItems[cur]);
      }, [])
      .concat(navItems.items)
      .map((slug) => {
        if (slug) {
          const { node } = allMdx.edges.find(({ node }) => node.fields.slug === slug);

          return { title: node.fields.title, url: node.fields.slug };
        }
      });

    // meta tags
    const metaTitle = mdx.frontmatter.metaTitle;

    const metaDescription = mdx.frontmatter.metaDescription;

    let canonicalUrl = config.gatsby.siteUrl;

    canonicalUrl =
      config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
    canonicalUrl = canonicalUrl + mdx.fields.slug;

    return (
      <Layout {...this.props}>
        <div className={'titleWrapper'}>
          <StyledHeading>{mdx.fields.title}</StyledHeading>
        </div>
        <StyledMainWrapper>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </StyledMainWrapper>
        <div className={'addPaddTopBottom'}>
          <NextPrevious mdx={mdx} nav={nav} />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
    allMdx(sort: { fields: frontmatter___stt, order: ASC }) {
      edges {
        node {
          fields {
            slug
            title
          }
          frontmatter {
            stt
          }
        }
      }
    }
  }
`;
