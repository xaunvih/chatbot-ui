const requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");
requestHeaders.append(
  "Authorization",
  "Bearer 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"
);
const requestOptions = {
  method: "POST",
  headers: requestHeaders,
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    temperature: 1,
    stream: true,
    messages: [],
  }),
};

function noop() {}
export async function fetchMessages(onGenerate = noop) {
  const url = "https://api.openai.com/v1/chat/completions";
  const response = await fetch(url, requestOptions);
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const event = new TextDecoder("utf-8").decode(value);
    onGenerate(event);
  }
  return response;
}
