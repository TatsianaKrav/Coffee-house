import { IElementParams } from '../../interfaces/IElementParams';
import ElementCreator from '../../util/element-creator';
import InputFieldCreator from '../../util/input-field/inpt-field-creator';
import View from '../view';
import './login.css';
import '../../util/button/button.css';
import '../../util/input-field/input-field.css';

export default class LoginPage extends View {
  constructor() {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['login-page'],
      textContent: 'Please, login to start a game',
    };

    super(params);
    this.configureView(params);
  }

  configureView(params: IElementParams): HTMLElement {
    const loginComponent: ElementCreator = this.createView(params);
    const loginElement: HTMLElement = loginComponent.getElement();
    if (!loginElement) throw new Error('Element not found');

    const labelContent = {
      FIELD1: 'First name',
      FIELD2: 'Surname',
    };

    let inputParams: IElementParams = {
      tag: 'input',
      cssClasses: ['first-name'],
      textContent: labelContent.FIELD1,
    };

    let errorParams: IElementParams = {
      tag: 'div',
      cssClasses: ['error-message'],
      textContent: 'Error1',
      attr: [{ name: 'field', value: 'name' }],
    };

    let creatorInput = new InputFieldCreator(inputParams);
    let errorCreator = new ElementCreator(errorParams);
    creatorInput.addInnerElement(errorCreator);
    this.elementCreator.addInnerElement(creatorInput);

    inputParams = {
      tag: 'input',
      cssClasses: ['surname'],
      textContent: labelContent.FIELD2,
    };

    creatorInput = new InputFieldCreator(inputParams);
    this.elementCreator.addInnerElement(creatorInput);

    loginElement.append(creatorInput.getElement());

    const buttonParams: IElementParams = {
      tag: 'button',
      cssClasses: ['btn'],
      textContent: 'Login',
      attr: [{ name: 'disabled', value: '' }],
    };

    const buttonCreator: ElementCreator = new ElementCreator(buttonParams);
    loginElement.append(buttonCreator.getElement());

    errorParams = {
      tag: 'div',
      cssClasses: ['error-message'],
      textContent: 'Error2',
      attr: [{ name: 'field', value: 'surname' }],
    };

    errorCreator = new ElementCreator(errorParams);
    creatorInput.addInnerElement(errorCreator);

    const inputs = this.findInputElements(loginElement);
    const isHtmlElement = (v: Element): v is HTMLInputElement =>
      v instanceof HTMLInputElement;

    inputs.forEach((input) => {
      if (isHtmlElement(input)) {
        this.inputValidation(input, loginElement, buttonCreator.getElement());
      }
    });

    return loginElement;
  }

  inputValidation(
    element: HTMLInputElement,
    loginElement: HTMLElement,
    button: HTMLElement,
  ): void {
    if (element instanceof HTMLInputElement) {
      element.onchange = () => {
        this.validateField(element);
        this.toggleButton(loginElement, button);
      };
    }
  }

  toggleButton(container: HTMLElement, button: HTMLElement): void {
    const loginFormValid = this.validateLoginForm(container);

    if (loginFormValid) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', '');
    }
  }

  validateField(element: HTMLInputElement): void {
    const regex = /^[A-Z][a-zA-Z-]+$/;

    let inputValueLength = 0;

    if (element.classList.contains('first-name')) {
      inputValueLength = 3;
    } else if (element.classList.contains('surname')) {
      inputValueLength = 4;
    }

    const errorElement = element.nextElementSibling;

    const isHtmlElement = (v: Element): v is HTMLInputElement =>
      v instanceof HTMLElement;

    if (
      !element.value ||
      !element.value.match(regex) ||
      element.value.length < inputValueLength
    ) {
      element.style.borderColor = 'red';
      element.removeAttribute('valid');

      if (errorElement && isHtmlElement(errorElement)) {
        errorElement.style.display = 'block';

        if (!element.value) {
          errorElement.textContent = `Enter ${element.previousElementSibling?.innerHTML}`;
        } else if (!element.value.match(regex)) {
          errorElement.textContent = `Only English alphabet letters and ('-') symbol are acceptable. The 1st letter must be in uppercase`;
        } else if (element.value.length < inputValueLength) {
          errorElement.textContent = `Minimum ${inputValueLength} characters are required`;
        }
      }
    } else {
      element.removeAttribute('style');
      element.setAttribute('valid', 'true');
      if (errorElement && isHtmlElement(errorElement)) {
        errorElement.style.display = 'none';
      }
    }
  }

  validateLoginForm(container: HTMLElement): boolean {
    let isValide: boolean = false;
    const inputs = this.findInputElements(container);
    isValide = inputs.every((input) => input.getAttribute('valid') === 'true');

    return isValide;
  }

  findInputElements(container: HTMLElement): Array<Element> {
    const pageChildren: Array<Element> = Array.from(container.children);
    const divInputs: Array<Element> = pageChildren.filter((child) => {
      return child.tagName !== 'BUTTON';
    });

    const inputs: Array<Element> = divInputs.map((item) => {
      return Array.from(item.children)[1];
    });
    return inputs;
  }
}
