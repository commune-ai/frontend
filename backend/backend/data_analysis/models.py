from django.db import models
from django.utils.translation import gettext_lazy as _


class TransactionRecordModel(models.Model):
    transactionId = models.AutoField(primary_key=True)
    payType = models.CharField(max_length=255)
    amount = models.FloatField()  # Change from Decimal to FloatField
    destinationAddress = models.CharField(max_length=100)
    txHash = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return str(self.transactionId)


class LoginUserWalletAddress(models.Model):
    walletId = models.AutoField(primary_key=True)
    walletAddress = models.CharField(max_length=100)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return str(self.walletId)
