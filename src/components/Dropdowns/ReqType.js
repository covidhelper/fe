import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'

const ReqType = props => {
    const [selectedValue, setSelectedValue] = useState('')

    const onTypeChange = e => {
        setSelectedValue(e.target.value)
        props.onTypeChange(e.target.value)
    }

    const data = [
        {id: 'PLASMA', name: "Plasma"},
        {id: 'OXYGEN', name: "Oxygen"},
        {id: 'ICU', name: "ICU"},
        {id: 'VENTILATOR', name: "Ventilator"},
        {id: 'BED', name: "Bed"},
        {id: 'REMDESIVIR', name: "Remdesivir"},
        {id: 'DR', name: "Doctor"},
        {id: 'TIFFIN', name: "Tiffin"},
        {id: 'HOME_CARE', name: "Home Care"},
    ]

    return (
        <FormControl>
            <InputLabel id="type-label" required>Request Type</InputLabel>
            <Select
                required
                labelId="type-label"
                id="reqType"
                value={selectedValue}
                onChange={onTypeChange}
            >
            {
                data && data.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
            }
            </Select>
        </FormControl>
    )
}

export default ReqType
