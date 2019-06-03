export interface RecordsEvent {

  type: string;
  amount: number;
  category: number;
  date: string;
  description: string;
  id?: number;
  catName?: string;
}
