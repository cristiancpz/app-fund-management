import { notificationsTypes } from "../../features/funds/const/subscription.const";
import { IFund } from "../../features/funds/interfaces/fund.interface";
import { transactionType } from "../consts/state.const";

export interface IActiveFund {
  id: string;
  fund: IFund;
  amount: number;
  notification: notificationsTypes,
  dateAt: string;
}

export interface ITransaction {
  id: string;
  type: transactionType;
  fund: string;
  amount: number;
  notification: notificationsTypes;
  date: string;
}
