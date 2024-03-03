import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/chatgpt4', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.OPENAI_API_KEY,
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ],
        system_prompt: '',
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false
      }
    };

    const response = await axios.request(options);
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.response.data || 'Something went wrong');
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Server is running on port'));
