export default function getSentence(arr: HTMLCollection): string {
  let result = '';

  Array.from(arr).forEach((item, index) => {
    if (item instanceof HTMLElement) {
      result +=
        index === arr.length - 1 ? item.innerText : `${item.innerText} `;
    }
  });

  return result;
}
