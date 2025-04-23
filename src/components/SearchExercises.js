import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography, CircularProgress } from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setLoading(true);
        setError(null);
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        if (Array.isArray(bodyPartsData)) {
          setBodyParts(['all', ...bodyPartsData]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching body parts:', err);
        setError('Failed to load exercise categories. Please try again later.');
        setBodyParts(['all']); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        setLoading(true);
        setError(null);
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

        if (!Array.isArray(exercisesData)) {
          throw new Error('Invalid response format from API');
        }

        const searchTerm = search.toLowerCase();
        const searchedExercises = exercisesData.filter((item) => {
          const name = (item.name || '').toLowerCase();
          const target = (item.target || '').toLowerCase();
          const equipment = (item.equipment || '').toLowerCase();
          const bodyPart = (item.bodyPart || '').toLowerCase();
          
          return name.includes(searchTerm) ||
                 target.includes(searchTerm) ||
                 equipment.includes(searchTerm) ||
                 bodyPart.includes(searchTerm);
        });

        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
        setSearch('');
        setExercises(searchedExercises);
      } catch (err) {
        console.error('Error searching exercises:', err);
        setError('Failed to search exercises. Please try again later.');
        setExercises([]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ 
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, 
            width: { lg: '1170px', xs: '350px' }, 
            backgroundColor: '#fff', 
            borderRadius: '40px' 
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
          type="text"
          disabled={loading}
          error={!!error}
          helperText={error}
        />
        <Button 
          className="search-btn" 
          sx={{ 
            bgcolor: '#FF2625', 
            color: '#fff', 
            textTransform: 'none', 
            width: { lg: '173px', xs: '80px' }, 
            height: '56px', 
            position: 'absolute', 
            right: '0px', 
            fontSize: { lg: '20px', xs: '14px' },
            '&:disabled': {
              bgcolor: '#ccc'
            }
          }} 
          onClick={handleSearch}
          disabled={loading || !search.trim()}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">{error}</Typography>
        ) : (
          <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
        )}
      </Box>
    </Stack>
  );
};

export default SearchExercises;