if ($response.statusCode !== 200 || !$response.body) {
  $done(null);
}

try {
  const { query: ip } = JSON.parse($response.body); // Destructure directly for the 'query' field (IP)

  if (ip) {
    $done({ ip });
  } else {
    throw new Error("IP not found in response.");
  }
} catch (error) {
  console.error("Error parsing response:", error);
  $done(null);
}