import React, { useState, useEffect } from 'react'
import {requestTuikeApi} from "../api/requests";
import {TuikeApi} from "../api/consts";

export default function Echo(props) {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const requestEcho = async () => {
			const response = await requestTuikeApi(TuikeApi.TEST_ECHO, {
				"message": props.message
			});
			setLoading(false);
			if (response["result"] === "success")
			{
				setMessage(response["reply"]["message"]);
			}
		}

		requestEcho();
	}, [props.message])

	return (
		<div>
			{loading || <h1 data-testid="message">{message}</h1>}
		</div>
	)
}