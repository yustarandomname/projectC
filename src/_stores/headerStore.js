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
    show: () => { isVisible = true; return set(true) },
    hide: () => { isVisible = false; return set(false) },
    toggle: () => { isVisible = !isVisible; return set(isVisible) }
  };
})()

export const sidePanel = (() => {
  const { subscribe, set, update } = writable(defaultCommands);

  return {
    subscribe,
    update,
    set,
    remove: () => set({}),
    setDefault: () => set(defaultCommands),
    toggle: () => { isVisible = !isVisible; return set(isVisible) }
  };
})()

export const searchQuery = writable("");