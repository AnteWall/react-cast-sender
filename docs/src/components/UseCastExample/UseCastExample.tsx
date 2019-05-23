import React from 'react';
import { useCast } from 'react-cast-sender';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const UseCastExample = () => {
  const { initialized, connected, deviceName } = useCast();

  return (
    <>
      <Typography gutterBottom variant="h5">
        useCast
      </Typography>
      <Grid container spacing={16}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    initialized
                  </TableCell>
                  <TableCell align="right">{String(initialized)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    connected
                  </TableCell>
                  <TableCell align="right">{String(connected)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    deviceName
                  </TableCell>
                  <TableCell align="right">{deviceName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UseCastExample;
