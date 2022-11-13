class FieldSpecification {
	constructor(description, value) {
		this.value = value;
		const specParts = this.parseSpecFromDescription(description);
		this.name = specParts[0];
		this.type = specParts[1];
		this.details = specParts[2]
	}

	toString() {
		return `\
name=${this.name},
type=${this.type},
value=${this.value},
details=${this.details}
`;
	}

	parseSpecFromDescription(description) {
		if (!description) {
			description = "";
		}
		const parts = description.split(":");
		const name = parts[0];
		const type = this.parseType(parts[1]);
		const details = this.parseDetails(parts[2]);
		return [name, type, details];
	}

	parseDetails(description) {
		if (!description) {
			description = "";
		}
		const descriptionParts = description.split(",");
		const details = [];
		descriptionParts.forEach(p => {
			const detailParts = p.split("=", 2);
			const key = detailParts[0];
			const value = detailParts[1];
			details[key] = value;
		});
		return details;
	}

	parseType(description) {
		return (description) 
			? description
			: "String";
	}

	isAction() {
		return this.name === null
			|| this.name == ""
			|| this.name.startsWith(".");
	}
}

