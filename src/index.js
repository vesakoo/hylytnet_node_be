const { response } = require('express')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(cors())
app.use(express.json())


app.post('/api/feedback', (request,response) =>{
  const body = request.body
  const {name,email,topic,msg} = body
  console.log("viesti", name, email,topic,msg)
  if (
    name === undefined ||
    email === undefined ||
    msg === undefined 
  ) {
    return response.status(400).json({ error: 'nimi, email tai viesti puuttuu' })
  }

  const blocks =[
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: ':envelope_with_arrow: :woman: :speech_balloon: Uusi Palaute',
        emoji: true
      }
    }
  ]
  for (const [key, value] of Object.entries(body)) {
    console.log(`${key}: ${value}`);
    const item = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${key}*\n${value}`
      }
    }
    blocks.push(item)
  }
  blocks.push({ type: 'divider'})
  const slackMsg = {blocks}
  axios.post(
    'https://hooks.slack.com/services/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',
    JSON.stringify(slackMsg)
  )
  .then(resp =>{
    console.log(resp.data)
    response.json({status: resp.data})
  })
  .catch(error => {
    console.log('error oli',error)
    response.status(500).end()
  })
})

app.post('/api/wreckdiscovery' , (request,response) =>{
  const body = request.body
  //Object.keys(body).forEach()
  if (
    body.name === undefined ||
    body.email === undefined 
  ) {
    return response.status(400).json({ error: 'nimi tai sähköposti puuttuu' })
  }

  const blocks =[
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: ':sailboat: Uusi Hylkyhavainto',
        emoji: true
      }
    }
  ]
  for (const [key, value] of Object.entries(body)) {
    console.log(`${key}: ${value}`);
    const item = {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${key}*\n${value}`
      }
    }
    blocks.push(item)
  }
  blocks.push({ type: 'divider'})
  const slackMsg = {blocks}
  axios.post(
    'https://hooks.slack.com/services/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',
    JSON.stringify(slackMsg)
  )
  .then(resp =>{
    console.log(resp.data)
    response.json({status: resp.data})
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
  
})


/*
const slacContact = (name,email,topic,msg)=>{
  
  const mrkDwnName = `>*Lähettäjä*\n>${name}`
  const mrkDwnEmail = `>*Sähköposti*\n><mailto:${email}|${email}>`
  const mrkDwnTopic = `>*Aihe*\n>${topic}`
  const mrkdwnMsg = `>*Viesti*\n${msg}`
  const slackMsg = {
    blocks:[
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Uusi Palaute",
          "emoji": true
        }
      },
     {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Lähettäjä*\n${name}`
      }
     },
     {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Sähköposti*\n<mailto:${email}|${email}>`
      }
     },
     {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*aihe*\n${topic}`
      }
     },
     {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Viesti*\n${msg}`
      }
     }
    ]
  }

  axios.post(
    'https://hooks.slack.com/services/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',
    JSON.stringify(slackMsg)
  ).then(response =>{
      console.log('resp',response.data)
      return response.data
  })
  //return responce.data
}*/

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*slacContact(
  'Vesa Koo',
  'vesa.kankkunen@gmail.com',
  'testi-otsikko',
  'testiviesti hiukkasen pitempi juttu ja hiukka \n vaihtuu jo rivikin'
);*/
