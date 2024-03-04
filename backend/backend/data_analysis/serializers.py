from rest_framework import serializers
from backend.data_analysis.models import TransactionRecordModel, LoginUserWalletAddress


class TransactionRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionRecordModel
        fields = "__all__"


class LoginUserWalletAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginUserWalletAddress
        fiels = "__all__"
