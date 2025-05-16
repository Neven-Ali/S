import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Rating,
  Stack,
  Box,
} from "@mui/material";
import { ShoppingCart, Star } from "@mui/icons-material";

const CourseCard = ({ course }) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
        minWidth: 280, // عرض أدنى ثابت
        maxWidth: 280, // عرض أقصى ثابت (نفس العرض الأدنى)
      }}
    >
      {/* حاوية الصورة مع حل نهائي لمشكلة الأبعاد */}
      <Box
        sx={{
          width: "100%",
          height: 0,
          paddingTop: "56.25%", // نسبة 16:9
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          component="img"
          src={course.image || "/default-course-image.jpg"}
          alt={course.title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3em", // ارتفاع ثابت لعنوانين
          }}
        >
          {course.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Instructor: {course.instructor}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            name="read-only"
            value={course.rating || 0}
            precision={0.5}
            readOnly
            size="small"
            emptyIcon={<Star fontSize="inherit" />}
          />
          <Typography variant="body2" color="text.secondary">
            ({course.reviews || 0})
          </Typography>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between",
          px: 2,
          pb: 2,
          pt: 0,
        }}
      >
        <Chip label={`$${course.price}`} color="primary" variant="outlined" />
        <Button
          variant="contained"
          size="small"
          startIcon={<ShoppingCart />}
          sx={{ borderRadius: 2 }}
        >
          Enroll Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
