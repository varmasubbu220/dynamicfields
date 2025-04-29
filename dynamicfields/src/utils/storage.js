// utils/storage.js
export const saveForm = (form) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    forms.push({ ...form, id: Date.now() });
    localStorage.setItem("forms", JSON.stringify(forms));
  };
  
  export const getForms = () => {
    return JSON.parse(localStorage.getItem("forms") || "[]");
  };
  
  export const getFormById = (id) => {
    return getForms().find(f => f.id === id);
  };
  