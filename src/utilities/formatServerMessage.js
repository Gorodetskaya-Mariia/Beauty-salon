export const formatServerMessage = (string) => {
	return string
			.replace(/_/g, ' ')
			.toLowerCase()
			.split('')
			.reduce((str, char, index, array)=> index === 0 ? str + char.toUpperCase() : str + char, '');
};