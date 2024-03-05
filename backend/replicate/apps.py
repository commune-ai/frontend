from django.apps import AppConfig

class ReplicateConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'replicate'

    def ready(self):
        from replicateupdate import updater
        updater.start()
        