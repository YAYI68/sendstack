import { z } from "zod";

export const SplitSchema = z.object({
  ID: z.number({ required_error: "Pls input a number ID" }),
  Amount: z.number({ required_error: "Pls input amount in number" }),
  Currency: z.string({ required_error: "Pls provide a currency code" }),
  CustomerEmail: z.string({ required_error: "Email is required" }).email(),
  SplitInfo: z.array(
    z.object({
      SplitType: z.enum(["FLAT", "PERCENTAGE", "RATIO"]),
      SplitValue: z.number({ required_error: "SplitValue is Required" }),
      SplitEntityId: z.string({ required_error: "SplitEntity is required" }),
    })
  ),
});
