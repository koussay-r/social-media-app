import React from 'react'
import { useSelector } from 'react-redux';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';

export default function PostLoader() {
  const state=useSelector((state)=>state.user.value)
  return (
    <Card
    variant="outlined"
      sx={{ width: 'full',height:300,padding:3,marginTop:4, backgroundColor:state.nightDayMode===true?"#242526":"white",borderColor:state.nightDayMode===true?"#242526":"white", borderRadius: 6, '--Card-radius': 6 }}
    >
      <CardContent orientation="horizontal">
        <Skeleton animation="wave"  variant="rectangular" width={44} height={44} />
        <div>
          <Skeleton animation="wave"  variant="text" width={100} />
          <Skeleton animation="wave"  level="body-sm" variant="text" width={200} />
        </div>
      </CardContent>
      <CardContent sx={{ gap: 0.5, mt: 1 }}>
        <Skeleton level="body-xs" animation="wave"  variant="text" width="92%" />
        <Skeleton level="body-xs" animation="wave"  variant="text" width="99%" />
        <Skeleton level="body-xs" animation="wave"  variant="text" width="96%" />
      </CardContent>
    </Card>
  );
}