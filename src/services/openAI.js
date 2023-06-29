import { createParser } from "eventsource-parser";
import { setAbortController } from "./abortController";

async function fetchMessages(messages = [], signal) {
  try {
    const url = "https://api.openai.com/v1/chat/completions";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_OPEN_AI_KEY,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 1,
        stream: true,
        messages,
      }),
      signal,
    });
    return response;
  } catch (err) {
    return;
  }
}

async function* streamAsyncIterable(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export const fetchStream = async ({
  messages,
  onMessage,
  onEnd,
  onError,
  onStart,
}) => {
  let answer = "";
  const { controller, signal } = setAbortController();
  const result = await fetchMessages(messages, signal).catch((error) => {
    onError && onError(error, controller);
  });

  if (!result) return;
  if (!result.ok) {
    const error = await result.json();
    onError && onError(error);
    return;
  }

  const parser = createParser((event) => {
    if (event.type === "event") {
      if (event.data === "[DONE]") return;
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        return;
      }
      if ("content" in data.choices[0].delta) {
        answer += data.choices[0].delta.content;
        onMessage && onMessage(answer, controller);
      }
    }
  });

  let hasStarted = false;
  for await (const chunk of streamAsyncIterable(result.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
    if (!hasStarted) {
      hasStarted = true;
      onStart && onStart(str, controller);
    }
  }
  onEnd && (await onEnd());
};
