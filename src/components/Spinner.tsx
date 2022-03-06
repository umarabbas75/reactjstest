import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
interface Props {
    color? :  "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | undefined
    size? : number
}
const  CircularIndeterminate = ({color,size} : Props) =>{
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress color={color} size={size} />
    </Box>
  );
}

export default CircularIndeterminate