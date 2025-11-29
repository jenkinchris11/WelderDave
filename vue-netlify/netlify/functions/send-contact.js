const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_TO_EMAIL = process.env.EMAILJS_TO_EMAIL;

const HEADERS = {
  'Content-Type': 'application/json',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON payload' }) };
  }

  const { name, contact, message } = payload;

  if (!name || !contact || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name, contact, and message are required.' }),
    };
  }

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Contact delivery is not configured.',
        detail: 'Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY environment variables.',
      }),
    };
  }

  const templateParams = {
    name,
    contact,
    message,
  };

  if (EMAILJS_TO_EMAIL) {
    templateParams.to_email = EMAILJS_TO_EMAIL;
  }

  const emailPayload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: templateParams,
  };

  if (EMAILJS_PRIVATE_KEY) {
    emailPayload.accessToken = EMAILJS_PRIVATE_KEY;
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const detail = await response.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Failed to deliver message.', detail }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message delivered successfully.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected error delivering message.', detail: error.message }),
    };
  }
};
