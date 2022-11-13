class Field {

	toString() {
		return `\
name=${this.name},
type=${this.type},
details=${this.details}
`;
	}	

	getDetail(key) {
		return this.details[key];
	}

	addDetail(key, value) {
		this.details[key] = value;
	}

}
