import React from 'react'

const PromptResult = ({llmresult}) => {
  return (
	<div>PromptResult <br/>
		<textarea defaultValue={llmresult} />
	</div>
  )
}

export default PromptResult