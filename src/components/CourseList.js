import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  Chip,
  Paper,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CourseCard from "./CourseCard";
import { useEnrollments } from "./EnrollmentContext";
import DeleteIcon from "@mui/icons-material/Delete";

const CourseList = ({ courses }) => {
  const [instructorFilter, setInstructorFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [enrollmentsOpen, setEnrollmentsOpen] = useState(false);
  const {
    enrollments,
    addToEnrollments,
    removeFromEnrollments,
    totalPrice,
    setEnrollments,
  } = useEnrollments();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearAllEnrollments = () => {
    if (window.confirm("Are you sure you want to clear all enrollments?")) {
      if (setEnrollments) {
        setEnrollments([]);
      } else {
        console.error("setEnrollments is not available");
      }
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesInstructor = course.instructor
      .toLowerCase()
      .includes(instructorFilter.toLowerCase());
    const matchesMinPrice = minPrice === "" || course.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === "" || course.price <= Number(maxPrice);

    return (
      matchesSearch && matchesInstructor && matchesMinPrice && matchesMaxPrice
    );
  });

  const resetFilters = () => {
    setInstructorFilter("");
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
    handleClose();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Shopping Cart Button */}
      <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
        <Badge
          badgeContent={enrollments.length}
          color="success"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              right: 5,
              top: 5,
              border: `2px solid white`,
              padding: "0 4px",
            },
          }}
        >
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={() => setEnrollmentsOpen(true)}
            sx={{
              borderRadius: "50px",
              padding: "12px 24px",
              boxShadow: 3,
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
            }}
          >
            My Enrollments
          </Button>
        </Badge>
      </Box>

      {/* Header with Search and Filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Course Catalog
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />

          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={handleClick}
            sx={{
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Filter By
          </Button>
        </Box>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            p: 2,
            width: 300,
          },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
          Filter Options
        </Typography>

        <TextField
          label="Instructor Name"
          variant="outlined"
          size="small"
          fullWidth
          value={instructorFilter}
          onChange={(e) => setInstructorFilter(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Min Price"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={resetFilters} color="error">
            Reset All
          </Button>
          <Button onClick={handleClose} variant="contained">
            Apply
          </Button>
        </Box>
      </Menu>

      {/* Active Filters Indicator */}
      {(instructorFilter || minPrice || maxPrice || searchQuery) && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            overflowX: { xs: "auto", sm: "visible" },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Active Filters:
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              minWidth: { xs: "max-content", sm: "auto" },
            }}
          >
            {searchQuery && (
              <Chip
                label={`Search: ${searchQuery}`}
                onDelete={() => setSearchQuery("")}
                size="small"
              />
            )}
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
      <Typography variant="subtitle1" sx={{ mb: 2, color: "text.secondary" }}>
        Showing {filteredCourses.length} of {courses.length} courses
      </Typography>

      {/* Courses Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            border: "1px dashed #ddd",
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No courses found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search criteria
          </Typography>
        </Box>
      )}

      {/* Enrollments Drawer */}
      <Drawer
        anchor="right"
        open={enrollmentsOpen}
        onClose={() => setEnrollmentsOpen(false)}
      >
        <Box sx={{ width: { xs: "100%", sm: 350 }, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">My Enrollments</Typography>
            <Box>
              <IconButton
                onClick={clearAllEnrollments}
                disabled={enrollments.length === 0}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => setEnrollmentsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {enrollments.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 4 }}
            >
              Your enrollment cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {enrollments.map((course) => (
                  <ListItem key={course.id} divider>
                    <ListItemText
                      primary={course.title}
                      secondary={`$${course.price}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeFromEnrollments(course.id)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total: ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => alert("Proceeding to checkout...")}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </Container>
  );
};

export default CourseList;
