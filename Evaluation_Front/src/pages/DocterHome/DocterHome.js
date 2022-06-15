import {
    Breadcrumb,
    Card,
    Col,
    Comment,
    List,
    PageHeader,
    Row,
    Tooltip,
    Typography,
    Button,
    Form,
    Input,
    Skeleton, Divider
} from "antd";
import React, {Component, createElement, useState} from "react";
import './DocterHome.css'
import Layout, {Header} from "antd/es/layout/layout";
import {ArrowLeftOutlined} from "@ant-design/icons";

import Lu from "../../assets/Lu.jpg";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import TextArea from "antd/es/input/TextArea";
import {doctorList} from "../../MockData/cardData";
import VirtualList from 'rc-virtual-list';
import * as PropTypes from "prop-types";
import Demo from '../../Components/textArea'
import {Navigate, useSearchParams} from "react-router-dom";
import { toHaveTextContent } from "@testing-library/jest-dom/dist/matchers";
import {verifyToken} from "../../utils/token";



const { Paragraph, Text, Title} = Typography;

const titleStyle={
    color: 'rgb(255,255,255)',
    strong: 'true',
}
const ArrowStyle={
    color: 'rgb(255,255,255)',
    strong: 'true',
    fontSize:'20px',
    margin:'5px'
}
const changeColor = (e) => {

}
const imgStyle={
    width:'180px',
    height:'180px',
    marginLeft:'0%'
}
function Example() {

}
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);


function InfiniteScroll(props) {
    return null;
}


InfiniteScroll.propTypes = {
    loader: PropTypes.element,
    next: PropTypes.any,
    scrollableTarget: PropTypes.string,
    hasMore: PropTypes.bool,
    endMessage: PropTypes.element,
    dataLength: PropTypes.number,
    children: PropTypes.node
};

class DoctorHome extends Component {

    state = {
        redirect:false,
        TextValue:"",
        doctorData:{
            name:"李胜银",
            id:1,
            score:10,
            comment_num:10,
            jobLevel:"主治医师",
            department:"骨伤科",
            brief:"We supply a series of design principles, practical patterns and high quality design\n" +
                "                        resources (Sketch and Axure), to help people create their product prototypes beautifully and\n" +
                "                        efficiently."
        },
        data: [
            {
                likes: 12,
                dislikes: 5,
                likeState:0,
                commentId: 1,
                author: 'Han Solo',
                avatar: 'https://joeschmoe.io/api/v1/random',
                content: (
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully and
                        efficiently.
                    </p>
                )
            },
            {
                likes: 10,
                dislikes: 3,
                actions: 0,
                commentId: 1,
                author: 'Han Solo',
                avatar: 'https://joeschmoe.io/api/v1/random',
                content: (
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully and
                        efficiently.
                    </p>
                )
            },
        ]
    };

