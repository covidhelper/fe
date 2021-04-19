import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useState } from 'react'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import City from '../../components/Dropdowns/City'
import ReqType from '../../components/Dropdowns/ReqType'
import State from '../../components/Dropdowns/State'
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
        state: '',
        email: '',
        contacts: [{ phone: '', contactPerson: '' }],
        address: '',
        requestType: '',
        comment: '',
        isGiver: 'giver'
    })

    const onFormDataChange = e => {
        console.log(e.target.id, e.target.value);
        if(e.target.id === undefined){
            setFormData({
                ...formData,
                requestType: e.target.value
            })
        }
        else{
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
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

    const onFileUpload = e => {
        e.preventDefault()
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
                if(res.data.response.isSave){
                    setAlert({
                        isOpen: true,
                        message: "Data added successfully!",
                        type: 'success'
                    })
                }
                else{
                    setAlert({
                        isOpen: true,
                        message: "Data already present!",
                        type: 'error'
                    })
                }
                setFormData({
                    name: '',
                    city: '',
                    state: '',
                    email: '',
                    contacts: [{ phone: '', contactPerson: '' }],
                    address: '',
                    requestType: '',
                    comment: '',
                    isGiver: 'giver'
                })
                sessionStorage.setItem("userId", res.data.response.userId)
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
                            <TextField 
                                label="Name"
                                id="name"
                                value={formData.name}
                                onChange={onFormDataChange} 
                                type="text"
                            />
                            <TextField 
                                label="Address"
                                id="address"
                                value={formData.address}
                                onChange={onFormDataChange} 
                                type="text"
                            />
                            {
                                formData.contacts.map((c, ind) => {
                                    return (
                                        <TextField 
                                            label="Contact Person Name"
                                            id="contactPerson"
                                            value={c.contactPerson}
                                            onChange={e => onContactChange(e, ind)} 
                                            type="text"
                                        />
                                    )
                                })
                            }
                            {
                                formData.contacts.map((c, ind) => {
                                    return (
                                        <TextField 
                                            label="Phone Number"
                                            required
                                            id="phone"
                                            value={c.phone}
                                            onChange={e => onContactChange(e, ind)} 
                                            type="text"
                                        />
                                    )
                                })
                            }
                            <State onStateChange={value => setFormData({ ...formData, state: value })}/>
                            <City onCityChange={value => setFormData({ ...formData, city: value })}/>
                            <TextField 
                                label="Comment"
                                id="comment"
                                value={formData.comment}
                                onChange={onFormDataChange} 
                                type="text"
                            />
                            <FormControl>
                                <InputLabel id="giver-label" required>Giver / Seeker</InputLabel>
                                <Select
                                    required
                                    labelId="giver-label"
                                    id="isGiver"
                                    value={formData.isGiver}
                                    onChange={e => setFormData({ ...formData, isGiver: e.target.value })}
                                >
                                    <MenuItem value="giver">Giver</MenuItem>
                                    <MenuItem value="seeker">Seeker</MenuItem>
                                </Select>
                            </FormControl>
                            <ReqType onTypeChange={value => setFormData({ ...formData, requestType: value })} />
                            <TextField 
                                label="Email"
                                id="email"
                                value={formData.email}
                                onChange={onFormDataChange} 
                                type="email"
                            />
                            <div>
                                <button className="btn" onClick={onAddContact}><Add /> Add New Contact</button>
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form>
                    </div> :
                    <div className="fill-form">
                        <p>This feature is currently under construction. Thank you for your patience.</p>
                        {/* <form onSubmit={onFileUpload}>
                            <div>
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form> */}
                    </div>
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
