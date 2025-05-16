import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  Paper
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CourseCard from "./CourseCard";
import Chip from '@mui/material/Chip';
const CourseList = ({ courses }) => {
  const [instructorFilter, setInstructorFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredCourses = courses.filter(course => {
    const matchesInstructor = course.instructor.toLowerCase().includes(instructorFilter.toLowerCase());
    const matchesMinPrice = minPrice === "" || course.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || course.price <= Number(maxPrice);
    
    return matchesInstructor && matchesMinPrice && matchesMaxPrice;
  });

  const resetFilters = () => {
    setInstructorFilter("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Course Catalog
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={handleClick}
          sx={{
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' }
          }}
        >
          Filter By
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 350,
              p: 2,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
          <Typography variant="h6" sx={{ p: 1 }}>Filter Options</Typography>
          <Divider sx={{ my: 1 }} />
          
          <MenuItem disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                By Instructor
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search instructor..."
                value={instructorFilter}
                onChange={(e) => setInstructorFilter(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          </MenuItem>
          
          <MenuItem disableRipple sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                By Price Range
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  size="small"
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0 }
                  }}
                  sx={{ flex: 1 }}
                />
                <Typography variant="body2">to</Typography>
                <TextField
                  size="small"
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: minPrice || 0 }
                  }}
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>
          </MenuItem>
          
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={resetFilters} size="small">
              Reset
            </Button>
            <Button 
              onClick={handleClose} 
              variant="contained" 
              size="small"
              sx={{ backgroundColor: '#3f51b5' }}
            >
              Apply
            </Button>
          </Box>
        </Menu>
      </Box>

      {/* Active Filters Indicator */}
      {(instructorFilter || minPrice || maxPrice) && (
        <Paper elevation={0} sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: '#f5f5f5',
          borderRadius: 2
        }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {instructorFilter && (
              <Chip 
                label={`Instructor: ${instructorFilter}`} 
                onDelete={() => setInstructorFilter("")}
                size="small"
              />
            )}
            {minPrice && (
              <Chip 
                label={`Min Price: $${minPrice}`} 
                onDelete={() => setMinPrice("")}
                size="small"
              />
            )}
            {maxPrice && (
              <Chip 
                label={`Max Price: $${maxPrice}`} 
                onDelete={() => setMaxPrice("")}
                size="small"
              />
            )}
          </Box>
        </Paper>
      )}

      {/* Results Count */}
      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
        Showing {filteredCourses.length} of {courses.length} courses
      </Typography>

      {/* Courses Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          border: '1px dashed #ddd',
          borderRadius: 2,
          mt: 3
        }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No courses found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CourseList;