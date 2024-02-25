export function getTypedElement(baseElement: DocumentFragment | Document, selector: string): NonNullable<HTMLElement> {
    const newElem: Element | null = baseElement.querySelector(selector);
    if (!newElem || !(newElem instanceof HTMLElement))
        throw new Error(`Element with selector ${selector} is not found`);
    return newElem;
}

export function getCheckedElem<T>(elem: T): DocumentFragment {
    if (elem instanceof DocumentFragment && elem !== null) {
        return elem;
    } else {
        throw new Error(`Type of element ${elem} is unusable`);
    }
}
