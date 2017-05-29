import React from 'react';

const menus = [
  { id: 0, href: "#", name: "listen" },
  { id: 1, href: "#", name: "artists" },
  { id: 2, href: "#", name: "albums" },
  { id: 3, href: "#", name: "search" },
]

class Header extends React.Component {
  
  changeMenu() {
    
    this.state = {
      activeMenu: 3
    }
      
  }
  
  render() {
    
    let hrefs = [];
    
    for(const menu of menus) {
      const el = 
            <li>
              <a href={ menu.href } data-menu={ menu.name } onClick={ this.changeMenu.bind(this) }>
              { menu.name }</a>
            </li>;
            
      hrefs.push(el);
    }
    
    return(
      <nav className="navigation_component">
        <div className="container">
         
          <div className="logo">
            <a href="/"><img src="/images/logo.svg" /></a>
          </div>
          
          <div className="burger">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>

          <div className="menu">
            <ul>
              { hrefs }
            </ul>
          </div>
          
        </div>
      </nav>
    )
  }
}

export default Header;
