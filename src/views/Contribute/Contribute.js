import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import City from '../../components/Dropdowns/City'
import ReqType from '../../components/Dropdowns/ReqType'
import service from '../../utils/axiosConfig'
import { FORM_FILL_STRUCTURED } from '../../utils/config'

const Contribute = () => {
    const [structuredFormOpen, setStructuredFormOpen] = useState(true)
    const [alert, setAlert] = useState({
        isOpen: false,
        message: '',
        type: 'error'
    })
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        newCity: '',
        state: '',
        email: '',
        contacts: [{ phone: '', contactPerson: '' }],
        address: '',
        requestType: '',
        comment: '',
        isGiver: 'giver'
    })
    const [showCard, setShowCard] = useState(false)
    const [cardData, setCardData] = useState(null)

    useEffect(() => {
        if(alert.isOpen){
            setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    const onFormDataChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const onAddContact = e => {
        e.preventDefault()
        setFormData({
            ...formData,
            contacts: [
                ...formData.contacts,
                {
                    phone: '',
                    contactPerson: ''
                }
            ]
        })
    }

    const onContactChange = (e, ind) => {
        const contacts = formData.contacts
        if(e.target.id === "contactPerson"){
            contacts[ind].contactPerson = e.target.value
        }
        else{
            contacts[ind].phone = e.target.value
        }
        setFormData({
            ...formData,
            contacts: contacts
        })
    }

    const onFormSubmit = e => {
        e.preventDefault()
        const payload = {
            ...formData,
            isGiver: formData.isGiver === "giver" ? true : false
        }
        service.post(FORM_FILL_STRUCTURED, payload)
        .then(res => {
            if(res.data.success){
                if(res.data.response.dataCards[0].isSave){
                    setCardData({...res.data.response.dataCards[0]})
                    setShowCard(true)
                    setAlert({
                        ...alert,
                        isOpen: true,
                        message: "Data added successfully!",
                        type: 'success'
                    })
                }
                else{
                    setAlert({
                        ...alert,
                        isOpen: true,
                        message: "Data already present!",
                        type: 'error'
                    })
                }
            }
            else{
                setAlert({
                    ...alert,
                    isOpen: true,
                    message: res.data.message,
                    type: 'error'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setFormData({
                ...formData,
                name: '',
                newCity: '',
                email: '',
                contacts: [{ phone: '', contactPerson: '' }],
                address: '',
                comment: '',
            })
        })
    }

    const discardData = e => {
        e.preventDefault()
        service.delete(`${FORM_FILL_STRUCTURED}/${cardData.uuid}`)
        .then(res => {
            if(res.data.success){
                setCardData(null)
                setShowCard(false)
                setAlert({
                    ...alert,
                    isOpen: true,
                    message: 'Data deleted successfully!',
                    type: 'success'
                })
            }
            else{
                setAlert({
                    ...alert,
                    isOpen: true,
                    message: res.data.message,
                    type: 'error'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="layout-wrapper">
            <div className="contribute-container">
                <div className="tabs">
                    <span onClick={() => setStructuredFormOpen(true)} className={structuredFormOpen ? 'active' : null}>Fill Form</span>
                    <span onClick={() => setStructuredFormOpen(false)} className={!structuredFormOpen ? 'active' : null}>Upload File</span>
                </div>
                {
                    structuredFormOpen ?
                    <div className="fill-form">
                        <p>Please fill this form with complete honesty. We depend on the goodwill of the community, so please do not intentionally spam this form. If you cannot help, please do not hinder others intention to help.</p>
                        <form onSubmit={onFormSubmit}>
                            <div className="block">
                                <TextField 
                                    label="Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={onFormDataChange} 
                                    type="text"
                                />
                            </div>
                            <div className="block">
                                <TextField 
                                    label="Address"
                                    id="address"
                                    value={formData.address}
                                    onChange={onFormDataChange} 
                                    type="text"
                                />
                            </div>
                            <div className="block">
                                <ReqType onTypeChange={value => setFormData({ ...formData, requestType: value })} />
                            </div>
                            <div className="block">
                                <TextField 
                                    label="Email"
                                    id="email"
                                    value={formData.email}
                                    onChange={onFormDataChange} 
                                    type="email"
                                />
                            </div>
                            <div className="block">
                                <City onCityChange={value => setFormData({ ...formData, city: value })}/>
                            </div>
                            <div className="block">
                                <TextField 
                                    label="Enter city name if not in dropdown"
                                    id="newCity"
                                    value={formData.newCity}
                                    onChange={onFormDataChange} 
                                    type="text"
                                />
                            </div>
                            <div className="block">
                                <TextField 
                                    label="Contact Person Name"
                                    id="contactPerson"
                                    value={formData.contacts[0].contactPerson}
                                    onChange={e => onContactChange(e, 0)} 
                                    type="text"
                                />
                            </div>
                            <div className="block">
                                <TextField 
                                    label="Phone Number"
                                    required
                                    id="phone"
                                    value={formData.contacts[0].phone}
                                    onChange={e => onContactChange(e, 0)} 
                                    type="text"
                                />
                            </div>
                            <div className="block">
                                <FormControl>
                                    <InputLabel id="giver-label">Giver / Seeker</InputLabel>
                                    <Select
                                        labelId="giver-label"
                                        id="isGiver"
                                        value={formData.isGiver}
                                        onChange={e => setFormData({ ...formData, isGiver: e.target.value })}
                                    >
                                        <MenuItem value="giver">Giver</MenuItem>
                                        <MenuItem value="seeker">Seeker</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="block">
                                <TextField 
                                    label="Comment"
                                    id="comment"
                                    multiline
                                    rows={4}
                                    value={formData.comment}
                                    onChange={onFormDataChange} 
                                    type="text"
                                    variant="outlined"
                                />
                            </div>
                            {
                                formData.contacts.map((c, ind) => {
                                    return (
                                        ind !== 0 ?
                                        <div key={ind} className="contact">
                                            <TextField 
                                                label="Contact Person Name"
                                                id="contactPerson"
                                                value={c.contactPerson}
                                                onChange={e => onContactChange(e, ind)} 
                                                type="text"
                                            />
                                            <TextField 
                                                label="Phone Number"
                                                required
                                                id="phone"
                                                value={c.phone}
                                                onChange={e => onContactChange(e, ind)} 
                                                type="text"
                                            />
                                        </div> : null
                                    )
                                })
                            }
                            <div className="control-buttons">
                                <button className="btn" onClick={onAddContact}>Add New Contact</button>
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>
                    </div> :
                    <div className="fill-form">
                        <p>This feature is currently under construction. Thank you for your patience.</p>
                    </div>
                }
                {
                    showCard ?
                    <div className="card-preview">
                        <span>Data Preview</span>
                        {
                            cardData.uuid ?
                            <Card isLink={false} { ...cardData } showUpdate={false} updateCard={() => console.log("Hello")} />
                            : null
                        }
                        <button className="btn" onClick={discardData} >Discard</button>
                    </div> : null
                }
            </div>
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

export default Contribute
