import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, CircularProgress, Alert } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const exercisesPerPage = 9;

  const handlePagination = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setLoading(true);
        setError(null);
        let exercisesData = [];

        if (bodyPart === 'all') {
          exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        } else {
          exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        }

        if (!Array.isArray(exercisesData)) {
          throw new Error('Invalid response format from API');
        }

        setExercises(exercisesData);
        setCurrentPage(1); // Reset to first page when changing body part
      } catch (err) {
        console.error('Error fetching exercises:', err);
        setError('Failed to load exercises. Please try again later.');
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="error" sx={{ width: '80%', maxWidth: '600px' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box id="exercises"
      sx={{
        mt: { lg: '110px' }
      }}
      mt="50px"
      p="20px"
    >
      <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
        {exercises.length ? 'Showing Results' : 'No exercises found'}
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={`${exercise.id}-${index}`} exercise={exercise} />
        ))}
      </Stack>
      {exercises.length > 0 && (
        <Stack mt="100px" alignItems="center">
          {exercises.length > exercisesPerPage && (
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(exercises.length / exercisesPerPage)}
              page={currentPage}
              onChange={handlePagination}
              size="large"
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Exercises;