# Generated by Django 3.2.8 on 2022-06-06 05:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0021_remove_userinfo_unique_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo',
            name='email',
        ),
    ]