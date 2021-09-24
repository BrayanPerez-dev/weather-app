import React, { useContext } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Card } from 'antd'
import moment from "moment";
import { weatherStates,getCtoF } from '../helpers/helpers'
import ContextAPI from '../api/ContextAPI'

const Nextdays = () => {
    const { consolidated_weather,showCel} = useContext(ContextAPI)
     
    console.log(consolidated_weather)

    return (
        <Wrapper>


            {
                consolidated_weather.filter((day) => day.id !== consolidated_weather[0].id).map(({ min_temp, max_temp, applicable_date, weather_state_abbr,weather_state_name }, index) => (
                    <Card className="days" key={index}>
                        <p style={{ color: '#fff' }}>{moment(applicable_date).format("ll") ===
                            moment().add(1, "days").format("ll")
                            ? "Tommorow"
                            : moment(applicable_date).format("ddd, D MMM")}</p>
                        <img src={weatherStates(weather_state_abbr)} alt={weather_state_name} style={{ width: '57px', height: '62px', marginBottom: '5px' }} />
                        <div className="temps">
                            <p style={{ color: '#fff', marginLeft: '-18px' }}>{
                            showCel ?  min_temp.toFixed(2)  : getCtoF(min_temp)
                            }{showCel ? '°C' : '°F'}</p>
                            &nbsp;&nbsp;<p style={{ color: '#fff', marginRight: '-18px' }}>{showCel ?  max_temp.toFixed(2) : getCtoF(max_temp)} {showCel ? "°C" : "°F"}</p>
                        </div>
                    </Card>
                ))
            }


        </Wrapper>
    )
}

export default Nextdays
const Wrapper = styled.div`
    
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
    .days{
        
        display:flex;
        justify-content:center;
        margin:5px;
        width: 140px;
        height: 170px;
        background: #1E213A;
    }
    .temps{
        display:flex;
        justify-content: space-evenly;
    }

`

