import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import('../Checkout.css');

const Nav = ({ active, login, address }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img src="./logo.svg" alt="Logo" />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="row">

            <div className="col-md-6  offset-md-1">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className={"nav-item item1 " + (active == 'login' ? 'active' : null)}>
                  <div className="inner-nav">
                    <div className="heading">1 - {login ? "GUEST" : ""} CHECKOUT</div>
                  </div>
                </li>

                <li className={"nav-item " + (active == 'address' ? 'active' : null)}>
                  <div className="inner-nav">
                    <div className="heading">2 - Address</div>
                    <div className="text-muted">{address}</div>
                  </div>
                </li>

                <li className={"nav-item " + (active == 'payment' ? 'active' : null)}>
                  <div className="inner-nav">
                    <div className="heading">3 - Payment</div>
                  </div>
                </li>


              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav