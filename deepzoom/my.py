#!/usr/local/bin/python
from openslide import OpenSlide
from openslide.deepzoom import DeepZoomGenerator
from PIL import Image
import Thresholding as T

slide=DeepZoomGenerator(OpenSlide("/usr/local/OpenSlideServe/data/CarlZeiss/TilOysteinAnalyse/Alphonse.tif"))
tile=slide.get_tile(15,(81,92))
t=""
def runIt():
  t=T.Thresholder([[0,50],[50,100],[100,150]],"rgb","rgb")
  t.threshold_image(tile)