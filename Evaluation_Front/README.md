# Evaluation Front

## Interface

### department

数据格式

```js
contentList={
        name : "肝胆外科",
        description : [
            content1,
            content2,
            content3
        ],
        doctor : [
            {
                doctorName : "李明",
                position : "主任医师 教授",
                doctorDescription : "以肝脏移植和肝胆胰脾肿瘤为专业特长",
                image : Pic1
            },
            {
                doctorName : "樊华",
                position : "主任医师 副教授",
                doctorDescription : "擅长肝脏/胆囊和胆管/胰腺/脾脏系统",
                image : Pic2
            },
            {
                doctorName : "郎韧",
                position : "副主任医师 副教授",
                doctorDescription : "肝胆胰恶性肿瘤手术综合治疗,肝胆胰脾疾病腹腔镜微创手术",
                image : Pic3
            },
            {
                doctorName : "赵昕",
                position : "副主任医师 讲师",
                doctorDescription : "肝移植;胰腺癌手术治疗;肝脏良恶性肿瘤的微创治疗",
                image : Pic4
            }
        ]
    }
```

请求接口及类型

```js
const res = await http.post('/department',{departmentName})
```

### Home/Main.js

1. 请求搜索结果

请求接口：

```
var url="http://localhost:8080/searchdoctor"
formData.append('doctor_name',e);
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        })
```

返回数据类型：

```
[{
            "name":"韩钊",
            "id":1, //医生信息唯一id index
            "title":"主治医师",
            "post":"浙大七院 脊柱外科",
            "score":"4.9",
            "detail":"从事专科十年，擅长创伤，颈肩痛及腰腿痛的诊治，希望大家在提问的时候能够说明职业，疼痛的位置，有影像学资料更有助于判断病情"
        }]
```

### doctorhome

1. 请求页面初始化医生信息

```
var formData=new FormData();
        var url="http://localhost:8080/initDoctor"
        formData.append('ID',id);//医生姓名
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        })
```

返回数据类型：

```
doctorData:{
            name:"李胜银",
            jobLevel:"主治医师",
            department:"骨伤科",
            brief:"We supply a series of design principles, practical patterns and high quality design\n" +
                "                        resources (Sketch and Axure), to help people create their product prototypes beautifully and\n" +
                "                        efficiently."
        }
```

2. 请求页面初始化评论信息

请求接口：

```
var formData=new FormData();
        var url="http://localhost:8080/initComment"
        formData.append('ID',id);//医生姓名
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        })
```

返回数据类型：

```
data: [
            {
                likes: 12,
                dislikes: 5,
                likeState:0,//用户是否已点踩赞，0未操作，1已赞，2已踩
                commentId: 1,//评论唯一标识id
                author: 'Han Solo',
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
                likeState:0，
                commentId: 2,
                author: 'Han Solo',
                content: (
                    <p>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully and
                        efficiently.
                    </p>
                )
            },
        ]
```

3. 更新踩赞结果

请求接口

```
var formData=new FormData();
        var url="http://localhost:8080/updatelike"
        formData.append('doctor_name',this.state.doctorData.name);//医生姓名
        formData.append('id',this.data[n].commentId)//被更改commentID
        formData.append('likestate',likestate)//更新后的likestate
        formData.append('like',t_like)//更新后的赞数
        formData.append('dislike',t_dislike) //更新后踩数的
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        })
```

返回数据

```
无
```

4. 上传新的comment

请求接口：

```
var formData=new FormData();
        var url="http://localhost:8080/addComments"
        formData.append('doctor_name',name);//医生姓名
        formData.append('comment',value);//评论内容
        fetch(url, {
            method : 'POST',
            mode : 'cors',
            body : formData
        })
```

返回数据

```
无
```











## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
