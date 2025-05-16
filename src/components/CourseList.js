import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Course Catalog
      </Typography>
      <Grid container spacing={3} >
        {courses.map((course) => (
          <Grid
            item
            key={course.id}
            xs={12} // عمود واحد على الشاشات الصغيرة جدًا
            sm={6} // عمودين على الشاشات الصغيرة
            md={4} // ثلاثة أعمدة على الشاشات المتوسطة
            lg={3} // أربعة أعمدة على الشاشات الكبيرة
            xl={3} // أربعة أعمدة على الشاشات الكبيرة جدًا
            sx={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
