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
  # _thresholds=[]
  # bounds=[[],[]]
  # conversion_factor = None
  # neg_test = False
  # pos_test = False
  
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
    upper = []
    lower = []
    self.inverts=[]
    
    # TODO(jonas): Optimize iterations
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
    upper=numpy.array(upper,dtype=numpy.uint8)
    lower=numpy.array(lower,dtype=numpy.uint8)
    self.bounds=[upper,lower]
    
    if (True in self.inverts and False in self.inverts):
      self.pos_test = copy.deepcopy(self.bounds)
      self.neg_test = copy.deepcopy(self.bounds)
      for i,b in enumerate(self.inverts):
        if self.inverts[i] is True:
          self.pos_test[U][i]=255
          self.pos_test[L][i]=0
        else:
          self.neg_test[U][i]=255
          self.neg_test[L][i]=0
    
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
    
    
    image=self.pil_2_cv(image) # Still RGB, not BGR.
    backup=image.copy()
    
    if self.conversion_factor is not None:
      image = cv2.cvtColor(image,self.conversion_factor)
      print "Using %s" % self.conversion_factor
    
    if True not in self.inverts:        # No inverted tests
      mask = cv2.inRange(image, self.bounds[L], self.bounds[U])
    elif False not in self.inverts:     # All inverted tests
      negMask=cv2.inRange(image, self.bounds[L], self.bounds[U])
      mask = cv2.bitwise_not(negMask)
    else:                               # Mix inverted and non-inverted
      nots=cv2.inRange(image, self.neg_test[L], self.neg_test[U])
      yeses=cv2.inRange(image, self.pos_test[L], self.pos_test[U])
      nots=cv2.bitwise_not(nots)
      mask = cv2.bitwise_and(nots,yeses)
    mask = cv2.cvtColor(mask,cv2.COLOR_GRAY2RGB)
    mask= cv2.bitwise_not(mask)
    im=cv2.min(backup,mask)
    print im.shape
    return self.cv_2_pil(im).copy()
    
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
      