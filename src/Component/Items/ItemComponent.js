import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  CardMedia
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getmenueDataAction } from '../../Redux/Action';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);



const ItemCard = ({ title, definition }) => {
  return (
    <Card sx={{ minWidth: 270,minHeight:250,maxHeight:250 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
        <CardMedia
        component="img"
        height="100"
        image="https://www.jeyashriskitchen.com/wp-content/uploads/2020/04/IMG_7861.jpg"
        alt="Paella dish"
      />
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{"Paratha"}</Typography>
        <Typography variant="body2">
          {"... is a shallow fried, unleavened flatbread, stuffed with a spicy potato filling."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

const ItemComponent = () => {
  const dispatch = useDispatch()
  const selectorData = useSelector((state) => state.user.data);
  const [menuDataState,setMenuDataState] = useState(JSON.stringify(selectorData.data)||[])
console.log(menuDataState,'selectorDataselectorData111');
  useEffect(()=>{
    dispatch(getmenueDataAction())
  
  },[])
  const items = [
    { title: `be${bull}nev${bull}o${bull}lent`, definition: "well meaning and kindly." },
    { title: `gen${bull}er${bull}ous`, definition: "showing a readiness to give more of something, as money or time, than is strictly necessary or expected." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    { title: `am${bull}bi${bull}valent`, definition: "having mixed feelings or contradictory ideas about something or someone." },
    // You can add more items here
  ];

  // const items = menuDataState;

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} padding={"2px"}>
          <ItemCard  />
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemComponent;
