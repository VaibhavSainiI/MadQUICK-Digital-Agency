import mongoose, { Schema, Document } from 'mongoose';

export interface IVaultItem extends Document {
  userId: mongoose.Types.ObjectId;
  encryptedData: string; // This will contain the encrypted JSON of all vault item data
  createdAt: Date;
  updatedAt: Date;
}

const VaultItemSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  encryptedData: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

VaultItemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.VaultItem || mongoose.model<IVaultItem>('VaultItem', VaultItemSchema);