import { writable } from 'svelte/store';

let isVisible = true;
let defaultCommands = {
  "Log out": {
    icon: "🔚",
    action: "logOut"
  }
}

// is header panel visible
export const showPanel = (() => {
  const { subscribe, set, update } = writable(isVisible);

  return {
    subscribe,
    update,
    set,
    toggle: () => { isVisible = !isVisible; return set(isVisible) }
  };
})()

export const sidePanel = writable(defaultCommands);