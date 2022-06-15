import shutil
import json

from django.views.decorators.csrf import csrf_exempt
from .import models
import base64
import time
from django.http import JsonResponse
from django.core import signing
import os
import json
from pathlib import Path
from django.db.models import Q

# from models import User
# from models import Goods
from .models import User, Comment, DoctorInfo, Department
from django.db import connections


def update_data():
    connection = connections['management']
    cursor = connection.cursor()
    cursor.execute("select user_id, department from doctor_info;")
    docs = cursor.fetchall()
    for doc in docs:
        sql = "select real_name from user where id = " + str(doc[0]) + ";"
        cursor.execute(sql)
        d = cursor.fetchone()
        doc_set = DoctorInfo.objects.filter(department=doc[1], doctor_name=d)
        if doc_set.exists():
            continue
        else:
            dep_set = Department.objects.filter(department_name=doc[1])
            if dep_set.exists():
                continue
            else:
                new_dep = Department(department_name=doc[1], description="部门简介")
                new_dep.save()
            new_doc = models.DoctorInfo(doctor_name=d[0], position="主治医生", description=d[0]+"己任职多年，有着丰富的经验\
            ，曾多次获得国內外多项奨项，广受患者好评", department=Department.objects.get(department_name=str(doc[1])))
            new_doc.save()
    connection.commit()
    cursor.close()


MEDIA_ROOT = os.path.join(Path(__file__).resolve().parent.parent.parent, 'backend/Admin')


def ok(data: object):
    return JsonResponse({'code': 0, 'message': '操作成功', 'data': data})


def err(data: object):
    # data=None
    return JsonResponse({'code': 1, 'message': '操作失败', 'data': data})


# 获取医生信息
@csrf_exempt
def get_doc_info(doc_set, doc_list):
    for d in doc_set:
        update_score(d.id)
        doc_list.append({
            "id": d.id,
            "name": d.doctor_name,
            "score": round(d.score, 2),
            "title": d.position,
            "detail": d.description,
            "post": d.department.department_name
        })
    if len(doc_list):
        return ok(doc_list)
    else:
        return err("找不到符合条件的医生")


# 热门医生
@csrf_exempt
def get_hot_doc(request):
    update_data()
    dep = request.POST.get("department")
    doc_set = models.DoctorInfo.objects.filter(department=dep).order_by("score")[0:5]
    doc_list = []
    return get_doc_info(doc_set, doc_list)


# 返回部门信息
@csrf_exempt
def get_department(request):
    update_data()
    print(request.POST)
    dep = request.POST.get("name")
    print(dep)
    dep_set = models.Department.objects.filter(department_name=dep)
    doc_set = models.DoctorInfo.objects.filter(department=dep).order_by("score")
    desp = dep_set[0].description
    desp_list = desp.split('\n')
    print(len(desp_list))
    print(desp_list)
    dep_info = {
        # "department_name": dep_set[0].department_name,
        "description": desp_list
    }
    doc_list = []
    for d in doc_set:
        doc_list.append({
            "id": d.id,
            "doctorName": d.doctor_name,
            "position": d.position,
            "doctorDescription": d.description
            "score": d.score,

            # "post": d.department.department_name
        })

    print(dep_info)
    print(doc_list)
    return JsonResponse({'code': 0, 'message': '操作成功', 'department': dep_info, 'doctor_info': doc_list})
    # return get_doc_info(doc_set, doc_list)
    # return ok('department_name')


# 从部门找到医生列表
@csrf_exempt
def find_doc_from_department(request):
    update_data()
    dep = request.POST.get("department")
    doc_set = models.DoctorInfo.objects.filter(department=dep).order_by("score")
    doc_list = []
    return get_doc_info(doc_set, doc_list)


# 找到医生主页
@csrf_exempt
def return_doc(request):
    update_data()
    # doc_id = 1
    doc_id = request.POST.get("ID")
    doc_set = models.DoctorInfo.objects.filter(id=doc_id)
    doc_list = []
    for d in doc_set:
        doc_list = [{
            "id": d.id,
            "name": d.doctor_name,
            "score": round(d.score, 2),
            "jobLevel": d.position,
            "brief": d.description,
            "score_sum" : d.score_sum,
            "comment_num" : d.comment_num,
            "department": d.department.department_name,
            "photo": d.photo
        }]
    return ok(doc_list)


# 检索医生
@csrf_exempt
def find_doc(request):
    update_data()
    update_data()
    doc_name = request.POST.get("doctor_name")
    doc_set = models.DoctorInfo.objects.filter(doctor_name=doc_name).order_by("score")
    doc_list = []
    return get_doc_info(doc_set, doc_list)


# 查看是否依旧评价过
def check_is_commented(user, doc):
    # 当前用户只能对同一个医生发表一次评价
    comment = models.Comment.objects.filter(user=user, doc=doc)
    if comment.exists():
        return 0  # 已经评价过了
    else:
        return 1


