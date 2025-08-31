// netlify/functions/proxy.js
export async function handler(event, context) {
  try {
    const data = JSON.parse(event.body);

    const res = await fetch('https://script.google.com/macros/s/AKfycbzUdWEWPRKZX97vZhnRGfSw4m83IE6HgYu3NALCtMjEVbG1HChd1TrZkFJxk-7kJhDYLQ/exec', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const result = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*',  // Permette chiamate da qualsiasi dominio
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
}
