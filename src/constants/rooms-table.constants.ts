import { QTableColumn } from 'quasar';

export interface ITableColumn {
    name?: string;
    required?: true;
    label?: string;
    align?: string;
    sortable?: boolean;
}

export const TABLE_COLUMNS: QTableColumn[] = [
  {
    name: 'title',
    label: 'Title',
    align: 'left',
    field: 'title',
  },
  {
    name: 'records',
    label: 'Records',
    align: 'left',
    field: 'records',
  },
  {
    name: 'time',
    label: 'Time',
    align: 'left',
    field: 'time',
  },
  {
    name: 'lastUsed',
    label: 'Last used',
    align: 'left',
    field: 'lastUsed',
  },
  {
    name: 'lastStory',
    label: 'Last story',
    align: 'left',
    field: 'lastStory',
  },
  {
    name: 'totalPoints',
    label: 'Total points',
    align: 'left',
    field: 'totalPoints',
  },
  {
    name: 'actions',
    label: '',
    align: 'left',
    field: '',
  },
];
