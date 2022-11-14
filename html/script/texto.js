function generateCode() {
	const segmentDescriptions = getSegmentDescriptions();
	const segmentValues = getSegmentValues();
	const generatedCode = generate(segmentDescriptions, segmentValues);
	setGeneratedCode(generatedCode);
}

function getSegmentDescriptions() {
	const descriptionsText = getTextareaValue("segmentDescriptions");
	return descriptionsText.split("\n");
}

function getSegmentValues() {
	const valuesText = getTextareaValue("segmentValues");
	return valuesText.split("\n");
}

function generate(segmentDescriptions, segmentValues) {
	const entityName = getEntityName();
	const fields = generateFields(segmentDescriptions, segmentValues);
	const codeType = getCodeType();
	if (codeType == "jsbEntity") {
		return generateJsbEntity(entityName, fields);
	}
	if (codeType == "csvViaCut") {
		return generateCsvViaCut(fields);
	}
}

function generateFields(segmentDescriptions, segmentValues) {
	const fields = [];
	const generator = new FieldGenerator();
	for (var i=0; i<segmentValues.length; i++) {
		const description = segmentDescriptions[i];
		const value = segmentValues[i];
		const field = generator.generateField(description, value);
		if (field) {
			fields.push(field);
		}
	}
	return fields;
}

function getCodeType() {
	if (isButtonChecked("codeTypeJsbEntity")) {
		return "jsbEntity";
	}
	if (isButtonChecked("codeTypeCsvViaCut")) {
		return "csvViaCut";
	}
}

function isButtonChecked(id) {
	const elem = document.getElementById(id);
	return elem.checked;
}

function getEntityName() {
	const entityName = getInputText("entityName");
	return (entityName) ? entityName : "EntityName";
}

function setGeneratedCode(generatedCode) {
	setTextareaValue("generatedCode", generatedCode);
}

function getTextareaValue(id) {
	const elem = document.getElementById(id);
	return elem.value;
}

function setTextareaValue(id, text) {
	const elem = document.getElementById(id);
	elem.value = text;
}

function getInputText(id) {
	const elem = document.getElementById(id);
	return elem.value;
}
