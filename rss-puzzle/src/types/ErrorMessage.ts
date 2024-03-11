type ErrorMessage = (
  element: HTMLInputElement,
  errorElement: Element | null,
  regex: RegExp,
  inputValueLength: number,
) => void;

export default ErrorMessage;
