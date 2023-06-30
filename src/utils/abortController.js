export function setAbortController(onStop) {
  const controller = new AbortController();
  const signal = controller.signal;
  const disconnect = () => {
    controller.abort();
    onStop && onStop();
  };

  return {
    controller,
    disconnect,
    signal,
  };
}
