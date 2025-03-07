import mongoose from "mongoose";

const giftSchema = mongoose.Schema(
    {
        person: {
            type: String,
            required: true,
        },
        giftitem: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        purchased:
        {
            type: Boolean,
            required: false,
        },
    },
    {
        timestamps: true,
    }

);

export const Gift = mongoose.model('Gift', giftSchema);