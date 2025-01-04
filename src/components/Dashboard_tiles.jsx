import React from 'react';
import { Grid, Box } from '@mui/material';
import SpiderGraph from './SpiderGraph';
import DonutCharts from "../charts/DonutCharts"
import ParameterizedLine from '../charts/ParameterizedLine';
const Dashboard_tiles = () => {
  return (
    <Grid container spacing={2}>
      {/* First Row: 2 Boxes */}
      <Grid item xs={6}>
        <Box sx={{ height: 260, border: '1px solid black', borderRadius: '7px' , background:'#ddd' }}>
          Logs
        {/* <SpiderGraph/> */}
        {/* <DonutCharts/> */}
          </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ height: 260, border: '1px solid black', borderRadius: '7px' , background:'#ddd' }}>
          Graphs
          {/* <ParameterizedLine/> */}
          </Box>
      </Grid>

      {/* Second Row: 2 Boxes */}
      <Grid item xs={6}>
        <Box sx={{ height: 260, border: '1px solid black', borderRadius: '7px' , background:'#ddd'}}>Studies</Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ height: 260, border: '1px solid black', borderRadius: '7px', background:'#ddd' }}>Datasets</Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard_tiles;
