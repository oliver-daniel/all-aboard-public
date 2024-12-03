import styles from "./styles.module.scss";

type FormState = {
  "contact.name": string;
  "contact.email": string;
  "contact.phone": string;

  "patient.name": string;
  "patient.dob": string;

  message?: string;
};

type Field = {
  props: Partial<React.HTMLProps<HTMLInputElement>>;
};

const FIELDSETS: Array<{
  [key in keyof FormState]?: Field;
}> = [
  {
    "contact.name": {
      props: {
        placeholder: "Contact name",
        autoComplete: "name",
        required: true,
      },
    },
    "contact.email": {
      props: {
        type: "email",
        placeholder: "Email",
        autoComplete: "email",
        required: true,
      },
    },
    "contact.phone": {
      props: {
        type: "phone",
        placeholder: "Phone",
        autoComplete: "tel",
        required: true,
      },
    },
    "patient.name": {
      props: {
        type: "text",
        placeholder: "Patient name",
        required: true,
      },
    },
    "patient.dob": {
      props: {
        type: "date",
        placeholder: "Date of birth",
        required: true,
      },
    },
    message: {
      props: {
        type: "textarea",
        placeholder: "Add a message (optional)",
      },
    },
  },
];

const renderField = ({ props }: Field, key: string) =>
  props.type === "textarea" ? (
    <textarea
      key={key}
      rows={4}
      {...(props as React.HTMLProps<HTMLTextAreaElement>)}
    />
  ) : props.type === "date" ? (
    <label>
      <input aria-describedby={`${props.name}-label`} key={key} {...props} />
      <small id={`${props.name}-label`}>{props.placeholder}</small>
    </label>
  ) : (
    <input key={key} {...props} />
  );

export const ContactForm = () => {
  const disabled = false;
  return (
    <form className={styles.contactForm}>
      <input type="text" name="_honey" style={{ display: "none" }} />
      {FIELDSETS.map((fs, i) => (
        <fieldset disabled={disabled} key={`fieldset-${i}`}>
          {Object.entries(fs).map(([name, props]) =>
            renderField(props, `field-${name}`)
          )}
        </fieldset>
      ))}
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};
