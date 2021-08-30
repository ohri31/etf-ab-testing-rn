export async function apiCall({
  endpoint,
  method = 'GET',
  body = {}
}) {
  try {
    const response = await fetch(endpoint, {
      method: method,
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    })

    const data = await response;
    return data;
  } catch(err) {
    console.error(err);
    throw err;
  }
}