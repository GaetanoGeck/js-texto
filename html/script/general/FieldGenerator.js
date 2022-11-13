class FieldGenerator {
	constructor() {
		this.currentOrder = 0;
		this.currentFiller = 0;
		this.currentOffset = 1;
		this.skipBefore = 0;
		this.lastField = null;
	}

	generateField(description, value) {
		const specification = new FieldSpecification(description, value);
		if (specification.isAction()) {
			this.performAction(specification);
		}
		else {
			return this.generateFieldFromSpecification(specification);
		}
	}

	performAction(specification) {
		const actionName = specification.name;
		if (!actionName || actionName == ".skipBefore") {
			this.performSkipBefore(specification);
		}
		else if (actionName == ".skipAfter") {
			this.performSkipAfter(specification);
		}
	}

	performSkipBefore(specification) {
		const length = specification.value.length;
		this.skipBefore += length;
		this.currentOffset += length;
	}

	performSkipAfter(specification) {
		const length = specification.value.length;
		this.lastField.addDetail("skipAfter", length);
		this.currentOffset += length;
	}

	generateFieldFromSpecification(specification) {
		const field = new Field();

		field.order = this.currentOrder++;
		field.offset = this.currentOffset;
		field.length = specification.value.length;
		this.currentOffset += field.length;

		field.name = this.determineFieldName(specification.name);
		field.type = specification.type;
		const details = this.generateFieldDetails(specification);
		field.details = details;

		return field;
	}

	determineFieldName(name) {
		if (name == "#filler") {
			this.currentFiller++;
			return `filler${this.currentFiller}`;
		}
		else {
			return name;
		}
	}

	generateFieldDetails(specification) {
		const skipDetails = this.generateSkipDetails();		
		const userDetails = specification.details;
		return Object.assign({}, skipDetails, userDetails);
	}

	generateSkipDetails() {
		const skipDetails = [];
		if (this.skipBefore > 0) {
			skipDetails["skipBefore"] = this.skipBefore;
			this.skipBefore = 0;
		}
		return skipDetails;
	}
}
