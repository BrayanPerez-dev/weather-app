import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Form, Button, Input, Card } from 'antd';
import { CloseOutlined, AimOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons'
import moment from "moment";
import { weatherStates, getCtoF } from '../helpers/helpers'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ContextAPI from '../api/ContextAPI'

const Search = () => {

  const { data, getWoeid, today, showCel, } = useContext(ContextAPI)
  const [visible, setVisible] = useState(true)
  const [citys, setCitys] = useState([])
  const showSearch = () => {
    setVisible(false)
  }

  console.log(today)

  const onFinish = (value) => {

    const { search } = value


    axios.get(`https://nominatim.openstreetmap.org/search/?city=${search}&format=json`)
      .then(res => {


        setCitys(res.data)
        return res.data
      })



  }
  const getPlace = (item) => {
    getWoeid(item.lat, item.lon)
    setVisible(true)
  }


  return (




    <Wrapper>

      {

        visible ?
          
            <div className="container-one">

              <Input placeholder="Seach for places" className="input" onClick={showSearch} />
              <div className="circle">
                <AimOutlined style={{ color: '#E7E7EB', fontSize: '22px' }} />
              </div>

            <div className="day">
              <img src={weatherStates(today.weather_state_abbr)} alt="wheater" style={{ width: '150px', height: '150px' }} />
              <p style={{ fontStyle: 'normal', fontWeight: '500', fontSize: '75px', color: '#E7E7EB',marginBottom:'10px'}}>
                {showCel ? today.the_temp && today.the_temp.toFixed(2) : getCtoF(today.the_temp)}</p>
              <p style={{ fontStyle: 'normal', fontWeight: '600', fontSize: '36px', color: '#A09FB1',marginBottom:'25px'}}>{today.weather_state_name}</p>
              <p style={{ fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#88869D' }}>
                {moment(today.applicable_date).format(
                  "ddd, D MMM"
                )}
              </p>
              <span style={{ fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#88869D', display: 'flex' }} >
                <EnvironmentOutlined /><p >&nbsp;{data.title}</p></span>
            </div>
            </div>



          : <div className="container-two">
          
            <Form
              name="basic"
              onFinish={onFinish}
            >
  <div className="formulario">

              <CloseOutlined style={{ color: '#fff', marginLeft: '200px', marginBottom: '25px',marginTop:'10px'}} onClick={() => setVisible(prev => !prev)} />
              <Form.Item
                name="search"
              >
                <Input placeholder="Seach for places" prefix={<SearchOutlined className="icon" />} className="input-2" />
              </Form.Item>
              <Form.Item>
                <Button type='primary' className="btn-antd" htmlType="submit" >
                  <p style={{ color: '#fff' }}>Search</p>
                </Button>
              </Form.Item>
              </div>

            </Form>
            <div className="citys">
            {
              citys.map((item, index) =>
            
                <Card key={index} className="lista" onClick={() => getPlace(item)}>
                  <p className="results">{item.display_name}
                    <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                  </p>
                </Card>

              )
            }
          </div>

          </div>

      }


    </Wrapper >


  )
}

export default Search

const Wrapper = styled.div`
background: #100E1D; 
 width:100%;
 height: 100%;   
    .container-one{
      width:300px;
      height:100%;
    background: #1E213A;
      align-content: flex-start;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items:baseline;

    }
    

    .input{
        width: 125px;
        height: 40px;
        margin-top: 12px;
        background: #6E707A;
        color: #E7E7EB;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  
    .input:hover {
    background-color: #1E213A;
    color: #E7E7EB;
    outline: 0;
    border: 1px solid #E7E7EB;
    box-sizing: border-box;

    }
.input:focus  {
    background-color: #1E213A;
    color: #E7E7EB;
    outline: 0;
    border: 1px solid #E7E7EB;
    box-sizing: border-box;
}
    
.input-2{
  width: 150px;
  height: 40px;
  border: 1px solid #E7E7EB;
  box-sizing: border-box;
  background: #1E213A;
  color: #616475;

}
.icon{
  color: #616475;

}
.ant-input-affix-wrapper > input.ant-input{
  background:#1E213A;
  color: #616475;
}
.btn-antd{
  
  width: 86px;
  height: 40px;
  font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 20px;
}

.circle{
  
width:'42';
border-radius: 10px;
background: rgba(255, 255, 255, 0.2);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.container-two{
  width: 300px;
  height: 100%;
  background: #1E213A;
  justify-content: center;
  overflow: auto;
}
.formulario{
  display: flex;
  justify-content: space-evenly;
  flex-direction:row;
  flex-wrap:wrap;
}
.citys{
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  height:78vh;
}
.lista{

  width: 275px;
  height: 75px;
  border:none;
  background: #1E213A;
  cursor:pointer;
 
}
.results{
  font-style: normal;
font-weight: 500;
font-size: 10px;
color: #E7E7EB;
}

.lista:hover {
  border: 1px solid #616475;
   box-sizing: border-box;
    outline: 0;
    .arrow{
  display:flex
}
}
.lista:focus  {
    outline: 0;
    border: 1px solid #616475;
box-sizing: border-box;
}
.arrow{
  display:none;
margin-left:240px;
color: #616475;
margin-top:-15px;
}

@media screen and (max-width: 300px) {
   
  .container-one {
    width:278px;
  } 
  .container-two{
    width:278px;

  } 
 }
`