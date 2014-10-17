#!/usr/bin/env python
#
# This library is free software; you can redistribute it and/or modify it
# under the terms of version 2.1 of the GNU Lesser General Public License
# as published by the Free Software Foundation.
#
# This library is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
# or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
# License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with this library; if not, write to the Free Software Foundation,
# Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
#
from PIL import Image, ImageMath
import cv2, numpy, math, os, copy

A=0
B=1
C=2
MIN=0
MAX=1
U=0
L=1


class Thresholder():
  """Class for performing thresholding and/or conversions."""
  
  def __init__(self,thresholds,from_cs="rgb",to_cs="rgb",debug=False):
    """Instantiates a new thresholding engine.

    Args:
      thresholds: 2d array of the form
        [   [cs_val_min_a,  cs_val_max_a],
          [cs_val_min_b,  cs_val_max_b],
          [cs_val_min_c,  cs_val_max_c]   ]
          
      ...where a,b and c are the channels of 
        the target (threshold) colorspace.
        
      Negative value in either max or min of a channel
        will trigger a NOT threshold (i.e. inverted).
        
      
      from_colorspace: Originating test set colorspace.
      to_colorspace: Colorspace of threshold values.

    Returns:
      A new Thresholding object.
    """
    
    if debug:
      print "Instantiating new thresholder"
    self.debug = debug
    
    self._thresholds=thresholds
    from_cs=from_cs.upper()
    to_cs=to_cs.upper()
    self.from_cs=from_cs
    self.to_cs=to_cs
    self.conversion_factor = self._check_cs_conversion(from_cs,to_cs)
        
    upper=[thresholds[A][MAX],thresholds[B][MAX],thresholds[C][MAX]]
    lower=[thresholds[A][MIN],thresholds[B][MIN],thresholds[C][MIN]]
    if self.to_cs=="HSV" or self.to_cs=="HLS":
      upper[0] = int(upper[0]*180.0/255.0)
      lower[0] = int(lower[0]*180.0/255.0)
    self.bounds=(upper,lower)
    
    if debug:
      print "Bounds before inversion testing:"
      print self.bounds
    upper = []
    lower = []
    self.inverts=[]
    
    for i in range(3):
      u=self.bounds[U][i]
      l=self.bounds[L][i]
      if l < 0 or u < 0:
        l=abs(l)
        u=abs(u)
        self.inverts.append(True)
      else:
        self.inverts.append(False)
      upper.append(u)
      lower.append(l)
    self.lower=lower
    self.upper=upper
    
  def threshold_image(self,image):   
    """Performs thresholding on a whole image.

    Args:
      image: One of either formats below:
          PIL (as RGB)
          (numpy array) todo
          (cv-image) todo
    
    Returns:
      The thresholded image as PIL (RGB) image,
      with positive bits set to 255 and false to 0.
    """
    debug = self.debug
    debug=True
    debuginfo=self.debuginfo
    print "Thresholding..."
    image=self.pil_2_cv(image) # Still RGB, not BGR.
    w,h,_=image.shape
    debuginfo(image,"after initial pil2cv")
    backup=image.copy()
    if self.conversion_factor is not None:
      image = cv2.cvtColor(image,self.conversion_factor)
      debuginfo(image,"after conversion")
    masks = [None,None,None]
    for i,c in enumerate(cv2.split(image)):
      masks[i]=(c<=self.upper[i]) & (c>=self.lower[i])
      if self.inverts[i]:
        masks[i]=~masks[i]
    mask=(~(masks[0]&masks[1]&masks[2]))*255
    def print8(thinga,thingb,thingc):
      for i in range(8):
        print "%15d %15d %15d" % (thinga[i][0],thingb[i],thingc[i])
    mask=cv2.cvtColor(numpy.uint8(mask),cv2.COLOR_GRAY2RGB)
    outimage=mask&backup
    return self.cv_2_pil(outimage)
    
  def cv_2_pil(self,image):
    # Converts cv-image to PIL.
    return Image.fromarray(image)
    
  def pil_2_cv(self,image):
    return numpy.array(image)
      
  def _check_cs_conversion(self,from_cs,to_cs):
    """Checks if conversion between from/to is possible.
    
    Args:
      from_cs: originating colorspace abbreviation, capitalized
      to_cs: target (threshold) colorspace abbreviation, capitalized
      
    Returns:
      cv2 constant identifying conversion, or None if not found.
    """
    if "COLOR_%s2%s" % (from_cs,to_cs) in dir(cv2):
      return eval("cv2.COLOR_%s2%s" % (from_cs,to_cs))
      
  def debuginfo(self,imageobject,atTime=""):
    if self.debug:
      if atTime is not "":
        atTime = " " + atTime + ":"
      print ""
      print "Data type%-35s %-10s" % (atTime,imageobject.dtype)
      print "Mean%-40s %-10s" % (atTime,imageobject.mean())
      print "Shape%-39s %-10s" % (atTime,imageobject.shape)