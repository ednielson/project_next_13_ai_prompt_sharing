import { Schema, model, models } from 'mongoose';

const QRStyleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  negative_prompt: {
    type: String,
    required: true
  },
  strength: {
    type: Number,
    required: true
  },
  guidance_scale: {
    type: Number,
    required: true
  },
  controlnet_conditioning_scale: {
    type: Number,
    required: true
  }
});

const QRStyle = models.QRStyle || model('QRStyle', QRStyleSchema);

export default QRStyle;
