import bcrypt from 'bcrypt';
import { Model, Schema, model } from 'mongoose';

interface IUserDocument extends User, Document {}
interface IUserModel extends Model<IUserDocument> {
  List(filter: { limit: number; skip: number; filter: object; sort: string }): Promise<void>;
  Login(user: User, password: string): Promise<boolean>;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'], required: true },
    status: { type: Number, default: 0 },
  },
  { collection: 'users', timestamps: true },
);

UserSchema.pre('save', function (next) {
  const rounds = 10;
  if (!this.isModified('password')) return next();
  return bcrypt.hash(this.password, rounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

UserSchema.statics.List = async function ({ skip = 0, limit = 500, sort = { createdAt: -1 }, filter = {} }) {
  const data = await this.find(filter, { createdAt: 0, updatedAt: 0, password: 0, __v: 0 })
    .sort(sort)
    .skip(+skip)
    .limit(+limit)
    .exec();
  const count = await this.find(filter).count();
  return { data, count, limit, skip };
};

UserSchema.statics.Login = async function (user, password) {
  return await bcrypt.compare(password, user.password);
};

export default model<IUserDocument, IUserModel>('User', UserSchema);
