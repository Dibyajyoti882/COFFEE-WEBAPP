from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

def home(request):
    return render(request, 'index.html')
def about(request):
    return render(request, 'About.html')
def price(request):
    return render(request, 'price.html')
def blog(request):
    return render(request, 'Blog.html')
def contact(request):
    return render(request, 'contact.html')
def cart(request):
    return render(request, 'cart.html')
def signin(request):
    return render(request, 'signin.html')
def signup(request):
    return render(request, 'signup.html')
