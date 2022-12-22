import styled from 'styled-components';

export const NavBarWrapper = styled.div`
  position: relative;
`;

export const NavBarDefault = styled.nav`
  /* position: absolute; */
  height: 58px !important;
`;
export const NavBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  width: 100%;
  line-height: 58px;
  position: fixed;
  z-index: 90;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;

  .topnav {
    position: absolute !important;
    top: 45.6px;

    border-spacing: 0;
    display: block;
    border-collapse: collapse;
    overflow-y: scroll;
    background-color: #fff;
    z-index: 20 !important;
    height: 100vh !important;
    right: 0;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }

  .topnav::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }

  .css-nnusmx-Sidebar {
    width: 300px;
    z-index: 30 !important;
  }
`;

export const NavBarRight = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

export const UlHeader = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  line-height: 58px;
  margin: 0 !important;
  height: 58px !important;

  a {
    color: #fff;
    margin: 0 20px;
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const LiHeader = styled.li`
  display: flex;
  margin: 0 10px;
`;

export const StyledBgDiv = styled.div`
  left: -40px;
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
