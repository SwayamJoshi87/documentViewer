import { sql } from "@vercel/postgres";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default async function Cart({
  params,
}: {
  params: { user: string };
}): Promise<JSX.Element> {
  // Get the names of all the user defined tables in the database
  const tablesResult = await sql`SELECT table_name FROM information_schema.tables;`;
  const tables = tablesResult.rows.map((row: any) => row.table_name);

  // Align the ScrollArea to the centre of the page and enlarge it
  return (
    <div className="flex justify-center items-center h-screen">
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tables.map((table: string) => (
            <React.Fragment key={table}>
              <div className="text-sm">{table}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}