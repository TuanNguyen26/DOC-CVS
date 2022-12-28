import * as React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn';
import Link from './link';
import Loadable from 'react-loadable';
import config from '../../config.js';
import LoadingProvider from './mdxComponents/loading';
import { DarkModeSwitch } from './DarkModeSwitch';
import LogoCvsSvg from './images/logo-cvs';

const help = require('./images/help.svg');

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];

if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

import Sidebar from './sidebar';

const LoadableComponent = Loadable({
  loader: () => import('./search/index'),
  loading: LoadingProvider,
});

function myFunction() {
  var x = document.getElementById('navbar');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

const StyledBgDiv = styled('div')`
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #f8f8f8;
  position: relative;
  display: none;
  background: ${(props) => (props.isDarkThemeActive ? '#001932' : undefined)};

  @media (max-width: 767px) {
    display: block;
  }
`;

const BgNavDefault = styled('nav')`
  background: ${(props) => (props.isDarkThemeActive ? 'rgb(20, 20, 20)' : undefined)};
`;

const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            githubUrl
            helpUrl
            tweetText
            logo {
              link
              image
            }
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={(data) => {
      const logoImg = require('./images/logo.svg');

      const twitter = require('./images/twitter.svg');

      const discordBrandsBlock = require('./images/discord-brands-block.svg');

      const twitterBrandsBlock = require('./images/twitter-brands-block.svg');

      const {
        site: {
          siteMetadata: { headerTitle, githubUrl, helpUrl, tweetText, logo, headerLinks },
        },
      } = data;

      const finalLogoLink = logo.link !== '' ? logo.link : 'https://hasura.io/';

      return (
        <div className={'navBarWrapper'}>
          <BgNavDefault className={'navBarDefault'} isDarkThemeActive={isDarkThemeActive}>
            <div className={'navBarHeader'}>
              <Link to="/" className={'navBarBrand'}>
                {/* {isDarkThemeActive ? (
                  <img
                    isDarkThemeActive={isDarkThemeActive}
                    className={'img-responsive displayInline img-logo'}
                    src="https://demo.computervision.com.vn/Web_logo.svg"
                    alt="logo-cvs"
                  />
                ) : (
                  <img
                    isDarkThemeActive={isDarkThemeActive}
                    className={'img-responsive displayInline img-logo'}
                    alt="logo-cvs"
                    src="https://www.docs.computervision.com.vn/static/logo-cvs-8d7e167d315ede0146bebe3e494a5898.svg"
                  />
                )} */}

                <LogoCvsSvg></LogoCvsSvg>
              </Link>
            </div>

            <div id="navbar" className={'topnav'}>
              <div className={'visibleMobile'}>
                <Sidebar location={location} />
                <hr />
              </div>
              <ul className={'navBarUL navBarNav navBarULRight'}>
                <li>
                  {/* <DarkModeSwitch
                    isDarkThemeActive={isDarkThemeActive}
                    toggleActiveTheme={toggleActiveTheme}
                  /> */}
                </li>
              </ul>
            </div>
          </BgNavDefault>
          <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
            <div className={'navBarDefault removePadd'}>
              <span
                onClick={myFunction}
                className={'navBarToggle'}
                onKeyDown={myFunction}
                role="button"
                tabIndex={0}
              >
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
              </span>
            </div>
            {isSearchEnabled ? (
              <div className={'searchWrapper'}>
                <LoadableComponent collapse={true} indices={searchIndices} />
              </div>
            ) : null}
          </StyledBgDiv>
        </div>
      );
    }}
  />
);

export default Header;
