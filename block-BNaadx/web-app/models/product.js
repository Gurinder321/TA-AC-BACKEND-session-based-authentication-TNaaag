var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: String,
    price: Number,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
