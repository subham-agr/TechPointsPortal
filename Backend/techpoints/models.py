from email.policy import default
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True)
    roll_number = models.CharField(max_length=15)
    points_earned = models.IntegerField()
    points_redeemed = models.IntegerField()
    total_points = models.IntegerField()
    def __str__(self):
        return f"{self.roll_number} - {self.name}"

class Transaction(models.Model):
    transaction_id = models.CharField(max_length=20)
    earned = models.BooleanField()
    points_earned = models.IntegerField(blank=True,null=True)
    event_name = models.CharField(max_length=255,blank=True,null=True)
    product_id = models.CharField(max_length=20,blank=True,null=True)
    time = models.CharField(max_length=20,blank=True,null=True)
    date = models.CharField(max_length=20,blank=True,null=True)
    remarks = models.CharField(blank=True,null=True,max_length=500)
    def __str__(self):
        if self.earned:
            return f"{self.transaction_id} - Earned"
        else:
            return f"{self.transaction_id} - Redeemed"

class Order(models.Model):
    order_id = models.CharField(max_length=20)
    product_id = models.CharField(max_length=20)
    status = models.CharField(max_length=30)
    deliver_time = models.CharField(max_length=30,blank=True,null=True)
    status_change_time = models.CharField(max_length=30,blank=True,null=True)
    tentative_delivery = models.CharField(max_length=30,blank=True,null=True)
    def __str__(self):
        return f"{self.order_id} - {self.status}"

class Product(models.Model):
    product_id = models.CharField(max_length=20)
    product_name = models.CharField(max_length=255)
    product_desc = models.TextField(default='Description')
    product_link = models.CharField(max_length=500,blank=True,null=True)
    points = models.IntegerField()
    product_picture = models.ImageField(blank=True,null=True)
    def __str__(self):
        return f"{self.product_id} - {self.product_name}"