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
	return generateJsbEntity(entityName, segmentDescriptions, segmentValues);
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
