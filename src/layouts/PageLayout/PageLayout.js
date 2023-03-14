import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='page-layout__viewport'>
    <nav className='navbar navbar-expand-lg bg-secondary text-uppercase fixed-top' id='mainNav'>
      <div className='container'>
        <a className='navbar-brand' href='#page-top'>Mibbles Foods</a>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav ms-auto'>
            <IndexLink to='/' activeClassName='page-layout__nav-item--active' className='nav-item mx-0 mx-lg-1'><a className='nav-link py-3 px-0 px-lg-3 rounded' href='#portfolio'>Home</a></IndexLink>
            <Link to='/login' activeClassName='page-layout__nav-item--active' className='nav-item mx-0 mx-lg-1'><a className='nav-link py-3 px-0 px-lg-3 rounded' href='#portfolio'>Login</a></Link>
            <Link to='/blog' activeClassName='page-layout__nav-item--active' className='nav-item mx-0 mx-lg-1'><a className='nav-link py-3 px-0 px-lg-3 rounded' href='#portfolio'>Blog</a></Link>
            <Link to='/about' activeClassName='page-layout__nav-item--active' className='nav-item mx-0 mx-lg-1'><a className='nav-link py-3 px-0 px-lg-3 rounded' href='#portfolio'>About</a></Link>
            <Link to='/contact' activeClassName='page-layout__nav-item--active' className='nav-item mx-0 mx-lg-1'><a className='nav-link py-3 px-0 px-lg-3 rounded' href='#portfolio'>Contact</a></Link>
          </ul>
        </div>
      </div>
    </nav>

    <section className='page-section bg-primary text-white mb-0' id='about'>
      {children}
    </section>

    <footer className='footer text-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 mb-5 mb-lg-0'>
            <h4 className='text-uppercase mb-4'>Location</h4>
            <p className=' footer-text'>
              Marina, St Calimdor
              <br />
              Xero, Tempe
            </p>
          </div>
          <div className='col-lg-4 mb-5 mb-lg-0'>
            <h4 className='text-uppercase mb-4'>Around the Web</h4>
            <a className='btn btn-outline-light btn-social mx-1' href='#!'><i className='fab fa-fw fa-facebook-f'></i></a>
            <a className='btn btn-outline-light btn-social mx-1' href='#!'><i className='fab fa-fw fa-twitter'></i></a>
            <a className='btn btn-outline-light btn-social mx-1' href='#!'><i className='fab fa-fw fa-linkedin-in'></i></a>
            <a className='btn btn-outline-light btn-social mx-1' href='#!'><i className='fab fa-fw fa-dribbble'></i></a>
          </div>
          <div className='col-lg-4'>
            <h4 className='text-uppercase mb-4'>Support Helpdesk</h4>
            <p className='footer-text'>
              call at: +91 - 9123123123
            </p>
          </div>
        </div>
      </div>
    </footer>
    <div className="copyright py-4 text-center text-white">
      <div className="container"><small>Copyright &copy; Sanjeev T. 2023</small></div>
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
