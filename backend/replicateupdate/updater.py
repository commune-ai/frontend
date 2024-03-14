from apscheduler.schedulers.background import BackgroundScheduler
from . import replicateApi
from datetime import datetime

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(replicateApi.make_api_requests, 'interval', minutes=10, start_date=datetime.now())
    scheduler.start()
    # start_date=datetime.now()