# 获取医生评价信息
@csrf_exempt
def return_comment_list(request):
    user_name = request.POST.get("user_name")  # here
    if user_name == None:
        user_id = 1
    else:
        user_set = User.objects.filter(user_name=user_name)
        if user_set.exists():
            user_id = user_set[0].id
        else:
            new_user = User(user_name=user_name)
            new_user.save()
            user_id = new_user.id
    doc_id = request.POST.get("ID")
    doc_set = models.DoctorInfo.objects.filter(id=doc_id)
    comment_list = []
    if doc_set.exists():
        comment_data = models.Comment.objects.filter(doc=doc_set[0]).order_by("-likes")
        for c in comment_data:
            update_approval(c.id)
            comment_list.append({
                "commentId": c.id,
                "user": c.user.user_name,
                "score": c.score,
                "content": c.content,
                "dislikes": c.dislikes,
                "likes": c.likes,
                "author": c.user.user_name,
                "likeState": check_approval(user_id, c.id),
            })
    return ok(comment_list)


@csrf_exempt
def return_comment_list_2(user_id, doc_id):
    doc_set = models.DoctorInfo.objects.filter(id=doc_id)
    comment_list = []
    if doc_set.exists():
        comment_data = models.Comment.objects.filter(doc=doc_set[0]).order_by("-likes")
        for c in comment_data:
            update_approval(c.id)
            comment_list.append({
                "commentId": c.id,
                "user": c.user.user_name,
                "score": c.score,
                "content": c.content,
                "dislikes": c.dislikes,
                "likes": c.likes,
                "author": c.user.user_name,
                "likeState": check_approval(user_id, c.id),
            })
    return ok(comment_list)


# 更新评分
@csrf_exempt
def update_score(_doc):
    d = models.DoctorInfo.objects.get(id=_doc)
    comment_set = Comment.objects.filter(doc=d)
    d.score_sum = 0
    d.comment_num = 0
    for c in comment_set:
        d.comment_num = d.comment_num + 1
        d.score_sum = d.score_sum + c.score
    d.score = 0 if d.comment_num == 0 else d.score_sum / float(d.comment_num)
    d.save()


# 添加评价
@csrf_exempt
def create_comment(request):
    user_name = request.POST.get("user_name")  # here
    if user_name == None:
        _user = 1
    else:
        user_set = User.objects.filter(user_name=user_name)
        if user_set.exists():
            _user = user_set[0].id
        else:
            new_user = User(user_name=user_name)
            new_user.save()
            _user = new_user.id
    _doc = request.POST.get("doctor_id")
    print("doctor_id" + _doc)
    _score = request.POST.get("score")
    _content = request.POST.get("comment")
    if check_is_commented(_user, _doc) == 1:
        new_comment = models.Comment(user=User.objects.get(id=_user), doc=DoctorInfo.objects.get(id=_doc), score=_score, content=_content)
        new_comment.save()
        update_score(_user)
        return return_comment_list_2(_user, _doc)
    else:
        new_comment = models.Comment(user=User.objects.get(id=_user), doc=DoctorInfo.objects.get(id=_doc), score=_score, content=_content)
        new_comment.save()
        update_score(_doc)
        return return_comment_list_2(_user, int(_doc))


# 更新赞踩
@csrf_exempt
def update_approval(_comment):
    approval_set = models.Approval.objects.filter(comment=_comment)
    c = Comment.objects.get(id=_comment)
    c.likes = 0
    c.dislikes = 0
    for a in approval_set:
        if a.approval == 1:
            c.likes = c.likes + 1
        elif a.approval == 2:
            c.dislikes = c.dislikes + 1
    c.save()


# 判断是否已经赞踩
@csrf_exempt
def check_approval(user, comment):
    approval_set = models.Approval.objects.filter(user=User.objects.get(id=user), comment=Comment.objects.get(id=comment))
    if approval_set.exists():
        for a in approval_set:
            return a.approval
    else:
        return 0


# 添加赞踩
@csrf_exempt
def create_approval(request):
    user_name = request.POST.get("user_name")  # here
    if user_name == None:
        _user = 1
    else:
        user_set = User.objects.filter(user_name=user_name)
        if user_set.exists():
            _user = user_set[0].id
        else:
            new_user = User(user_name=user_name)
            new_user.save()
            _user = new_user.id
    _comment = request.POST.get("id")
    _approval = request.POST.get("likestate")
    print("_approval "+_approval)
    _like = request.POST.get("like")
    _dislike = request.POST.get("dislike")
    approval_set = models.Approval.objects.filter(user=User.objects.get(id=_user), comment=Comment.objects.get(id=_comment))
    if approval_set.exists():
        print(int(_approval))
        approval = models.Approval.objects.get(user=User.objects.get(id=_user), comment=Comment.objects.get(id=_comment))
        approval.approval = int(_approval)
        print("approval.approval " + str(approval.approval))
        approval.save()
    else:
        new_approval = models.Approval(user=User.objects.get(id=_user), comment=Comment.objects.get(id=_comment), approval=int(_approval))
        new_approval.save()
    comment = models.Comment.objects.filter(id=_comment)
    for c in comment:
        c.likes = _like
        c.dislikes = _dislike
    comment[0].save()
    approval_set = models.Approval.objects.filter(user=User.objects.get(id=_user),
                                                  comment=Comment.objects.get(id=_comment))
    print("approval_set[0].approval "+str(approval_set[0].approval))
    return return_comment_list_2(_user, comment[0].doc.id)
