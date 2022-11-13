function generateJsbEntity(entityName, segmentDescriptions, segmentValues) {
	const jsbFields = generateFields(segmentDescriptions, segmentValues);
	return createEntity(entityName, jsbFields);

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
}

function createEntity(entityName, fields) {
	return openEntity(entityName) //
		+ addAllFields(fields) //
		+ closeEntity();
}

function openEntity(entityName) {
	return `\
@JsbEntity
public class ${entityName} {
`;
}

function addAllFields(fields) {
	return fields
		.map(f => fieldToCode(f))
		.join("\n\n");
}

function fieldToCode(field) {
	const adapter = generateAdapterAnnotation(field);
	const annotation = generateFieldAnnotation(field);
	const classField = generateClassField(field);

	const lines = [];
	if (adapter) {
		lines.push(adapter);
	}
	lines.push(annotation);
	lines.push(classField);
	return lines.map(line => "\t" + line).join("\n");
}

function generateAdapterAnnotation() {
	if (!this.adapter) {
		return "";
	}
	const adapterClass = this.adapter;
	return `\t@JsbTypeAdapter(${adapterClass})`;
}

function generateFieldAnnotation(field) {
	const options = generateFieldAnnotationOptions(field);
	const optionText = options.join(", ");
	return `@JsbField(${optionText})`;

	function generateFieldAnnotationOptions(field) {
		const basic = generateFieldAnnotationBasicOptions(field);
		const user = generateFieldAnnotationUserOptions(field);
		return basic.concat(user);

		function generateFieldAnnotationBasicOptions(field) {
			const order = field.order;
			const length = field.length;
			return [
				`order=${order}`,
				`length=${length}`
			];
		}

		function generateFieldAnnotationUserOptions(field) {
			const details = [];
			for (key in field.details) {
				if (key) {
					const value = field.details[key];
					details.push(`${key}=${value}`);
				}
			}
			return details;
		}
	}
}



function generateClassField(field) {
	const type = field.type;
	const name = field.name;
	return `private ${type} ${name};`;
}

function closeEntity() {
	return `
}`;
}


