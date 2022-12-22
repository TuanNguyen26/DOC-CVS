import * as React from 'react';
import styled from '@emotion/styled';
import { StaticQuery, graphql } from 'gatsby';
import Link from './link';
import Loadable from 'react-loadable';
import config from '../../config.js';
import LoadingProvider from './mdxComponents/loading';
import { DarkModeSwitch } from './DarkModeSwitch';
import { UlHeader } from './HeaderStyled';

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
  background-color: #000;
  position: relative;
  display: none;
  background: ${(props) => (props.isDarkThemeActive ? '#000' : undefined)};

  @media (max-width: 767px) {
    display: block;
  }
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
      return (
        <div className="navBarWrapper">
          <div className="navBarDefault">
            <div className={'navBarHeader'}>
              <Link to="/" className={'navBarBrand'}>
                <img
                  className={'img-responsive displayInline'}
                  src="https://www.docs.computervision.com.vn/static/logo-cvs-8d7e167d315ede0146bebe3e494a5898.svg"
                  alt="logoCVS"
                />
              </Link>

              <UlHeader className={'sideBarUL'}>
                <Link to="/">Trang chủ</Link>
                <Link to="/api-v1">Api v1</Link>
                <Link to="/api-v2">Api v2</Link>
              </UlHeader>

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
              </StyledBgDiv>
            </div>

            {isSearchEnabled ? (
              <div className={'searchWrapper'}>
                <LoadableComponent collapse={true} indices={searchIndices} />
              </div>
            ) : null}

            <div id="navbar" className={'topnav'}>
              <div className={'visibleMobile'}>
                <Sidebar location={location} />
                <hr />
              </div>
              <ul className={'navBarUL navBarNav navBarULRight'}>
                <li>
                  <DarkModeSwitch
                    isDarkThemeActive={isDarkThemeActive}
                    toggleActiveTheme={toggleActiveTheme}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }}
  />
);

export default Header;
