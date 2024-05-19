from django.db import models


class ChatRoom(models.Model):
    room_id = models.CharField(max_length=255, unique=True, primary_key=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiration_duration = models.PositiveIntegerField(default=0)

    def is_expired(self):
        if self.expiration_duration > 0:
            return self.created_at + timedelta(minutes=self.expiration_duration) < timezone.now()
        return False

class Message(models.Model):
    room_id = models.CharField(max_length=50)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

