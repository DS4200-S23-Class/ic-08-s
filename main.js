const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME = d3.select("#vis5")
	.append("svg")
	.attr("height", FRAME_HEIGHT)
	.attr("width", FRAME_WIDTH)
	.attr("class", "frame");

const build_barchart = () => {

	// Step 1: Load the data
	d3.csv("data/data.csv").then((data) => {

		// Step 2: Define the scales
		const MAX_Y = d3.max(data, (d) => { return parseInt(d.Value); });

		const X_SCALE = d3.scaleBand()
			.domain(data.map((d) => { return d.Category; }))
			.range([0, VIS_WIDTH])
			.paddingInner(0.2);

		const Y_SCALE = d3.scaleLinear()
			.range([VIS_HEIGHT, 0])
			.domain([0, MAX_Y]);

		// Step 3: Draw the bars
		const BARS = FRAME.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", (d) => { return X_SCALE(d.Category) + MARGINS.left; })
			.attr("y", (d) => { return Y_SCALE(d.Value) + MARGINS.top; })
			.attr("width", X_SCALE.bandwidth())
			.attr("height", (d) => { return VIS_HEIGHT - Y_SCALE(d.Value); })
			.attr("fill", "steelblue");

		// Step 4: Draw the axes
		const X_AXIS = d3.axisBottom(X_SCALE);
		const Y_AXIS = d3.axisLeft(Y_SCALE);

		FRAME.append("g")
			.attr("transform", `translate(${MARGINS.left}, ${VIS_HEIGHT + MARGINS.top})`)
			.call(X_AXIS);

		FRAME.append("g")
			.attr("transform", `translate(${MARGINS.left}, ${MARGINS.top})`)
			.call(Y_AXIS);

		// Step 5: Add labels
		FRAME.append("text")
			.attr("transform", `translate(${FRAME_WIDTH / 2}, ${FRAME_HEIGHT - 10})`)
			.style("text-anchor", "middle")
			.text("Category");

		FRAME.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", MARGINS.left / 2)
			.attr("x", 0 - (VIS_HEIGHT / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Value");

	});

};

build_barchart();