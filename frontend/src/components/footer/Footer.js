import React from 'react'
import './FooterStyles.css'


function Footer() {
    return (
        <div className='footer'>
            <div className="container">
                <div className="top">
                    <h3>Bee 76</h3>
                </div>
                <div className="bottom">
                    <div className="left">
                        <ul>
                            <li>About</li>
                            <li>Advertising</li>
                        </ul>
                    </div>
                    <div className="right">
                        <ul>
                            <li>Contact</li>
                            <li>Privacy</li>                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
