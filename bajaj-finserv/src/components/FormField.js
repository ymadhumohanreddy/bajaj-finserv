import React from "react";
import "./FormField.css";

const FormField = ({ field, value, onChange, error }) => {
  const handleChange = (e) => {
    const { type, checked, value } = e.target;
    onChange(field.fieldId, type === "checkbox" ? checked : value);
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "tel":
      case "email":
      case "date":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={handleChange}
            data-testid={field.dataTestId}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            value={value}
            onChange={handleChange}
            data-testid={field.dataTestId}
          ></textarea>
        );
      case "dropdown":
        return (
          <select
            value={value}
            onChange={handleChange}
            data-testid={field.dataTestId}
          >
            <option value="">Select...</option>
            {field.options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="radio-group">
            {field.options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  data-testid={option.dataTestId}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={handleChange}
            data-testid={field.dataTestId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      <label>
        {field.label}
        {field.required && <span className="required">*</span>}
      </label>
      {renderField()}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default FormField;
