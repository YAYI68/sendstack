import { tryCatch } from "../utils/helpers/tryCatch.js";
import { SplitSchema } from "../validators/splitValidator.js";
import { SplitTransactionModel } from "../models/splitTransaction.js";
import { getAllRate, getBalanceWithTransaction } from "../utils/index.js";
import CustomError from "../utils/error/CustomError.js";

export const splitCompute = tryCatch(async (req, res) => {
  const splitData = SplitSchema.parse(req.body);
  const { SplitInfo, Amount, ...rest } = splitData;

  if (SplitInfo.length > 20) {
    throw new CustomError(
      "Too many transaction,you can have (1 to 20 transaction request)",
      400
    );
  }

  const { flat, percentage, ratio } = getAllRate(SplitInfo);
  const { transactions, balance } = getBalanceWithTransaction(
    { flat, percentage, ratio },
    Amount
  );
  console.log({ balance });
  if (balance < 0) {
    throw new CustomError("Insuffient Fund", 400);
  }
  const split = await SplitTransactionModel.create({
    ...rest,
    Balance: balance,
    SplitBreakdown: [...transactions],
  });
  return res.status(200).json({ status: "success", data: split });
});
