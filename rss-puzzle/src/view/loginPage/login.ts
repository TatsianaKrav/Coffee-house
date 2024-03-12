import { IElementParams } from '../../interfaces/IElementParams';
import ElementCreator from '../../util/element-creator';
import InputFieldCreator from '../../util/input-field/inpt-field-creator';
import View from '../view';
import './login.css';
import '../../util/button/button.css';
import '../../util/input-field/input-field.css';
import State from '../../state/state';
import LabelContent from '../../enums/labelContent';
import {
  isHtmlElement,
  isHtmlInputElement,
} from '../../util/assertion-function';
import Router from '../../router/router';
import Pages from '../../enums/pages';

export default class LoginPage extends View {
  inputsElements: Array<HTMLInputElement> = [];

  state: State;

  constructor(router: Router, state: State) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['login-page'],
      textContent: 'Please, login to start a game',
    };

    super(params);
    this.state = state;
    this.configureView(params, router);
  }

  configureView(params: IElementParams, router: Router): HTMLElement {
    const loginComponent: ElementCreator = this.createView(params);
    const loginElement: HTMLElement = loginComponent.getElement();

    /*  стр ошибки */
    if (!loginElement) throw new Error('Element not found');

    let inputParams: IElementParams = {
      tag: 'input',
      cssClasses: ['first-name'],
      textContent: LabelContent.FIELD1,
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
      textContent: LabelContent.FIELD2,
    };

    creatorInput = new InputFieldCreator(inputParams);
    this.elementCreator.addInnerElement(creatorInput);

    loginElement.append(creatorInput.getElement());

    this.findInputElements(loginElement);

    const buttonParams: IElementParams = {
      tag: 'button',
      cssClasses: ['btn'],
      textContent: 'Login',
      attr: [{ name: 'disabled', value: '' }],
      callback: () => router.navigate(Pages.START),
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

    this.inputsElements.forEach((input) => {
      this.inputValidation(input, loginElement, buttonCreator.getElement());
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
        this.toggleButton(button);

        const validForm = this.validateLoginForm();
        if (validForm) {
          this.state.saveState('userInfo', {
            name: this.inputsElements[0].value,
            surname: this.inputsElements[1].value,
          });
        }
      };
    }
  }

  toggleButton(button: HTMLElement): void {
    const loginFormValid = this.validateLoginForm();

    if (loginFormValid) {
      button.removeAttribute('disabled');
      localStorage.setItem('name', '');
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

    if (
      !element.value ||
      !element.value.match(regex) ||
      element.value.length < inputValueLength
    ) {
      element.style.borderColor = 'red';
      element.removeAttribute('valid');

      this.showErrorMessage(element, errorElement, regex, inputValueLength);
    } else {
      element.removeAttribute('style');
      element.setAttribute('valid', 'true');
      if (errorElement && isHtmlElement(errorElement)) {
        errorElement.style.display = 'none';
      }
    }
  }

  validateLoginForm(): boolean {
    return this.inputsElements.every(
      (input) => input.getAttribute('valid') === 'true',
    );
  }

  findInputElements(container: HTMLElement) {
    const pageChildren: Array<Element> = Array.from(container.children);
    const divInputs: Array<Element> = pageChildren.filter((child) => {
      return child.tagName !== 'BUTTON';
    });

    const inputs: Array<Element> = divInputs.map((item) => {
      return Array.from(item.children)[1];
    });

    inputs.forEach((input) => {
      if (isHtmlInputElement(input)) {
        this.inputsElements.push(input);
      }
    });
  }

  showErrorMessage(
    element: HTMLInputElement,
    errorElement: Element | null,
    regex: RegExp,
    inputValueLength: number,
  ): void {
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
  }
}
