import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const pages: string[] = ['home', 'about', 'contacts', 'favorite', 'product', 'admin'];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Static Pages
          </a>
          <button className='navbar-toggler' type='button' onClick={toggleMenu}>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className='navbar-nav'>
              {pages.map((page) => (
                <li className='nav-item' key={page} onClick={() => setIsOpen(false)}>
                  <NavLink
                    to={'/pages/' + page}
                    className={({ isActive, isPending }) =>
                      `nav-link ${
                        isPending ? 'pending' : isActive ? 'active' : ''
                      }`
                    }
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;