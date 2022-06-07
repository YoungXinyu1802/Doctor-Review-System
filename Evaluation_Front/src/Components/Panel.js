import {Card, Button, Divider, List} from "antd";
import React, {Component, useState} from "react";
import '../CSS/Panel.css'
// import Logo from '../assets/logo192.png'
// import Lu from '../assets/Lu.jpg'
import { Typography } from 'antd';
// import {getTwoToneColor} from "@ant-design/icons";
import {commonD,DepartData} from "../MockData/depaData";
import {doctorList} from "../MockData/cardData";
import {Navigate} from "react-router-dom";
// import {doctorList} from "../MockData/cardData";

const { Text, Link } = Typography;

const imgStyle={
    width:'80px',
    height:'80px',
    float:'auto',
}
const { Paragraph,Title } = Typography;
const buttonStyle1={
    backgroundColor: "#f0f5f4",
    borderColor: "#ffffff",
    textAlign:'center',
    width: '150px',
    height: '30px'
}
var isClick=false;
const buttonStyle2={
    backgroundColor: "rgb(240,242,245)",
    borderColor: "#5c3289",
}
const changeColor = (e) => {
    e.target.style.backgroundColor="rgb(131,209,255)"
};
const recoverColor = (e) => {
    console.log(false)
    e.target.style.backgroundColor="rgb(240,242,245)"
};
const clickColor = (e) =>{
    isClick=true;
    changeColor(e);
}
const textColor={
    color: '#0e0e0e',
    strong: 'true',

}
const changeTextColor = (e) => {
    e.target.style.color='#007bff'
}

class Tags extends Component{

    state={
        department:DepartData,
        tList:commonD,
        detailed:0
    }

    componentWillMount() {
        console.log('App-页面即将加载')

    }

    changeTextColor=(e,index) =>{
        let myList=DepartData[index].cate
        this.setState({
            tList:myList
        })
    }
    goDetail(e,index){
        let v=this.state.tList[index]
        console.log(v)
        localStorage.setItem("department",v)
        this.setState({
            detailed:1
        })

    }

    render() {
        if(this.state.detailed){
            return <Navigate push to="/department" />;
        }
        return (
            <Card hoverable className="showClass">
                <List
                    grid={{ gutter: 16, column: 4 }}
                    className="comment-list"
                    dataSource={this.state.department}
                    renderItem={(item, index) => (
                        <li key={index}>
                            <div className="tagButton">
                                <Title level={2}
                                       onClick={(e)=>this.changeTextColor(e,index)}>
                                    {this.state.department[index].Dept}
                                </Title>
                            </div>
                        </li>
                    )}
                />
                <Divider className="mDivider"/>
                <div className="dContainer">
                    {
                        this.state.tList.map((value, index) => {
                            return (
                                <div className="tagButton" key={index}>
                                    <Button type="primary" style={buttonStyle1} size={"large"}
                                            onClick={ (e)=> this.goDetail(e,index)}>
                                        <Text strong={true}>{value}</Text>
                                    </Button>
                                </div>
                            )
                        })
                    }

                </div>
            </Card>
        );
    }
};

export default Tags;
