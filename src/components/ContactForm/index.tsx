import { FormState, FormValues, useContactForm } from "@/lib/contact";
import clsx from "clsx";
import styles from "./styles.module.scss";

type Field = {
  props: Partial<React.HTMLProps<HTMLInputElement>>;
};

const FIELDSETS: Array<{
  [key in keyof FormValues]?: Field;
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

const renderField = ({ name, props }: Field & { name: string }, key: string) =>
  props.type === "textarea" ? (
    <textarea
      name={name}
      key={key}
      rows={4}
      {...(props as React.HTMLProps<HTMLTextAreaElement>)}
    />
  ) : props.type === "date" ? (
    <label>
      <input
        name={name}
        aria-describedby={`${name}-label`}
        key={key}
        {...props}
      />
      <small id={`${name}-label`}>{props.placeholder}</small>
    </label>
  ) : (
    <input name={name} key={key} {...props} />
  );

type Props = {
  disabledMessage?: React.ReactNode;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
};

const BottomContent = ({
  state,
  ...messages
}: Props & { state: FormState }) => {
  switch (state.state) {
    case "default":
      return null;
    case "disabled":
      return <small>{messages.disabledMessage}</small>;
    case "submitting":
      return <progress />;
    default:
      return (
        <small className={clsx(styles.result, styles[state.state])}>
          {messages[`${state.state}Message` as keyof typeof messages]}
        </small>
      );
  }
};

export const ContactForm = ({ ...messages }: Props) => {
  const { state, handleSubmit } = useContactForm();
  const disabled = ["disabled", "submitting"].includes(state.state);

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input type="text" name="_honey" style={{ display: "none" }} />
      {FIELDSETS.map((fs, i) => (
        <fieldset disabled={disabled} key={`fieldset-${i}`}>
          {Object.entries(fs).map(([name, props]) =>
            renderField({ name, ...props }, `field-${name}`)
          )}
        </fieldset>
      ))}
      <button type="submit" disabled={disabled}>
        Submit
      </button>
      <BottomContent state={state} {...messages} />
    </form>
  );
};