    like(e,n) { //likestate1
        const pdata= [...this.state.data];   //浅拷贝一下

        if(pdata[n].likeState!==1){
            var t_like=pdata[n].likes+1;
            var t_dislike=pdata[n].dislikes;
            if(pdata[n].likeState===2){
                t_dislike=t_dislike-1
            }
            console.log(t_like)
            console.log(t_dislike)
            this.setState({
                data:pdata.map((item,key)=>key === n?{...item,likes: t_like,dislikes: t_dislike,likeState: 1}:item)
            });
            console.log("111")
        }
        //将更新数据传回后端
        let a=pdata[n].likeState
        let id=pdata[n].commentId
        console.log(a)
        this.update(id,t_like,t_dislike,1)

    };
    update(id,t_like,t_dislike,likestate){
        const user_name = window.localStorage.getItem('userName')
        var formData=new FormData();
        var url="http://124.220.171.17:8800/updatelike/"
        formData.append('doctor_name',this.state.doctorData.name);//医生姓名
        formData.append('id',id)//被更改commentID
        formData.append('user_name', user_name)
        formData.append('likestate',likestate)
        formData.append('like',t_like)
        formData.append('dislike',t_dislike)
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        }).then(function(res){
            if(res.ok){
                res.json().then(function(data){
                    console.log(data)
                    console.log("success");

                })
            }else{
                console.log('更新赞踩请求失败');
            }
        }, function(e){
            console.log('更新赞踩请求失败');
        })
    }

    dislike(e,n) {
        const ndata= [...this.state.data];   //浅拷贝一下

        if(ndata[n].likeState!==2){
            var t_like=ndata[n].likes;
            var t_dislike=ndata[n].dislikes+1;
            if(ndata[n].likeState===1){
                t_like=t_like-1
            }
            console.log(t_like)
            console.log(t_dislike)
            this.setState({
                data:ndata.map((item,key)=>key === n?{...item,likes: t_like,dislikes: t_dislike,likeState: 2}:item)
            });
            console.log("111")
        }
        //将更新数据传回后端
        let a=ndata[n].likeState
        let id=ndata[n].commentId
        console.log(a)
        this.update(id,t_like,t_dislike,2)
    };
    goHome(){
        this.setState({
            redirect:true
        })
    }


    //提前加载信息
    constructor(props){
        super(props); // 声明constructor时必须调用super方法
        console.log(this.props); // 可以正常访问this.props
        verifyToken()
        let id=localStorage.getItem("ID")
        console.log("yy",id)
        var that=this

        var formData=new FormData();
	const user_name = window.localStorage.getItem('userName')
        var url1="http://124.220.171.17:8800/initDoctor/"
        var url2="http://124.220.171.17:8800/initComment/"
        formData.append('ID',id);//医生姓名
	formData.append('user_name', user_name)
        fetch(url1, {
            method : 'POST',
            mode : 'cors',
            body : formData
        }).then(function(res){
            if(res.ok){
                res.json().then(function(data){
                    console.log(data)
                    console.log("success");
                    //传回一个data
                    if (data === null){
                        that.setState({
                            doctorData:[]
                        })
		   }
		   else {
                        that.setState({
                            doctorData:data.data[0]
                        })
		  }

                })
            }else{
                console.log('页面初始化数据请求失败');
            }
        }, function(e){
            console.log('页面初始化数据请求失败');
        })

        fetch(url2, {
            method : 'POST',
            mode : 'cors',
            body : formData
        }).then(function(res){
            if(res.ok){
                res.json().then(function(data){
                    console.log(data)
                    console.log("success2");
                    //传回一个data
                    that.setState({
                        data:data.data
                    });

                })
            }else{
                console.log('页面初始化数据请求失败');
            }
        }, function(e){
            console.log('页面初始化数据请求失败');
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate push to="/" />;
        }
        return (
            <Layout className="layout" style={{height: "10px"}}>
                <Header style={{backgroundColor: '#007bff'}}>
                    <Breadcrumb style={{margin: '16px 0'}} className="breadCrumb">
                        <ArrowLeftOutlined
                            onClick={() => window.history.back() }
                            style={ArrowStyle}/>
                        <div style={{width: '10px'}}/>
                        <Title level={4} style={titleStyle}>医生主页</Title>
                        <Row gutter={16}>
                        </Row>
                    </Breadcrumb>
                </Header>
                <div className="first_layer">
                    <Row gutter={56}>
                        <Col span={4}/>
                        <Col span={6}>
                            <img src={Lu} style={imgStyle} className='image'/>
                            <Title level={5} className="Name">{this.state.doctorData.name}</Title>
                        </Col>
                        <Col span={1}/>
                        <Col span={8}>
                            <Title>{this.state.doctorData.score} 分</Title>
                            <div class="Text">已有{this.state.doctorData.comment_num}人参与打分</div>
                            <div className="Text">职称：{this.state.doctorData.jobLevel}</div>
                            <div className="Text">所属科室：{this.state.doctorData.department}</div>
                            <Paragraph  className="text1">简介: {this.state.doctorData.brief}
                            </Paragraph>
                        </Col>
                        <Col span={6}/>
                    </Row>
                    <div className="interval"/>
                    <Card hoverable className="Comments">
                        <div
                            id="scrollableDiv"
                            style={{
                                height: 400,
                                overflow: 'auto',
                                padding: '0 16px',
                                border: '1px solid rgba(140, 140, 140, 0.35)',
                            }}
                        >
                            <List
                                className="comment-list"
                                header={`该医生共收到 ${this.state.data.length} 条评价`}
                                itemLayout="horizontal"
                                dataSource={this.state.data}
                                renderItem={(item,index) => (
                                    <li key={index}>
                                        <Comment
                                            actions={
                                                [<Tooltip key="comment-basic-like" title="Like">
                                            <span onClick={(e)=>this.like(e,index)}>
                                                {React.createElement(item.likeState === 1 ? LikeFilled : LikeOutlined)}
                                                <span className="comment-action">{item.likes}</span>
                                            </span>
                                                </Tooltip>,
                                                    <Tooltip key="comment-basic-like" title="Dislike">
                                            <span onClick={(e)=>this.dislike(e,index)}>
                                                {React.createElement(item.likeState === 2 ? DislikeFilled : DislikeOutlined)}
                                                <span className="comment-action">{item.dislikes}</span>
                                            </span>
                                                    </Tooltip>
                                                ]
                                            }
                                            author={item.author}
                                            avatar={'https://joeschmoe.io/api/v1/random'}
                                            content={item.content}
                                        />
                                    </li>
                                )}
                            />
                        </div>
                    </Card>
                    <div className="interval"/>
                    <Card  className="TextArea">
                        <div className="interval"/>
                        {/*<Form.Item>*/}
                        {/*    <TextArea rows={4} showCount onChange={this.onChange}  />*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item>*/}
                        {/*    <Button htmlType="submit" loading={false} onClick={(e)=>this.onSubmit(e)} type="primary">*/}
                        {/*        提交评价*/}
                        {/*    </Button>*/}
                        {/*</Form.Item>*/}
                        <Demo name={this.state.doctorData.id} />
                    </Card>

                </div>
            </Layout>
        );
    }

}

export default  DoctorHome;
