Index = (function(){
	"use strict";

	function Index(rows, columnsToIndex) {
		this.indices = {};

		if(rows && rows.length > 0) {
			if(!columnsToIndex) {
				columnsToIndex = Object.keys(rows[0]);
			}

			var columns = Object.keys(rows[0])

			for(var c = 0; c < columnsToIndex.length; c++) {
				var index = {};
				var columnName = columnsToIndex[c];
				this.indices[columnName] = index;

				for(var n = 0; n < rows.length; n++) {
					var row = rows[n];
					var value = row[columnName];
					var refs = index[value];
					if(refs === undefined) {
						refs = index[value] = [];
					}
					refs.push(row);
				}
			}
		}
	}

	Index.prototype.lookup = function(column, value) {
		var index = this.indices[column];
		if(!index) {
			throw new Error("Column not indexed");
		}

		var refs = index[value];
		if(!refs) {
			return [];
		}
		return refs;
	};

	return Index;
})();