from django.shortcuts import render
from django.http import Http404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import generics
# Create your views here.
# from django.views.decorators.csrf import csrf_exempt

from django.views.generic import ListView
from books.models import *
from books.bookListSerializer import *

class PublisherList(ListView):
	model = Publisher
	serializer_class = PublisherListSerializer


require_GET = api_view(["GET"])



@require_GET
def getBooks(request,bid):
	bid = int(bid)
	if bid==0:
		book_list = Book.objects.order_by('id')
	else:
		book_list = Book.objects.filter(publisher_id=bid).order_by('id')
	serializer = BookListSerializer(book_list, many=True)
	return Response(serializer.data)
@require_GET
def getPublishers(request):
	p_list = Publisher.objects.order_by('id')
	serializer = PublisherListSerializer(p_list, many=True)
	return Response(serializer.data)
@require_GET
def getAuthors(request):
	a_list = Author.objects.order_by('id')
	serializer = AuthorListSerializer(a_list, many=True)
	return Response(serializer.data)


# @csrf_exempt
@api_view(['POST'])
def addBook(request):
	try:
		serializer = BookAddSerializer(data=request.data,context={"request": request})
		if serializer.is_valid():
			book = serializer.save()
			return Response({'success': True,
                             "msg": 'Book is added successfully!',},
                            status=status.HTTP_201_CREATED)
		else:
			return Response({"success": False,
                             "msg": 'Book data is not valid!',
                             'errors': serializer.errors},
                            )
	except Exception as e:

		import traceback; traceback.print_exc();
		return Response({"success": False, "msg": 
            'Failed to :%s.' % e})

@api_view(['POST'])
def updateBook(request):

	book = Book.objects.get(pk=request.data['id'])
	try:
		serializer = BookAddSerializer(instance=book,data=request.data,context={"request": request})
		
		if serializer.is_valid():
			serializer.save()
			return Response({'success': True,
                             "msg": 'Book is updated successfully!',},
                            status=status.HTTP_201_CREATED)
		else:
			return Response({"success": False,
                             "msg": 'Book data is not valid!',
                             'errors': serializer.errors},
                            )
	except Exception as e:

		import traceback; traceback.print_exc();
		return Response({"success": False, "msg": 
            'Failed to :%s.' % e})



##################################################################################################
class BookDetail_1(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Book.objects.all()
    serializer_class = BookAddSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Book.objects.all()
	serializer_class = BookAddSerializer



##################################################################################################




class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookAddSerializer


