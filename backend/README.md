# Doctor Review
## 后端配置 

后端：python django

```shell
pip install -r requirements.txt # 安装相关的包
```

- 更改数据库设置：

`backend/DoctorReview/settings.py`

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # 数据库的类型
        'NAME': 'forum', #所使用的数据库的名字
        'USER': 'root', #数据库服务器的用户
        'PASSWORD': '123456', #密码
        'HOST': '127.0.0.1', #主机
        'PORT': '3306', #端口
    }
}
```

- 更改ip和端口号：

`backend/manage.py`

```python
if __name__ == '__main__':
    Runserver.default_addr = '127.0.0.1'  # 修改默认地址
    Runserver.default_port = '8080'  # 修改默认端口

    main()
```

- 迁移数据库（需要先建立schema: forum)

```shell
python manage.py makemigrations
python manage.py migrate
```

迁移后，可以在mysql里面看到对应的表。数据库在django的定义在`backend/backend/models.py`里面。比如`models.py`里面的`doctorinfo`对应迁移后`mysql`里面的`backend_doctorinfo`表。迁移后的前面都会有一个`backend_`字段。

可以直接在`MySQL`里面用`sql`语句插入，示例在`sample.sql`中。

- 运行

```shell
python manage.py runserver
```

已经把前端用`npm run build`进行打包，和后端部署在了一起，直接访问即可（如按照上面的地址和端口设置，直接按照运行结果提示访问127.0.0.1:8080）即可。

如果想要前后端分离运行，前端`npm install`安装相关依赖后，`npm start`启动，并开启后端`python manage.py runserver`，也可正常运行。



