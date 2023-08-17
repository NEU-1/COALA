export function buildSchema(data: object) {
  const keys = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).fill('?').join(', ');
  const values = Object.values(data);

  return {
    keys : `(${keys})`,
    placeholders : `(${placeholders})`,
    values : values || []
  }
}

export function buildConditionQuery(data : Record<string, any>, condition : string) {
  let conditionQuery = '';
  let values = [];
  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
      if (i !== 0) {
          conditionQuery += condition;
      }
      conditionQuery += '?? = ?';
      values.push(keys[i], data[keys[i]]);
  }

  return {
      conditionQuery,
      values
  };
}