import axios from 'axios';
import fs from 'fs';

export async function classifyImage(filePath, lotName) {
  const form = new FormData();
  form.append('image', fs.createReadStream(filePath));

  const response = await axios.post(
    'https://studio.edgeimpulse.com/v1/api/YOUR_DEPLOYMENT_ID/classify',
    form,
    {
      headers: {
        'x-api-key': 'YOUR_API_KEY',
        ...form.getHeaders(),
      },
    }
  );

  const prediction = response.data.result.classification;
  return prediction["vacant"] > prediction["occupied"] ? "vacant" : "occupied";
}
