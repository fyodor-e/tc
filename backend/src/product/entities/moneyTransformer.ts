export default class MoneyTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data.replace(/[^0-9.]/gi, ''));
  }
}
