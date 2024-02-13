import React from 'react'

const ConsumptionCard = ({ title, icon, value, unit }) => {
    return (
        <div className='shadow-2 darkgray roundedMore border-box pb1 pt1 pr2 pl2'>
            <p className='bold' style={{ fontSize: '0.875rem' }}>{title}{icon}</p>
            <p style={{ fontSize: '1.25rem' }}>{value}</p>
            <p style={{ fontSize: '0.875rem' }}>{unit}</p>
        </div>
    )
}

export default ConsumptionCard;