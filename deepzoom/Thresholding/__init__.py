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
  _thresholds=[]
  bounds=[[],[]]
  inverts=[False,False,False]
  conversion_factor = None
  
  def __init__(self,thresholds,from_cs="rgb",to_cs="rgb"):
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
    
    self._thresholds=thresholds
    from_cs=from_cs.upper()
    to_cs=to_cs.upper()
    self.conversion_factor = self._check_cs_conversion(from_cs,to_cs)
    upper=(thresholds[A][MAX],thresholds[B][MAX],thresholds[C][MAX])
    lower=(thresholds[A][MIN],thresholds[B][MIN],thresholds[C][MIN])
    self.bounds=(upper,lower)
    
  def threshold_image(self,image):
    """Performs thresholding on a whole image.

    Args:
      image: One of either formats below:
          PIL
          (numpy array) todo
          (cv-image) todo
    
    Returns:
      The thresholded image as PIL (8bit) image,
      with positive bits set to 255 and false to 0.
    """
    
    # TODO(jonas) Implement test for cv, test for numpy.
    
    image=pil_2_cv(image) # Still RGB, not BGR.
    
    if self.conversion_factor is not None:
      image = cv2.cvtColor(image,self.conversion_factor)
      print "Using %s" % self.conversion_factor
    
    upper=[]
    lower = []
    for i in range(3):
      u=self.bounds[U][i]
      l=self.bounds[L][i]
      if l < 0 or u < 0:
        l=abs(l)
        u=abs(u)
        self.inverts[i] = True
      else:
        self.inverts[i] = False
      upper.append(u)
      lower.append(l)
    upper=numpy.array(upper,dtype=numpy.uint8)
    lower=numpy.array(lower,dtype=numpy.uint8)
    self.bounds=[upper,lower]
    
    returnImage = None
    if True not in self.inverts:
      returnImage = cv2.inRange(image, lower, upper)
    elif False not in self.inverts:
      returnImage = cv2.bitwise_not(cv2.inRange(image, lower, upper))
    else:
      pos_check = copy.deepcopy(self.bounds)
      neg_check = copy.deepcopy(self.bounds)
      for i,b in enumerate(self.inverts):
        if self.inverts[i] is True:
          pos_check[U][i]=255
          pos_check[L][i]=0
        else:
          neg_check[U][i]=255
          neg_check[L][i]=0
      print neg_check
      nots=cv2.inRange(image, neg_check[L], neg_check[U])
      yeses=cv2.inRange(image, pos_check[L], pos_check[U])
      nots=cv2.bitwise_not(nots)
      returnImage = cv2.bitwise_and(nots,yeses)# dst=nots, mask=nots)
    return cv_2_pil(returnImage)
    
  #def threshold_pixel(self,pixel):
  # TODO(jonas) implement
  
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
      
def cv_2_pil(image):
  # Converts cv-image to PIL. One channel!
  return Image.fromarray(image)
  
def pil_2_cv(image):
  # Converts PIL-image to numpy array (for cv). Still RGB.
  return numpy.array(image)