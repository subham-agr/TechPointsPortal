from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=255)
    roll_number = models.CharField(max_length=15)
    points_earned = models.IntegerField()
    points_redeemed = models.IntegerField()
    total_points = models.IntegerField()

class Transaction(models.Model):
    transaction_id = models.IntegerField()
    roll_number = models.CharField(max_length=15)
    earned = models.BooleanField()
    points_earned = models.IntegerField(blank=True)
    event_name = models.CharField(max_length=255,blank=True)
    product_id = models.IntegerField(blank=True)

class Order(models.Model):
    order_id = models.IntegerField()
    roll_number = models.CharField(max_length=15)
    product_id = models.IntegerField()
    status = models.CharField(max_length=30)

class Product(models.Model):
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=255)
    points = models.IntegerField()
    product_picture = models.ImageField(blank=True)