# Generated by Django 4.0.4 on 2022-10-25 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('techpoints', '0010_product_product_desc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]