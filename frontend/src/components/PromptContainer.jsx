import React from 'react';

import PromptInput from './PromptInput';
import PromptResult from './PromptResult';
import { useState } from 'react';

const prompt = {
	input1 : 'Input 1',
	input2 : 'Input 2',
	result: 'Pre-result',
	systemprompt: ''
};

const PromptContainer = () => {
	const [input1, setInput1] = useState('Input 1 from useState');
	const [input2, setInput2] = useState('Input 2 from useState');
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState('');

	const onPromptSubmit = async () => {
		setIsLoading(true);
		//const promptInput = " === " + input1 + " === " + input2;
		const promptInput = ` === ${input1} === ${input2}`;

		const apiBody = JSON.stringify({promptInput: promptInput});
		const prompt = {
			model: "gpt-4o",
			messages: [
				{
					"role":"user",
					"content":[
						{
							"type":"text",
							"text": "What is the best cloud architecture?"
						}
					]
				},
				{
					"role":"assisstant",
					"content": [
						{
							"type":"text",
							"text":""
						}
					]
				}
			],
			"response_format":{"type":"text"},
			"temperature":1,
			"max_completion_tokens":2048,
			"top_p":1,
			"frequency_penalty":0,
			"presence_penalty":0
		};
		// const api = "http://localhost:3003/openai"
		const api = "/api/openai";

		try {
			const res = await fetch(`${api}`, {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: apiBody,
			  });
			const data = await res.json();
			const answer = data.choices[0];
			setResult(answer.message.content);

		} catch (error) {
			console.error("API error: ", error)
			setResult(JSON.stringify(error));
		} finally {
			setIsLoading(false)
		}

		console.log('input1, input2: ', input1, input2)
	};
	

  return (
	<><div>PromptContainer</div>
		<PromptInput input={input1} onInputChange={setInput1} />
		<PromptInput input={input2} onInputChange={setInput2} />
		<button onClick={onPromptSubmit}>Submit</button>  &nbsp;
		<button onClick={ e => setResult('') }>Reset</button>
		{ isLoading && "isLoading" }
		{ !isLoading && "notIsLoading"}
		<PromptResult llmresult={result} />
	</>
	
  )
}

export default PromptContainer