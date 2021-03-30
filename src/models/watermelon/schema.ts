import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'simulation_data',
      columns: [
        {name: '_id', type: 'string'},
        {name: 'number', type: 'string', isOptional: true},
        {name: 'string', type: 'string'},
        {name: 'date', type: 'boolean'},
        {name: 'simulation2_id', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'simulation_data2',
      columns: [
        {name: '_id', type: 'string'},
        {name: 'name', type: 'string'},
      ],
    }),
  ],
});
