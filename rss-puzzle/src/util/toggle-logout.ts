export default function toggleLogout(
  condition: boolean,
  logoutElement: HTMLElement,
) {
  if (condition) {
    logoutElement.style.display = 'none';
  } else {
    logoutElement.style.display = 'block';
  }
}
