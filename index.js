const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/download/:id', async (req, res) => {
	console.log('Request made');
	console.log(req.params.id);
	const userUrl = req.params.id;
	console.log('Userurl is ', userUrl);
	// const data = await ytdl.getInfo(userUrl);
	// console.log('data is ', data);
	// const filename = `${data.videoDetails.title.replaceAll(' ', '')}.mp3`;
	const filename = 'hello.mp3';
	const stream = ytdl(userUrl, { filter: 'audioonly' }).pipe(fs.createWriteStream(filename));
	stream.on('finish', () => {
		res.download(filename);
	});
});

app.listen(port, () => {
	console.log('Server listening on port 4000....');
});
