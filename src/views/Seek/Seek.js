import { CircularProgress, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Card from '../../components/Card/Card'
import CustomAlert from '../../components/CustomAlert/CustomAlert'
import City from '../../components/Dropdowns/City'
import ReqType from '../../components/Dropdowns/ReqType'
import State from '../../components/Dropdowns/State'
import service from '../../utils/axiosConfig'
import { FORM_FILL_STRUCTURED } from '../../utils/config'

// const values = {
//     name: 'Atharva',
//     email: 'a@gmail.com',
//     phone: '9370787273',
//     desc: 'I have 10 Oxygen cylinders',
//     state: 'Maharashtra',
//     city: 'Pune',
//     type: 'Oxygen Cylinders',
//     addr: 'Katraj, Pune',
//     up: 100,
//     down: 20,
//     mail: 'a@gmail.com'
// }

const Seek = () => {
    const [params, setParams] = useState({
        state: '',
        city: '',
        type: '',
        query: ''
    })
    const [seeker, setSeeker] = useState(true)
    const [cards, setCards] = useState(null)
    const [alert, setAlert] = useState({
        isOpen: false,
        message: '',
        type: 'error'
    })
    const [loading, setLoading] = useState(false)

    const { uuid } = useParams()

    useEffect(() => {
        if(alert.isOpen){
            setTimeout(() => setAlert({...alert, isOpen: false}), 4000)
        }
    }, [alert.isOpen])

    useEffect(() => {
        console.log(uuid);
        setLoading(true)
        if(uuid !== undefined){
            service.get(`${FORM_FILL_STRUCTURED}/${uuid}`)
            .then(res => {
                if(res.data.success){
                    setCards([res.data.response.dataCard])
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
            .finally(() => setLoading(false))
        }
        else{
            service.get(`${FORM_FILL_STRUCTURED}`)
            .then(res => {
                if(res.data.success){
                    setCards(res.data.response.dataCards)
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
            .finally(() => setLoading(false))
        }
    }, [])

    useEffect(() => {
        if(!(params.state === "" && params.city === "" && params.type === "" && params.query === "")){
            setLoading(true)
            service.post(`${FORM_FILL_STRUCTURED}?city=${params.city ? params.city : 'null' }&state=${params.state ? params.state : 'null'}&requestType=${params.type ? params.type : 'null'}&q=${params.query ? params.query : 'null'}&isSeeker=${seeker}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false))
        }
    }, [params])

    const updateCard = data => {
        console.log("Hello guys!")
        const id = data.uuid
        let cardCopy = cards;
        cardCopy = cardCopy.map(c => {
            if(c.uuid !== id) return c
            else return data
        })
        setCards(cardCopy)
    }

    return (
        <div className="layout-wrapper">
            <div className="card-wrapper">
                {
                    uuid === undefined ?
                    <>
                        <div className="tabs">
                            <span onClick={() => setSeeker(true)} className={seeker ? 'active' : null}>Seeker</span>
                            <span onClick={() => setSeeker(false)} className={!seeker ? 'active' : null}>Giver</span>
                        </div>
                        <div className="params">
                            <State onStateChange={value => setParams({ ...params, state: value })}/>
                            <City onCityChange={value => setParams({ ...params, city: value })}/>
                            <ReqType onTypeChange={value => setParams({ ...params, type: value })} />
                            <FormControl className="searchbar">
                                <InputLabel htmlFor="query">Search</InputLabel>
                                <Input
                                    id="query"
                                    value={params.query}
                                    onChange={e => setParams({ ...params, query: e.target.value })}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    </> :
                    <>
                    {
                        cards && cards.map((c, ind) => {
                            return (
                                <Card isLink={uuid === undefined ? false: true} key={ind} {...c} updateCard={updateCard} />
                            )
                        })
                    }
                    </>
                }
                {
                    loading &&
                    <div className="loading inner-loading">
                        <CircularProgress color="primary" />
                    </div>
                }
                {
                    uuid === undefined ?
                    (
                        seeker ?
                        cards && cards.map((c, ind) => {
                            return (
                                !c.isGiver && <Card isLink={uuid === undefined ? false: true} key={ind} {...c} updateCard={updateCard} />
                            )
                        }) :
                        cards && cards.map((c, ind) => {
                            return (
                                c.isGiver && <Card isLink={uuid === undefined ? false: true} key={ind} {...c} updateCard={updateCard} />
                            )
                        })
                    ) : null
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
        </div>
    )
}

export default Seek
