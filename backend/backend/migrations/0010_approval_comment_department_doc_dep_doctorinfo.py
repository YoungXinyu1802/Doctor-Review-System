# Generated by Django 3.2.8 on 2022-06-01 08:53

import backend.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20211224_1704'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_name', models.CharField(max_length=64, primary_key=True, serialize=False)),
                ('description', models.TextField(default='NULL', max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='DoctorInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor_name', models.CharField(max_length=64)),
                ('position', models.CharField(max_length=64)),
                ('score', models.FloatField(default=0)),
                ('score_sum', models.IntegerField(default=0)),
                ('comment_num', models.IntegerField(default=0)),
                ('description', models.TextField(default='NULL', max_length=1000)),
                ('photo', models.ImageField(max_length=1000, upload_to=backend.models.getURL)),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_doctor', to='backend.department')),
            ],
        ),
        migrations.CreateModel(
            name='Doc_Dep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dep', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_doc', to='backend.department')),
                ('doc', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='related_dep', to='backend.doctorinfo')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('content', models.TextField(default='NULL', max_length=1000)),
                ('approval', models.IntegerField(default=0)),
                ('doc', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='given_comment', to='backend.doctorinfo')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='given_comment', to='backend.userinfo')),
            ],
        ),
        migrations.CreateModel(
            name='Approval',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approval', models.BooleanField(default=True)),
                ('comment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='given_approval', to='backend.comment')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='given_approval', to='backend.userinfo')),
            ],
        ),
    ]
