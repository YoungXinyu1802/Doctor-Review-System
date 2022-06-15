import React from 'react';
import 'antd/dist/antd.min.css'
import './department.css';
import { PageHeader } from 'antd';
import { Typography, Divider } from 'antd';
import { Layout,  Breadcrumb } from 'antd';
import { Card, Col, Row } from 'antd';
import { useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useStore } from "../../store";
import { http } from "../../utils"

import Pic1 from '../../assets/doctor_1.png'
import Pic2 from '../../assets/doctor_2.png';
import Pic3 from '../../assets/doctor_3.png';
import Pic4 from '../../assets/doctor_4.png';
import {verifyToken} from "../../utils/token";


const { Content, Footer } = Layout;

const { Title, Paragraph } = Typography;

const { Meta } = Card;

const content1 = '  浙大七院肝胆胰脾外科组建于2004年12月，其前身为普通外科肝胆病区。科室经过几代人的不懈努力，在医疗、教学、科研等学科综合发展上已达到了国内较先进水平，现为院重点学科，目前在我国肝胆外科、肝脏移植、胰腺外科领域处于国内较先进水平。\n'
const content2 = '  浙大七院肝胆胰脾外科现有医生20人，其中教授2人、副教授6人，主任医师5人，副主任医师7人，其中博士研究生导师2人、硕士研究生导师4人。科室所有医生均为研究生以上学历，70%为博士。全科现有护士17人，主管护师1人，70%为本科学历。科室专家承担国家二级学术分会主委和副主委各一项，常委五项，委员11项，国家三级专业协会常委一项，委员15项。其中，中华医学会各学会委员三项。专家们在国内外20多个杂志担任编委和通讯编委工作，科室获得各级课题30多项，总课题经费达千万左右。\n'
const content3 = '  我们科室为杭州市重点学科、国家教委博士点学科，也是杭州市肝脏移植中心，每年完成肝脏移植100-150例次，累计完成1500多例次，目前仍存活。在我们中心成功完成杭州市年龄最大的移植受体手术达到80岁。危重症肝病肝移植围手术期存活率达到国际较先进水平，我们在移植术后根据基因表达和细胞状态精准调节免疫药物管理，实时监测免疫状态评分和其它指标，使我们中心术后个体化的免疫药物调节达到国际较领先水平，长期存活的移植患者生活质量极高。\n'

const Department = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { departmentStore } = useStore()
    const [ departmentName, setDepartmentName ] = useState("肝胆外科")
    const [ contentList, setContentList ] = useState({
        name : "肝胆外科",
        description : [
            content1,
            content2,
            content3
        ],
        doctor : [
            {
                id : 1,
                doctorName : "李明",
                position : "主任医师 教授",
                doctorDescription : "以肝脏移植和肝胆胰脾肿瘤为专业特长",
                image : Pic1
            },
            {
                id : 2,
                doctorName : "樊华",
                position : "主任医师 副教授",
                doctorDescription : "擅长肝脏/胆囊和胆管/胰腺/脾脏系统",
                image : Pic2
            },
            {
                id : 3,
                doctorName : "郎韧",
                position : "副主任医师 副教授",
                doctorDescription : "肝胆胰恶性肿瘤手术综合治疗,肝胆胰脾疾病腹腔镜微创手术",
                image : Pic3
            },
            {
                id : 4,
                doctorName : "赵昕",
                position : "副主任医师 讲师",
                doctorDescription : "肝移植;胰腺癌手术治疗;肝脏良恶性肿瘤的微创治疗",
                image : Pic4
            }
        ]
    })
    const [ dep_info, setDep_info ] = useState(
        [
            content1,
            content2,
            content3
        ]
    )
    const [ doctor_info, setDoctor_info ] = useState(
        [
            {
                doctorName : "李明",
                position : "主任医师 教授",
                doctorDescription : "以肝脏移植和肝胆胰脾肿瘤为专业特长"
            },
            {
                doctorName : "樊华",
                position : "主任医师 副教授",
                doctorDescription : "擅长肝脏/胆囊和胆管/胰腺/脾脏系统"
            },
            {
                doctorName : "郎韧",
                position : "副主任医师 副教授",
                doctorDescription : "肝胆胰恶性肿瘤手术综合治疗,肝胆胰脾疾病腹腔镜微创手术"
            },
            {
                doctorName : "赵昕",
                position : "副主任医师 讲师",
                doctorDescription : "肝移植;胰腺癌手术治疗;肝脏良恶性肿瘤的微创治疗"
            }
        ]
    )
    const [ imageList, setImageList ] = useState(
        [
            Pic1,
            Pic2,
            Pic3,
            Pic4
        ]
    )

    useEffect(()=>{
        verifyToken()
        setDepartmentName(localStorage.getItem("department"))
        console.log( localStorage.getItem("department") )
        var formData = new FormData();
        formData.append('name', localStorage.getItem("department"));
        console.log(formData)
        async function fetchContentList(){
            const res = await http.post('/department/',formData)
            console.log(res.data)
            setDep_info(res.data.department.description)
            setDoctor_info(res.data.doctor_info)
        }
        fetchContentList()
        console.log('副作用执行了')
    },[])

    async function goHome(event) {
        console.log(params.id)
        navigate("/", { replace: true });
    }
    async function goDoctorPage(id) {
        localStorage.setItem("ID",id)
        navigate("/doctorhome", { replace: true })
    }
    return (
        <Layout className="layout">
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    className="site-page-header"
                    onBack={ goHome }
                    title="科室总览"
                    subTitle={departmentName}
                />
            </div>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>科室</Breadcrumb.Item>
                    <Breadcrumb.Item>{departmentName}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <Typography>
                        <Title level={2}>{departmentName}</Title>
                        {
                            dep_info.map( (item,index)=>{
                                    return <Paragraph key={index}>{item}</Paragraph>
                                }
                            )
                        }
                        <Divider />
                        <Title level={2}>医生介绍</Title>
                        <Paragraph>
                            <div className="site-card-wrapper">
                                <Row gutter={56}>
                                    {
                                        doctor_info.map( (item,index)=>{
                                            return(
                                                <Col key={index} span={6}>
                                                    <Card
                                                        hoverable
                                                        cover={<img alt="doctor" src={Pic1} height={'280px'}/>}
                                                        onClick={ ()=>goDoctorPage(item.id) }
                                                    >
                                                        <Meta title={item.doctorName+" "+item.position}  description={item.doctorDescription} />
                                                    </Card>
                                                </Col>
                                            )
                                        } )
                                    }
                                </Row>
                            </div>
                        </Paragraph>


                    </Typography>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>浙大第七医院</Footer>
        </Layout>
    );
}
export default Department;
