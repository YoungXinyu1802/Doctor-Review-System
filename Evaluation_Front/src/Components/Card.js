import {Card, Col, Divider, Row} from "antd";
import { Typography } from 'antd';
import React from "react";
import '../CSS/Card.css'

import Lu from '../assets/Lu.jpg'
import { StarFilled } from '@ant-design/icons';
import {doctorList} from '../MockData/cardData'

const imgStyle={
    width:'80px',
    height:'80px',
    float:'auto',
}

const { Paragraph,Title } = Typography;

const testCardClick  = (e) =>{
    console.log(e.target.className)
}

const CardList = () => {
    const [ellipsis, setEllipsis] = React.useState(true);
    return (
        <Card hoverable className="showTotal">
            <Divider className="mDivider">
                <Title level={4}>热门医生</Title>
            </Divider>
            <div className="container">
                <Card hoverable className="card1" onClick={testCardClick}>
                    <img src={Lu} style={imgStyle} className='image'/>
                    <Title level={5}>{doctorList[0].name} {doctorList[0].title}</Title>
                    <div className="text1">{doctorList[0].post}</div>
                    <div className="text1" >
                        <StarFilled style={{color:"#fff207"}}/>  {doctorList[0].score}</div>
                    <Paragraph ellipsis={ellipsis
                        ? {
                            rows: 2,
                        }
                        : false}  className="text1">
                        {doctorList[0].detail}
                    </Paragraph>
                </Card>
                <Card hoverable className="card1">
                    <img src={Lu} style={imgStyle} className='image'/>
                    <Title level={5}>{doctorList[1].name} {doctorList[1].title}</Title>
                    <div className="text1">{doctorList[1].post}</div>
                    <div className="text1" >
                        <StarFilled style={{color:"#fff207"}}/>  {doctorList[1].score}</div>
                    <Paragraph ellipsis={ellipsis
                        ? {
                            rows: 2,
                        }
                        : false}  className="text1">
                        {doctorList[1].detail}
                    </Paragraph>
                </Card>
                <Card hoverable className="card1">
                    <img src={Lu} style={imgStyle} className='image'/>
                    <Title level={5}>{doctorList[2].name} {doctorList[2].title}</Title>
                    <div className="text1">{doctorList[2].post}</div>
                    <div className="text1" >
                        <StarFilled style={{color:"#fff207"}}/>  {doctorList[2].score}</div>
                    <Paragraph ellipsis={ellipsis
                        ? {
                            rows: 2,
                        }
                        : false}  className="text1">
                        {doctorList[2].detail}
                    </Paragraph>
                </Card>
                <Card hoverable className="card1">
                    <img src={Lu} style={imgStyle} className='image'/>
                    <Title level={5}>{doctorList[3].name} {doctorList[3].title}</Title>
                    <div className="text1">{doctorList[3].post}</div>
                    <div className="text1" >
                        <StarFilled style={{color:"#fff207"}}/>  {doctorList[3].score}</div>
                    <Paragraph ellipsis={ellipsis
                        ? {
                            rows: 2,
                        }
                        : false}  className="text1">
                        {doctorList[3].detail}
                    </Paragraph>
                </Card>
                <Card hoverable className="card1">
                    <img src={Lu} style={imgStyle} className='image'/>
                    <Title level={5}>{doctorList[4].name} {doctorList[4].title}</Title>
                    <div className="text1">{doctorList[4].post}</div>
                    <div className="text1" >
                        <StarFilled style={{color:"#fff207"}}/>  {doctorList[4].score}</div>
                    <Paragraph ellipsis={ellipsis
                        ? {
                            rows: 2,
                        }
                        : false}  className="text1">
                        {doctorList[4].detail}
                    </Paragraph>
                </Card>
            </div>
        </Card>
    );
};

export default CardList;

