import os
import requests

from rest_framework import status
from rest_framework.response import Response

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

# import mysql.connector

from backend.data_analysis.models import TransactionRecordModel, LoginUserWalletAddress
from backend.data_analysis.serializers import (
    TransactionRecordSerializer,
)


def send_mail(email, content):
    email_params = {
        "apikey": os.getenv("MAIL_KEY"),
        "from": email,
        "to": "tunki1201@gmail.com",
        "subject": "This is the content",
        "body": f"{content}",
        "isTransactional": True,
    }

    response = requests.post(
        "https://api.elasticemail.com/v2/email/send",
        data=email_params,
    )
    return response


class SaveTransaction(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        payType = request.data.get("payType")
        amount = request.data.get("amount")
        destinationAddress = request.data.get("destinationAddress")
        txHash = request.data.get("txHash")
        # Create a new TransactionRecordModel instance and save it
        try:
            transaction_record = TransactionRecordModel.objects.create(
                payType=payType,
                amount=amount,
                destinationAddress=destinationAddress,
                txHash=txHash,
            )

            saved_transactionRecord = TransactionRecordSerializer(transaction_record)

            return Response({"message": "Transaction saved successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SaveNewWalletAddress(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        walletAddress = request.data.get("walletAddress")
        oldWalletAddress = request.data.get("oldWalletAddress")

        if not walletAddress or not oldWalletAddress:
            return Response(
                {"error": "Both walletAddress and oldWalletAddress are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Retrieve the old wallet object
            old_wallet_obj = LoginUserWalletAddress.objects.get(walletAddress=oldWalletAddress)

            # Update the wallet address
            old_wallet_obj.walletAddress = walletAddress
            old_wallet_obj.save()

            return Response({"message": "Wallet address updated successfully"}, status=status.HTTP_200_OK)

        except LoginUserWalletAddress.DoesNotExist:
            return Response({"error": "Old wallet address not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SaveMetamask(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        address = request.data.get("address")

        if not address:
            return Response({"error": "Address is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Assuming you have the model defined in models.py
            wallet_obj, created = LoginUserWalletAddress.objects.get_or_create(walletAddress=address)

            if created:
                return Response({"message": "Address saved successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Address already exists"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteAccount(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        address = request.data.get("address")

        if not address:
            return Response({"error": "Address is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the wallet object
            wallet_obj = LoginUserWalletAddress.objects.get(walletAddress=address)

            # Delete the wallet object
            wallet_obj.delete()

            return Response({"message": "Account deleted successfully"}, status=status.HTTP_200_OK)

        except LoginUserWalletAddress.DoesNotExist:
            return Response({"error": "Wallet address not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
