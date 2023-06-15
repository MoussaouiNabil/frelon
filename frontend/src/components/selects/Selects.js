import React from 'react'
import './SelectsStyles.css'

import Objectifs from '../../assets/objectifs.jpg'

import SelectsImg from '../SelectsImg/SelectsImg'


function Selects() {
    return (
        <div name='views' className='selects'>
            <div className='container'>
                <img className='span-3 image-grid-row-2 zoom-out' src={Objectifs} alt="/"/>
            </div>

        </div>
    )
}

export default Selects
