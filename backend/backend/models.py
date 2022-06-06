# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from pathlib import Path
import os

MEDIA_ROOT = os.path.join(Path(__file__).resolve().parent.parent.parent, 'backend/Admin')
# Create your models here.


def getURL(instance, filename):
    imgName = instance.publish_user.user_name
    print(imgName)
    return MEDIA_ROOT + '/UserAdmin/%s/database/%s' % (imgName, filename)


class Department(models.Model):
    id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=64)
    description = models.TextField(max_length=1000, default="NULL")

    def __str__(self):
        return self.department_name


class DoctorInfo(models.Model):
    id = models.AutoField(primary_key=True)
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


class User(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=64)

    def __str__(self):
        return self.user_name


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    score = models.IntegerField(default=0)
    content = models.TextField(max_length=1000, default="NULL")
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    doc = models.ForeignKey(DoctorInfo, null=True, on_delete=models.CASCADE, related_name='given_comment')
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='given_comment')

    def __str__(self):
        return self.score


class Approval(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='given_approval')
    comment = models.ForeignKey(Comment, null=True, on_delete=models.CASCADE, related_name='given_approval')
    approval = models.IntegerField(default=0)

    def __str__(self):
        return self.user

