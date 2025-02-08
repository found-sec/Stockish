import { Document, Schema, model } from "mongoose";
import { ITransaction, TransactionSchema } from "./transaction.model";
import { IPosition, PositionSchema } from "./position.model";
import { IPortfolio, PortfolioSchema } from "./portfolio.model"; // Import Portfolio Schema

export interface IUser extends Document {
	email: string;
	username: string;
	password: string;
	watchlist: string[];
	ledger: ITransaction[];
	positions: IPosition[];
	portfolios: IPortfolio[]; // Add portfolios array
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
	portfolios: [PortfolioSchema], // Store portfolio history
	cash: Number,
});

const User = model<IUser>("User", userSchema);

export default User;
