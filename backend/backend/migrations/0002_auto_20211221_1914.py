# Generated by Django 3.2.8 on 2021-12-21 11:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(default='123456789@gmail.com', max_length=254, unique=True),
        ),
        migrations.CreateModel(
            name='LabelImg',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(max_length=1000, upload_to='uploads/')),
                ('description', models.TextField(default='NULL', max_length=1000)),
                ('status', models.CharField(default='未标注', max_length=20)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
        ),
    ]
