import styles from "./flexiform.module.css";

export default function FlexiForm({
  formFieldsData,
}: {
  formFieldsData: {
    id: string;
    fields: {
      htmlTags: string;
      label: string;
      type: string;
      id: string;
      required: boolean;
      options: {
        value: string;
        label: string;
      }[];
      name: string;
    }[];
    action: string;
    method: string;
    button: {
      type: "submit" | "button" | "reset";
      text: string;
    };
  };
}) {
  return (
    <div className={styles.container}>
      <form action={formFieldsData.action} method={formFieldsData.method}>
        {formFieldsData.fields.map((field) => {
          if (field.htmlTags === "input") {
            return (
              <div key={field.id}>
                <label>{field.label}</label>
                <br />
                <input
                  className={styles.input}
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  required={field.required}
                />
                <br />
              </div>
            );
          } else if (field.htmlTags == "textarea") {
            return (
              <div key={field.id}>
                <label>{field.label}</label>
                <br />
                <textarea
                  className={styles.textarea}
                  rows={5}
                  id={field.id}
                  name={field.name}
                  required={field.required}
                />
                <br />
              </div>
            );
          } else if (field.htmlTags == "select") {
            return (
              <div>
                <label>{field.label}</label>
                <br />
                <select
                  className={styles.select}
                  name={field.name}
                  id={field.id}
                  required={field.required}
                >
                  {field.options.map((option) => {
                    return (
                      <option id={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          }
        })}
        <button type={formFieldsData.button.type}>
          {formFieldsData.button.text}
        </button>
      </form>
    </div>
  );
}
