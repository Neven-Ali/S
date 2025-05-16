import React, { createContext, useState, useEffect, useContext } from "react";

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  // تحميل البيانات من localStorage عند التهيئة
  const [enrollments, setEnrollments] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("enrolledCourses");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // حفظ البيانات في localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrollments));
  }, [enrollments]);

  const addToEnrollments = (course) => {
    setEnrollments((prev) => {
      if (!prev.some((item) => item.id === course.id)) {
        return [...prev, course];
      }
      return prev;
    });
  };

  const removeFromEnrollments = (courseId) => {
    setEnrollments((prev) => prev.filter((course) => course.id !== courseId));
  };

  const totalPrice = enrollments.reduce((sum, course) => sum + course.price, 0);

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        addToEnrollments,
        removeFromEnrollments,
        totalPrice,
        setEnrollments,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

// أهم جزء: تصدير الهوك المخصص للاستخدام
export const useEnrollments = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error(
      "useEnrollments must be used within an EnrollmentProvider"
    );
  }
  return context;
};

export default EnrollmentContext;