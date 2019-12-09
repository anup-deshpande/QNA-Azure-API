const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Create new Knowledgebase
router.post('/', (req,res) => {

    // Get Knowledgebase endpoint from enviroment variables and build create URL
    const knowledgebases_url = process.env.knowledgebases_endpoint + "/create";

    // Create header with token
    const header = {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": process.env.Ocp_Apim_Subscription_Key
    }
    
    // Post knowledgebase to azure cognitive service and get response
    axios.post(knowledgebases_url, 
      {"name": req.body.name}, 
      {
        headers: header
      })
      .then((response) => {
        res.status(response.status).send(response.data);
       
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data.error);
      })

});

// publish Knowledgebase
router.post('/:kbId', (req,res) => {
    
    // Get Knowledgebase endpoint from enviroment variables and build create publish URL
    const knowledgebases_url = process.env.knowledgebases_endpoint + "/" + req.params.kbId;

    // Create header with token
    const header = {
        "Ocp-Apim-Subscription-Key": process.env.Ocp_Apim_Subscription_Key
    }
    
    // Post knowledgebase to azure cognitive service and get response
    axios.post(knowledgebases_url, null , 
      {
        headers: header
      })
      .then((response) => {
        res.status(response.status).send(response.data);
       
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data.error);
      })

});

// Get all knowledgebases 
router.get('/', (req,res) =>{

    // Get Knowledgebase endpoint from enviroment variables
    const knowledgebases_url = process.env.knowledgebases_endpoint;
    
    // Create header with token
    const header = {
        "Ocp-Apim-Subscription-Key": process.env.Ocp_Apim_Subscription_Key
    }
    
    axios.get(knowledgebases_url, 
      {
        headers: header
      })
      .then((response) => {
        res.status(response.status).send(response.data);
       
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.data.error);
    })

});

// Delete a knowledgebase
router.delete('/:kbId?', (req,res) =>{

    // Get Knowledgebase endpoint from enviroment variables and build delete URL
    const knowledgebases_url = process.env.knowledgebases_endpoint + "/" + req.params.kbId;
    
    // Create header with token
    const header = {
        "Ocp-Apim-Subscription-Key": process.env.Ocp_Apim_Subscription_Key
    }

    axios.delete(knowledgebases_url, 
        {
          headers: header
        })
        .then((response) => {
          switch (response.status) {
              case 204:
                res.status(200).send({
                    code: "KbDeleted",
                    message: "Knowledge base deleted successfully"
                });
                break;
          
              default:
                res.status(response.status).send(response.data);
                break;
            }
            
        })
        .catch((error) => {
          res.status(error.response.status).send(error.response.data.error);
    });

});




module.exports = router;