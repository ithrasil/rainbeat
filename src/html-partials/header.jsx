import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <header>
        <nav>
          <div className="logo-container">
            <a href="/"><img src="/images/logo.svg" /></a>
          </div>
          <div className="burger">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>

          <div className="menu-container">
            <ul>
              <li>
                <a href="#">Listen</a>
              </li>
              <li>
                <a href="#">Artists</a>
              </li>
              <li>
                <a href="#">Albums</a>
              </li>
              <li>
                <a href="#">Search</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
