function setUpExample() {
	const description = getSegmentDescriptionExample();
	setTextareaValue("segmentDescriptions", description);
	const values = getSegmentValuesExample();
	setTextareaValue("segmentValues", values);

	function getSegmentDescriptionExample() {

		return `\
one::fill=0

two:Date

tri
`;
	}

	function getSegmentValuesExample() {
		return `\
alpha
foo
2022-11-13
bar
gamma
`;
	}

}


setUpExample();
