from asyncio.windows_events import NULL
from typing import OrderedDict
from datetime import datetime
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from django.conf import settings

import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import base64

from .models import *
from .serializers import *

class StudentViewset(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TransactionViewset(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class OrderViewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(['POST'])
def points(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        student = Student.objects.filter(roll_number=data['roll_number'])
        student_serializer = StudentSerializer(student, many=True)
        return JsonResponse(student_serializer.data, safe=False)
        # 'safe=False' for objects serialization

@api_view(['POST','GET'])
def products(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        students = Student.objects.filter(roll_number=data['roll_number'])
        products = Product.objects.filter(product_id=data['product_id'])
        student = students[0]
        product = products[0]
        student.points_redeemed+=product.points
        student.total_points-=product.points
        student.save()
        orders = Order.objects.filter(order_id__startswith=data['roll_number'])
        order_id = data['roll_number']
        if orders:
            for i in range(4-len(str(len(orders)))):
                order_id+='0'
            order_id+=str(len(orders)+1)
        else:
            order_id+='0001'
        order = Order(order_id=order_id,product_id=data['product_id'],status='pending',deliver_time='')
        order.save()
        transactions = Transaction.objects.filter(transaction_id__startswith=data['roll_number'])
        transaction_id = data['roll_number']
        if transactions:
            for i in range(4-len(str(len(transactions)))):
                transaction_id+='0'
            transaction_id+=str(len(transactions)+1)
        else:
            transaction_id+='0001'
        transaction = Transaction(transaction_id=transaction_id,product_id=data['product_id'],earned=False,time=datetime.now().strftime("%H:%M:%S"),date=datetime.now().strftime("%d-%m-%Y"),remarks='Redeemed')
        transaction.save()
        transactionr = Transaction.objects.all()
        student_serializer = TransactionSerializer(transactionr, many=True)
        return JsonResponse(student_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method=='GET':
        products = Product.objects.all()
        product_serializer = ProductSerializer(products,many=True)
        return JsonResponse(product_serializer.data,safe=False)

@api_view(['POST'])
def orders(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        orders = Order.objects.filter(order_id__startswith=data['roll_number'])
        data_list=[]
        for order in orders:
            products = Product.objects.filter(product_id=order.product_id)
            product = products[0]
            img_path = request.build_absolute_uri(settings.MEDIA_URL) + str(product.product_picture)
            data = OrderedDict([('order_id',order.order_id),('status',order.status),('product_name',product.product_name),('points',product.points),('picture',str(img_path))])
            data_list.append(data)
        return JsonResponse(data_list, safe=False)

@api_view(['POST'])
def notifs(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        orders = Order.objects.filter(order_id__startswith=data['roll_number'])
        data_list=[]
        for order in orders:
            if order.deliver_time:
                products = Product.objects.filter(product_id=order.product_id)
                product = products[0]
                img_path = request.build_absolute_uri(settings.MEDIA_URL) + str(product.product_picture)
                data = OrderedDict([('order_id',order.order_id),('status',order.status),('product_name',product.product_name),('points',product.points),('picture',str(img_path))])
                data_list.append(data)
        return JsonResponse(data_list, safe=False)

@api_view(['POST'])
def transactions(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        transactions = Transaction.objects.filter(transaction_id__startswith=data['roll_number'])
        data_list=[]
        for transaction in transactions:
            if transaction.earned:
                data = OrderedDict([('transaction_id',transaction.transaction_id),('earned',transaction.earned),('event_product_name',transaction.event_name),('points',transaction.points_earned),('time',transaction.time),('date',transaction.date),('remarks',transaction.remarks)])
            else:
                products = Product.objects.filter(product_id=transaction.product_id)
                product = products[0]
                data = OrderedDict([('transaction_id',transaction.transaction_id),('earned',transaction.earned),('event_product_name',product.product_name),('points',product.points),('time',transaction.time),('date',transaction.date),('remarks',transaction.remarks)])
            data_list.append(data)
        return JsonResponse(data_list, safe=False)

@csrf_exempt
def posts(request):
    headers = { "Authorization": "Basic "
                + base64.b64encode(
                    f"Qkpy3jC17jwlqOVBISsAub5fOEyRWr9yi48VcgeK:tcTFJGIB2zUeyp858njYs9jtr4MY8kPZuDTvKiqjK5VP6D0me08R0guexRBk81A648HnT9skxfFWdUSYFMrOwzhh8t5pcwkXglkEVFGlGc75WJovG3NsFe8mbsxrMvAi".encode("utf-8")
                ).decode("utf-8"),
                "Content-Type": "application/x-www-form-urlencoded",
    }
    x=base64.b64encode(
                    f"Qkpy3jC17jwlqOVBISsAub5fOEyRWr9yi48VcgeK:tcTFJGIB2zUeyp858njYs9jtr4MY8kPZuDTvKiqjK5VP6D0me08R0guexRBk81A648HnT9skxfFWdUSYFMrOwzhh8t5pcwkXglkEVFGlGc75WJovG3NsFe8mbsxrMvAi".encode("utf-8")
                ).decode("utf-8")
    data = JSONParser().parse(request)
    print(data.get('code'))
    r = requests.post('https://gymkhana.iitb.ac.in/profiles/oauth/token/', data='code='+data.get('code')+'&grant_type=authorization_code', headers=headers) 
    b = requests.get('https://gymkhana.iitb.ac.in/profiles/user/api/user/?fields=first_name,last_name,profile_picture,roll_number,email', headers={'Authorization':'Bearer '+r.json()['access_token']})
    data=b.json()
    print(data)
    if data['last_name'] is NULL:
        data['last_name']=''
    user_data=OrderedDict([('name',data['first_name'] + ' ' + data['last_name']),('picture',data['profile_picture']),('roll_number',data['roll_number']),('email',data['email'])])
    return JsonResponse(user_data)
