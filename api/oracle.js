
export default async function handler(req, res) {
  const body = await req.json();

  const prompt = `
You are an MBA Oracle. Based on the following inputs, generate a humorous but insightful post-MBA fate prediction.

Inputs:
Job Title: ${body.jobTitle}
Company/Industry: ${body.companyIndustry}
Location: ${body.location}
Salary: $${body.salary}
Excitement Level: ${body.excitement}
Planned Tenure: ${body.tenure}
Side Hustles: ${body.sideHustle}
Energy: ${body.energy}
Biggest Fear: ${body.fear}
Emoji: ${body.emoji}

Return a funny and creative:
- Burnout date
- Career pivot probability
- Startup likelihood
- Vibe forecast
- Meme horoscope
- A 3-line blessing
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${process.env.OPENAI_API_KEY}\`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    })
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content;
  res.status(200).json({ prediction: result });
}
