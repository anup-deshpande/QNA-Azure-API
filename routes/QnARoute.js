const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Get the answer for the question
router.post('/getanswer', async (req,res) => {
    

    // Get QNA-URL from enviroment variables
    const QNA_API_URL = process.env.QNA_API_URL

    // Create header with token
    const header = {
        "Content-Type":"application/json",
        "Authorization":"EndpointKey 356b30ed-47c7-4f2e-bdf3-b5ec64a1b51b"
    }
    
    axios.post(QNA_API_URL, 
      {"question": req.body.question}, 
      {
        headers: header
      })
      .then((response) => {
       console.log(response.data.answers[0].answer);
       console.log(response.data.answers[0].score);

       res.send({
        "answer" : response.data.answers[0].answer
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