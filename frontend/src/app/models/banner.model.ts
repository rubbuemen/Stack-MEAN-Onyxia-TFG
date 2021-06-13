import * as mongoose from 'mongoose';

export class Banner {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public imagen: any,
    public orden: number,
    public texto?: string
  ) { }
}
