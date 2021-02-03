import * as mongoose from 'mongoose';

export class Banner {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public imagen: any,
    // public imagen: {
    //   data: mongoose.Schema.Types.Buffer;
    //   mimetype: string;
    //   size: number;
    // },
    public orden: number,
    public texto?: string
  ) {}
}
