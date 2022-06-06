import shutil

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
from .models import User, Comment

MEDIA_ROOT = os.path.join(Path(__file__).resolve().parent.parent.parent, 'backend/Admin')


def ok(data: object):
    return JsonResponse({'code': 0, 'message': '操作成功', 'data': data})


def err(data: object):
    return JsonResponse({'code': 1, 'message': '操作失败', 'data': data})


# 获取医生信息
@csrf_exempt
def get_doc_info(doc_set, doc_list):
    for d in doc_set:
        doc_list.append({
            "id": d.id,
            "name": d.doctor_name,
            "score": d.score,
            "title": d.position,
            "detail": d.description,
            "post": d.department.department_name
        })
    print(doc_list)
    if len(doc_list):
        return ok(doc_list)
    else:
        return err("找不到符合条件的医生")


# 热门医生
@csrf_exempt
def get_hot_doc(request):
    dep = request.POST.get("department")
    doc_set = models.DoctorInfo.objects.filter(department=dep).order_by("score")[0:5]
    doc_list = []
    return get_doc_info(doc_set, doc_list)


# 返回部门信息
@csrf_exempt
def get_department(request):
    print("get_department")
    dep = request.POST.get("name")
    dep_set = models.Department.objects.filter(department_name=dep)
    doc_set = models.DoctorInfo.objects.filter(department=dep).order_by("score")
    dep_list = [dep]
    doc_list = []
    for d in doc_set:
        doc_list.append({
            "id": d.id,
            "doctorName": d.doctor_name,
            "position": d.position,
            "doctorDescription": d.description,
            "image": d.photo
        })
    for d in dep_set:
        dep_list.append({
            "name": d.department_name,
            "description": [d.description],
            "doctor": doc_list
        })
    return ok(dep_list)


# 从部门找到医生列表
@csrf_exempt
def find_doc_from_department(request):
    dep = request.POST.get("department")
    doc_set = models.DoctorInfo.objects.filter(department=dep).order_by("score")
    doc_list = []
    return get_doc_info(doc_set, doc_list)


# 找到医生主页
@csrf_exempt
def find_doc_detail(request):
    # doc_id = 1
    doc_id = request.POST.get("id")
    doc_set = models.DoctorInfo.objects.filter(id=doc_id)
    doc_list = []
    for d in doc_set:
        doc_list = [{
            "name": d.doctor_name,
            "score": d.score,
            "jobLevel": d.position,
            "brief": d.description,
            "department": d.department.department_name,
            "photo": d.photo
        }]
    return ok(doc_list)


# 检索医生
@csrf_exempt
def find_doc(request):
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
    doc_id = request.POST.get("id")
    doc_set = models.DoctorInfo.objects.filter(id=doc_id)
    comment_list = []
    if doc_set.exists():
        comment_data = models.Comment.objects.filter(doc=doc_set[0]).order_by("likes")
        for c in comment_data:
            comment_list.append({
                "commentId": c.id,
                "user": c.user,
                "score": c.score,
                "content": c.content,
                "dislikes": c.dislikes,
                "likes": c.likes,
                "author": c.user.user_name,
                "likeState": check_approval(c.user, c),
            })
    return ok(comment_list)


# 更新评分
@csrf_exempt
def update_score(doc, score):
    doc_set = models.DoctorInfo.objects.filter(id=doc)[0]
    doc_set[0].score_sum = doc_set[0].score_sum + score
    doc_set[0].comment_num = doc_set[0].comment_num + 1
    doc_set[0].score = float(doc_set[0].score_sum) / float(doc_set[0].comment_num)


# 添加评价
@csrf_exempt
def create_comment(request):
    # _user = request.POST.get("user")
    _user = 1
    _doc = request.POST.get("doc")
    _score = request.POST.get("score")
    _content = request.POST.get("content")
    if check_is_commented(_user, _doc) != 0:
        new_comment = models.Comment(user=_user, doc=_doc, score=_score, content=_content)
        new_comment.save()
        update_score(_user, _score)
        return return_comment_list(_doc)
    else:
        return err("用户已经评价过了")


# 判断是否已经赞踩
@csrf_exempt
def check_approval(user, comment):
    approval_set = models.Approval.objects.filter(user=user, comment=comment)
    if approval_set.exists():
        for a in approval_set:
            if a.approval:
                return 1
            else:
                return 2
    else:
        return 0

# 添加赞踩
@csrf_exempt
def create_approval(request):
    # _user = request.POST.get("user")
    _user = "123456789@gmail.com"
    _comment = request.POST.get("comment")
    _approval = request.POST.get("likestate")
    approval_set = models.Approval.objects.filter(user=User.objects.get(email=_user), comment=Comment.objects.get(id=_comment))
    if approval_set.exists():
        if _approval == 1:
            return err("用户不可以重复点赞")
        elif _approval == 2:
            return err("用户不可以重复点踩")
        else:
            new_approval = approval_set[0]
            new_approval.approval = _approval
    else:
        new_approval = models.Approval(user=User.objects.get(email=_user), comment=Comment.objects.get(id=_comment), approval=_approval)
    comment = models.Comment.objects.filter(id=_comment)
    new_approval.save()
    for c in comment:
        if _approval:
            c.likes = c.likes + 1
        else:
            c.dislikes = c.dislikes - 1
    return return_comment_list(c.doc)
