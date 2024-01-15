const fs = require("fs");
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.addTransform("htmlmin", htmlminTransform);
	}

	// Passthrough
	eleventyConfig.addPassthroughCopy({ "src/assets": "." });

	// Watch targets
	eleventyConfig.addWatchTarget("./src/styles/");

	return {
		markdownTemplateEngine: "njk",
		dir: {
			input: "src/pages",
			output: "public",
			includes: "../layouts",
			layouts: "../layouts",
			data: "../data",
		},
	};
}

function htmlminTransform(content, outputPath) {
	if( outputPath.endsWith(".html") ) {
		let minified = htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true
		});
		return minified;
	}
	return content;
}