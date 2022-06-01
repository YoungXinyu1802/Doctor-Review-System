# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from pathlib import Path
import os

MEDIA_ROOT = os.path.join(Path(__file__).resolve().parent.parent.parent, 'backend/Admin')
# Create your models here.


class UserInfo(models.Model):
    user_name = models.CharField(primary_key=True, max_length=64)
    password = models.CharField(max_length=64, default='123456')
    email = models.EmailField(default='123456789@gmail.com', unique=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_name', 'email'], name='unique_user') #用来保证用户唯一性
        ]

    def __str__(self):
        return self.user_name


def getURL(instance, filename):
    imgName = instance.publish_user.user_name
    print(imgName)
    return MEDIA_ROOT + '/UserAdmin/%s/database/%s' % (imgName, filename)


class LabelImg(models.Model):
    publish_user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE, related_name='user_img')
    status = models.CharField(max_length=20, default="未标注")
    img = models.ImageField(upload_to=getURL, max_length=1000)


class Task(models.Model):
    publish_user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE, related_name='publish_task')
    task_name = models.CharField(max_length=20, default="NULL")
    description = models.TextField(max_length=1000, default="NULL")
    claim_user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE, related_name='claim_task')
    status = models.CharField(max_length=20, default="未领取")
    img = models.ForeignKey(LabelImg, null=True, on_delete=models.CASCADE, related_name='task_img')


class Department(models.Model):
    department_name = models.CharField(primary_key=True, max_length=64)
    description = models.TextField(max_length=1000, default="NULL")

    def __str__(self):
        return self.department_name


class DoctorInfo(models.Model):
    doctor_name = models.CharField(max_length=64)
    position = models.CharField(max_length=64)
    score = models.FloatField(default=0)
    score_sum = models.IntegerField(default=0)
    comment_num = models.IntegerField(default=0)
    description = models.TextField(max_length=1000, default="NULL")
    photo = models.CharField(max_length=4096)
    department = models.ForeignKey(Department,  null=True, on_delete=models.CASCADE, related_name='related_doctor')

    def __str__(self):
        return self.doctor_name


class Doc_Dep(models.Model):
    doc = models.ForeignKey(DoctorInfo,  null=True, on_delete=models.CASCADE, related_name='related_dep')
    dep = models.ForeignKey(Department,  null=True, on_delete=models.CASCADE, related_name='related_doc')

    def __str__(self):
        return self.doc


class Comment(models.Model):
    score = models.IntegerField(default=0)
    content = models.TextField(max_length=1000, default="NULL")
    approval = models.IntegerField(default=0)
    doc = models.ForeignKey(DoctorInfo, null=True, on_delete=models.CASCADE, related_name='given_comment')
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE, related_name='given_comment')

    def __str__(self):
        return self.score


class Approval(models.Model):
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE, related_name='given_approval')
    comment = models.ForeignKey(Comment, null=True, on_delete=models.CASCADE, related_name='given_approval')
    approval = models.BooleanField(default=True)

    def __str__(self):
        return self.user

