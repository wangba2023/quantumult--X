if ($response.statusCode !== 200 || !$response.body) {
  $done(null);
}

try {
  // Parse the response body and set default values in case any field is missing
  const {
    query: ip = "Unknown IP",               // Extract IP (query field), fallback if missing
    city = "Unknown City",                   // Extract city, fallback if missing
    regionName = "Unknown Region",           // Extract region name, fallback if missing
    country = "Unknown Country",             // Extract country, fallback if missing
    timezone = "Unknown Timezone",           // Extract timezone, fallback if missing
    isp = "Unknown ISP"                      // Extract ISP, fallback if missing
  } = JSON.parse($response.body);

  // Construct a detailed description with all relevant data
  const descriptionParts = [];
  
  // Add IP address to description
  descriptionParts.push(`IP Address: ${ip}`);
  
  // Check if city, region, and country are available, format them accordingly
  if (city !== "Unknown City" || regionName !== "Unknown Region" || country !== "Unknown Country") {
    descriptionParts.push(`Location: ${city}, ${regionName}, ${country}`);
  } else {
    descriptionParts.push("Location: Unknown");
  }
  
  // Add timezone to the description
  descriptionParts.push(`Timezone: ${timezone}`);
  
  // Add ISP (Internet Service Provider) to the description
  descriptionParts.push(`ISP: ${isp}`);
  
  // Join all parts of the description with line breaks for better readability
  const description = descriptionParts.join("\n");

  // Return only the IP and the constructed description
  $done({ ip, description });

} catch (error) {
  // Log the error for debugging purposes
  console.error("Error parsing or processing response:", error);
  
  // Return null to avoid breaking the execution
  $done(null);
}