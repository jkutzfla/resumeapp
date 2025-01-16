import React from "react";
import { useState } from "react";

import PromptContainer from "../components/PromptContainer";

const PromptPage = () => {
	const [input1,setInput1] = useState('Input 1');
	const [input2,setInput2] = useState('Input 2');
	const [answer,setAnswer] = useState('Answer to come');
	const [isLoading, setIsLoading] = useState(false);

	const doAction = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		// alert('input 1: ' + input1);

		const tempAnswer = await updateJob({id: 1, input1: input1, input2: input2});

		setAnswer('now just need to update that answer field from the API')
		setIsLoading(false);
	};
	return (
		<>
		<h2 className="subtitle">Prompt work</h2>
		<PromptContainer></PromptContainer>
		<div>Input 1:<br/>
			<textarea className="promptInput" value={input1} onChange={(e)=>setInput1(e.target.value)}></textarea>
		</div>
		<div>Input 2:<br/>
			<textarea className="promptInput" value={input2} onChange={(e)=>setInput2(e.target.value)}></textarea>
		</div>

		<div>
			<button className="actionButton" onClick={doAction}>Submit</button>
			{isLoading ? (
				<span >Loading</span>
			) : (
				<span>Not Loading</span>
			)}
		</div>
		<div>
			{answer}
		</div>
		</>
	);
};

export default PromptPage