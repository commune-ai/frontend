# Generated by Django 5.0.2 on 2024-03-04 05:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('replicate', '0007_alter_replicatedata_description_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='replicatedata',
            old_name='run_count',
            new_name='category',
        ),
    ]
