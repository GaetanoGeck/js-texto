function generateCsvViaCut(fields) {
	const header = generateHeader(fields);
	const cutCommand = generateCutCommand(fields);
	return `${header}; ${cutCommand}`;
}

function generateHeader(fields) {
	const names = fields.map(f => f.name).join(";");
	return `echo '${names}'`;
}

function generateCutCommand(fields) {
	const fieldBounds = fields.map(f => bounds(f));
	const fieldList = fieldBounds.map(b => `${b[0]}-${b[1]}`).join(",");
	return `cut -b '${fieldList}' --output-delimiter=';'`
}

function bounds(field) {
	return [field.offset, field.offset+field.length-1];
}
