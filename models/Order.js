import { model, models, Schema } from 'mongoose'

const OrderSchema = new Schema(
  {
    line_items: Object,
    fullName: String,
    email: String,
    companyName: String,
    province: String,
    district: String,
    ward: String,
    address: String,
    phoneNumber: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  },
)

export const Order = models?.Order || model('Order', OrderSchema)
