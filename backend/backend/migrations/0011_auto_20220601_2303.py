# Generated by Django 3.2.8 on 2022-06-01 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_approval_comment_department_doc_dep_doctorinfo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='claim_user',
        ),
        migrations.RemoveField(
            model_name='task',
            name='img',
        ),
        migrations.RemoveField(
            model_name='task',
            name='publish_user',
        ),
        migrations.AlterField(
            model_name='doctorinfo',
            name='photo',
            field=models.CharField(max_length=4096),
        ),
        migrations.DeleteModel(
            name='LabelImg',
        ),
        migrations.DeleteModel(
            name='Task',
        ),
    ]