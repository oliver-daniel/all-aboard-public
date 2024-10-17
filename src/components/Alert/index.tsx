type Props = {
  children: JSX.Element;
};

export const Alert = ({ children }: Props) => (
  <div style={{ color: "red", border: "1px solid red", padding: "1rem" }}>
    {children}
  </div>
);
