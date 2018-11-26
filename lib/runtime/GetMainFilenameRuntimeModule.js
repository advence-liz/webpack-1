/*
	MIT License http://www.opensource.org/licenses/mit-license.php
*/

"use strict";

const RuntimeGlobals = require("../RuntimeGlobals");
const RuntimeModule = require("../RuntimeModule");
const Template = require("../Template");

class GetMainFilenameRuntimeModule extends RuntimeModule {
	constructor(compilation, chunk, contentType, global, filename) {
		super(`get ${contentType} filename`);
		this.compilation = compilation;
		this.chunk = chunk;
		this.contentType = contentType;
		this.global = global;
		this.filename = filename;
	}

	/**
	 * @returns {string} runtime code
	 */
	generate() {
		const { global, chunk, filename, compilation } = this;
		const mainTemplate = compilation.mainTemplate;
		const url = mainTemplate.getAssetPath(JSON.stringify(filename), {
			hash: `" + ${RuntimeGlobals.getFullHash}() + "`,
			hashWithLength: length =>
				`" + ${RuntimeGlobals.getFullHash}().slice(0, ${length}) + "`
		});
		return Template.asString([
			`${global} = function() {`,
			Template.indent([`return ${url};`]),
			"};"
		]);
	}
}

module.exports = GetMainFilenameRuntimeModule;
