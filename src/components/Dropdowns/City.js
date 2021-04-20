import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import service from '../../utils/axiosConfig'
import { CITIES } from '../../utils/config'

const City = props => {
    const [cities, setCities] = useState(null)
    const [selectedValue, setSelectedValue] = useState("")

    useEffect(() => {
        service.get(CITIES)
        .then(res => {
            console.log(res.data);
            if(res.data.success){
                let cityCopy = res.data.response.city.filter(c => c.city.trim() !== "")
                cityCopy = cityCopy.sort((a, b) => a.city > b.city ? 1 : -1)
                setCities(cityCopy)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const onCityChange = e => {
        setSelectedValue(e.target.value)
        props.onCityChange(e.target.value)
    }

    return (
        <FormControl>
            <InputLabel shrink id="city-label" required={props.required}>City</InputLabel>
            <Select
                required={props.required}
                labelId="city-label"
                id="city"
                value={selectedValue}
                onChange={onCityChange}
                displayEmpty
            >
                <MenuItem value="" disabled>Select City</MenuItem>
                {
                    cities && cities.map(c => <MenuItem key={c.id} value={c.city}>{c.city}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default City
