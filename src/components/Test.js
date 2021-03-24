import React, { useState, useEffect } from 'react'
import {requestTuikeApi} from "../api/requests";
import {TuikeApi} from "../api/consts";

export default function Test(props) {
	const [message, setMessage] = useState("Fetching...");

	useEffect(() => {
		const requestEcho = async () => {
			const response = await requestTuikeApi(TuikeApi.TEST_ECHO, {
				"message": "Hello World"
			});
			if (response["result"] === "success")
				setMessage(response["reply"]["message"]);
		}

		requestEcho();
	}, [])

	return (
		<div>
			<h1>{message}</h1>
		</div>
	)
}