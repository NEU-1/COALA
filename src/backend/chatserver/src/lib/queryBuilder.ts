export function buildSchema(data: any) {
  const keys = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).fill('?').join(', ');
  const values = Object.values(data);

  return {
    keys : `(${keys})`,
    placeholders : `(${placeholders})`,
    values : values || []
  }
}