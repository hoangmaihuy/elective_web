import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import Echo from '../components/Echo'

const message = "Hello World";

jest.setTimeout(10000);

test('Echo renders Hello World', async () => {
	render(<Echo message={message}/>);
	await waitFor(() => screen.getByTestId('message'), {
		timeout: 10000
	});
	// eslint-disable-next-line testing-library/await-async-query
	expect(screen.getByTestId("message")).toHaveTextContent(message);
})