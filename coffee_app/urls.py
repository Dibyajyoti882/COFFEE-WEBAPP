from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('about/', views.about, name='About'),
    path('price/', views.price, name='price'),
    path('blog/', views.blog, name='Blog'),
    path('contact/', views.contact, name='contact'),
    path('cart/', views.cart, name='cart'),
    path('signin/', views.signin, name='signin'),
    path('signup/', views.signup, name='signup'),
]
