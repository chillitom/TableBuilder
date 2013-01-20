Builder = (function() {
"use strict";
	function Node() {
		this.values = {};
		this.children = [];
	}

	function Builder() {
		this.root = new Node();
		this.stack = [];
		this.context = this.root;
	};

	Builder.prototype.push = function() {
		var child = new Node();

		this.context.children.push(child);
		this.stack.push(this.context);
		this.context = child;
		return this;
	};

	Builder.prototype.pop = function() {
		var parent = this.stack.pop();
		if(parent) {
			this.context = parent;
		}
		return this;
	};

	Builder.prototype.add = function(key, value) {
		this.context.values[key] = value;
		return this;
	}

	Builder.prototype.get = function(key) {
		var obj = valuesFromPath(this.stack);
		return obj[key];
	};

	function flattenTree(node, path, rows) {
		path.push(node);

		if(node.children.length > 0) {
			for(var n = 0; n < node.children.length; n++) {
				flattenTree(node.children[n], path, rows);
			}
		}
		else {
			rows.push(valuesFromPath(path));
		}

		path.pop();
	}

	function valuesFromPath(path) {
		var obj = {};

		for(var p = 0; p < path.length; p++) {
			var values = path[p].values
			var keys = Object.keys(values);
			for(var k = 0; k < keys.length; k++) {
				var key = keys[k];
				obj[key] = values[key];
			}
		}
		return obj;
	}

	Builder.prototype.buildRows = function()
	{
		var rows = [];

		flattenTree(this.root, [], rows);

		return rows;
	};

	return Builder;
})();
