export interface Ticket {
  id: number;
  sellerName: string;
  buyerName: string | null;
  code: string;
  used: boolean;
  price: number;
  purchaseDate?: Date | null;
  apiTransactionId?: string | null;
  userId: number;
}
