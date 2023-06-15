import React, { useState, useContext } from 'react' 
import { BsPerson } from 'react-icons/bs'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

import { Link } from 'react-scroll'
import { Link as Nav } from 'react-router-dom'
import './NavbarStyles.css'
import { AuthContext } from '../Login_Signup/AuthContext';

function Navbar() {
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)
      const { isLoggedIn } = useContext(AuthContext);

    return (
        <div name='home' className={nav ? 'navbar navbar-bg' : 'navbar'}>
            <div className={nav ? 'logo dark' : 'logo'}>
                <h2>Bee 76</h2>
            </div>
            <ul className="nav-menu">
                <li><Nav style={{ textDecoration: 'none', color: 'white' }} to='/' smooth={true} duration={500} >Home</Nav></li>
                <li><Link to='destinations' smooth={true} duration={500} >Frelon</Link></li>
                <li><Link to='views' smooth={true} duration={500} >Objectifs</Link></li>
                <li>{isLoggedIn && (
                <Nav style={{ textDecoration: 'none', color: 'white' }} to='maptrap' smooth={true} duration={500} >Carte</Nav>
                )}
                </li>
                <li>{isLoggedIn && (
                <Nav style={{ textDecoration: 'none', color: 'white' }} to='trap' smooth={true} duration={500} >Pièges</Nav>
                )}
                </li>
            </ul>
            <div className="nav-icons">
                <Nav style={{ textDecoration: 'none', color: 'white' }} 
                to ={isLoggedIn ? '/logout' : '/sign-in'}>
                <BsPerson className='icon' />
                </Nav>
            </div>
            <div className="hamburger" onClick={handleNav}>
                {!nav ? (<HiOutlineMenuAlt4 className='icon' />) : (<AiOutlineClose style={{ color: '#000' }} className='icon' />)}

            </div>

            <div className={nav ? 'mobile-menu active' : 'mobile-menu'}>
                <ul className="mobile-nav">
                <Link to='home' smooth={true} duration={500} ><li>Home</li></Link>
                {isLoggedIn && (
                <Nav style={{ textDecoration: 'none', color: 'black' }} to='maptrap' smooth={true} duration={500} >
                    <li>Carte</li> 
                    </Nav>
                    )}
                {isLoggedIn && (
                <Nav style={{ textDecoration: 'none', color: 'black' }} to='trap' smooth={true} duration={500} >
                    <li>Pièges</li>
                    </Nav>
                )}   
                <Link to='views' smooth={true} duration={500} ><li>Objectifs</li></Link>
                </ul>
                <div className="mobile-menu-bottom">
                    <div className="menu-icons">
                        <button onClick={() =>isLoggedIn ? window.location.href='./logout' : window.location.href='./sign-in'}>
                            Connexion
                            </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar