import React from "react";
import { useState } from "react";
import './PromptPage.css'

const API_ENDPOINT = '/api/openai'
// import PromptContainer from "../components/PromptContainer";

function PromptPage() {
	const [input1, setInput1] = useState('')
	const [input2, setInput2] = useState('')
	const [response, setResponse] = useState('')
	const [isLoading, setIsLoading] = useState(false)
  
	const handleSubmit = async (e) => {
	  e.preventDefault()
	  setIsLoading(true)
	  
	  try {
		const response = await fetch(API_ENDPOINT, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			promptInput: `${input1} ${input2}`,
		  }),
		})
		
		const data = await response.json()
		// Extract just the message content from the nested response structure
		const messageContent = data.response?.choices?.[0]?.message?.content || 'No response received'
		setResponse(messageContent)
	  } catch (error) {
		setResponse('Error: Failed to fetch response')
		console.error('Error:', error)
	  } finally {
		setIsLoading(false)
	  }
	}
  
	return (
	  <div className="app-container">
		<h1>Demo Resume App</h1>
		<form onSubmit={handleSubmit}>
		  <div className="input-group">
			<label htmlFor="input1">First Input:</label>
			<textarea
			  id="input1"
			  value={input1}
			  onChange={(e) => setInput1(e.target.value)}
			  placeholder="Enter first text"
			  rows={3}
			/>
		  </div>
		  
		  <div className="input-group">
			<label htmlFor="input2">Second Input:</label>
			<textarea
			  id="input2"
			  value={input2}
			  onChange={(e) => setInput2(e.target.value)}
			  placeholder="Enter second text"
			  rows={3}
			/>
		  </div>
  
		  <button type="submit" disabled={isLoading}>
			{isLoading ? 'Sending...' : 'Send'}
		  </button>
		</form>
  
		<div className="response-section">
		  <h2>Response:</h2>
		  <div className="response-box">
			{response || 'No response yet'}
		  </div>
		</div>
	  </div>
	)
}

export default PromptPage