const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

const COOKIE =
	'CONSENT=PENDING+135; PREF=f4=4000000&tz=Europe.Copenhagen; SOCS=CAISEwgDEgk0Njg1MDc4MDQaAmVuIAEaBgiA64WYBg; VISITOR_INFO1_LIVE=Xsq4HoovZEk; __Secure-3PSID=Ogh_U_4Wj5tlYpB-RdayyMVgXpbrcw_snNN5HQ03uJgFk1lExV6cZKFWBSdVuAAxcwO_Aw.; __Secure-3PAPISID=HBOEcKLa7q6rBzC9/Aw4-mX1TkBmQ7kfuA; LOGIN_INFO=AFmmF2swRQIgSuhPcwwGXqyVBsPO4ivY4khj7QXksMtUxtZtBwrO89gCIQCqKqc5XWuovEGH6cO1bqXa2a0y7EZqBTT9J7P1lARd3g:QUQ3MjNmeEZUUVg4bzI5X0FBc3pVWklwYU5TX0NlQ0NxZi1XakhWcW5sdWRKUndUa0hOTjhFZjgyTDJxdkpPXzU3cFVGLWVkeERNaHlncFlvazF5NWo4M0syejBaMERaRl9LZjFSMExkZGFmNXdFYmtHN0NIYW9GR3hJQTZOUloxOFljT05idTd2TlJWZk55c1AtQlZEd3Mwc25RdnpWTm1n; YSC=hUgCsngbLw8; __Secure-3PSIDCC=AEf-XMRl8LjdlwoCEO2gTaqUZKuAC3WVkG52Yt9RTwD_7tlk8m5zOjcL-hWlQ6ARDODOVgUCFw';

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
	const filename = 'hello.mp4';
	// const stream = ytdl(userUrl, { filter: 'audioonly' }).pipe(fs.createWriteStream(filename));
	const stream = ytdl(userUrl, {
		requestOptions: {
			headers: {
				cookie: COOKIE,
			},
		},
	}).pipe(fs.createWriteStream(filename));
	stream.on('finish', () => {
		res.download(filename);
	});
});

app.listen(port, () => {
	console.log('Server listening on port 4000....');
});
