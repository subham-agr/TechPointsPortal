# Generated by Django 4.0.4 on 2022-10-28 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('techpoints', '0012_order_status_change_time_order_tentative_delivery_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
