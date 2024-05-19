from rest_framework import viewsets
from .models import ChatRoom, Message
from .serializer import ChatRoomSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework import status

class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def create(self, request, *args, **kwargs):
        room_id = request.data.get('room_id')
        password = request.data.get('password')
        chat_room = ChatRoom.objects.create(room_id=room_id, password=password)
        serializer = ChatRoomSerializer(chat_room)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        try:
            chat_room = ChatRoom.objects.get(room_id=pk)
            password = request.query_params.get('password')
            if chat_room.password and chat_room.password != password:
                return Response({'error': 'Invalid password.'}, status=status.HTTP_403_FORBIDDEN)
            serializer = ChatRoomSerializer(chat_room)
            return Response(serializer.data)
        except ChatRoom.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_id = self.request.query_params.get('room_id')
        if room_id:
            return Message.objects.filter(room_id=room_id)
        return Message.objects.none()
