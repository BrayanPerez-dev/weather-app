import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import 'antd/dist/antd.css'

const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;

const Loading = () =>{

    return(
        <Wrapper>
        <Spin indicator={antIcon} />
        </Wrapper>
    )
}

export default Loading

const Wrapper = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`