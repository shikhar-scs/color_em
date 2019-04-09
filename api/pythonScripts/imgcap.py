# Import Stuff
import os
import sys
import scipy.misc
import numpy as np
from skimage import color
from keras.models import load_model
from skimage.transform import resize
from keras.preprocessing import image
from keras.applications.inception_resnet_v2 import InceptionResNetV2, preprocess_input
import tensorflow as tf


#
# import os, sys
from PIL import Image
#
# size = 128, 128
#
# for infile in sys.argv[1:]:
#     outfile = os.path.splitext(infile)[0] + ".thumbnail"
#     if infile != outfile:
#         try:
#             im = Image.open(infile)
#             im.thumbnail(size, Image.ANTIALIAS)
#             im.save(outfile, "JPEG")
#         except IOError:
#             print "cannot create thumbnail for '%s'" % infile



os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

inception = InceptionResNetV2(weights=None,include_top=True)
inception.load_weights('api/ml_models/inception_resnet_v2_weights_tf_dim_ordering_tf_kernels.h5')
inception.graph = tf.get_default_graph()

model = load_model('api/ml_models/Model_8_batch.h5')

def create_inception_embedding(grayscaled_rgb):
    grayscaled_rgb_resized = []
    for i in grayscaled_rgb:
        i = resize(i, (299, 299, 3), mode='constant')
        grayscaled_rgb_resized.append(i)
    grayscaled_rgb_resized = np.array(grayscaled_rgb_resized)
    grayscaled_rgb_resized = preprocess_input(grayscaled_rgb_resized)
    with inception.graph.as_default():
        embed = inception.predict(grayscaled_rgb_resized)
    return embed

color_me = []
for filename in os.listdir('frontendWorks/dist/imageUsers/'):
    if filename.endswith('.jpg') or filename.endswith('.jpeg'):
        img = image.img_to_array(image.load_img('frontendWorks/dist/imageUsers/'+filename))
        # a1 = np.resize(img[:,:,0],(256,256))
        # a2 = np.resize(img[:,:,1],(256,256))
        # a3 = np.resize(img[:,:,2],(256,256))
        # b = np.zeros((256, 256, 3))
        # print(a1.shape, a2.shape, a3.shape, b[:,:,0].shape)
        # b[:,:,0] = a1[:,:]
        # b[:,:,1] = a2[:,:]
        # b[:,:,2] = a3[:,:]

        color_me.append(img)
#
color_me = np.array(color_me, dtype=float)
print(color_me.shape)


# color_me = color_me.reshape(1, 256, 256, 1)
color_me = color_me/255.0
color_me = color.gray2rgb(color.rgb2gray(color_me))
color_me_embed = create_inception_embedding(color_me)
color_me = color.rgb2lab(color_me)[:,:,:,0]
color_me = color_me.reshape(color_me.shape+(1,))
#
# # Test model
output = model.predict([color_me, color_me_embed])
output = output * 128

# Output colorizations
for i in range(len(output)):
    cur = np.zeros((256, 256, 3))
    cur[:,:,0] = color_me[i][:,:,0]
    cur[:,:,1:] = output[i]
    scipy.misc.imsave("frontendWorks/dist/image_Output/img_"+str(i)+".png", color.lab2rgb(cur))
#
print("done")
sys.stdout.flush()
