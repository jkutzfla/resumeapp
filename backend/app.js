const { time } = require('console')
const express = require('express')
const app = express()
const port = process.env.EXPRESS_PORT || 3003
const http = require('http')
const https = require('https')
const cors = require('cors')
app.use(cors());  //Default to allow all

// default to serve static content
const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(express.json()) // to support JSON-encoded bodies

const logger = (req, res, next) => {
	res.on("finish", () => {
		console.log(`Express log ${req.method} ${req.originalUrl} : ${res.statusCode} : Client IP: ${req.ip}`);
	});
	next();
}

app.use(logger);



const apitype = process.env.API_TYPE
const apikey = process.env.OPENAI_KEY || "changeme"

if (apikey == "changeme") {
	console.log("OPENAI_KEY is not set.")
}

const prompt = {
	model: "gpt-4o-mini",
	messages: [
		{
			"role": "user",
			"content": [
				{
					"type": "text",
					"text": "What is the best cloud architecture?"
				}
			]
		},
		{
			"role": "assistant",
			"content": [
				{
					"type": "text",
					"text": ""
				}
			]
		}
	],
	"response_format": { "type": "text" },
	"temperature": 1,
	"max_completion_tokens": 2048,
	"top_p": 1,
	"frequency_penalty": 0,
	"presence_penalty": 0,
	"stream": false
};


app.get('/', (req, res) => {
	// res.send('Hello World')
	res.redirect('/index.html')
})

app.get('/api/test', (req, res) => {
	res.send('Test OK, Time is: ' + (new Date()).toString() + '<br>' + 'API_TYPE=' + apitype)
})

app.post('/echo', (req, res) => {
	const echo_in = req?.body?.echo_in;
	res.json({ echo_out: echo_in })
});

app.post('/openai', (request, response) => {
	const promptInput = request.body?.promptInput;
	console.log("in POST, request.body: ", promptInput);

	const user_prompt = prompt; //TODO: make a copy
	user_prompt.messages[0]["content"][0]["text"] = promptInput;

	const data_in = JSON.stringify(user_prompt);
	const options = {
		hostname: 'api.openai.com',
		path: '/v1/chat/completions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': data_in.length,
			'Authorization': 'Bearer ' + apikey
		}
	};

	const req2 = https.request(options, (res2) => {
		let data_out = '';
		console.log('API Status Code: ', res2.statusCode);
		// console.log('Response: ', res2);

		res2.on('data', (chunk) => {
			data_out += chunk;
		});

		res2.on('end', () => {
			console.log('Body: ', JSON.parse(data_out));

			response.status(res2.statusCode).send(data_out);
		})
	}).on("error", (err) => {
		console.log("Error: ", err.message);
	});

	req2.write(data_in);

})

app.get('/openai', (request, response) => {
	const data_in = JSON.stringify(prompt);
	const options = {
		hostname: 'api.openai.com',
		path: '/v1/chat/completions',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': data_in.length,
			'Authorization': 'Bearer ' + apikey
		}
	};

	const req2 = https.request(options, (res2) => {
		let data_out = '';
		console.log('API Status Code: ', res2.statusCode);
		console.log('Response: ', res2);

		res2.on('data', (chunk) => {
			data_out += chunk;
		});

		res2.on('end', () => {
			console.log('Body: ', JSON.parse(data_out));
			response.send(data_out);
		})
	}).on("error", (err) => {
		console.log("Error: ", err.message);
	});

	req2.write(data_in);
})



app.get('/check', function (req, res) {
	var request = http.request({
		host: 'localhost',
		port: 3003,
		path: '/test',
		method: 'GET',
		headers: {
			// headers such as "Cookie" can be extracted from req object and sent to /test
		}
	}, function (response) {
		var data = '';
		response.setEncoding('utf8');
		response.on('data', (chunk) => {
			data += chunk;
		});
		response.on('end', () => {
			res.end('check result: ' + data);
		});
	});
	request.end();
});

// catch-all rule to serve index.html, to support React Router
app.get('*', (req, res) => {
	// res.redirect('/');
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
	// res.status(404).send('404 Not Found')
})

app.listen(port, () => {
	console.log(`Express app listening on port ${port}. Browse here: http://localhost:${port}/`)
})