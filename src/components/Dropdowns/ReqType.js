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
        {id: 'TOCILIZUMAB', name: "Tocilizumab"},
    ]

    return (
        <FormControl>
            <InputLabel shrink id="type-label" required={props.required}>Request Type</InputLabel>
            <Select
                required={props.required}
                labelId="type-label"
                id="reqType"
                value={selectedValue}
                onChange={onTypeChange}
                displayEmpty
            >
                <MenuItem value="" disabled>Select Requirement</MenuItem>
                {
                    data && data.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default ReqType
