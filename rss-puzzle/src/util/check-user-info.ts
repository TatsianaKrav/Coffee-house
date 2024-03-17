import State from '../state/state';

export default function checkUserInfo(state: State): boolean {
  return state.fields.size === 0;
}
