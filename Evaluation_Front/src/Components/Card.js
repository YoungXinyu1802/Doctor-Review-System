import {Card, Col, Divider, Row} from "antd";
import { Typography } from 'antd';
import React, {useState} from "react";
import '../CSS/Card.css'

import Pic1 from '../assets/doctor_1.png'
import Pic2 from '../assets/doctor_2.png'
import Pic3 from '../assets/doctor_3.png'
import Pic4 from '../assets/doctor_4.png'
import Pic5 from '../assets/doctor_5.png'

import { StarFilled } from '@ant-design/icons';
import {doctorList} from '../MockData/cardData'
import {useNavigate} from "react-router-dom";

const imgStyle={
    width:'80px',
    height:'80px',
    float:'auto',
}

const { Paragraph,Title } = Typography;


const CardList = () => {
    const [ellipsis, setEllipsis] = React.useState(true);
    const navigate = useNavigate()
    const [ imageList, setImageList ] = useState(
        [
            Pic1,
            Pic2,
            Pic3,
            Pic4,
            Pic5
        ]
    )
    async function goDoctorPage(index){
        console.log("Redirect to Doctor Page")
        console.log("Doctor ID : "+index)
        localStorage.setItem("ID",index+1)
        navigate("/doctorhome", { replace: true })
    }
    return (
        <Card hoverable className="showTotal">
            <Divider className="mDivider">
                <Title level={4}>热门医生</Title>
            </Divider>
            <div className="container">
                {
                    doctorList.map( (item, index) =>{
                        return(
                            <Card hoverable className="card1" onClick={ (event) => goDoctorPage(index) }>
                                <img src={imageList[index]} style={imgStyle} className='image'/>
                                <Title level={5}>{doctorList[index].name} {doctorList[index].title}</Title>
                                <div className="text1">{doctorList[index].post}</div>
                                <div className="text1" >
                                    <StarFilled style={{color:"#fff207"}}/>  {doctorList[index].score}
                                </div>
                                <Paragraph ellipsis={ellipsis
                                    ? {
                                        rows: 2,
                                    }
                                    : false}  className="text1">
                                    {doctorList[index].detail}
                                </Paragraph>
                            </Card>
                        )
                        }
                    )
                }
            </div>
        </Card>
    );
};

export default CardList;

