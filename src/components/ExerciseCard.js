import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  if (!exercise) return null;

  return (
    <Link 
      className="exercise-card" 
      to={`/exercise/${exercise.id}`}
      style={{ 
        textDecoration: 'none',
        width: '280px',
        height: '460px',
        background: '#fff',
        borderTop: '4px solid #FF2625',
        borderBottomLeftRadius: '20px',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '10px',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease-in-out'
        }
      }}
    >
      <img 
        src={exercise.gifUrl} 
        alt={exercise.name} 
        loading="lazy" 
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'cover',
          borderRadius: '4px'
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/280x280?text=Exercise+Image';
        }}
      />
      <Stack direction="row" gap={2} mt={2}>
        <Button 
          sx={{ 
            ml: '21px', 
            color: '#fff', 
            background: '#FFA9A9', 
            fontSize: '14px', 
            borderRadius: '20px', 
            textTransform: 'capitalize',
            '&:hover': { background: '#FF9999' }
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button 
          sx={{ 
            ml: '21px', 
            color: '#fff', 
            background: '#FCC757', 
            fontSize: '14px', 
            borderRadius: '20px', 
            textTransform: 'capitalize',
            '&:hover': { background: '#FFB700' }
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography 
        ml="21px" 
        color="#000" 
        fontWeight="bold" 
        mt="11px" 
        pb="10px" 
        textTransform="capitalize"
        sx={{ 
          fontSize: { lg: '22px', xs: '20px' },
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;