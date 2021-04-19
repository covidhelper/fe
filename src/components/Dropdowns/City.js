import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import city from '../../utils/in.json'

const City = props => {
    const [cities, setCities] = useState(null)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        let arr = []
        city.map(c => {
            arr.push(c.city)
        })
        arr = arr.sort((a, b) => a > b ? 1 : -1)
        setCities(arr)
    }, [])

    const onCityChange = e => {
        setSelectedValue(e.target.value)
        props.onCityChange(e.target.value)
    }

    return (
        <FormControl>
            <InputLabel id="city-label" required={props.required}>City</InputLabel>
            <Select
                required={props.required}
                labelId="city-label"
                id="city"
                value={selectedValue}
                onChange={onCityChange}
            >
            {
                cities && cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)
            }
            </Select>
        </FormControl>
    )
}

export default City
