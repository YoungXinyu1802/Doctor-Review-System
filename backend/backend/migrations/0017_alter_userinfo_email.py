# Generated by Django 3.2.8 on 2022-06-06 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20220606_1135'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='email',
            field=models.IntegerField(default=0, unique=True),
        ),
    ]