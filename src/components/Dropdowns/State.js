import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import city from '../../utils/in.json'

const State = props => {
    const [states, setStates] = useState(null)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        let arr = []
        city.map(c => {
            arr.push(c.admin_name)
        })
        arr = [...new Set(arr)]
        arr = arr.sort((a, b) => a > b ? 1 : -1)
        setStates(arr)
    }, [])

    const onStateChange = e => {
        setSelectedValue(e.target.value)
        props.onStateChange(e.target.value)
    }

    return (
        <FormControl>
            <InputLabel shrink id="state-label" required={props.required}>State</InputLabel>
            <Select
                required={props.required}
                labelId="state-label"
                id="State"
                value={selectedValue}
                onChange={onStateChange}
                displayEmpty
            >
                <MenuItem value="" disabled>Select State</MenuItem>
                {
                    states && states.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default State
