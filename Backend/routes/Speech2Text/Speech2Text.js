const express = require('express');
const speech = require('@google-cloud/speech');
const router = express.Router()
const fs = require('fs');

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/joel/onedrive/college/computer science/project/project/backend/blindsense.json'

const main = async () => {

    const client = new speech.SpeechClient()

    console.log('Starting api call...');
    const fileName = './routes/Speech2Text/uploads/text2speech.wav'

    const file = fs.readFileSync(fileName)
    const audioBytes = file.toString('base64')

    const audio = {
        content: audioBytes
    }

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
    }

    const request = {
        audio: audio,
        config: config,
    }

    const [response] = await client.recognize(request)
    const transcription = response.results.map(result =>
        result.alternatives[0].transcript).join('\n')
    console.log('Finishing api call...');
    console.log(transcription);
    return transcription
}

router.use('/', (req, res) => {
    console.log('recieved');
    req.pipe(fs.createWriteStream('./routes/Speech2Text/uploads/text2speech.wav'));
    setTimeout(() => { main().then((response) => res.send(response)) }, 400);
});

module.exports = router