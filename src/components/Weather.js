import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import Search from './Search'
import Nextdays from './Nextdays'
import Hightlights from './Hightlights'
import baseUrl from '../api/baseUrl'
import ContextAPI from '../api/ContextAPI'
import Loading from './Loading'
const Weather = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [showCel, setShowcel] = useState(true)
    const [woeid, setWoeid] = useState(2487889)
    const [consolidated_weather, setConsolidated_weather] = useState([])
    const [today, setToday] = useState({})


    const getData = async (id) => {
        setIsloading(true)
        try {

            const response = await baseUrl.get(`/location/${woeid}`)

            const { consolidated_weather } = response.data
            const today = consolidated_weather[0]
            setConsolidated_weather(consolidated_weather)
            setToday(today)
            setData(response.data)
            setIsloading(false)

        } catch (error) {
            console.log(error)
        }
    }
    const getWoeid = async (lat, lon) => {
        setIsloading(true)

        try {
            const response = await baseUrl.get(`/location/search/?lattlong=${lat}+${','}${lon}`)
            const { data } = response
            const { woeid } = data[0]
            setWoeid(woeid)
            setIsloading(false)

        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getData()
    }, [woeid])



    if(isLoading) return <div><Loading/></div>
    return (
        <ContextAPI.Provider value={{ data, getWoeid, consolidated_weather, today, showCel, setShowcel }}>

            <Wrapper >
            <div className="search">
                <Search />
                </div>
                <div className="container">
                <div className="conver">
                    <div className="cel" onClick={() => setShowcel(true)}>
                        <p style={{ marginTop: '10px' }}>°C</p>
                    </div>
                    &nbsp;
                    <div className="fah" onClick={() => setShowcel(false)}>
                        <p style={{ marginTop: '10px' }}>°F</p>
                    </div>
                </div>
                <Nextdays />
                <Hightlights /> 
                </div>
            </Wrapper>
        </ContextAPI.Provider>

    )
}

export default Weather

const Wrapper = styled.div`
 display:flex;
 height: 100%;
 background: #100E1D; 
.wrap{ 
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
} 

.conver{
    display: flex;
   margin-top:20px;
}
 .cel{
     display:flex;
     justify-content: center;
     align-items: baseline;
     width: 40px;
     height: 40px;
     background: #E7E7EB;
    border-radius: 54px;
    color:#585676;
    cursor: pointer;
    
}

.fah{
    display:flex;
     justify-content: center;
    width: 40px;
    height: 40px;
    background: #585676;
    border-radius: 54px;
    color:#E7E7EB;
    cursor: pointer
}


.search{
}
@media screen and (max-width: 665px) {
   .container{
    overflow: auto;
  }
}
@media screen and (max-width: 730px) {
   
  flex-wrap: wrap;
 
}/* 
@media screen and (min-height: 1035px) {
   
    height: 100vh;
 }
   */
`