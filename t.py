#!/usr/local/bin/python
from vips8 import vips
from gi.repository import Vips
from openslide import OpenSlide
from openslide.deepzoom import DeepZoomGenerator
from io import BytesIO
from PIL import Image
class PILBytesIO(BytesIO):
    def fileno(self):
        '''Classic PIL doesn't understand io.UnsupportedOperation.'''
        raise AttributeError('Not supported')

slide=DeepZoomGenerator(OpenSlide("data/CarlZeiss/TilOysteinAnalyse/Alphonse_THRESH.tif"))
buf=PILBytesIO()
tile=slide.get_tile(15,(81,92))
tile.save(buf, "jpeg")
def doChange(this_tile):
    r,g,b = this_tile.split()
    def lt_gt(c,ln,gn):
        return c.point(lambda j: j < gn and j > ln and 255)
    R,G,B=0,1,2
    r=lt_gt(r,146,255)
    g=lt_gt(g,0,190)
    b=lt_gt(b,0,208)
    f=1.0/5.0
    return Image.merge(this_tile.mode,(r,g,b)).convert("L",(
	f,f,f,1,
	f,f,f,1,
	f,f,f,1))
#Vips.Image.new_from_buffer(buf,"")
