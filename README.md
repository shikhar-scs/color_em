# COLOR 'EM

Taking inspiration from the work by [Emil Walner](https://github.com/emilwallner) on how to colorize black and white images, we've built a neural network which has four components. <br>

## Workflow

We split the network we had before into an encoder and a decoder. Between them, we’ll use a fusion layer. <br>
In parallel to the encoder, the input images also run through one of today’s most powerful classifiers — the [Inception ResNet v2](https://ai.googleblog.com/2016/08/improving-inception-and-image.html) . This is a neural network trained on 1.2M images. We extract the classification layer and merge it with the output from the encoder.
<br>
By transferring the learning from the classifier to the coloring network, the network can get a sense of what’s in the picture. Thus, enabling the network to match an object representation with a coloring scheme. <br>

The main difference in colorization from other visual neural networks is the importance of pixel location. In coloring networks, the image size or ratio stays the same throughout the network. <br>

## Constraints

The original model posted by Emil Walner had been trained over 9.5k test images, 256x256 in size, for 2000 epochs. 
Any free services, didn't suffice for us to train our model online with such configs. 
Training our model locally allowed us to use only 1024 images at a time. On an average an epoch took 135s on a Macbook Pro having an inbuilt Intel Iris Plus Graphics 650 card, utilizing ~80% active memory. 
A single set of 1024 images, trained over 200 epochs, took 7.5 hrs. A total of 10 sets of images were trained (~75 hours), iteratively. This allowed us to get intermediary results. For a fully trained model, visit [this](https://demos.algorithmia.com/colorize-photos/)

## Intermediary Results

<To be updated soon>

## Local Setup

Clone the repository <br>
Download the models from [here](https://drive.google.com/drive/folders/1tR_5xlqRvm-xdVexu7FaGitult68JdVR?usp=sharing) and place them in `api/ml_models` directory.

```javascript
cd color_em
npm install 
npm start
```
choose from a set of given images in directory `testing_images`

## What now ?

Would be awesome if someone could help us with a free and reliable online service where we can train our model further. \
The ML code lies in the jupyter file. Any tweakings to the script which could benefit us will be appreciated. 
