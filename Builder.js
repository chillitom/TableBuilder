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
		var obj = objectFromPath(this.stack);
		return obj[key];
	};

	function walkTree(node, path, leafFunc) {
		path.push(node);

		if(node.children.length > 0) {
			for(var n = 0; n < node.children.length; n++) {
			//	console.log("child " + n)
				walkTree(node.children[n], path, leafFunc);
			}
			//node.children.forEach(function (child) {
			//	walkTree(child, path, leafFunc);
			//});
		}
		else {
			leafFunc(path);
		}

		path.pop();
	}

	function objectFromPath(path) {
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

		walkTree(this.root, [], function(path) {
			var row = objectFromPath(path);
			rows.push(row);
		});

		return rows;
	};

	return Builder;
})();
