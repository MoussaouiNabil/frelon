import React from 'react'
import './Bee.css'

import Video from '../../assets/hornet.mp4'

function Bee() {
    return (
        <div className='hero'>
            <video autoPlay loop muted id='video'>
                <source src={Video} type='video/mp4' />
            </video>
            <div className="overlay"></div>
            <div className="content">
                <h1>Bee 76</h1>
                <form className="form">
    
                </form>
            </div>
        </div>
    )
}

export default Bee
