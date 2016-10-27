#!/usr/bin/env python
# coding=utf-8 


class BookForm(forms.Form):

	bookName = forms.CharField(label="BookName", max_length=20)

	author = forms.CharField(label="Author", max_length=20)