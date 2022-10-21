from django.urls import path,include
from . import views 
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'students',views.StudentViewset)
router.register(r'transactions',views.TransactionViewset)
router.register(r'orders',views.OrderViewset)
router.register(r'products',views.ProductViewset)

urlpatterns = [ 
    path('',include(router.urls)),
    path("userdata", views.posts, name="auth"),
]