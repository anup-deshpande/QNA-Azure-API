const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Get the answer for the question
router.post('/generateanswer', async (req,res) => {
    

    // Get QNA-URL from enviroment variables
    const QNA_API_URL = process.env.QNA_API_URL;

    // Create header with token
    const header = {
        "Content-Type":"application/json",
        "Authorization": process.env.Authorization
    }
    
    // Post the question to azure cognitive service and get response
    axios.post(QNA_API_URL, 
      {"question": req.body.question}, 
      {
        headers: header
      })
      .then((response) => {
       
        res.send({
        "answer" : response.data.answers[0].answer,
        "confidence": response.data.answers[0].score
        });
       
      })
      .catch((error) => {
        console.log(error.response.data.error);
        res.send({
            "message" : error.response.data.error.message
        });
      })

});

module.exports = router;