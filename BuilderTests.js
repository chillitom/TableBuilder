
test("add an item", function() {
	var b = new Builder();
	b.add("league", "Premiership");
	var results = b.buildRows();

	ok(results[0].league == "Premiership");
});
test("add a second level item", function() {
	var b = new Builder();
	b.add("league", "Premiership");
	b.push();
	b.add("homeTeam", "Liverpool");
    var results = b.buildRows();

	ok(results[0].league == "Premiership");
	ok(results[0].homeTeam == "Liverpool");
});
test("add a two second level items", function() {
	var results = new Builder()
	.add("league", "Premiership")
	.push()
		.add("homeTeam", "Liverpool")
	.pop()
	.push()
		.add("homeTeam", "Wigan")
	.pop().buildRows();
    
	ok(results.length == 2);
	ok(results[0].homeTeam == "Liverpool");
	ok(results[1].homeTeam == "Wigan");
});
test("get a value added by a previous level", function() {
	var b = new Builder();
	b.add("league", "Premiership");
	b.push();

	ok(b.get("league") == "Premiership");
});
test("the full deal", function() {
	var builder = new Builder();

	builder.add("top", 123);

	
	for(n = 0; n < 10; n++) {
		builder.push();
		builder.add("a", 1);
		builder.add("b", 2);
		for(m = 0; m < 10; m++) {
			builder.push();
			builder.add("d", 4);
			builder.add("e", 5);
			for(o = 0; o < 10; o++) {
				builder.push()
					.add("g", 7)
					.add("h", 8)
					.add("i", 9)
					.pop();
			}
			builder.add("f", 6);
			builder.pop();			
		}
		builder.add("c", 3);
		builder.pop();
	}

	var rows = builder.buildRows();

	equal(rows.length, 1000, "should have one row per leaf");
});

