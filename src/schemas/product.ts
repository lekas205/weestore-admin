import { PHONE_NUMBER_REGEX } from '@/constants'
import { z } from 'zod'

export const CreateCategorySchema = z.object({
  name: z.string({
    message: 'Category name is required'
  })
  .min(2, {
    message: 'Category name is required'
  }),
  description: z.string({
    message: 'Description is required'
  })
  .min(2, {
    message: 'Description is required'
  }),
  icon: z
    .array(
      z.any(),
      { message: 'Category Image is required'}
    )
    .min(1, { message: 'Category Image is required' })
    .or(
      z.string({ message: 'Category Image is required' })
    ),
})

export const UpdateCategorySchema = CreateCategorySchema.extend({
  id: z.string(),
})

export const CreateWarehouseSchema = z.object({
  name: z
    .string({
      message: 'Warehouse name is required'
    })
    .min(2, {
      message: 'Warehouse name is required'
    }),
  managerName: z
    .string({
      message: 'Manager name is required'
    })
    .min(2, {
      message: 'Manager name is required'
    }),
  managerPhoneNo: z
    .string({
      message: 'Phone number is required'
    })
    .regex(new RegExp(PHONE_NUMBER_REGEX), {
      message: 'Invalid Phone Number.',
    }),
  state_id: z.string({
    message: 'State is required'
  }),
  address: z
    .string({
      message: 'Address is required'
    })
    .min(2, {
      message: 'Address is required'
    }),
})

export const UpdateWarehouseSchema = CreateWarehouseSchema.extend({
  id: z.string(),
})

export const CreateProductSchema = z.object({
  name: z
    .string({
      message: 'Product name is required',
      invalid_type_error: 'Product name is required'
    })
    .min(2, {
      message: 'Product name is required'
    }),
  description: z
    .string({
      message: 'Description is required',
    })
    .min(2, {
      message: 'Description is required'
    }),
  manufacturer: z.string({
    message: 'Manufacturer name is required'
  }),
  price: z
    .number({
      message: 'Price is required',
      coerce: true
    })
    .min(1, {
      message: 'Price cannot be less than 1 Naira'
    }),
  quantity: z
    .number({
      message: 'Quantity is required',
      coerce: true
    })
    .min(1, {
      message: 'Quantity cannot be less than 1'
    }),
  category: z.string({
    message: 'Category is required'
  }),
  state: z.string({
    message: 'State is required'
  }),
  warehouse: z.string({
    message: 'Warehouse is required'
  }),
  images: z
    .array(
      z.any()
    )
    .min(2, {
      message: 'Provide at least 2 images'
    }),
  sizes: z
    .array(
      z.string()
    ).min(1, {
      message: 'Select at least 1 size'
    })
})

export const UpdateProductSchema = CreateProductSchema.extend({
  productId: z.string(),
})
