# Azure QNAMaker API

API that uses Azure cognitive services QNA maker to create a question-answer layer over the knowledgebase.


## Table Of Contents
   - [Base URL](#base-url)
   - [API Endpoints](#api-endpoints)
      - [QNA](#qna)
        - [Generate Answer](#generate-answer)
     - [Knowledgebase Endpoints](#knowledgebase)
       - [Create new knowledgebase](#create-new-knowledgebase)
       - [Get details of a knowledgebase](#get-details-of-a-knowledgebase)
       - [List all knowledgebases](#list-all-knowledgebases)
       - [Publish Knowledgebase](#publish-knowledgebase)
       - [Delete a knowledgebase](#delete-a-knowledgebase)
   - [References](#references)

## Base URL
> http://azureqnamaker.live:3000/api

## API Endpoints

### QNA

#### Generate Answer
> /knowledgebases/{kbId}/generateanswer

* HTTP Method: ``` post ```
>
* URI Parameters -
  *  kbId (Required) - Knowledgebase Id to search answer
>
* Request body -
  * question (Required) - Question to generate answer from the knowledgebase.
> 
* Sample request body - 
   ```
   {
	"question" : "is this a sample request ?"
   }  
   ```
* Sample Response - 
   ```
   {
    "answer": "Yes, This is the sample response for the request.",
    "confidence": 100
   }
   ```

* Status codes -
   * 200 OK - Answer is generated
>
* Error Codes -
  * 400 Bad Request - Question parameter is null / Knowledge base not found


### Knowledgebase

#### Create new knowledgebase 
> /knowledgebases
> 
* HTTP Method - ``` Post ``` 
>
* Request body -
  * name (Required) - Name for the knowledgebase
  * qnaList - List of question and answers to be added to the knowledgebase.
> 
* Sample request body - 
   ```
   {
  "name": "Sample FAQ",
  "qnaList": [
    {
      "answer": "Hello, Welcome to Sample FAQ. How can I help you ?",
      "source": "Custom Editorial",
      "questions": [
        "Hi",
        "How are you?",
        "Hey",
        "What's going?"
      ]
    },
    {
      "answer": "I am quite capable of answering questions",
      "source": "Custom Editorial",
      "questions": [
        "What do you do",
        "What are you capable of?",
    	"how can you help me?"
      ]
    }
  ],
  "defaultAnswerUsedForExtraction": "Sorry, I am not sure I can help you with that"
  
  }
    
   ```
* Sample Response - 
   ```
   {
    "operationState": "NotStarted",
    "createdTimestamp": "2019-12-11T12:55:49Z",
    "lastActionTimestamp": "2019-12-11T12:55:49Z",
    "operationId": "db17d02b-1c5f-455b-856a-9efea2d94116"
   }  
   ```

* Status codes -
   * 202 Accepted - Async operation for creating knowledgebase is started.
>
* Error Codes -
  * 404 Bad Request - Bad argument

> Note: Since every knowledgebase will be generated with unique KbId, multiple knowledgebases can have same name.  

#### Get details of a knowledgebase 
> /knowledgebases/{kbId}
* Method - ``` Get ```
>
* URI parameters -
  * kbId (Required) - Knowledgebase id
>
* Sample Response -
   ```
   {
    "id": "9b679ed9-8ed8-424b-928c-3fad63446bad",
    "hostName": "https://siqna.azurewebsites.net",
    "lastAccessedTimestamp": "2019-12-10T22:30:37Z",
    "lastChangedTimestamp": "2019-12-10T22:27:34Z",
    "lastPublishedTimestamp": "2019-12-10T22:30:38Z",
    "name": "abcdefg",
    "userId": "61f60f8963934dc388aad0d6ae679e4c",
    "urls": [],
    "sources": [
        "Editorial"
    ],
    "language": "English",
    "enableHierarchicalExtraction": false,
    "createdTimestamp": "2019-12-09T01:11:46Z"
   }
   ```
   
* Status codes -
   * 200 OK - Details of the knowledgebase
>
* Error Codes-
  * 404 Not found - Knowledge base not found. 


#### List all knowledgebases
> /knowledgebases
* Method - ``` Get ```
>
* Sample Response - 
   ```
   {
    "knowledgebases": [
        {
            "id": "1116a342-1d13-419f-bc56-2093ab937af4",
            "hostName": "https://siqna.azurewebsites.net",
            "lastAccessedTimestamp": "2019-12-11T00:52:10Z",
            "lastChangedTimestamp": "2019-12-11T00:52:10Z",
            "name": "Sample FAQ",
            "userId": "61f60f8963934dc388aad0d6ae679e4c",
            "urls": [],
            "sources": [
                "Custom Editorial"
            ],
            "language": "English",
            "enableHierarchicalExtraction": false,
            "defaultAnswerUsedForExtraction": "Sorry, I am not sure I can help you with that",
            "createdTimestamp": "2019-12-11T00:52:10Z"
        },
        {
            "id": "9b679ed9-8ed8-424b-928c-3fad63446bad",
            "hostName": "https://siqna.azurewebsites.net",
            "lastAccessedTimestamp": "2019-12-10T22:30:37Z",
            "lastChangedTimestamp": "2019-12-10T22:27:34Z",
            "lastPublishedTimestamp": "2019-12-10T22:30:38Z",
            "name": "abcdefg",
            "userId": "61f60f8963934dc388aad0d6ae679e4c",
            "urls": [],
            "sources": [
                "Editorial"
            ],
            "language": "English",
            "enableHierarchicalExtraction": false,
            "createdTimestamp": "2019-12-09T01:11:46Z"
        }
      ]
   }
   ```
>
* Status codes - 
   * 200 OK - List of all knowledgebases

#### publish knowledgebase 
> /knowledgebases/{kbId}
> 
* Method - ``` Post ```
>
* URI parameters -
  * kbId (Required) - Knowledgebase id
>
* Sample Response -
   ```
   {
    "id": "9b679ed9-8ed8-424b-928c-3fad63446bad",
    "hostName": "https://siqna.azurewebsites.net",
    "lastAccessedTimestamp": "2019-12-10T22:30:37Z",
    "lastChangedTimestamp": "2019-12-10T22:27:34Z",
    "lastPublishedTimestamp": "2019-12-10T22:30:38Z",
    "name": "abcdefg",
    "userId": "61f60f8963934dc388aad0d6ae679e4c",
    "urls": [],
    "sources": [
        "Editorial"
    ],
    "language": "English",
    "enableHierarchicalExtraction": false,
    "createdTimestamp": "2019-12-09T01:11:46Z"
   }
   ```
   
* Status codes -
   * 200 OK - Details of the knowledgebase
>
* Error Codes-
  * 404 Not found - Knowledge base not found. 

#### delete a knowledgebase
> /knowledgebases/{kbId}
> 
* Method - ``` Delete ```
>
* URI parameters -
  * kbId (Required) - Knowledgebase id
>
* Sample Response -
   ```
   {
    "code": "KbDeleted",
    "message": "Knowledge base deleted successfully"
   }
   ```
   
* Status codes -
   * 200 OK - Details of the knowledgebase
>
* Error Codes-
  * 404 Not found - Knowledge base not found. 


## References
- [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) - QNA maker API 
- [JWT](https://jwt.io) - Decode, Verify, and generate JWT
- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express](https://expressjs.com) - Node.js web application framework
- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) - Data validation
