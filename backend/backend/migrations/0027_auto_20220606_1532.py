# Generated by Django 3.2.8 on 2022-06-06 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0026_auto_20220606_1526'),
    ]

    operations = [
        migrations.AlterField(
            model_name='approval',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='department',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='doctorinfo',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
