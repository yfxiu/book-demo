from rest_framework import serializers
from books.models import Book,Publisher,Author

class BookListSerializer(serializers.ModelSerializer):

	resource_type_text = serializers.ReadOnlyField()
	class Meta:
		model = Book
##################################################################################################
class BookAddSerializer_1(serializers.Serializer):
	# title = serializers.IntegerField()
	title = serializers.CharField(max_length=100)
	# publisher_id = serializers.IntegerField()
	publisher = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all(),
                                              required=True, allow_null=True,
                                              )
	author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(),required=True, allow_null=True,many=True)

	def create(self, validated_data):

		authors = validated_data.pop('author')
		book = Book.objects.create(**validated_data)
		book.author.add(*authors)
		return book

class BookAddSerializer(serializers.ModelSerializer):
	# pk = serializers.IntegerField(read_only=True)

	class Meta:
		model = Book
		fields = ('title', 'publisher', 'author')

	def create(self, validated_data):

		authors = validated_data.pop('author')
		book = Book.objects.create(**validated_data)
		book.author.add(*authors)

		return book
##################################################################################################



#when working with ModelSerializers where you want to determine what set of fields and validators are being automatically created for you


# >>> from books.bookListSerializer import BookListSerializer,BookAddSerializer
# >>> p = BookAddSerializer()
# >>> p
# BookAddSerializer():
#     title = CharField(max_length=100)
#     publisher = PrimaryKeyRelatedField(queryset=Publisher.objects.all())
#     author = PrimaryKeyRelatedField(many=True, queryset=Author.objects.all())


class PublisherListSerializer(serializers.ModelSerializer):
	resource_type_text = serializers.ReadOnlyField()
	class Meta:
		model = Publisher

class AuthorListSerializer(serializers.ModelSerializer):
	resource_type_text = serializers.ReadOnlyField()
	class Meta:
		model = Author
		