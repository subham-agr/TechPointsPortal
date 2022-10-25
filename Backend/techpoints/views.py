from asyncio.windows_events import NULL
from email.message import Message
from http.client import HTTPResponse
from typing import OrderedDict
from datetime import datetime
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from django.conf import settings
import pandas as pd
import requests
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import base64
from django.db.models import Q

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
        if student.total_points - product.points < 0:
            return JsonResponse(OrderedDict([("success",False)]),safe=False)
        student.points_redeemed+=product.points
        student.total_points-=product.points
        student.save()
        orders = Order.objects.filter(order_id__startswith=data['roll_number'])
        order_id = data['roll_number']
        if len(orders)!=0:
            for i in range(4-len(str(len(orders)+1))):
                order_id+='0'
            order_id+=str(len(orders)+1)
        else:
            order_id+='0001'
        order = Order(order_id=order_id,product_id=data['product_id'],status='Ordered',deliver_time='')
        order.save()
        transactions = Transaction.objects.filter(transaction_id__startswith=data['roll_number'])
        transaction_id = data['roll_number']
        if len(transactions)!=0:
            for i in range(4-len(str(len(transactions)+1))):
                transaction_id+='0'
            transaction_id+=str(len(transactions)+1)
        else:
            transaction_id+='0001'
        transaction = Transaction(transaction_id=transaction_id,product_id=data['product_id'],earned=False,time=datetime.now().strftime("%H:%M:%S"),date=datetime.now().strftime("%d %b,%Y"),remarks='Redeemed')
        transaction.save()
        return JsonResponse(OrderedDict([('success',True)]), safe=False)
    elif request.method=='GET':
        products = Product.objects.all()
        data_list = []
        for product in products:
            img_path = request.build_absolute_uri(settings.MEDIA_URL) + str(product.product_picture)
            data = OrderedDict([('product_id',product.product_id),('product_name',product.product_name),('points',product.points),('product_desc',product.product_desc),('product_picture',img_path)])
            data_list.append(data)
        return JsonResponse(data_list,safe=False)

@api_view(['GET','POST'])
def orders(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        orders = Order.objects.filter(order_id__startswith=data['roll_number'])
        data_list=[]
        for order in orders:
            products = Product.objects.filter(product_id=order.product_id)
            product = products[0]
            img_path = request.build_absolute_uri(settings.MEDIA_URL) + str(product.product_picture)
            data = OrderedDict([('order_id',order.order_id),('status',order.status),('product_name',product.product_name),('product_desc',product.product_desc),('points',product.points),('picture',str(img_path))])
            data_list.append(data)
        return JsonResponse(data_list, safe=False)
    elif request.method == 'GET':
        data = request.headers['Order-Id']
        order = Order.objects.filter(order_id=data)[0]
        product = Product.objects.filter(product_id=order.product_id)[0]
        img_path = request.build_absolute_uri(settings.MEDIA_URL) + str(product.product_picture)
        order_data = OrderedDict([('order_id',order.order_id),('status',order.status),('product_name',product.product_name),('product_desc',product.product_desc),('points',product.points),('picture',str(img_path))])
        return JsonResponse(order_data, safe=False)

@api_view(['POST','PUT','DELETE'])
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
                data = OrderedDict([('order_id',order.order_id),('deliver_time',order.deliver_time),('status',order.status),('product_name',product.product_name),('points',product.points),('picture',str(img_path))])
                data_list.append(data)
        return JsonResponse(data_list, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        order = Order.objects.filter(order_id=data['order_id'])[0]
        order.deliver_time = ''
        order.save()
        return JsonResponse(OrderedDict([('success',True)]),safe=False)
    elif request.method == 'DELETE':
        data = JSONParser().parse(request)
        orders = Order.objects.filter(order_id__startswith=data['roll_number'])
        for order in orders:
            order.deliver_time = ''
            order.save()
        return JsonResponse(OrderedDict([('success',True)]))


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

def add_points(request):
    if request.method == 'GET':
        return render(request,'points.html',{'not_uploaded':True})
    csv_file = request.FILES["csv_file"]
    file_data = csv_file.read().decode('utf-8')
    lines = file_data.split("\n")
    for i in range(1,len(lines)-1):
        data = lines[i].strip().split(',')
        student_obj = Student.objects.filter(roll_number=data[0])
        if len(student_obj)==0:
            student = Student(roll_number=data[0],name='',points_earned=int(data[1]),points_redeemed=0,total_points=int(data[1]))
            student.save()
            transaction = Transaction(transaction_id=data[0]+'0001',points_earned=int(data[1]),event_name=data[3]+', '+data[2],earned=True,time=datetime.now().strftime("%H:%M:%S"),date=datetime.now().strftime("%d %b,%Y"),remarks=data[4])
            transaction.save()
        else:
            student = student_obj[0]
            student.points_earned+=int(data[1])
            student.total_points+=int(data[1])
            student.save()
            transactions = Transaction.objects.filter(transaction_id__startswith=data[0])
            transaction_id = data[0]
            if transactions:
                for i in range(4-len(str(len(transactions)+1))):
                    transaction_id+='0'
                transaction_id+=str(len(transactions)+1)
            else:
                transaction_id+='0001'
            transaction = Transaction(transaction_id=transaction_id,event_name=data[3]+', '+data[2],points_earned=int(data[1]),earned=True,time=datetime.now().strftime("%H:%M:%S"),date=datetime.now().strftime("%d %b,%Y"),remarks=data[4])
            transaction.save()
    return render(request,'points.html',{'not_uploaded':False})

@api_view(['GET','POST'])
def order_admin(request):
    if request.method == 'GET':
        orders = Order.objects.filter(Q(status='Ordered') | Q(status='Dispatched'))
        data_list=[]
        for order in orders:
            products = Product.objects.filter(product_id=order.product_id)
            product = products[0]
            img_path = request.build_absolute_uri(settings.MEDIA_URL) + str(product.product_picture)
            data = OrderedDict([('order_id',order.order_id),('status',order.status),('product_id',product.product_id),('product_name',product.product_name),('points',product.points),('picture',str(img_path))])
            data_list.append(data)
        return JsonResponse(data_list, safe=False)
    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        orders = Order.objects.filter(order_id=data['order_id'])
        order = orders[0]
        if order.status == 'Ordered':
            order.status = 'Dispatched'
        elif order.status == 'Dispatched':
            order.status = 'Delivered'
            order.deliver_time = datetime.now().strftime("%d %b,%Y %H:%M:%S") 
        order.save()
        return JsonResponse({'message': 'Successfully Changed Order Status!'})

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
    r = requests.post('https://gymkhana.iitb.ac.in/profiles/oauth/token/', data='code='+data.get('code')+'&grant_type=authorization_code', headers=headers) 
    b = requests.get('https://gymkhana.iitb.ac.in/profiles/user/api/user/?fields=first_name,last_name,profile_picture,roll_number,email', headers={'Authorization':'Bearer '+r.json()['access_token']})
    data=b.json()
    if data['last_name'] is NULL:
        data['last_name']=''
    student_list = Student.objects.filter(roll_number=data['roll_number'])
    if len(student_list)==0:
        student = Student(roll_number=data['roll_number'],name=data['first_name']+' '+data['last_name'],total_points=0,points_redeemed=0,points_earned=0)
        student.save()
    else:
        student = student_list[0]
        if student.name == '':
            student.name = data['first_name']+' '+data['last_name']
    user_data=OrderedDict([('name',data['first_name'] + ' ' + data['last_name']),('picture',data['profile_picture']),('roll_number',data['roll_number']),('email',data['email'])])
    return JsonResponse(user_data)
