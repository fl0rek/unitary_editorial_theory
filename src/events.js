function subscribe(type, listener) {
  document.addEventListener(type, listener);
}

function unsubscribe(type, listener) {
  document.removeEventListener(type, listener);
}

function publish(type, data) {
      console.warn("[" + type + "]", data.msg, data);
  const event = new CustomEvent(type, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};
