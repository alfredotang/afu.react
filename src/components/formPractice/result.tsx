import type { FC } from 'react';
import {
  Dialog,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  Paper,
} from '@material-ui/core';

export interface IResultData {
  name: string;
  value: any;
  type: string;
}

type ResultProps = {
  open: boolean;
  data: IResultData[];
  onClose: () => void;
};
const Result: FC<ResultProps> = ({ open, data, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Paper>
        {data?.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>value</TableCell>
                <TableCell>type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {/* type 為 boolean 時，可以顯示 'true' or 'false' */}
                    {item.type === 'boolean'
                      ? item.value.toString()
                      : item.value}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Dialog>
  );
};

export default Result;
