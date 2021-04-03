import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'simulation_data',
      columns: [
        {name: 'test', type: 'number', isOptional: true},
        {name: 'number', type: 'string', isOptional: true},
        {name: 'string', type: 'string'},
        {name: 'timestamp', type: 'string'},
        {name: 'simulation2_id', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'simulation_data2',
      columns: [
        {name: 'test', type: 'number', isOptional: true},
        {name: 'name', type: 'string'},
      ],
    }),
  ],
});
