insert into
	users
values
	('82edaf2e-4535-415f-b6b8-ad9172ad3c17','andrii', 'testpas'),
    ('ad440429-e6a7-4ecc-a372-a735ac7ef7dc','test', 'test');

insert into
	carts(user_id, status)
values
	('82edaf2e-4535-415f-b6b8-ad9172ad3c17','OPEN'),
	('ad440429-e6a7-4ecc-a372-a735ac7ef7dc','ORDERED');

insert into
	products
values
	('7567ec4b-b10c-48c5-9345-fc73c48a80aa','A Journey to Angular Development', 'This book is an exciting journey where novice developers learn everything they need to do before they start working on the Angular framework and develop dynamic web applications.',34.66),
	('7567ec4b-b10c-48c5-9345-fc73c48a80a0','Effective JavaScript: 68 Specific Ways','Effective JavaScript is organized around 68 proven approaches for writing better JavaScript, backed by concrete examples.',32.64),
	('7567ec4b-b10c-48c5-9345-fc73c48a80a2','The Pragmatic Programmer: Your Journey To Mastery','The Pragmatic Programmer is one of those rare tech books you’ll read, re-read, and read again over the years.',23.54);

insert into
	cart_items
values
	('bd652e2a-e129-4dbc-ab02-597e94b4f079','7567ec4b-b10c-48c5-9345-fc73c48a80aa',3),
	('3d788841-6959-4222-a9e8-f059c7aceb4a','7567ec4b-b10c-48c5-9345-fc73c48a80a2',1)

insert into
	orders(cart_id, user_id, payment, delivery, comments, status, total)
values
	('bd652e2a-e129-4dbc-ab02-597e94b4f079', '82edaf2e-4535-415f-b6b8-ad9172ad3c17', '{ "type": "applePay", "address": "test", "creditCard": "test" }', '{ "type": "delivery", "address": "test" }', 'test', 'OPEN', 200.5);
