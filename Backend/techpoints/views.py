from asyncio.windows_events import NULL
from typing import OrderedDict

from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import viewsets

import requests
from django.views.decorators.csrf import csrf_exempt
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
