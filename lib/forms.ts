import forms from "../posts/formFields.json";

export async function getFormData(id) {
  const formsData = forms.forms;

  const form = formsData.filter((formData) => {
    return formData.id == id;
  });

  // if dont have, should return default form

  return {
    ...form[0],
  };
}
