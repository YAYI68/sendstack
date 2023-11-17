export const getAllRate = (SplitInfo) => {
  let flat = [];
  let percentage = [];
  let ratio = [];
  for (let split of SplitInfo) {
    if (split.SplitType === "FLAT") {
      flat.push(split);
    }
    if (split.SplitType === "PERCENTAGE") {
      percentage.push(split);
    }
    if (split.SplitType === "RATIO") {
      ratio.push(split);
    }
  }
  return { flat, percentage, ratio };
};

export const getBalanceWithTransaction = (
  { flat, percentage, ratio },
  Amount
) => {
  const allSplit = [];
  const flatBalance = flat.length
    ? flat.reduce((amount, flatSplit) => {
        allSplit.push({ ...flatSplit, Amount: flatSplit.SplitValue });
        return amount - flatSplit.SplitValue;
      }, Amount)
    : Amount;

  const percentageBalance = percentage.length
    ? percentage.reduce((amount, perSplit) => {
        let perAmount = (perSplit.SplitValue / 100) * amount;
        allSplit.push({ ...perSplit, Amount: perAmount });
        amount = amount - perAmount;
        return amount;
      }, flatBalance)
    : flatBalance;

  const totalRatio =
    ratio.length &&
    ratio.reduce((amount, perRatio) => amount + perRatio.SplitValue, 0);

  let allRatio = ratio.length
    ? ratio.map((perRatio) => {
        let perAmount = (perRatio.SplitValue / totalRatio) * percentageBalance;
        allSplit.push({ ...perRatio, Amount: perAmount });
        return perAmount;
      })
    : [];

  const ratioBalance = ratio.length
    ? allRatio.reduce((amount, ratio) => {
        let total = 0;
        if (amount < 0 || ratio < 0) {
          total = amount + ratio;
        } else {
          total = amount - ratio;
        }
        return total;
      }, percentageBalance)
    : percentageBalance;

  let finalBalance = ratioBalance;
  return { transactions: allSplit, balance: finalBalance };
};
