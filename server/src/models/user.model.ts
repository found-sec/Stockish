import { Document, Schema, model } from "mongoose";
import { ITransaction, TransactionSchema } from "./transaction.model";
import { IPosition, PositionSchema } from "./position.model";

export interface IUser extends Document {
	email: string;
	username: string;
	password: string;
	watchlist: string[];
	ledger: ITransaction[];
	positions: IPosition[];
	cash: number;
	_doc: any;
	_id: string;
	
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		index: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	watchlist: [String],
	ledger: [TransactionSchema],
	positions: [PositionSchema],
	cash: Number,
}, {

});

const User = model<IUser>("User", userSchema);

export default User;