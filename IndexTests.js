test("build a big index", function() {

	var rows = [];
	for(i = 0; i < 10; i++) {
		for(j = 0; j < 10; j++) {
			for(k = 0; k < 10; k++) {
				var row = {};
				row.a = i;
				row.b = i*2;
				row.c = i * j;
				row.d = i * j * 2;
				row.e = i*j*k;
				row.f = i*j*k*2;
				rows.push(row);
			}
		}

	}

	var index = new Index(rows, ["a"]);

	ok(true)
});

test("index a single column", function() {
	var rows = [
		{ league: "A", team: "Team United"},
		{ league: "A", team: "Club United"},
		{ league: "B", team: "Some City"},
		{ league: "B", team: "An Albion"},
	];

	var index = new Index(rows);

	deepEqual(index.lookup("league", "A"), [rows[0], rows[1]]);
});