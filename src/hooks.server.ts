export async function handle({ event, resolve }) {
  // Redirect to www on production
  if (event.url.host === "danpeak.co.uk") {
    return new Response("Redirect", {
      status: 301,
      headers: { Location: "https://www.danpeak.co.uk" + event.url.pathname },
    });
  }

  const response = await resolve(event);
  return response;
}
