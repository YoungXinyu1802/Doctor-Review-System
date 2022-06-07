import React from 'react';
import 'antd/dist/antd.css';
import '../CSS/Casousel.css';
import {Card, Carousel} from 'antd';
import Cat from '../assets/Cat.jpg'
import Logo from '../assets/logo192.png'

const contentStyle = {
    height: '350px',
    color: '#0e0e0e',
    lineHeight: '350px',
    textAlign: 'center',
    background: 'rgb(240,242,245)',
    autoplaySpeed:500,
};

const picStyle = {
    textAlign: 'center',
    height: '200px',
    width: '200px',
    background: '#d20f2c',
    overflow: 'hidden',
}

const cardStyle ={
    height: '300px',
    width: '300px',
}

const imgStyle= {
    height:'100px',
    width: '100px',
    resizeMode:'center',
    float: ''
}


export default () => (
    <Carousel autoplay slidesPerRow="2"  slidesToScroll="1" style={contentStyle}>
        <div>
            <h1>
                <Card style={cardStyle}>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </h1>
        </div>
        <div>
            <h1>
                <Card style={cardStyle}>
                    <div>
                        <img src={Cat} alt= ""  style={imgStyle} />
                    </div>
                    <div>
                        <img src={Logo} alt= "" />
                    </div>
                </Card>
            </h1>
        </div>
        <div>
            <h1>{3}</h1>
        </div>
        <div>
            <h1>{4}</h1>
        </div>

    </Carousel>
);
