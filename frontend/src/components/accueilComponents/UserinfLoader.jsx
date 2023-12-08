import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import { useSelector } from 'react-redux';

export default function UserinfoLoader() {
  const state=useSelector((state)=>state.user.value)
  return (
    <Stack spacing={2} useFlexGap>
      <Card variant="outlined" sx={{ width: 343,backgroundColor:state.nightDayMode===true?"#242526":"white",borderColor:state.nightDayMode===true?"#242526":"white" }}>
        <CardContent orientation="horizontal">
          <Skeleton animation="wave" variant="circular" width={48} height={48} />
          <div>
            <Skeleton animation="wave" variant="text" sx={{ width: 120 }} />
            <Skeleton
              animation="wave"
              variant="text"
              level="body-sm"
              sx={{ width: 200 }}
            />
          </div>
        </CardContent>
        <AspectRatio ratio="21/9">
          <Skeleton animation="wave" variant="overlay">
            <img
              alt=""
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            />
          </Skeleton>
        </AspectRatio>
        <Typography sx={{ overflow: 'hidden' }}>
          <Skeleton animation="wave">
            Lorem ipsum is placeholder text commonly used in the graphic, print, and
            publishing industries.
          </Skeleton>
        </Typography>
        <Button>
          Read more
          <Skeleton animation="wave" />
        </Button>
      </Card>
    </Stack>
  );
}