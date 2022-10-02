from django.urls import path
from . import views 

urlpatterns = [ 
    path("userdata", views.posts, name="auth"),
]