from django.db import models


class ChatRoom(models.Model):
    room_id = models.CharField(max_length=255, unique=True, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    room_id = models.CharField(max_length=50)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

