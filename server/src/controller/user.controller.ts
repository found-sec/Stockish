import Position, { IPosition } from "../models/position.model";
import User, { IUser } from "../models/user.model";
import { Request, Response } from "express";
import { fetchStockData } from "../utils/requests";

const getLedger = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['User Data']
	*/
	User.findById(req.body.userId)
		.then((user) => {
			res.status(200).json({ ledger: user!.ledger });
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

const getHoldings = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['User Data']
	*/
	User.findById(req.body.userId)
		.then((user) => {
			res.status(200).json({ positions: user!.positions, cash: user!.cash });
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

const getPortfolio = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findById(req.body.userId).lean();
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }

  // separate positions by asset type
  const positionsByType = user.positions.reduce((acc, position) => {
    const type = position.symbol.startsWith('CRYPTO:') || position.symbol.includes('-USD') ? 'crypto' : 'stock';
    if (!acc[type]) acc[type] = [];
    acc[type].push(position);
    return acc;
  }, {} as Record<string, IPosition[]>);

  let portfolioValue = user.cash || 0;
  let portfolioPrevCloseValue = user.cash || 0;
  const listOfPositions: any[] = [];

  // process each asset type separately
  for (const [assetType, positions] of Object.entries(positionsByType)) {
    const symbolQuantities = positions.reduce((acc, pos) => {
      acc[pos.symbol] = (acc[pos.symbol] || 0) + pos.quantity;
      return acc;
    }, {} as Record<string, number>);

    const quotes = await Promise.all(
      Object.keys(symbolQuantities).map(symbol => fetchStockData(symbol))
    );

    quotes.forEach(quote => {
      const quantity = symbolQuantities[quote.symbol];
      portfolioValue += quote.regularMarketPrice * quantity;
      portfolioPrevCloseValue += quote.regularMarketPreviousClose * quantity;

      positions
        .filter(pos => pos.symbol === quote.symbol)
        .forEach(position => {
          listOfPositions.push({
            ...position,
            ...quote,
            assetType
          });
        });
    });
  }

  res.status(200).json({
    portfolioValue,
    portfolioPrevCloseValue,
    positions: listOfPositions,
    cash: user.cash,
  });
};

const getWatchlist = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['User Watchlist']
	*/
	User.findById(req.body.userId)
		.then((user) => {
			if (req.body.raw === "true") {
				res.status(200).json({ watchlist: user!.watchlist });
			} else {
				// Get the current price of each stock in the watchlist
				Promise.all(user!.watchlist.map((symbol) => fetchStockData(symbol)))
					.then((values) => {
						res.status(200).json({ watchlist: values });
					})
					.catch((err) => {
						res.status(500).send({ message: err.message });
					});
			}
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

const addToWatchlist = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['User Watchlist']
	*/
	User.findById(req.body.userId)
		.then((user) => {
			if (user!.watchlist.includes(req.params.symbol)) {
				res.status(400).json({ message: "Already in watchlist" });
			} else {
				user!.watchlist.push(req.params.symbol);
				user!.save();
				res.status(200).json({ message: "Added to watchlist" });
			}
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

const removeFromWatchlist = (req: Request, res: Response) => {
	/* 
	#swagger.tags = ['User Watchlist']
	*/
	User.findById(req.body.userId)
		.then((user) => {
			if (user!.watchlist.includes(req.params.symbol)) {
				user!.watchlist = user!.watchlist.filter(
					(symbol) => symbol !== req.params.symbol,
				);
				user!.save();
				res.status(200).json({ message: "Removed from watchlist" });
			} else {
				res.status(400).json({ message: "Not in watchlist" });
			}
		})
		.catch((err: { message: any }) => {
			res.status(500).send({ message: err.message });
		});
};

export default {
	getLedger,
	getHoldings,
	getPortfolio,
	// Watchlist routes
	getWatchlist,
	addToWatchlist,
	removeFromWatchlist,
};
