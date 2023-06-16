import React from 'react'
import './Difference.css'

import Diff_1 from '../../assets/différence_p1.jpg'
import Diff_2 from '../../assets/différence_p2.jpg'

function Difference() {
    return (
        <div name='destinations' className='destinations'>
            <div className="container">
                <h1>Reconnaitre les différentes espèces</h1>
                <p>Frelon asiatique VS Frelon Européen</p>
                <div className="img-container">
                    <img className='span-3 image-grid-row-2' src={Diff_1} alt="/"/>
                    <img className='span-3 image-grid-row-2' src={Diff_2} alt="/"/>
                </div>
            </div>
        </div>
    )
}

export default Difference
