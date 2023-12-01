import React from 'react'

import './Header.css'

function Header() {
  return (
    <div>
    <nav className="navbar navbar-expand" data-bs-theme="light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">J$L</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">User</a>
            </li>
            <li>
              <button className="btn btn-outline-dark" type="submit">
                <i className="bi bi-cart-fill me-"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{0}</span>
              </button>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-secondary my-2 my-sm-0 me-5" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Header;