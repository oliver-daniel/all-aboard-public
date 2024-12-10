import { useReducer } from "react";

export type FormValues = {
    "contact.name": string;
    "contact.email": string;
    "contact.phone": string;
  
    "patient.name": string;
    "patient.dob": string;
  
    message?: string;
  };

export type FormState =
  | {
      state: "default";
    }
  | {
      state: "submitting";
    }
  | {
      state: "error";
    }
  | {
      state: "success";
    }
  | {
      state: "disabled";
    };


const submitForm = async <V>(
  payload: V
) => {
  const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_ACTION as string, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      access_key: process.env.NEXT_PUBLIC_FORM_KEY,
      subject: "New contact form submission",
    }),
  });

  return res.ok;
};


export const useContactForm = (initialState: FormState = {
    state: "default"
}) => {
    const [state, dispatch] = useReducer<
      (state: FormState, newState: Partial<FormState>) => FormState
    >((state, newState) => {
      return {
        ...state,
        ...newState,
      };
    }, initialState);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({state: 'submitting'});

        const target = e.target as HTMLFormElement;
        const formData = new FormData(target);
        const values = Object.fromEntries(formData) as FormValues;

        submitForm(values).then((ok) => {
            if (!ok) {
                dispatch({state: "error"})
            } else {
                dispatch({state: "success"});
                target.reset();
            }
        })
    }

    return {
      state,
      dispatch,
      handleSubmit
    };
}