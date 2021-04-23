import React from 'react'
import Card from '../../components/Card/Card'

const Seek = () => {
    const values = {
        name: 'Atharva',
        email: 'a@gmail.com',
        phone: '9370787273',
        desc: 'I have 10 Oxygen cylinders',
        state: 'Maharashtra',
        city: 'Pune',
        type: 'Oxygen Cylinders',
        addr: 'Katraj, Pune',
        up: 100,
        down: 20,
        mail: 'a@gmail.com'
    }
    return (
        <div className="layout-wrapper">
            <Card { ...values } />
            <Card { ...values } />
            <Card { ...values } />
        </div>
    )
}

export default Seek
