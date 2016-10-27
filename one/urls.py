from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView



from books.views import PublisherList
from books.views import *



urlpatterns = patterns('',
    # Examples:
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', TemplateView.as_view(template_name="index.html"), name='index'),

    url(r'^admin/', include(admin.site.urls)),
	##################################################################################################
    url(r'^publisher_1/$', PublisherList.as_view()),
    url(r'^book_e/(?P<pk>[0-9]+)$', BookDetail.as_view()),
    url(r'^book_1/(?P<pk>[0-9]+)$', BookDetail_1.as_view()),
    url(r'^book_2/$', BookList.as_view()),

	##################################################################################################





    url(r'^publisher/$', getPublishers, name='p1'),

    url(r'^author/$', getAuthors, name='p'),
    url(r'^book/([\d+])/$',getBooks,name='p-1'),
    url(r'^book/add/$',addBook, name='p-2'),
    
    url(r'^book/update/$',updateBook, name='p-3'),




)
