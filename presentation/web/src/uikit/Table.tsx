import {
  Table as HeroUiTable,
  TableProps as HeroUiTableProps,
} from '@heroui/table';

export {
  getKeyValue,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table';

type TableProps = HeroUiTableProps;

export const Table = (props: TableProps) => {
  return <HeroUiTable {...props} />;
};
