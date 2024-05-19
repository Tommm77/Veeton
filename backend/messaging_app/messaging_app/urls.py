from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from chat.views import ChatRoomViewSet, MessageViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

router = DefaultRouter()
router.register(r'chatrooms', ChatRoomViewSet)
router.register(r'messages', MessageViewSet)

schema_view = get_schema_view(
   openapi.Info(
      title="Chat API",
      default_version='v1',
      description="API documentation for the Chat application",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@chat.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
