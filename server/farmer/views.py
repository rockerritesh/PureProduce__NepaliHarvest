from django.shortcuts import render, redirect
from .forms import FarmerForm

def become_farmer(request):
    if request.method == 'POST':
        form = FarmerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = FarmerForm()
    return JsonResponse({'html': form.as_p()})