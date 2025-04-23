import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import BodyPart from './BodyPart';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="left-arrow" style={{ 
        cursor: 'pointer',
        width: '25px',
        height: '25px',
        margin: '0 10px'
      }} />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" style={{ 
        cursor: 'pointer',
        width: '25px',
        height: '25px',
        margin: '0 10px'
      }} />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {
  if (!data || !Array.isArray(data)) {
    console.error('Invalid data prop:', data);
    return null;
  }

  return (
    <ScrollMenu 
      LeftArrow={LeftArrow} 
      RightArrow={RightArrow}
      options={{
        ratio: 0.3,
        rootMargin: '5px',
        threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
      }}
    >
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
          sx={{
            minWidth: '270px',
            minHeight: '280px',
            margin: '0 20px'
          }}
        >
          <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;