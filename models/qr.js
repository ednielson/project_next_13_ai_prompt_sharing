import { Schema, model, models } from 'mongoose';

const QRSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  input_url: {
    type: String,
    required: [true, 'Input URL is required.'],
  },
  output_url: {
    type: String
  },
  style: {
    type: String
  },
}, {
  timestamps: true
});

const QR = models.QR || model('QR', QRSchema);

export default QR;
