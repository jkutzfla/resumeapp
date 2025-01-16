import React from 'react'

const cleanInput = (input) => {
	input = input.replaceAll('’', "'");
	return `${input}`;
}

const PromptInput = ({input, onInputChange}) => {
	// const cleanText
	let inputShort = input.substring(0, 100);
	inputShort += input.length > 100 ? '...' : '';

  return (
	<>
	{inputShort} <br/>
	<button onClick={() => onInputChange( cleanInput(input) ) }>Clean input</button><br/>
	<textarea className="promptInput" value={input} onChange={e => onInputChange(e.target.value)}></textarea>
	<br/>
	</>
	
  )
}

export default PromptInput