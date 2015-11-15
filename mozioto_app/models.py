from django.contrib.gis.db import models

# Create your models here.

class ServiceArea(models.Model):
    """
        Represent the service area.
    """
    name = models.CharField(max_length=80, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # GeoDjango-specific: a geometry field (MultiPolygonField), and
    # overriding the default manager with a GeoManager instance.
    mpoly = models.MultiPolygonField()
    objects = models.GeoManager()
    
    # Returns the string representation of the model.
    def __str__(self):
        return self.name
