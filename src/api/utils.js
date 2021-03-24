export const from_json = (json) => {
	try {
		return JSON.parse(json);
	}
	catch (e) {
		return {}
	}
}

export const to_json = (obj) => {
	try {
		return JSON.stringify(obj);
	}
	catch (e) {
		return '{}';
	}
}