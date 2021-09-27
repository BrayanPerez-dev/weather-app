import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import 'antd/dist/antd.css'
import { Form, Button, Input, Card,Empty } from 'antd';
import { CloseOutlined, AimOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons'
import moment from "moment";
import { weatherStates, getCtoF } from '../helpers/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ContextAPI from '../api/ContextAPI'
import places from '../api/places.json'
const Search = () => {

  const { data, getWoeid, today, showCel, } = useContext(ContextAPI)
  const [visible, setVisible] = useState(true)
  const [citys, setCitys] = useState([])
  const [town, setTowns] = useState([])

  const showSearch = () => {
    setVisible(false)
  }
  const fetchData = () => {
    const data = places
    setTowns(data)
  }
  useEffect(() => {
    fetchData()
  }, [])


  /* const onFinish = (value) => {
    const { search } = value
    axios.get(`https://nominatim.openstreetmap.org/search/?city=${search}&format=json`)
      .then(res => {
        setCitys(res.data)
        return res.data
      })
  } */

  const onFinish = (value) => {
    const { search } = value
    const newSearch = search.trim()
    const findData = town.filter(item => {
      return Object.keys(item).some((key) => item[key].toString().includes(newSearch))
    })
    setCitys(findData)

  }
  const getPlace = (name) => {
    getWoeid(name)
    setVisible(true)
  }

  return (
    <WrapperSearch>
      {
        visible ?

          <div className="fix">
            <div className="">
              <span className="inpic">
                <Input placeholder="Seach for places" className="input" onClick={showSearch} />
                <AimOutlined style={{ color: '#E7E7EB', fontSize: '22px' }} />
              </span>
              <img src={weatherStates(today.weather_state_abbr)} alt={data.title} className="img" />
              <p className="pp" >{showCel ? today.the_temp && today.the_temp.toFixed(2) : getCtoF(today.the_temp)}</p>
              <p className="ps" >{today.weather_state_name}</p>
              <p className="pt" >{moment(today.applicable_date).format("ddd, D MMM")}</p>
              <span className="location"><EnvironmentOutlined /><p>&nbsp;{data.title}</p></span>
            </div>
          </div>
          : <div className="fix-1">
            <Form
              onFinish={onFinish}
            >
              <CloseOutlined style={{ color: '#fff', marginLeft: '200px', marginBottom: '25px', marginTop: '10px' }} onClick={() => setVisible(prev => !prev)} />
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Form.Item name="search" >
                  <Input placeholder="Seach for places" prefix={<SearchOutlined className="icon" />} className="input-2" />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' className="btn-antd" htmlType="submit" >
                    Search
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div className="citys">
              {
                citys.length > 0 ? citys.map((item, index) =>

                  <Card key={index} className="lista" onClick={() => getPlace(item.name)}>
                    <p className="results">{item.name}
                      <FontAwesomeIcon icon={faChevronRight} className="arrow" />
                    </p>
                  </Card>

                ) : <Empty/>
              }
            </div>
          </div>


      }


    </WrapperSearch>


  )
}

export default Search

const WrapperSearch = styled.div`
width:400px;
height: 100vh;  

.fix{
  text-align: center;
  display:flex;
  position: fixed;
  flex-direction: column;
  flex-wrap: wrap;
  width:375px;
  height: 100vh;
  background: #1E213A;
}
.fix-1{
  text-align: center;
  display:flex;
  position: fixed;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: auto;
  width:375px;
  height:100vh;
  background: #1E213A;


  
}
   
    .inpic{
      display:flex;
      justify-content:space-around;
      align-items:baseline;
    }
    .location{
      display:inline-flex;
      align-items:baseline;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      color: #88869D ;
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
  
width:auto;
border-radius: 10px;
background: rgba(255, 255, 255, 0.2);
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

  width: 250px;
  height: 75px;
  margin-left: 10px;
  border:none;
  background: #1E213A;
  justify-content: space-between;
  cursor:pointer;
  margin-top: 20px;
 
}
.results{
  font-style: normal;
font-weight: 500;
font-size: 15px;
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
margin-left:auto;
color: #616475;
margin-top:-15px;
}
.img{
  width: 175px;
  height: 225px;
}
 .pp{
  font-style: normal;
  font-weight: 500;
  font-size: 75px;
  color: #E7E7EB;
  margin-bottom: 10px;
}
.ps{
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  color: #A09FB1; 
  margin-bottom: 25px;

}
.pt{
  font-style: normal;
  font-weight: 500;
  font-size: 30px; 
  color: #88869D; 
}
.ant-empty-description{
  color:#fff
}
 @media screen and (max-width: 730px) {
   
   .fix {
    width:100vw;
    position:inherit;
    overflow: auto;
    justify-content: center;
  } 
  .fix-1{
    width:100vw;
    position:inherit;
    }  
  
 }
 /* 
 @media screen and (min-width:280px) and (max-width:800px){
   display:none ;
} */
  
  
 
`