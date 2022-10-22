from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.CharField(max_length=15)
    points_earned = models.IntegerField()
    points_redeemed = models.IntegerField()
    total_points = models.IntegerField()

class Transaction(models.Model):
    transaction_id = models.CharField(max_length=20)
    earned = models.BooleanField()
    points_earned = models.IntegerField(blank=True,null=True)
    event_name = models.CharField(max_length=255,blank=True,null=True)
    product_id = models.CharField(max_length=20,blank=True,null=True)
    time = models.CharField(max_length=20,blank=True,null=True)
    date = models.CharField(max_length=20,blank=True,null=True)
    remarks = models.CharField(blank=True,null=True,max_length=500)

class Order(models.Model):
    order_id = models.CharField(max_length=20)
    product_id = models.CharField(max_length=20)
    status = models.CharField(max_length=30)
    deliver_time = models.CharField(max_length=30,blank=True,null=True)

class Product(models.Model):
    product_id = models.CharField(max_length=20)
    product_name = models.CharField(max_length=255)
    points = models.IntegerField()
    product_picture = models.ImageField(blank=True,null=True)