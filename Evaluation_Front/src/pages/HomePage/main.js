import React, {Component} from 'react';
import 'antd/dist/antd.min.css'
import './main.css';
import {Card, Layout, Menu, Breadcrumb, Dropdown, Col, Row, Avatar, Button, Drawer, Space, List, message} from 'antd';
import {ArrowLeftOutlined, UserOutlined} from '@ant-design/icons';
import Tags from "../../Components/Panel";
import SearchBar from '../../Components/search'
import Show from '../../Components/Card'
import { Typography, Switch } from 'antd';
import Search from "antd/es/input/Search";
import {useNavigate, useSearchParams} from "react-router-dom";
import {doctorList,doctorList1} from '../../MockData/cardData'
import { Navigate } from 'react-router-dom';
import {getToken} from "../../utils";
import axios from "axios";
import {verifyToken} from "../../utils/token";



const { Header, Content, Footer } = Layout;


const { Paragraph, Text, Title} = Typography;

const titleStyle={
    color: 'rgb(255,255,255)',
    strong: 'true',
}
const searchStyle={
    width:'calc(200%)',
    marginLeft:'10%'
}
const cardStyle={
    marginTop:'10px'
}

const ArrowStyle={
    color: 'rgb(255,255,255)',
    strong: 'true',
    fontSize:'20px',
    margin:'5px'
}
const style = { background: '#007bff' };
const menu = (
    <Menu
        items={[
            {
                label: "1st menu item",
                key: "1",
                icon: <UserOutlined />
            },
            {
                label: "2nd menu item",
                key: "2",
                icon: <UserOutlined />
            },
            {
                label: "3rd menu item",
                key: "3",
                icon: <UserOutlined />
            }
        ]}
    />
);
const onSearch = value => console.log(value);

message.config({
    top: 10,
    duration: 2,
    maxCount: 3,
    rtl: true,
    prefixCls: 'ant-message',
    getContainer : () => document.body
});


class HomePage extends Component {
    constructor(props) {
        super(props)
        verifyToken()
        // this.searchDoctor=this.searchDoctor.bind(this)
    }

    state={
        redirect:false,
        id:1,
        Visible:false,
        searchRes:[]
    }

    showDrawer(e) {
        console.log(111)
        let myVisi=true
        this.setState({
            Visible:myVisi
        });
        console.log(this.state.Visible)
    };

    onClose (e) {
        let myVisi=false
        this.setState({
            Visible:myVisi
        });
        console.log(this.state.Visible)
    };
    //??????????????????????????????

    searchDoctor(e){
        if (!e || e.length==0){
            message.error("????????????????????????")
            return
        }
        if( e.length>10 ){
            message.error("????????????????????????10?????????")
            return
        }
        console.log("get in")
        var that=this
        var formData=new FormData();
        var url="http://124.220.171.17:8800/searchdoctor/"
        formData.append('doctor_name',e);
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        }).then(function(res){
            if(res.ok){
                res.json().then(function(data){
                    console.log(data.data)
		    console.log(data.code)
                    console.log("success");
                    //???data????????????
                    if (data.code===1){
                        that.setState({
                            searchRes:[]
                        });
                    }
                    else {

                         that.setState({
                             searchRes:data.data
                        });
                    }
                  //??????searchRes
                })
            }else{
                console.log('????????????????????????');
            }
        }, function(e){
            console.log('????????????????????????');
        })

        this.showDrawer(e)
    }
    goDetail(e,index){
        //????????????????????????
        console.log("go detail")
        console.log(this.state.searchRes[index].id);
        localStorage.setItem("ID",this.state.searchRes[index].id)
        this.setState({
            redirect:true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate push to="/doctorhome" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> ??????????????????
        }
        return (
            <Layout className="layout">
                <Header style={{backgroundColor: '#007bff'}}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div style={style}>
                                <Breadcrumb style={{margin: '16px 0'}} className="breadCrumb">
                                    <ArrowLeftOutlined
                                        onClick={() => window.location.replace('http://124.220.171.17:3000/') }
                                        style={ArrowStyle}/>
                                    <Title level={4} style={titleStyle}>??????????????????</Title>
                                    <Row gutter={16}>
                                    </Row>
                                </Breadcrumb>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div style={style}/>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <div style={style}/>
                        </Col>
                        <Col className="gutter-row" span={5}>
                            <div style={style}/>
                        </Col>
                        <Col className="gutter-row" span={2}>

                        </Col>
                    </Row>

                </Header>
                <Content style={{padding: '0 100px'}}>
                    <div className="blank">
                    </div>
                    <div className="search">
                        <Space direction="vertical" align={"center"}>
                            <Search
                                    placeholder="?????????????????????" onSearch={(e)=>this.searchDoctor(e)} enterButton  size={"large"}
                                    style={{ width: '200%' }}
                            />
                        </Space>
                    </div>
                    <Tags/>
                    <div className="blank">
                    </div>
                    <Show/>

                    <Drawer title="????????????" placement="right" onClose={(e)=>this.onClose(e)} visible={this.state.Visible}>
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={this.state.searchRes}
                            renderItem={(item, index) => (
                                <li key={index}>
                                    <div style={cardStyle}>
                                        <Card hoverable
                                              onClick={ (e)=> this.goDetail(e,index)}>
                                            <Title level={4}>{item.name}</Title>
                                            <div>{item.title}</div>
                                            <div>{item.detail}</div>
                                        </Card>
                                    </div>
                                </li>
                            )}
                        />
                    </Drawer>
                </Content>
                <Footer style={{textAlign: 'center'}}>Doctor Evaluation Created by Ming</Footer>
            </Layout>
        );
    }
};
export default HomePage;
