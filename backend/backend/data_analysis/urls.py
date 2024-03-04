from django.urls import path

from backend.data_analysis.views import (
    SaveTransaction,
    SaveMetamask,
    SaveNewWalletAddress
)

urlpatterns = [
    path("saveTransaction/", view=SaveTransaction.as_view(), name="SaveTransaction"),
    path("saveMetamask/", view=SaveMetamask.as_view(), name="SaveMetamask"),
    path("saveNewWalletAddress/", view=SaveNewWalletAddress.as_view(), name="SaveMetamask"),
]
