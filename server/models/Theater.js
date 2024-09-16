const TheaterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    screens: [
        {
            screenId: {
                type: String,
                required: true
            },
            totalSeats: {
                type: Number,
                required: true
            },
            seatingLayout: {
                type: [Schema.Types.Mixed],
                required: true,
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Theater', TheaterSchema);