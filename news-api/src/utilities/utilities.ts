export function getTypedElement(baseElement: DocumentFragment | Document, selector: string): NonNullable<HTMLElement> {
    const newElem = baseElement.querySelector(selector);
    if (!newElem) throw new Error(`Element with selector ${selector} is not found`);
    return newElem as HTMLElement;
}
