from rest_framework import serializers
from .models import ChatRoom, Message


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ['room_id', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'room_id', 'content', 'timestamp']
