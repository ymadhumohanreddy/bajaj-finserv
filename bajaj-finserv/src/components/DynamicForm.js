import React, { useState } from "react";
import FormSection from "./FormSection";
import "./DynamicForm.css";

const DynamicForm = ({ form }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleNext = (sectionId, sectionData, sectionErrors) => {
    if (Object.keys(sectionErrors).length === 0) {
      setFormValues((prev) => ({ ...prev, [sectionId]: sectionData }));
      setErrors({});
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      setErrors(sectionErrors);
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = (sectionId, sectionData, sectionErrors) => {
    if (Object.keys(sectionErrors).length === 0) {
      const finalData = { ...formValues, [sectionId]: sectionData };
      console.log("Form Submitted:", finalData);
      alert("Form Submitted Successfully! Check console for data.");
    } else {
      setErrors(sectionErrors);
    }
  };

  const currentSection = form.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === form.sections.length - 1;

  return (
    <div className="dynamic-form-container">
      <h2>{form.formTitle}</h2>
      <FormSection
        section={currentSection}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
        showPrev={currentSectionIndex > 0}
        isLastSection={isLastSection}
      />
    </div>
  );
};

export default DynamicForm;
