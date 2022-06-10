import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './main.css';
import {Card,Layout, Menu, Breadcrumb, Dropdown, Col, Row, Avatar, Button, Drawer, Space, List} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Tags from "../../Components/Panel";
import SearchBar from '../../Components/search'
import Show from '../../Components/Card'
import { Typography, Switch } from 'antd';
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import {doctorList,doctorList1} from '../../MockData/cardData'
import { Navigate } from 'react-router-dom';



const { Header, Content, Footer } = Layout;


const { Paragraph, Text, Title} = Typography;

const titleStyle={
    color: 'rgb(255,255,255)',
    strong: 'true',
}
const searchStyle={
    size:'20%'
}
const cardStyle={
    marginTop:'10px'
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


class HomePage extends Component {
    constructor(props) {
        super(props);
        // this.searchDoctor=this.searchDoctor.bind(this)
        //添加获取token内容
        //维护Localstorage变量
        var name=localStorage.getItem("userName")
        var token=localStorage.getItem("token")
        localStorage.setItem("permission",false)

        var url="http://124.220.171.17:3000/api/oauth/verify"
        var formData=new FormData();
        formData.append("token",token)
        fetch(url, {
            method : 'GET',
            mode : 'cors',
            body : formData
        }).then(function(res){
            if(res.ok){
                if(!res.data){
                    localStorage.setItem("userName",res.data.userName)
                    localStorage.setItem("role",res.data.role)
                    localStorage.setItem("permission",true)
                }
                else{
                    window.location.href=
                }
            }else{
                console.log('搜索医生请求失败');
            }
        }, function(e){
            console.log('搜索医生请求失败');
        })

    }

    state={
        redirect:false,
        id:1,
        Visible:false,
        searchRes:[{
            "name":"韩钊",
            "id":1,
            "title":"主治医师",
            "post":"浙大七院 脊柱外科",
            "score":"4.9",
            "detail":"从事专科十年，擅长创伤，颈肩痛及腰腿痛的诊治，希望大家在提问的时候能够说明职业，疼痛的位置，有影像学资料更有助于判断病情"
        }] //搜索结果list
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
    //需要完成至少两个函数

    searchDoctor(e){
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
                    console.log(data)
                    console.log("success");
                    //对data进行操作
                    that.setState({
                        searchRes:data.data
                    });//更新searchRes
                })
            }else{
                console.log('搜索医生请求失败');
            }
        }, function(e){
            console.log('搜索医生请求失败');
        })

        this.showDrawer(e)
    }
    goDetail(e,index){
        //进行后端数据请求
        console.log("go detail")
        console.log(this.state.searchRes[index].id);
        localStorage.setItem("ID",this.state.searchRes[index].id)
        this.setState({
            redirect:true
        })

    }

    render() {
        if (this.state.redirect) {
            return <Navigate push to="/doctorhome" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
        }
        return (
            <Layout className="layout">
                <Header style={{backgroundColor: '#007bff'}}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div style={style}>
                                <Breadcrumb style={{margin: '16px 0'}} className="breadCrumb">
                                    <Title level={4} style={titleStyle}>浙大七院医生评价系统</Title>
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
                            <div style={style} className="headPic" align="center">
                                <Dropdown.Button overlay={menu} size={"large"}
                                                 style={{marginTop: '5px'}} icon={<UserOutlined/>}>
                                </Dropdown.Button>
                            </div>
                        </Col>
                    </Row>

                </Header>
                <Content style={{padding: '0 100px'}}>
                    <div className="blank">
                    </div>
                    <div className="search">
                        <Space direction="vertical">
                            <Search placeholder="请输入医生姓名" onSearch={(e)=>this.searchDoctor(e)} enterButton  size={"large"}
                                    style={{width:"200%"}}  />
                        </Space>
                    </div>
                    <Tags/>
                    <div className="blank">
                    </div>
                    <Show/>

                    <Drawer title="搜索结果" placement="right" onClose={(e)=>this.onClose(e)} visible={this.state.Visible}>
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
