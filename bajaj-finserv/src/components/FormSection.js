import React, { useState } from "react";
import FormField from "./FormField";
import "./FormSection.css";

const FormSection = ({
  section,
  onNext,
  onPrev,
  onSubmit,
  showPrev,
  isLastSection,
}) => {
  const [fieldsData, setFieldsData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setFieldsData((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: "" })); // Clear error on change
  };

  const validateFields = () => {
    const newErrors = {};

    section.fields.forEach((field) => {
      const value = fieldsData[field.fieldId] || "";

      if (field.required && !value) {
        newErrors[field.fieldId] = `${field.label} is required.`;
      }

      if (field.minLength && value.length < field.minLength) {
        newErrors[
          field.fieldId
        ] = `${field.label} must be at least ${field.minLength} characters.`;
      }

      if (field.maxLength && value.length > field.maxLength) {
        newErrors[
          field.fieldId
        ] = `${field.label} must be less than ${field.maxLength} characters.`;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateFields();
    onNext(section.sectionId, fieldsData, validationErrors);
  };

  const handleSubmit = () => {
    const validationErrors = validateFields();
    onSubmit(section.sectionId, fieldsData, validationErrors);
  };

  return (
    <div className="form-section-container">
      <h3>{section.title}</h3>
      <p>{section.description}</p>

      {section.fields.map((field) => (
        <FormField
          key={field.fieldId}
          field={field}
          value={fieldsData[field.fieldId] || ""}
          onChange={handleChange}
          error={errors[field.fieldId]}
        />
      ))}

      <div className="buttons">
        {showPrev && (
          <button onClick={onPrev} className="prev-button">
            Previous
          </button>
        )}
        {!isLastSection ? (
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default FormSection;
