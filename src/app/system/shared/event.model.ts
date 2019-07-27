export interface RecordsEvent {
  type: string;
  amount: number;
  category: number;
  date: Date;
  description: string;
  id?: number;
  catName?: string;
}
