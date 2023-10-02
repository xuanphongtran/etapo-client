import mongoose, { model, Schema, models } from 'mongoose'

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: String,
    images: [{ type: String }],
    category: String,
    rating: Number,
    discount: Number,
    brand: String,
    tag: String,
    delFlag: Boolean,
    properties: [{ type: Object }],
  },
  {
    timestamps: true,
  },
)

export const Product = models.Product || model('Product', ProductSchema)
