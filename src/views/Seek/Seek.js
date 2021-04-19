import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import service from '../../utils/axiosConfig'
import { FORM_FILL_STRUCTURED } from '../../utils/config'

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

    const [cards, setCards] = useState(null)
    const [alert, setAlert] = useState({
        isOpen: false,
        message: '',
        type: 'error'
    })

    useEffect(() => {
        service.get(FORM_FILL_STRUCTURED)
        .then(res => {
            if(res.data.success){
                setCards(res.data.response.dataCards)
            }
            else{
                setAlert({
                    isOpen: true,
                    message: res.data.message,
                    type: 'error'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className="layout-wrapper">
            {
                cards && cards.map((c, ind) => {
                    return (
                        <Card key={ind} {...c} />
                    )
                })
            }
            {
                alert.isOpen &&
                <CustomAlert
                    isOpen={alert.isOpen}
                    message={alert.message}
                    type={alert.type}
                />
            }
        </div>
    )
}

export default Seek
