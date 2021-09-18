import React, { useContext } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Card, Slider } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import ContextAPI from '../api/ContextAPI'

const Hightlights = () => {
    const { today } = useContext(ContextAPI)
    const marks = {
        0: {
            style: {
                color: '#A09FB1',
            },
            label: <strong>0</strong>,
        },
        50: {
            style: {
                color: '#A09FB1',
            },
            label: <strong>50</strong>,
        },
        100: {
            style: {
                color: '#A09FB1',
            },
            label: <strong>100</strong>,
        },
    };

    return (
        <Wrapper>
            <div className="contenedor-1">
                
                    <Card className="firts">
                    <p>Wind status</p>
                    <h1>{today.wind_speed && today.wind_speed.toFixed(2)}mph</h1>
                    <FontAwesomeIcon icon={faLocationArrow} className="direction" style={{ transform: `rotate(${today.wind_direction}deg)` }} />
                    <h5>{today.wind_direction_compass}</h5>
                </Card>
              
                    <Card className="firts">
                    <p>Humidity</p>
                    <h1>{today.humidity}%</h1>
                    <Slider marks={marks} step={10} value={today.humidity} />
                </Card>
                </div>
                <div className="contenedor-2">
                <Card className="second">
                    <p>Visibility</p>
                    <h1>{today.visibility && today.visibility.toFixed(2)}miles</h1>
                </Card>
               
                <Card className="second">
                    <p>Air Pressure</p>
                    <h1>{today.air_pressure}mb </h1>
                </Card>
                
                </div>
               


        </Wrapper >
    )
}

export default Hightlights
const Wrapper = styled.div`

.contenedor-1{
display:flex;
justify-content: space-evenly;
flex-wrap: wrap;


}
.contenedor-2{
    display:flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-bottom: 46.5px;


}
.wrap{ 
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}  
.firts{
    width: 200px;
    height: 180px;
    background: #1E213A;
    justify-content: center;
    margin-bottom:5px;

}
.second{
    width: 200px;
    height: 170px;
    background: #1E213A;
    margin-top:2.5px;
 
}
p{
font-family: Raleway;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 19px;
text-align: center;
color: #E7E7EB;
}
h1{
    
font-family: Raleway;
font-style: normal;
font-weight: bold;
font-size: 25px;
line-height: 75px;
text-align: center;

color: #E7E7EB;
}
h5{
font-family: Raleway;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 16px;
text-align: center;
margin-top: -20px;
color: #E7E7EB;
}
.direction{
    color:#E7E7EB;
    margin-left:20px;
}

`