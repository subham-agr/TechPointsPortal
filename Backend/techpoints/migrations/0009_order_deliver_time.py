# Generated by Django 4.0.4 on 2022-10-22 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('techpoints', '0008_alter_transaction_date_alter_transaction_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='deliver_time',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
