import { writable } from 'svelte/store';

let notificationList = [];

export let notifications = (() => {
  const { subscribe, set, update } = writable([]);

  function addTimer(n, time) {
    n.time = time;
    n.totalActiveTime = time;
    n.ratio = 0;
    const timer = setInterval(() => {
      // if notification time > 0, decrement. if notification time is 0 clear this interval
      if (n.time > 0) { n.time--; n.ratio = (n.totalActiveTime - n.time) / n.totalActiveTime * 100 }
      else clearInterval(timer);

      set(notifications);
    }, 1000)

    n.timer = timer;
  }

  return {
    subscribe,
    update,
    add: (notify) => { addTimer(notify, 20); notificationList.push(notify); return set(notifications) },
    error: (msg) => { const n = { message: msg, type: "error" }; notifications.add(n) },
    warning: (msg) => { const n = { message: msg, type: "warning" }; notifications.add(n) },
    succes: (msg) => { const n = { message: msg, type: "succes" }; notifications.add(n) },
    clearOne: (index) => { notificationList[index].time = 0; return set(notificationList) },
    clearAll: () => { notificationList = []; set([]) }
  }
})()