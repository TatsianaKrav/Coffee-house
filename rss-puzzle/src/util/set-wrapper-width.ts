import ElementCreator from './element-creator';

export default function setWrapperWidth(elementCreator: ElementCreator) {
  const wrappers = Array.from(elementCreator.getElement().children);
  const puzzles = wrappers.map((item) => item.children[0]);

  wrappers.forEach((item, index) => {
    if (item instanceof HTMLElement) {
      item.style.width = getComputedStyle(puzzles[index]).width;
    }
  });
}
