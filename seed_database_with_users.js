const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'roadrat',
	database: 'store',
});

connection.connect();

connection.query('USE store');
// connection.query('DROP TABLE user', function (error, results, fields) {
// 	if (error) {
// 		throw "Couldnt delete table 'user'";
// 	};
// });
connection.query('CREATE TABLE user (account INT PRIMARY KEY AUTO_INCREMENT, first VARCHAR(20), last VARCHAR(20), password VARCHAR(20), balance INT, address VARCHAR(50))');
connection.query('ALTER TABLE user AUTO_INCREMENT = 662921773');

//example data entry
// [
// 	"Barclay",
// 	"Gray",
// 	"elit,",
// 	"885753",
// 	"P.O. Box 614, 6009 Tortor. Rd.",
// 	88366339
// ],

const users = [
		[
			"Barclay",
			"Gray",
			"elit,",
			"885753",
			"P.O. Box 614, 6009 Tortor. Rd.",
			88366339
		],
		[
			"Jerome",
			"Hunt",
			"ac,",
			"632515",
			"8152 Pharetra Rd.",
			88366340
		],
		[
			"Scott",
			"Holt",
			"risus.",
			"102874",
			"Ap #222-9112 Non Rd.",
			88366341
		],
		[
			"Brock",
			"Rivers",
			"est.",
			"487605",
			"773-7616 Varius St.",
			88366342
		],
		[
			"Walter",
			"Giles",
			"auctor,",
			"137227",
			"P.O. Box 854, 9336 Metus. St.",
			88366343
		],
		[
			"Ferris",
			"Cummings",
			"euismod",
			"967420",
			"574-2700 Nec Avenue",
			88366344
		],
		[
			"Rashad",
			"Meadows",
			"ligula",
			"496322",
			"P.O. Box 898, 1804 Tellus St.",
			88366345
		],
		[
			"Cade",
			"Bender",
			"libero.",
			"335168",
			"P.O. Box 745, 8034 Non, St.",
			88366346
		],
		[
			"Colby",
			"Wells",
			"diam",
			"216785",
			"P.O. Box 959, 2385 Dui. Road",
			88366347
		],
		[
			"Hamish",
			"Casey",
			"volutpat.",
			"956185",
			"P.O. Box 591, 6475 Elementum, Rd.",
			88366348
		],
		[
			"Lionel",
			"Moses",
			"a",
			"410190",
			"3510 Orci Street",
			88366349
		],
		[
			"Ronan",
			"Kirkland",
			"et",
			"846855",
			"9563 Aliquam Road",
			88366350
		],
		[
			"Colt",
			"Kirby",
			"imperdiet",
			"592372",
			"219 Urna St.",
			88366351
		],
		[
			"Quinn",
			"Bolton",
			"lacinia",
			"459832",
			"9745 Integer Rd.",
			88366352
		],
		[
			"Russell",
			"Dunn",
			"metus.",
			"327929",
			"Ap #480-5307 Varius. Road",
			88366353
		],
		[
			"Kenneth",
			"Farmer",
			"mauris",
			"239685",
			"Ap #584-3606 Ac Street",
			88366354
		],
		[
			"Murphy",
			"Gillespie",
			"pede.",
			"282557",
			"Ap #366-3646 Duis St.",
			88366355
		],
		[
			"Ivor",
			"Sharp",
			"fringilla",
			"929107",
			"Ap #151-443 Nam Av.",
			88366356
		],
		[
			"Ralph",
			"Nash",
			"pharetra",
			"467630",
			"1244 Nisl. Av.",
			88366357
		],
		[
			"Coby",
			"Sharp",
			"dolor,",
			"334623",
			"589-2013 Vitae Road",
			88366358
		],
		[
			"Elvis",
			"Sargent",
			"non",
			"204126",
			"Ap #829-9755 Ac St.",
			88366359
		],
		[
			"Marsden",
			"Lee",
			"sociis",
			"396334",
			"P.O. Box 370, 3502 Donec Rd.",
			88366360
		],
		[
			"Quentin",
			"Ayala",
			"ullamcorper,",
			"206380",
			"271-7018 Purus. Rd.",
			88366361
		],
		[
			"Chaney",
			"Larson",
			"arcu",
			"868632",
			"Ap #410-2726 Erat. Avenue",
			88366362
		],
		[
			"Kamal",
			"House",
			"eu",
			"302391",
			"296-8486 Eleifend St.",
			88366363
		],
		[
			"Jason",
			"Merrill",
			"nec",
			"154887",
			"9255 Pellentesque Avenue",
			88366364
		],
		[
			"Stuart",
			"Armstrong",
			"Nullam",
			"459204",
			"558-2747 Torquent Road",
			88366365
		],
		[
			"Giacomo",
			"Curry",
			"feugiat",
			"674752",
			"404-3405 Arcu. Rd.",
			88366366
		],
		[
			"Sawyer",
			"Taylor",
			"leo.",
			"426475",
			"274-5395 Enim. Street",
			88366367
		],
		[
			"Caleb",
			"Bolton",
			"ligula",
			"870075",
			"Ap #373-4795 A St.",
			88366368
		],
		[
			"Gage",
			"Mcfadden",
			"enim.",
			"764592",
			"Ap #528-2893 Mauris Street",
			88366369
		],
		[
			"Kenneth",
			"Stephens",
			"eros",
			"997036",
			"Ap #505-1804 Nibh Street",
			88366370
		],
		[
			"Michael",
			"Aguilar",
			"Vestibulum",
			"454153",
			"506-2464 Vitae Rd.",
			88366371
		],
		[
			"Mark",
			"Rodgers",
			"facilisis.",
			"753337",
			"565-6837 Et, Road",
			88366372
		],
		[
			"Graiden",
			"Saunders",
			"nec",
			"365472",
			"Ap #572-3254 Ridiculus Avenue",
			88366373
		],
		[
			"Louis",
			"Townsend",
			"Sed",
			"118000",
			"P.O. Box 761, 9462 Gravida Road",
			88366374
		],
		[
			"Raja",
			"Waters",
			"mollis",
			"398014",
			"3872 Massa. St.",
			88366375
		],
		[
			"Hilel",
			"Maldonado",
			"quis",
			"916918",
			"1830 Vivamus Av.",
			88366376
		],
		[
			"Carter",
			"Rivas",
			"velit",
			"965413",
			"9000 Aliquam Ave",
			88366377
		],
		[
			"Callum",
			"Cummings",
			"Mauris",
			"249541",
			"P.O. Box 644, 4178 Proin St.",
			88366378
		],
		[
			"Lane",
			"Cantrell",
			"elit,",
			"170966",
			"4652 Magnis St.",
			88366379
		],
		[
			"Tate",
			"Cote",
			"ut",
			"688977",
			"413-5005 Nec St.",
			88366380
		],
		[
			"Hunter",
			"Oliver",
			"justo",
			"532921",
			"786 Gravida. St.",
			88366381
		],
		[
			"Jason",
			"Lang",
			"non,",
			"205354",
			"306-9051 Consectetuer Av.",
			88366382
		],
		[
			"Eric",
			"Donovan",
			"sed",
			"966937",
			"P.O. Box 446, 6366 Donec Ave",
			88366383
		],
		[
			"Hamilton",
			"Sherman",
			"dis",
			"567239",
			"914-8671 Diam Av.",
			88366384
		],
		[
			"Robert",
			"Pierce",
			"Sed",
			"576856",
			"319-3797 Velit Rd.",
			88366385
		],
		[
			"Chester",
			"Hudson",
			"rhoncus.",
			"674286",
			"P.O. Box 549, 2791 Nec, Rd.",
			88366386
		],
		[
			"Anthony",
			"Merrill",
			"amet",
			"419866",
			"Ap #667-694 Tincidunt, Ave",
			88366387
		],
		[
			"Carlos",
			"Lott",
			"nibh",
			"137507",
			"4143 Morbi Rd.",
			88366388
		],
		[
			"Rahim",
			"Houston",
			"lectus",
			"810277",
			"Ap #126-8177 Sociis Street",
			88366389
		],
		[
			"Zane",
			"Farley",
			"Mauris",
			"259229",
			"Ap #470-922 Libero Avenue",
			88366390
		],
		[
			"Magee",
			"Barr",
			"faucibus",
			"133993",
			"539-4434 Quis Avenue",
			88366391
		],
		[
			"Mason",
			"Lawson",
			"orci,",
			"348830",
			"Ap #227-6198 Pellentesque Av.",
			88366392
		],
		[
			"Melvin",
			"Barker",
			"Donec",
			"299909",
			"P.O. Box 255, 8559 Eleifend Avenue",
			88366393
		],
		[
			"Grady",
			"Sellers",
			"natoque",
			"983697",
			"Ap #924-463 Lacus Rd.",
			88366394
		],
		[
			"Samuel",
			"Workman",
			"posuere",
			"349902",
			"562 Iaculis Rd.",
			88366395
		],
		[
			"Hilel",
			"Duke",
			"amet",
			"276162",
			"952-8918 Suspendisse Road",
			88366396
		],
		[
			"Xander",
			"Willis",
			"Sed",
			"646346",
			"P.O. Box 220, 8025 Odio St.",
			88366397
		],
		[
			"Gage",
			"Chen",
			"sapien.",
			"876275",
			"Ap #154-814 Aliquam St.",
			88366398
		],
		[
			"Timon",
			"Parrish",
			"nibh",
			"900485",
			"P.O. Box 463, 239 Dolor. Ave",
			88366399
		],
		[
			"Hayden",
			"Saunders",
			"non,",
			"662557",
			"Ap #704-7685 Eu Rd.",
			88366400
		],
		[
			"Clinton",
			"Mcintyre",
			"ac,",
			"458586",
			"Ap #296-9263 Turpis Street",
			88366401
		],
		[
			"Hammett",
			"Browning",
			"quis,",
			"803109",
			"8711 Ut Ave",
			88366402
		],
		[
			"Vernon",
			"Slater",
			"Vivamus",
			"683403",
			"442-2568 Et Ave",
			88366403
		],
		[
			"James",
			"Blankenship",
			"in,",
			"671480",
			"5924 Amet, Av.",
			88366404
		],
		[
			"Malik",
			"Bond",
			"magna.",
			"680927",
			"P.O. Box 505, 7705 Hendrerit. Av.",
			88366405
		],
		[
			"Gil",
			"Ryan",
			"Pellentesque",
			"541452",
			"P.O. Box 630, 6092 A, Ave",
			88366406
		],
		[
			"Cole",
			"Hurley",
			"risus",
			"595705",
			"663-9629 Sapien, Avenue",
			88366407
		],
		[
			"Maxwell",
			"Coffey",
			"montes,",
			"700270",
			"8559 In Rd.",
			88366408
		],
		[
			"Herman",
			"Greene",
			"augue",
			"558281",
			"P.O. Box 934, 5901 Sed Rd.",
			88366409
		],
		[
			"Felix",
			"Spencer",
			"luctus",
			"121947",
			"P.O. Box 812, 114 Habitant Rd.",
			88366410
		],
		[
			"Gabriel",
			"Tucker",
			"Mauris",
			"410677",
			"101-4779 Pede. St.",
			88366411
		],
		[
			"Garrett",
			"Davis",
			"ullamcorper",
			"478889",
			"557 In Road",
			88366412
		],
		[
			"Edan",
			"Stone",
			"elit",
			"261679",
			"4104 Pede, Avenue",
			88366413
		],
		[
			"Prescott",
			"Diaz",
			"consectetuer",
			"805124",
			"P.O. Box 592, 5691 Malesuada Rd.",
			88366414
		],
		[
			"Tarik",
			"Daniel",
			"Donec",
			"561120",
			"829-8221 Vitae, Rd.",
			88366415
		],
		[
			"Burke",
			"Owens",
			"senectus",
			"984518",
			"Ap #717-4658 Risus Rd.",
			88366416
		],
		[
			"Bernard",
			"Butler",
			"enim.",
			"830974",
			"720-675 Faucibus Ave",
			88366417
		],
		[
			"Akeem",
			"England",
			"Nulla",
			"462061",
			"564-9978 Amet Street",
			88366418
		],
		[
			"Blaze",
			"Lowe",
			"enim",
			"542166",
			"9383 Vitae Avenue",
			88366419
		],
		[
			"Richard",
			"Bass",
			"tristique",
			"531116",
			"Ap #566-1613 Erat Street",
			88366420
		],
		[
			"Caesar",
			"Tran",
			"netus",
			"558454",
			"5801 Ipsum Rd.",
			88366421
		],
		[
			"Garrison",
			"Hart",
			"elit,",
			"600450",
			"P.O. Box 285, 5138 Ipsum Ave",
			88366422
		],
		[
			"Omar",
			"Simmons",
			"risus.",
			"208746",
			"Ap #273-7477 Ullamcorper. Street",
			88366423
		],
		[
			"Garth",
			"Peterson",
			"nibh.",
			"568964",
			"1584 Mauris Ave",
			88366424
		],
		[
			"Patrick",
			"Howard",
			"eu",
			"586715",
			"P.O. Box 709, 7545 Elit. St.",
			88366425
		],
		[
			"Gabriel",
			"Hogan",
			"vulputate,",
			"564222",
			"P.O. Box 323, 408 Accumsan Ave",
			88366426
		],
		[
			"Yardley",
			"Maxwell",
			"luctus",
			"596748",
			"Ap #699-6707 Augue Street",
			88366427
		],
		[
			"Nolan",
			"Avila",
			"in",
			"223422",
			"Ap #883-3096 Quis Road",
			88366428
		],
		[
			"Matthew",
			"Dudley",
			"augue.",
			"578577",
			"4196 Sem St.",
			88366429
		],
		[
			"Daquan",
			"Osborn",
			"dolor",
			"835906",
			"4285 Dictum Rd.",
			88366430
		],
		[
			"Gil",
			"Hester",
			"non,",
			"927601",
			"P.O. Box 400, 7658 Nec Rd.",
			88366431
		],
		[
			"Cullen",
			"Hess",
			"arcu.",
			"474180",
			"P.O. Box 468, 9525 Sed, Av.",
			88366432
		],
		[
			"Jelani",
			"Burns",
			"enim",
			"636901",
			"P.O. Box 656, 6532 Ligula. Avenue",
			88366433
		],
		[
			"Isaiah",
			"Garcia",
			"diam",
			"612021",
			"5342 Et, St.",
			88366434
		],
		[
			"Amir",
			"Osborn",
			"ligula",
			"499248",
			"105-8929 Curabitur Ave",
			88366435
		],
		[
			"Armando",
			"Wheeler",
			"mauris",
			"952437",
			"P.O. Box 376, 1181 Et St.",
			88366436
		],
		[
			"Keaton",
			"Le",
			"id,",
			"816246",
			"9944 Magna. St.",
			88366437
		],
		[
			"Brady",
			"Gilbert",
			"mi.",
			"942955",
			"P.O. Box 650, 2355 Pharetra. Avenue",
			88366438
		]
	]


users.forEach((user) => {
	connection.query('INSERT INTO user (first, last, password, balance, address) VALUES (?, ?, ?, ?, ?)', [user[0], user[1], user[2], user[3], user[4]], function (error, results, fields) {
		if (error) { throw error };
		if (results) {console.log("Inserted data: " + user)}
	});
})

connection.end();