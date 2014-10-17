#!/usr/local/bin/python
from openslide import OpenSlide
from openslide.deepzoom import DeepZoomGenerator
from PIL import Image
import Thresholding as T, numpy, cv2

slide=DeepZoomGenerator(OpenSlide("/usr/local/OpenSlideServe/data/CarlZeiss/TilOysteinAnalyse/Alphonse.tif"))
tile=slide.get_tile(15,(72,15))
t=""
tile = Image.open("colorwheel-rgb.jpg")
# print tile.getextrema()
# tile.save("orig.tif")
# t=T.Thresholder([[0,255],[0,255],[0,255]],"rgb","hsv")
# th=t.threshold_image(tile)
# th.save("new.tif")
# print th.getextrema()
a=numpy.array([255,255,0,0],dtype=numpy.uint8)
b=numpy.array([200,150,100,50],dtype=numpy.uint8)
print a
print b
print "mask:"
print a
print "image:"
print b
print "result of cv2.bitwise_and(b,b,mask=a):"
im2=cv2.bitwise_and(b,b,mask=a)
print im2