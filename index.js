const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/download/:id', async (req, res) => {
	const userUrl = req.params.id;
	const data = await ytdl.getInfo(userUrl);
	const filename = `${data.videoDetails.title.replaceAll(' ', '')}.mp3`;
	const stream = ytdl(userUrl, { filter: 'audioonly' }).pipe(fs.createWriteStream(filename));

	stream.on('finish', () => {
		res.download(filename);
	});
});

app.listen(port, () => {
	console.log('Server listening on port 4000...');
});
