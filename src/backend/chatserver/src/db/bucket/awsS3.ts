import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

const listTables = async (): Promise<void> => {
  const dbclient = new DynamoDBClient({ region: "asia/seoul" });

  try {
    const results = await dbclient.send(new ListTablesCommand({}));
    results.TableNames?.forEach((tableName: string) => {
      console.log(tableName);
    });
  } catch (err) {
    console.error(err);
  }
};

listTables();