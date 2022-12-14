from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ('name','roll_number','points_earned','points_redeemed','total_points')

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ('transaction_id','earned','points_earned','event_name','product_id','time','date','remarks')

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ('order_id','product_id','status','deliver_time')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id','product_name','points','product_picture','product_desc')