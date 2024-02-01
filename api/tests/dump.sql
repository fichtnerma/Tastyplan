COPY public."DataSchema" (id, "ingredientHash", "recipeHash") FROM stdin;
1	ab753497c7045072ba4ad38eb8c75e233a4609fdc39d9473dfa7de7592f2ef47	57e1129e6abda7994bfd0172c06d0aa5f38922398fbe4ac3f9dc18efeb89753d
\.


--
-- Data for Name: Favorites; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Favorites" (id, "userId", "recipeId") FROM stdin;
1	testUser1@test.de	159
2	testUser1@test.de	74
\.


--
-- Data for Name: Ingredient; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Ingredient" (id, name, categories, subcategories, allergens, fat, carbs, protein, calories, calcium, iron, magnesium) FROM stdin;
1	agar agar	Miscellaneous	Gelling and binding agents	{}	0.2	\N	2.4	160	660	4.5	100
2	agave syrup	Sweets	Sugar and sweeteners	{}	\N	73.1	0.2	293	\N	\N	\N
3	maple syrup	Sweets	Sugar and sweeteners	{}	0.3	88.7	\N	358	96	0.1	30
4	alga nori dried	Vegetables	Dried vegetables	{}	1.6	10.5	31.5	255	320	37	490
5	älplermagronen, prepared	Courts	Other salty	{}	9	17.9	6	180	120	0.4	20
6	amaranth seeds, cooked	Cereal products, pulses and potatoes	Other cereal products	{}	2.1	18.1	5	119	58	3	84
7	amaretti	Sweets	Guetzli	{", raw"}	13	76.7	8.8	464	69	0.9	62
8	applesauce	Fruits	Fruit cooked (incl. preserves)	{}	0.3	20.5	0.3	89	4.4	0.2	3.6
9	apple juice	Fruits	Fruit juices,Soft drinks	{}	0.1	11.9	0.2	50	4.5	0.3	4.7
10	cider, 6.2 vol%	Alcoholic drinks	Wine	{}	\N	7.3	\N	64	5	0.3	4
11	appenzeller	Milk and dairy products	Hard cheese	{milk}	31.7	\N	24.3	384	740	0.3	29
12	apricot dried	Fruits	Fruits dried	{}	0.5	59.1	2.9	239	82	1.4	50
13	apricot	Fruits	Fruits fresh	{}	0.1	9	0.8	44	15	0.2	8.4
14	artichokes	Vegetables	Vegetables cooked (incl. canned)	{", raw"}	0.5	2.3	1.8	27	25	0.4	18
15	cold cuts	Meat and sausage products	Boiled sausage products	{}	24.2	0.7	13.9	276	8.1	0.8	12
16	avocado	Vegetables	Fresh vegetables, nuts, seeds and oil fruits	{}	14.2	0.8	1.8	144	16	1	33
17	baker's yeast, pressed	Miscellaneous	Yeast,Miscellaneous	{}	1.2	1.1	16.7	96	16	2.9	41
18	balsamic vinegar	Miscellaneous	Salt, spices and flavours	{}	0.6	25.8	0.7	128	18	1	12
19	banana dried	Fruits	Fruits dried	{}	1.8	80.7	3.9	370	22	1.2	110
20	banana	Fruits	Fruits fresh	{}	0.1	19.7	1.1	89	5.1	0.2	28
21	basil	Vegetables	Herbs	{}	0.8	5.1	3.1	46	250	5.5	11
22	basel treat	Sweets	Guetzli	{}	7.9	75	7.5	412	51	1	40
23	farmhouse bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	2	44.3	9.2	241	46	1.5	38
24	bauernschüblig	Meat and sausage products	Raw sausage products	{}	48.5	0.3	21.3	524	4.8	1.5	23
25	tree nut	Nuts, seeds and oil fruits		{}	67.3	6.9	15.7	709	78	2.6	140
26	tree nut bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	17.9	30.8	9.2	332	31	2.1	67
27	tree nut oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
28	béchamel sauce, homemade	Miscellaneous	Sauces	{}	9.9	10.1	4.2	147	120	0.1	12
29	berries	Fruits	Fruits fresh	{}	0.5	6.3	0.7	40	18	0.2	12
30	alpine cheese	Milk and dairy products	Hard cheese	{milk}	38.3	\N	27.1	453	920	\N	\N
31	hobelkäse	Milk and dairy products	Hard cheese	{milk}	41.2	\N	30	491	\N	\N	\N
32	tongue sausage	Meat and sausage products	Boiled sausage products	{}	29.4	\N	17.3	333	3.4	1.3	20
33	beaver	Sweets	Other sweet baked goods	{}	5.6	65.6	7.8	355	52	1.3	30
34	radler	Alcoholic drinks	Beer	{}	\N	7.4	0.2	39	4.5	0.1	11
35	beer non-alcoholic	Alcoholic drinks	Beer	{}	\N	4.9	0.4	23	4.8	\N	6.2
36	beer lager	Alcoholic drinks	Beer	{}	\N	3.1	0.5	42	3.5	\N	9.6
37	brewer's yeast, dried	Special food	Supplements,Miscellaneous	{}	4.2	26.5	47.9	354	50	18	230
38	beer sausage	Meat and sausage products	Boiled sausage products	{}	25.4	\N	15.6	291	2.9	1.2	13
39	pear dried	Fruits	Fruits dried	{}	1.4	59.7	2.3	288	48	0.8	34
40	pear	Fruits	Fruits fresh	{}	0.3	10.9	0.5	54	6.5	0.1	8.2
41	pear juice	Fruits	Fruit juices,Soft drinks	{}	0.3	12.1	0.5	52	10	0.2	7
42	birnenweggen	Sweets	Other sweet baked goods	{egg}	10.4	57.2	4.9	363	64	1.6	32
43	blanc battu, nature, lean	Milk and dairy products	Cream cheese and curd	{milk}	\N	3.9	7.8	47	130	0.2	12
44	puff pastry	Cereal products, pulses and potatoes	Doughs	{}	24	35.1	5.7	383	4.6	0.3	7.4
45	puff pastry sticks	Salty snacks	Puff pastries	{}	33.5	40.4	7.1	496	14	0.9	21
46	lettuce	Vegetables	Vegetables fresh	{}	0.3	1.4	1.6	18	53	1	13
47	blue cheese	Milk and dairy products	Hard cheese	{milk}	31.5	0.2	19.1	360	610	0.4	24
48	cauliflower, steamed	Vegetables	Vegetables cooked (incl. canned)	{}	0.3	2.3	2.4	26	20	0.4	14
49	cauliflower	Vegetables	Vegetables fresh	{}	0.3	2.3	2.4	26	20	0.5	15
50	black pudding	Meat and sausage products	Cooked sausages	{}	10.8	2.6	10.2	149	61	30	13
51	bean	Cereal products, pulses and potatoes	Legumes	{}	1.5	40.7	20.9	305	130	6.3	160
52	bean green	Vegetables	Vegetables fresh	{}	0.2	3.6	2.1	31	56	1	28
53	meat bouillon	Stews and soups	Meat Stews	{}	0.3	0.2	0.3	5	1	0.2	10
427	anchovy in oil	Fish	Sea fish	{}	8.5	0.2	26.4	182	290	2.7	230
54	poultry bouillon	Stews and soups	Meat Stews	{}	0.3	0.3	0.3	5	6	\N	11
55	vegetables bouillon	Stews and soups	Vegetable Stews	{}	0.4	0.4	0.3	6	1	0.1	4
56	branchli	Sweets	Chocolate and cocoa products	{}	35.7	49.1	8.3	558	190	1.5	79
57	grain brandy, 40 vol%	Alcoholic drinks	Spirits	{}	\N	0.1	\N	234	1.9	\N	1
58	brandy from wine	Alcoholic drinks	Spirits	{}	\N	1.9	\N	228	\N	\N	1
59	brandy from sugar cane	Alcoholic drinks	Spirits	{}	\N	\N	\N	222	\N	0.1	\N
60	gravy bound	Miscellaneous	Sauces	{}	3	4.6	1.6	53	18	0.6	8
61	bresaola	Meat and sausage products	Raw sausage products	{}	3.9	0.4	32.4	167	35	7.1	\N
62	brie cream	Milk and dairy products	Soft cheese	{milk}	30	\N	17.7	342	500	0.2	20
63	brie	Milk and dairy products	Soft cheese	{milk}	23.5	\N	21.4	298	420	0.1	19
64	broccoli	Vegetables	Vegetables fresh	{}	0.4	2.4	3	31	93	1.4	25
65	blackberry	Fruits	Fruits fresh	{}	0.7	6.5	1.1	47	31	0.4	20
66	bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	4.6	44.6	9.2	264	29	1.5	36
67	smoked boiled sausages	Meat and sausage products	Boiled sausage products	{}	21.2	0.5	14	249	8.5	0.9	13
68	cooked sausages	Meat and sausage products	Boiled sausage products	{}	21.6	0.8	13.4	251	12	0.7	13
69	watercress	Vegetables	Vegetables fresh	{}	0.2	0.3	2.2	17	160	1.3	20
70	brunsli	Sweets	Guetzli	{}	29.9	43.3	14.9	515	140	3.1	140
71	buckwheat grain	Cereal products, pulses and potatoes	Other cereal products	{gluten}	1.7	71	9.8	346	18	3.8	140
72	buckwheat flour	Cereal products, pulses and potatoes	Flours and starches	{gluten}	2.2	68.4	11.5	348	24	2.5	160
73	bürli	Breads, flakes and breakfast cereals	Breads and bread products	{}	1	41.5	8.6	215	17	1.3	28
74	butter croissants light	Breads, flakes and breakfast cereals	Breads and bread products	{}	24.2	43.5	8.7	432	52	1	25
75	butter croissants wholemeal	Breads, flakes and breakfast cereals	Breads and bread products	{}	19.7	38.7	6.8	368	15	1	24
76	buttermilk	Milk and dairy products	Milk and yoghurt drinks	{milk}	0.5	4	3.4	34	110	0.1	16
77	café crème, unsweetened	Soft drinks	Coffee	{}	1.1	0.5	0.3	13	14	\N	3.7
78	cake financier	Sweets	Cakes, Pies and Cake	{}	26.1	38.5	11.1	440	80	1	71
79	camembert cream	Milk and dairy products	Soft cheese	{milk}	31.7	\N	17.1	355	350	0.2	16
80	camembert	Milk and dairy products	Soft cheese	{milk}	23.7	\N	20.8	297	370	0.1	19
81	cappuccino	Milk and dairy products	Milk and yoghurt drinks,Soft drinks	{milk}	2.2	2.6	1.7	37	67	\N	6.6
82	capuns	Courts	Other salty	{}	10.2	9.6	8.1	164	42	1	15
83	cashew nut	Nuts, seeds and oil fruits		{shellFruit}	45.2	23.2	21.5	593	40	5.9	270
84	cervelat	Meat and sausage products	Boiled sausage products	{}	21.5	0.5	13.4	249	11	0.8	13
85	mushroom	Vegetables	Mushrooms	{}	0.3	1.1	3.7	25	7	1	11
86	chia seeds	Nuts, seeds and oil fruits		{}	34.1	1.8	21.4	482	550	6.5	320
87	chicory	Vegetables	Vegetables fresh	{}	0.2	0.7	1	14	20	0.2	10
88	chinese cabbage	Vegetables	Vegetables fresh	{}	0.3	1.2	1.1	16	40	0.6	11
89	chräbeli	Sweets	Guetzli	{}	2.9	75.3	8.6	366	32	1.8	14
90	cicorino red	Vegetables	Vegetables fresh	{}	0.1	1.6	1.4	19	36	0.3	\N
91	cocktail sauce	Miscellaneous	Sauces	{}	74.5	3.8	2.4	696	21	0.9	4.8
92	cola drink sweetened	Soft drinks	Sweet drinks	{}	\N	10	\N	40	5	\N	1
93	cola drink with sweeteners	Soft drinks	Sweet drinks energy reduced	{}	\N	\N	\N	\N	4	\N	1
94	coleslaw salad	Courts	Salads	{}	10.3	4.1	1.6	120	59	0.3	11
95	coppa	Meat and sausage products	Raw sausage products	{}	22.5	0.3	28.8	319	13	1.4	26
96	cornflakes	Breads, flakes and breakfast cereals	Muesli mixes and breakfast cereals	{}	0.6	79.7	7.7	363	13	2	14
97	cotechino	Meat and sausage products	Raw sausage products	{}	42.3	\N	17.2	450	30	2.1	\N
98	cotto	Meat and sausage products	Cooked sausages	{}	3.1	0.6	15.7	93	7.5	0.7	18
99	crackers	Salty snacks	Salt sticks and pretzels	{}	15.9	66.3	9.2	449	110	1.6	24
100	cream slice	Sweets	Other sweet baked goods	{}	18.8	28.8	4.1	301	79	0.3	11
101	date dried	Fruits	Fruits dried	{}	0.6	64.7	2.4	289	68	2.2	55
102	spelt flour	Cereal products, pulses and potatoes	Flours and starches	{gluten}	2.2	65	14.3	348	28	2.4	64
103	safflower oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
104	double cream, pasteurised	Fats and oils	Cream,Milk and dairy products	{}	50	2.7	1.9	468	49	0.1	5
105	cod	Fish	Sea fish	{}	0.4	\N	18.1	76	13	0.2	23
106	dulce de leche	Sweets	Jams and sweet spreads	{}	7.3	52.6	5.7	299	210	0.1	18
107	sweet chestnut	Nuts, seeds and oil fruits		{}	1.9	41.2	2.9	210	18	2.1	31
108	egli	Fish	Freshwater fish	{}	0.7	\N	18	79	80	0.9	30
109	egg liqueur 16.5 vol%	Alcoholic drinks	Other alcoholic beverages	{egg}	7.7	30.8	4.4	313	15	0.8	4.4
110	chanterelle	Vegetables	Mushrooms	{}	0.5	0.2	2.3	24	8	6.5	14
111	iceberg lettuce	Vegetables	Vegetables fresh	{}	0.2	1.6	1	16	34	0.5	7
112	iced tea	Soft drinks	Sweet drinks,Soft drinks	{}	\N	7.5	\N	30	0.1	\N	0.9
113	emmental	Milk and dairy products	Hard cheese	{milk}	32.6	\N	28.4	408	1030	0.4	31
114	endive	Vegetables	Vegetables fresh	{}	0.2	1.2	1.8	16	54	1.4	10
115	energy drink	Soft drinks	Sweet drinks	{}	\N	10.9	\N	44	4	\N	1
116	pea	Vegetables	Vegetables cooked (incl. canned)	{}	0.8	12.8	4.8	87	32	1.6	21
117	pea green	Vegetables	Vegetables fresh	{}	0.7	12	6	90	26	1.9	34
118	strawberry	Fruits	Fruits fresh	{}	0.5	6	0.6	39	18	0.2	12
119	peanut	Nuts, seeds and oil fruits		{peanut}	49.1	14.8	26.1	623	65	1.6	160
120	peanut flips	Salty snacks	Chips	{peanut}	24.2	56.5	13.2	507	16	0.9	43
121	peanut roasted, salted	Salty snacks	Salted nuts, seeds, kernels	{peanut}	50	15	26.2	631	47	1.2	170
122	peanut butter	Sweets	Jams and sweet spreads	{peanut}	51.8	12.5	26.1	636	37	2	180
123	peanut oil	Fats and oils	Oils	{peanut}	90	\N	\N	810	\N	\N	\N
124	espresso crème, unsweetened	Soft drinks	Coffee	{}	2.5	0.8	0.5	28	23	\N	4.1
125	vinegar	Miscellaneous	Salt, spices and flavours	{}	\N	0.7	0.1	22	7	0.2	7.7
126	falafel	Courts	Oriental dishes	{}	7.8	26.3	8.4	222	44	1.6	41
127	spring cabbage	Vegetables	Vegetables fresh	{}	0.9	2.5	4.3	44	270	1.3	27
128	fig dried	Fruits	Fruits dried	{}	1.2	55.9	3.1	267	190	1.4	67
129	fig	Fruits	Fruits fresh	{}	0.5	13.5	1.2	71	57	0.3	22
130	whitefish	Fish	Freshwater fish	{fish}	2.7	\N	19.2	101	34	0.4	26
131	fennel	Vegetables	Vegetables fresh	{}	0.3	2.3	1.1	23	37	0.5	12
132	fermented dough	Cereal products, pulses and potatoes	Doughs	{}	0.9	38.3	7.8	199	13	1.5	32
133	fish	Fish	Freshwater fish,Fish	{fish}	6.9	\N	20.9	146	23	0.8	30
134	fish fingers	Fish	Sea fish	{fish}	18.6	16.6	16	300	11	0.4	19
135	tarte flan dough	Cereal products, pulses and potatoes	Doughs	{}	2.9	39.9	7.5	221	11	1.1	25
136	meat	Meat and offal	Veal,meat and offal	{}	6.7	\N	21.4	146	6.5	1.1	22
137	flounder	Fish	Sea fish	{}	0.7	\N	16.5	72	48	0.3	22
138	fondue non-alcoholic, prepared	Courts	Other salty	{}	21.5	1.6	18.7	283	680	0.5	22
139	trout	Fish	Freshwater fish	{fish}	7	\N	16	127	14	2	30
140	fotzel slices	Courts	Other sweet dishes	{}	9.9	24.5	8	222	56	0.7	13
141	fribourg vacherin	Milk and dairy products	Hard cheese	{milk}	30.4	\N	23.5	370	640	0.1	25
142	cream cheese	Milk and dairy products	Cream cheese and curd	{milk}	32.1	4.5	11.1	351	110	0.2	8
143	fruit cocktail	Fruits	Fruit cooked (incl. preserves)	{}	0.2	17.3	0.6	77	8.2	0.1	7.4
144	fruits cooked	Fruits	Fruit cooked (incl. preserves)	{}	0.4	9.9	0.6	50	14	0.2	8.5
145	fruits dried	Fruits	Fruits dried	{}	1.1	60.5	2.5	278	70	1.4	53
146	fruits	Fruits	Fruits fresh	{}	0.2	11.3	0.6	54	14	0.2	12
147	fruit juice spritzer , unsweetened	Soft drinks	Fruit and vegetable juices	{}	0.1	7.4	0.2	31	7.4	0.2	4.8
148	fruit juice	Fruits	Fruit juices,Soft drinks	{}	0.1	12.3	0.4	52	7.7	0.3	7.4
149	spring roll	Courts	Asian dishes	{}	11.2	23.1	6.5	224	25	0.9	16
150	five-grain beer	Alcoholic drinks	Beer	{}	\N	2	0.6	40	3.6	\N	11
151	shrimp	Fish	Seafood, crustaceans and shellfish	{crustacean}	0.6	1.2	11.4	56	30	0.3	\N
152	poultry meat	Meat and offal	Poultry	{}	5.3	0.1	21.6	134	7.5	0.5	25
153	poultry lyoner	Meat and sausage products	Boiled sausage products	{}	16.4	0.9	13.5	205	13	0.5	17
154	minced meat	Meat and offal	Veal,meat and offal	{}	6.2	\N	21.6	143	4.2	1.1	20
155	vegetables	Vegetables	Vegetables fresh	{}	0.3	3.7	1.3	26	27	0.4	13
156	barley flakes	Breads, flakes and breakfast cereals	Flakes, bran and germ	{gluten}	1.5	66.1	8.5	333	16	2	66
157	sliced meat	Meat and offal	Veal,meat and offal	{}	3.3	0.1	22	118	6.4	0.8	22
158	cereal flakes	Breads, flakes and breakfast cereals	Flakes, bran and germ	{}	3.2	64	10.8	348	26	3.6	94
159	glarus schabziger	Milk and dairy products	Cream cheese and curd	{milk}	0.5	\N	31.6	132	860	0.2	34
609	garam masala	Spices		{}	\N	\N	\N	\N	\N	\N	\N
160	gorgonzola	Milk and dairy products	Hard cheese	{milk}	31.2	0.1	19	357	610	0.3	20
161	pomegranate	Fruits	Fruits fresh	{}	1.2	14.3	1.4	81	9.5	0.2	12
162	grapefruit	Fruits	Fruits fresh	{}	0.5	8	0.9	42	23	0.1	8
163	gruyère	Milk and dairy products	Hard cheese	{milk}	32	\N	26.4	396	900	0.4	35
164	gumdrop with fruit essence	Sweets	Sweets, fruit and chewing gum	{}	\N	78.6	6.6	341	9	0.2	2
165	cucumber in vinegar	Vegetables	Vegetables cooked (incl. canned)	{}	0.1	2.1	0.7	14	14	1	11
166	cucumber	Vegetables	Vegetables fresh	{}	0.1	2	0.7	14	15	0.2	10
167	meatloaf	Courts	Other salty	{}	7.7	8.2	15.8	166	13	1.3	16
168	oatmeal	Breads, flakes and breakfast cereals	Flakes, bran and germ	{}	7.5	59.5	13.5	381	53	3.8	120
169	oat bran	Breads, flakes and breakfast cereals	Flakes, bran and germ	{}	7	50.8	18.5	371	58	5.4	240
170	semi-skimmed milk	Milk and dairy products	Milk	{milk}	1.5	4.8	3.2	46	120	\N	12
171	half-fat butter	Fats and oils	Fats,milk and dairy products	{}	39.8	3.5	4.8	391	120	\N	14
172	half cream, pasteurised	Fats and oils	Cream,Milk and dairy products	{}	27.9	3.3	2.3	274	78	\N	7
173	half cream, uht	Fats and oils	Cream,Milk and dairy products	{}	25.1	3.7	2.5	251	91	\N	8.6
174	half-white bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	1.1	46.4	9.4	240	16	1.8	38
175	hemp oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
176	hard and semi-hard cheese	Milk and dairy products	Hard cheese	{milk}	32.1	\N	26.6	397	910	0.3	32
177	hard caramels	Sweets	Sweets, fruit and chewing gum	{}	0.3	95	0.5	385	4	0.1	3
178	durum wheat semolina	Cereal products, pulses and potatoes	Other cereal products	{gluten}	1.4	71.4	12	353	17	0.9	27
179	hare	Meat and offal	Other species	{}	3	\N	22	115	14	2.8	24
180	hazelnut	Nuts, seeds and oil fruits		{hazelnut}	59.5	10.1	16.4	661	160	3.6	160
181	hazelnut chocolate	Sweets	Jams and sweet spreads	{hazelnut}	32.7	55.9	6	548	130	1.2	50
182	hazelnut biscuits	Sweets	Guetzli	{hazelnut}	27.7	47.4	6.7	473	80	1.6	49
183	hazelnut macaroon	Sweets	Guetzli	{hazelnut}	37	37.5	12.2	544	100	2.3	100
184	hazelnut oil	Fats and oils	Oils	{hazelnut}	90	\N	\N	810	\N	\N	\N
185	hazelnut stalks	Sweets	Guetzli	{hazelnut}	36.6	47	10.5	567	61	1.9	55
186	pike	Fish	Freshwater fish	{}	0.9	\N	18.4	81	32	0.5	28
187	yeast dough	Cereal products, pulses and potatoes	Doughs	{}	11.1	43.2	8.7	311	34	1.1	22
188	blueberry	Fruits	Fruits fresh	{}	0.3	10.6	0.9	52	10	0.6	5
189	halibut	Fish	Sea fish	{}	3.9	\N	20.6	118	15	0.5	23
190	raspberry	Fruits	Fruits fresh	{}	0.8	5.8	1.2	44	16	0.4	20
191	ham in the rear	Meat and sausage products	Cooked sausages	{}	2.3	0.7	20.2	104	17	0.6	24
192	venison	Meat and offal	Wild	{}	3.3	\N	20.6	112	10	2.3	21
193	millet grain	Cereal products, pulses and potatoes	Other cereal products	{}	3.9	68.8	10.6	360	9.5	6.9	120
194	millet flakes	Breads, flakes and breakfast cereals	Flakes, bran and germ	{}	3.9	68.8	10.6	360	10	6.9	120
195	hollandaise sauce	Miscellaneous	Sauces	{}	18	9.3	3	212	41	0.7	6
196	elderberry, black	Fruits	Fruits fresh	{}	1.7	7.4	2.5	63	37	1.6	30
197	honey	Sweets	Jams and sweet spreads	{}	\N	76	0.4	306	5	0.5	3
198	egg hard-boiled	Eggs		{egg}	10.9	0.3	14	156	46	1.7	12
199	egg	Eggs		{egg}	9.8	0.3	12.6	140	48	1.8	12
200	egg yolk	Eggs		{egg}	31.3	0.3	16.4	349	140	5.5	12
201	egg white	Eggs		{egg}	\N	0.4	10.8	45	5.1	\N	11
202	legumes	Cereal products, pulses and potatoes	Legumes	{}	1.9	14.7	9.6	127	36	2	44
203	pulses	Cereal products, pulses and potatoes	Legumes	{}	4.9	39.7	25.1	336	96	6	130
204	hummus	Miscellaneous	Sauces	{}	14	9.4	7.3	204	170	2.1	75
205	cottage cheese	Milk and dairy products	Cream cheese and curd	{milk}	4.5	2.4	12.4	100	69	\N	6.2
206	instant mashed potatoes	Cereal products, pulses and potatoes	Potatoes	{}	2.8	11.5	2	80	46	0.4	13
207	hunter's sauce	Miscellaneous	Sauces	{}	1.8	8	2.2	58	17	0.7	8
208	yoghurt bifidus	Milk and dairy products	Yoghurt and sour milk	{milk}	3.6	4.5	4	66	150	\N	12
209	yoghurt sweetened	Milk and dairy products	Yoghurt and sour milk	{milk}	3.4	14.7	3.7	105	120	0.1	15
210	flavoured yoghurt, lean, with sweeteners	Milk and dairy products	Yoghurt and sour milk	{milk}	0.1	7	4.4	47	100	0.1	11
211	yoghurt with fruit, lean, with sweeteners	Milk and dairy products	Yoghurt and sour milk	{milk}	0.1	7	4.5	49	110	0.1	11
212	yoghurt strawberry	Milk and dairy products	Yoghurt and sour milk	{milk}	2.7	15.2	3.4	101	110	0.1	11
213	yoghurt hazelnut	Milk and dairy products	Yoghurt and sour milk	{milk}	4.6	15	3.8	119	110	0.1	16
214	yoghurt mocha	Milk and dairy products	Yoghurt and sour milk	{milk}	3.1	14.1	3.7	99	130	0.1	13
215	yoghurt mocha, organic	Milk and dairy products	Yoghurt and sour milk	{milk}	3.3	13.1	3.4	95	120	0.2	18
216	yoghurt nature	Milk and dairy products	Yoghurt and sour milk	{milk}	3.6	4.5	3.9	66	140	\N	12
217	yoghurt chocolate	Milk and dairy products	Yoghurt and sour milk	{milk}	3.9	16.9	3.9	120	130	0.3	18
218	yoghurt vanilla	Milk and dairy products	Yoghurt and sour milk	{milk}	3	14	3.7	98	130	\N	11
219	yoghurt alternative made from soy with fruit or flavouring	Milk and dairy products	Milk substitutes	{milk}	1.8	12.2	3.4	82	\N	0.5	19
220	yoghurt alternative made from soy natural	Milk and dairy products	Milk substitutes	{milk}	2.2	1.5	4	45	13	0.4	22
221	currant, red	Fruits	Fruits fresh	{}	0.7	7.1	1.6	50	38	0.4	12
222	currant, black	Fruits	Fruits fresh	{}	0.9	9.7	1.3	71	57	1.2	23
223	coffee soluble	Soft drinks	Coffee	{}	\N	42.6	11.2	253	170	4.4	390
224	coffee black	Soft drinks	Coffee	{}	\N	0.3	0.1	2	8	\N	3.3
225	coffee cream	Fats and oils	Cream,Milk and dairy products	{}	15	3.8	2.6	161	96	\N	8.2
226	cocoa butter	Fats and oils	Fat	{}	100	\N	\N	900	\N	\N	\N
227	cocoa powder	Sweets	Chocolate and cocoa products,Non-alcoholic beverages	{}	24.5	10.8	22.5	419	110	13	410
228	persimmon	Fruits	Fruits fresh	{}	0.3	14.3	0.9	70	6.9	0.1	7.2
229	veal, breast	Meat and offal	Calf	{}	14.5	\N	18.3	204	5.3	0.6	18
230	veal minced	Meat and offal	Calf	{}	2.4	\N	20.5	104	4.9	0.8	20
231	veal liver	Meat and offal	Calf	{}	4.3	4.6	19.6	135	9	7.4	19
232	veal milks	Meat and offal	Calf	{}	3.4	\N	17.2	99	4	1.9	16
233	calf kidney	Meat and offal	Calf	{}	5	1	15.8	112	11	12	16
234	veal shoulder, roast	Meat and offal	Calf	{}	4.8	\N	20.2	124	22	1.4	23
235	veal tongue	Meat and offal	Calf	{}	11.6	1.9	17.2	181	9	2.8	17
236	veal	Meat and offal	Calf	{}	4.8	\N	21.1	128	9.7	1.1	22
237	veal sausage	Meat and sausage products	Boiled sausage products	{}	19.2	1.2	12.5	228	20	0.5	12
238	squid	Fish	Seafood, crustaceans and shellfish	{mollusk}	1.1	2.3	16	83	14	0.6	40
239	rabbit	Meat and offal	Other species	{}	7.5	\N	20.5	150	14	1.6	25
240	carrot	Vegetables	Vegetables fresh	{}	0.3	6.6	0.8	38	31	0.2	8.4
241	carrot juice	Soft drinks	Fruit and vegetable juices,Vegetables	{}	0.1	6.8	0.7	33	24	0.5	13
242	potato	Cereal products, pulses and potatoes	Potatoes	{}	0.1	15.6	2	75	5.8	0.4	18
243	potato starch	Cereal products, pulses and potatoes	Flours and starches,Miscellaneous	{}	0.1	83.1	0.6	336	35	1.8	6
244	mashed potatoes	Cereal products, pulses and potatoes	Potatoes	{}	8.4	12.9	2	139	18	0.3	16
245	cheese in brine	Milk and dairy products	Cream cheese and curd,milk and dairy products	{milk}	20.7	1.4	16	256	480	0.2	20
246	cheese butter	Fats and oils	Fats,milk and dairy products	{}	82.5	0.6	0.4	747	12	\N	1
247	kefe	Vegetables	Vegetables fresh	{}	0.2	10	4	68	20	2	30
248	ketchup	Miscellaneous	Sauces	{}	0.4	26	2	117	19	0.9	19
249	chickpea dried	Cereal products, pulses and potatoes	Legumes	{}	4.9	44.3	18.6	327	120	5.4	140
250	kirsch	Alcoholic drinks	Spirits	{}	\N	\N	\N	233	1.9	\N	\N
251	cherry	Fruits	Fruits fresh	{}	0.4	13	0.8	62	9.9	0.2	8.8
252	kiwi	Fruits	Fruits fresh	{}	0.6	11	0.9	58	33	0.2	13
253	crispbread	Breads, flakes and breakfast cereals	Crispbreads, rusks, crackers and waffles	{}	1.7	61.1	12	332	26	4	100
254	garlic	Vegetables	Vegetables fresh	{}	0.5	24.5	7	137	38	1.4	21
255	celeriac	Vegetables	Vegetables fresh	{}	0.3	2.4	1.5	28	43	0.7	12
256	button flour	Cereal products, pulses and potatoes	Flours and starches	{}	1.3	71.3	11.9	351	15	0.8	24
257	table salt	Miscellaneous	Salt, spices and flavours	{}	\N	\N	\N	\N	10	0.3	1
258	cooked bacon	Meat and sausage products	Raw sausage products	{}	27.6	0.6	17.8	322	10	0.4	16
259	cooked sausages	Meat and sausage products	Cooked sausages	{}	23.5	1.1	15.4	278	25	8.7	11
260	cabbage	Vegetables	Vegetables fresh	{}	0.3	3	2.2	29	52	0.7	19
261	kohlrabi	Vegetables	Vegetables fresh	{}	0.2	3.7	1.9	27	64	0.5	43
262	coconut oil	Fats and oils	Fat	{}	99	\N	0.8	894	2	\N	200
263	coconut macaroons	Sweets	Guetzli	{}	41.4	37.1	6.9	567	8.3	1.8	66
610	turmeric	Spices		{}	\N	\N	\N	\N	\N	\N	\N
264	coconut	Nuts, seeds and oil fruits		{}	36.5	4.8	4.6	384	20	2.3	39
265	coconut dried	Nuts, seeds and oil fruits		{}	65.2	8.4	7.6	681	11	2.8	100
266	coconut milk	Nuts, seeds and oil fruits		{}	21.3	3.1	2.4	214	18	3.3	46
267	condensed milk	Milk and dairy products	Milk	{milk}	7.6	9.3	6.4	131	240	0.1	27
268	jam	Sweets	Jams and sweet spreads	{}	0.5	58.7	0.5	246	18	1.4	2
269	lettuce	Vegetables	Vegetables fresh	{}	0.2	1.1	1.3	14	31	0.4	7.6
270	cutlet	Meat and offal	Pork,meat and offal	{}	10.2	\N	21.3	177	5.1	0.5	21
271	crustaceans	Fish	Seafood, crustaceans and shellfish	{}	1	1	15.5	75	30	1.2	34
272	cake batter	Cereal products, pulses and potatoes	Doughs	{}	21.2	38.5	6.7	375	11	0.8	19
273	cake dough	Cereal products, pulses and potatoes	Doughs	{}	21.5	33.8	7.6	372	20	2.8	72
274	pumpkin	Vegetables	Vegetables fresh	{}	0.1	4.5	0.6	23	18	0.4	7
275	pumpkin seeds	Nuts, seeds and oil fruits		{}	49.1	4.7	35.6	615	63	8.2	520
276	pumpkin seed oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
277	salmon smoked	Fish	Sea fish	{fish}	8.2	\N	23.2	167	10	\N	27
278	salmon	Fish	Sea fish	{fish}	11.5	\N	19.7	182	8	0.4	30
279	lamb chop	Meat and offal	Lamb, Sheep	{}	10.9	\N	20.2	179	8.4	1.5	20
280	lamb kidney piece	Meat and offal	Lamb, Sheep	{}	3.3	\N	21.8	117	3.8	1.9	23
281	lamb rack	Meat and offal	Lamb, Sheep	{}	8.3	\N	20.3	156	7.5	1.8	24
282	landjäger	Meat and sausage products	Raw sausage products	{}	42.7	\N	26.6	491	21	1.9	21
283	latte macchiato	Milk and dairy products	Milk and yoghurt drinks,Soft drinks	{milk}	2.8	3.2	2.2	47	84	\N	7.6
284	lettuce	Vegetables	Vegetables fresh	{}	0.3	1.3	1.2	16	37	0.3	11
285	leek	Vegetables	Vegetables fresh	{}	0.3	3.7	1.6	30	31	0.9	11
286	pretzel roll	Breads, flakes and breakfast cereals	Breads and bread products	{}	4.9	48.9	9.3	282	57	0.5	15
287	pretzels dry	Salty snacks	Salt sticks and pretzels	{}	4.1	72.1	8.6	361	140	0.7	\N
288	laugengipfeli	Breads, flakes and breakfast cereals	Breads and bread products	{}	25	39.4	9.1	423	35	0.4	11
289	liver sausage	Meat and sausage products	Cooked sausages	{}	19.1	0.5	19.8	253	5	3.6	16
290	gingerbread	Sweets	Other sweet baked goods	{}	13.8	61.6	6.5	404	69	1.9	45
291	linseed oil, cold pressed	Fats and oils	Oils	{}	90	\N	\N	810	0.9	\N	\N
292	linseed	Nuts, seeds and oil fruits		{}	42.2	3.6	21.3	533	240	6.3	320
293	lemon curd	Sweets	Creams and puddings	{}	16	36.8	6.4	317	26	0.9	7.1
294	limburg	Milk and dairy products	Hard cheese	{milk}	21.4	\N	20	273	230	0.1	15
295	lemonade	Soft drinks	Sweet drinks	{}	\N	9.5	\N	38	5	0.1	11
296	lentil dried	Cereal products, pulses and potatoes	Legumes	{}	1.5	44.8	24.4	324	57	8	96
297	ladyfingers	Sweets	Guetzli	{}	8.3	71.8	12.2	413	65	2.1	15
298	luganighe	Meat and sausage products	Raw sausage products	{}	22.9	0.5	22.1	298	3.9	1.3	25
299	lyon	Meat and sausage products	Boiled sausage products	{}	21.8	0.5	11.5	244	6.5	0.5	11
300	corn chips	Salty snacks	Chips	{}	27.2	56	7.8	509	67	1.9	43
301	corn	Vegetables	Vegetables cooked (incl. canned)	{}	1.3	16.9	3.5	100	2.4	0.4	28
302	maize	Vegetables	Vegetables fresh	{}	1.2	15.7	3.3	93	2.2	0.4	27
303	maize grits	Cereal products, pulses and potatoes	Maize	{}	1.1	73.8	8.8	350	4	1	20
304	maize germ oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
305	corn cobs pickled in vinegar	Vegetables	Vegetables cooked (incl. canned)	{}	1.4	21	3.4	119	3	0.6	33
306	maize starch	Cereal products, pulses and potatoes	Flours and starches,Miscellaneous	{}	\N	88	0.3	354	1	0.5	2
307	tangerine	Fruits	Fruits fresh	{}	0.2	9.2	0.8	47	23	0.1	9.3
308	almond	Nuts, seeds and oil fruits		{shellFruit}	52.1	7.8	25.6	624	270	3.3	240
309	almond roasted and salted	Salty snacks	Salted nuts, seeds, kernels	{shellFruit}	55.2	7.2	25.6	649	240	3.3	270
310	mango dried	Fruits	Fruits dried	{}	2.2	61.1	2.9	293	59	2	88
311	mango	Fruits	Fruits fresh	{}	0.6	14.3	0.6	68	15	0.1	9
312	chard	Vegetables	Vegetables fresh	{}	0.2	2.7	2.1	23	80	2.3	81
313	cassava root tuber	Vegetables	Vegetables fresh	{}	0.2	32.1	1	140	32	0.7	65
314	margarine	Fats and oils	Fat	{}	80	0.5	0.5	724	10	0.1	1.8
315	marble cake	Sweets	Cakes, Pies and Cake	{}	17.1	42.6	7.4	356	44	1	19
316	marzipan	Sweets	Other sweets	{}	17.6	68.6	8	474	82	1.5	72
317	mascarpone	Milk and dairy products	Cream cheese and curd	{milk}	44.5	4.1	4.5	435	68	0.2	\N
611	clove	Spices		{}	\N	\N	\N	\N	\N	\N	\N
318	mayonnaise	Fats and oils	Mayonnaises	{}	81.7	0.5	1.1	742	15	0.6	7
319	flour	Cereal products, pulses and potatoes	Flours and starches	{}	1.4	67.8	12.4	343	14	1.9	45
320	molasses, treacle	Sweets	Jams and sweet spreads	{}	\N	67.2	1.2	274	500	9.2	140
321	meringue	Sweets	Other sweets	{}	0.5	94	5	401	4	0.2	5
322	mussel	Fish	Seafood, crustaceans and shellfish	{mollusk}	2.7	3.4	11.7	85	88	5.8	36
323	milk	Milk and dairy products	Milk	{milk}	3.4	4.6	3.2	62	120	\N	10
324	coffee with milk	Milk and dairy products	Milk and yoghurt drinks,Soft drinks	{milk}	0.9	1.2	0.7	16	32	\N	4.8
325	rice pudding	Sweets	Creams and puddings	{}	3.5	19	5.3	129	150	0.1	17
326	milk chocolate	Sweets	Chocolate and cocoa products	{}	31.1	56.9	6.5	537	250	2.1	55
327	minipic sausages	Meat and sausage products	Raw sausage products	{}	39.1	0.8	26.1	460	\N	3	28
328	mirabelle	Fruits	Fruits fresh	{}	0.2	18	0.6	76	11	0.1	8.2
329	whey	Milk and dairy products	Milk and yoghurt drinks	{milk}	0.2	4.7	0.8	24	68	0.1	8
330	morel	Vegetables	Mushrooms	{}	0.3	0.5	2.5	29	11	1.2	16
331	mortadella	Meat and sausage products	Boiled sausage products	{}	27.3	0.8	16.1	314	3.9	0.9	13
332	mostbröckli	Meat and sausage products	Raw sausage products	{}	1.9	0.5	32.6	150	\N	3.3	33
333	mozzarella	Milk and dairy products	Soft cheese,Milk and dairy products	{milk}	19.5	0.7	19.5	256	340	0.1	10
334	shortcrust	Cereal products, pulses and potatoes	Doughs	{}	19.7	46.7	6.4	393	9.3	0.8	17
335	nectarine	Fruits	Fruits fresh	{}	0.3	11.3	1	55	7	0.2	9
336	lamb's lettuce	Vegetables	Vegetables fresh	{}	0.4	2	2	23	38	2.1	13
337	oven fries, deep-frozen	Cereal products, pulses and potatoes	Potatoes	{}	5	18.1	1.8	127	5.2	0.3	15
338	olive green	Nuts, seeds and oil fruits		{}	15.7	\N	1.3	154	58	0.2	24
339	olive black	Nuts, seeds and oil fruits		{}	17.2	0.8	1.4	176	80	8.5	16
340	olive oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	0.1	0.9
341	orange	Fruits	Fruits fresh	{}	0.2	8	0.8	45	45	0.3	15
342	orange nectar	Soft drinks	Sweet drinks,Soft drinks	{}	\N	10.5	0.4	44	6	0.1	7
343	orange juice	Fruits	Fruit juices,Soft drinks	{}	0.1	10	0.6	44	8.3	0.1	10
344	palm oil	Fats and oils	Oils,Fats and Oils	{}	88.8	\N	\N	799	0.9	\N	0.9
345	pancetta	Meat and sausage products	Raw sausage products	{}	43	0.4	19.5	467	13	0.8	\N
346	panettone	Sweets	Other sweet baked goods	{}	10.7	56.5	6.4	354	150	3	\N
347	breadcrumbs	Cereal products, pulses and potatoes	Flours and starches	{}	2.1	73.5	12.7	373	50	1.2	23
348	pantli	Meat and sausage products	Raw sausage products	{}	51.4	0.9	21.7	553	5.1	1.7	22
349	papaya	Fruits	Fruits fresh	{}	0.1	9.5	0.5	44	21	0.2	17
350	brazil nut	Nuts, seeds and oil fruits		{shellFruit}	66.5	4.2	17	698	160	2.4	350
351	parisian bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	0.9	51.2	9	255	10	0.9	22
352	parmesan	Milk and dairy products	Hard cheese	{milk}	31	\N	30.5	401	1340	0.7	44
353	passion fruit	Fruits	Fruits fresh	{}	3	10.9	2.1	102	8.1	0.6	26
354	parsnip	Vegetables	Vegetables fresh	{}	0.4	12.1	1.3	62	47	0.7	26
355	pepperoni green	Vegetables	Vegetables fresh	{}	0.3	2.6	0.8	20	6	0.3	6
356	pepperoni red	Vegetables	Vegetables fresh	{}	0.4	5.2	0.9	32	9	0.4	12
357	pesto green	Miscellaneous	Sauces	{}	42.5	6.6	3.9	430	150	0.6	36
358	pesto red	Miscellaneous	Sauces	{}	35.8	10.8	5.7	398	99	2	58
359	parsley	Vegetables	Herbs	{}	0.5	7.4	3.9	58	210	5.9	37
360	petit beurre	Sweets	Guetzli	{}	12.4	70.2	8.7	431	11	1.1	24
361	peppermint	Vegetables	Herbs	{}	0.7	5.3	3.8	49	210	9.5	30
362	peach	Fruits	Fruits fresh	{}	0.1	8.9	0.8	43	7.3	0.2	9
363	plum dried	Fruits	Fruits dried	{}	0.4	55.4	1.6	227	50	0.4	30
364	plum	Fruits	Fruits fresh	{}	0.2	10.2	0.6	48	8.3	0.3	7.4
365	mushroom	Vegetables	Mushrooms	{}	0.4	0.6	3.5	29	7.6	2.4	13
366	pistachio	Nuts, seeds and oil fruits		{shellFruit}	45.4	17.6	23.8	594	92	2.8	120
367	pizza dough	Cereal products, pulses and potatoes	Doughs	{}	3.6	41.2	7	229	5.9	0.4	9.4
368	french fries	Salty snacks	Chips	{}	34.8	49.3	4.9	538	14	0.9	40
369	popcorn	Salty snacks	Other salty snacks	{}	4.2	62.9	12	367	10	2.7	110
370	port wine	Alcoholic drinks	Wine	{}	\N	12	0.2	152	7	0.4	9
371	chicken breast	Meat and offal	Poultry	{}	6.5	\N	23.3	152	3.9	0.3	26
372	chicken breast cutlet, roasted	Meat and offal	Poultry	{}	0.8	\N	30.1	128	4.1	0.4	27
373	chicken thigh	Meat and offal	Poultry	{}	10.2	\N	23.9	187	7.2	0.6	21
374	cranberry	Fruits	Fruits fresh	{}	0.5	6.2	0.3	36	14	0.5	6
375	pudding caramel	Sweets	Creams and puddings	{}	2.1	23	3.4	125	94	\N	9
376	pudding chocolate	Sweets	Creams and puddings	{}	2.6	21	3	121	90	0.5	14
377	pudding vanilla	Sweets	Creams and puddings	{}	2.1	18	2.8	102	96	0.1	10
378	quark, nature, cream	Milk and dairy products	Cream cheese and curd	{milk}	15.6	3.7	6.9	183	93	\N	8.1
379	curd sheet dough	Cereal products, pulses and potatoes	Doughs	{}	28.3	29	7.1	401	38	0.6	16
380	quince	Fruits	Fruits fresh	{}	0.5	7.3	0.4	47	10	0.6	8.2
381	raclette cheese	Milk and dairy products	Hard cheese	{milk}	27.9	\N	25.9	357	670	0.1	27
382	radish	Vegetables	Vegetables fresh	{}	0.1	2.1	1.1	17	26	0.4	9.4
383	cream	Fats and oils	Cream,Milk and dairy products	{}	25.4	3.4	2.3	252	84	\N	7.5
384	ice cream, fruit	Sweets	Milk-based glazes	{}	8	24.7	3.5	185	110	0.5	\N
385	rim	Vegetables	Vegetables fresh	{}	0.1	8.4	1.5	46	17	0.9	21
386	rapeseed oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
387	reblochon	Milk and dairy products	Soft cheese	{milk}	25.2	\N	19.9	307	390	0.1	20
388	venison	Meat and offal	Wild	{}	3.6	\N	22.4	122	25	3	20
389	venison ragout	Meat and offal	Wild	{}	1.9	\N	22	105	3.7	2.7	20
390	venison cutlet	Meat and offal	Wild	{}	1.7	\N	22.5	105	4.2	2.8	22
391	grated cheese	Milk and dairy products	Hard cheese	{milk}	32.1	\N	29.3	406	1190	0.5	41
392	rice	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
393	rice drink	Milk substitutes	52.0	{}	9.9	5	1.1	0.4	\N	3.3	\N
394	radish	Vegetables	Vegetables fresh	{}	0.3	2.6	0.6	18	20	0.8	7
395	rhubarb	Fruits	Fruits fresh	{}	0.2	1.5	0.8	22	130	0.3	14
396	beef breast	Meat and offal	Beef	{}	12.5	\N	18.9	188	4	2.2	18
397	beef corner piece	Meat and offal	Beef	{}	2.3	\N	22.6	111	3.8	2.2	23
398	beef entrecôte	Meat and offal	Beef	{}	4.5	\N	23.2	133	4.9	1.3	20
399	beef minced	Meat and offal	Beef	{}	7.5	\N	21.6	154	5	2	17
400	beef neck	Meat and offal	Beef	{}	8.1	\N	19.3	150	6.8	2.1	18
401	beef liver	Meat and offal	Beef	{}	3.9	5.3	20.5	138	7	7	17
402	beef tongue	Meat and offal	Beef	{}	13	3.7	16	196	10	3	18
403	beef	Meat and offal	Beef	{}	5.4	\N	21.4	134	4.5	1.8	20
404	ribs	Meat and sausage products	Cooked sausages	{}	7.3	0.5	21.7	155	32	1.5	54
405	ristretto crème	Soft drinks	Coffee	{}	4.3	1.3	0.8	47	33	\N	4.7
406	rye flour	Cereal products, pulses and potatoes	Flours and starches	{gluten}	1.5	63.1	10.8	337	26	3.2	82
407	rye bread	Breads, flakes and breakfast cereals	Breads and bread products	{gluten}	1	44.1	7.7	235	21	2.2	56
408	bacon	Meat and sausage products	Raw sausage products	{}	34.3	0.6	22.1	400	\N	\N	22
409	ham	Meat and sausage products	Raw sausage products	{}	11.5	0.3	31	229	9	2.8	30
410	rolled barley	Cereal products, pulses and potatoes	Other cereal products	{gluten}	1.4	71	10.4	347	18	3	65
411	rollmops	Fish	Fish products	{}	15.9	19.6	12	270	30	0.9	6.4
412	rolled ham	Meat and sausage products	Cooked sausages	{}	10.6	1.2	20.3	181	7.7	0.7	21
413	roquefort	Milk and dairy products	Hard cheese	{milk}	31.7	0.2	19.2	363	600	0.4	27
414	brussels sprouts	Vegetables	Vegetables fresh	{}	0.5	3.5	4	43	31	1.1	23
415	sultana dried	Fruits	Fruits dried	{}	0.9	73.2	3	321	80	2.3	41
416	rosemary	Vegetables	Herbs	{}	2.5	7.7	0.8	62	210	4.8	36
417	rösti	Cereal products, pulses and potatoes	Potatoes	{}	5.7	20.7	2.6	150	7.8	0.5	24
418	red cabbage	Vegetables	Vegetables fresh	{}	0.3	4	1.4	30	52	0.5	13
419	ruchbrot	Breads, flakes and breakfast cereals	Breads and bread products	{}	1.2	44.3	9.5	234	20	1.6	38
420	rocket	Vegetables	Vegetables fresh	{}	0.7	2.1	2.6	28	160	1.5	\N
421	sablé butter	Sweets	Guetzli	{}	26.2	53.1	5.9	474	7.9	0.3	7.5
422	salametti	Meat and sausage products	Raw sausage products	{}	31.4	0.3	14.8	343	3	0.9	16
423	salami	Meat and sausage products	Raw sausage products	{}	37.1	\N	22	422	\N	1.2	17
424	sage	Vegetables	Herbs	{}	2.1	6.9	1.7	59	270	4.5	69
425	salt	Miscellaneous	Salt, spices and flavours	{}	\N	\N	\N	\N	140	24	\N
426	seeds	Nuts, seeds and oil fruits		{}	52.5	9.1	20.9	612	170	4.5	260
612	gochujang	Spices		{}	\N	\N	\N	\N	\N	\N	\N
428	anchovy paste	Miscellaneous	Spreads	{}	21.3	0.2	19.8	272	220	2.1	170
429	sardine in oil, drained	Fish	Sea fish	{}	13.7	\N	23	215	400	2.5	37
430	sardine	Fish	Sea fish	{}	9	\N	20.4	163	85	1.4	28
431	saucisse aux choux	Meat and sausage products	Raw sausage products	{}	32.3	1.5	15.9	361	16	0.7	18
432	saucisson	Meat and sausage products	Raw sausage products	{}	36.4	0.5	18.2	403	3.8	0.9	21
433	saucisson vaudois	Meat and sausage products	Raw sausage products	{}	32.3	0.2	16.5	358	14	0.7	17
434	sauerkraut pickled in vinegar	Vegetables	Vegetables cooked (incl. canned)	{}	0.3	1.7	1.3	19	36	0.5	11
435	sour cream	Fats and oils	Cream,Milk and dairy products	{}	35	2.8	2.4	336	73	0.1	7
436	sbrinz	Milk and dairy products	Hard cheese	{milk}	33.2	\N	28	415	1030	0.3	38
437	scampi	Fish	Seafood, crustaceans and shellfish	{}	1.3	0.8	19.6	93	29	2	68
438	sheep's milk	Milk and dairy products	Milk	{milk}	7.1	4.7	5.5	105	180	\N	18
439	sparkling wine	Alcoholic drinks	Wine	{}	\N	1.5	0.2	71	10	0.8	6
440	ham croissants	Salty snacks	Puff pastries,Dishes	{}	20.8	26	11.1	338	24	0.7	16
441	processed cheese	Milk and dairy products	Cheese products	{milk}	30	\N	14.3	327	550	0.9	45
442	chives	Vegetables	Herbs	{}	0.6	1.9	3	30	86	1.5	40
443	chocolate dark	Sweets	Chocolate and cocoa products	{}	31.8	53.4	5.7	537	48	6.7	120
444	chocolate white	Sweets	Chocolate and cocoa products	{}	35.2	55.8	6.7	567	260	0.3	12
445	chocolate cream	Sweets	Creams and puddings	{}	3	20	3.6	122	150	0.9	14
446	chocolate powder	Sweets	Chocolate and cocoa products,Non-alcoholic beverages	{}	7.8	71.3	5.3	398	37	4.2	130
447	plaice	Fish	Sea fish	{}	1.9	\N	17.1	86	61	0.9	22
448	schümliguetzli	Sweets	Guetzli	{}	9.9	83.5	4.2	444	18	2.1	41
449	schümliguetzli with chocolate	Sweets	Guetzli	{}	19.4	71.5	5.2	486	120	2.1	47
450	schützenwurst	Meat and sausage products	Boiled sausage products	{}	23	0.2	9.2	244	5.5	0.9	7.3
451	black salsify	Vegetables	Vegetables fresh	{}	0.4	2.1	1.4	55	53	3.3	23
452	pork breast tip	Meat and offal	Pig	{}	18.6	\N	17.9	239	6	0.7	19
453	pork corner piece	Meat and offal	Pig	{}	3.3	\N	33	162	12	2.6	27
454	pork, corner piece	Meat and offal	Pig	{}	2.7	\N	22.6	115	9	1.7	21
455	pork minced	Meat and offal	Pig	{}	8.5	\N	20.5	159	4.2	1.1	19
456	pork, cutlets	Meat and offal	Pig	{}	5.4	\N	21.3	134	4.3	0.7	20
457	pork neck	Meat and offal	Pig	{}	16.6	\N	26.4	255	5	1.3	23
458	pork, knuckle	Meat and offal	Pig	{}	7.6	0.7	25.6	173	2	1.1	25
459	pork, chop	Meat and offal	Pig	{}	10.4	\N	21.4	179	4.9	0.4	21
460	pork liver	Meat and offal	Pig	{}	4.9	0.9	20.7	131	7.6	18	23
461	pork kidney	Meat and offal	Pig	{}	5.1	\N	22.9	138	3.7	0.4	21
462	pork	Meat and offal	Pig	{}	8.3	\N	21.4	160	6	1	21
463	lard	Fats and oils	Fat	{}	99	\N	\N	891	1	\N	1
464	pork sausage	Meat and sausage products	Boiled sausage products	{}	22.4	0.5	16.2	268	10	1	17
465	hake	Fish	Sea fish	{}	0.3	\N	17	71	25	0.7	25
466	saithe	Fish	Sea fish	{}	0.3	\N	19.3	80	8	0.2	14
467	sole	Fish	Sea fish	{}	1.1	\N	18.7	85	29	0.6	25
468	celery piccata	Courts	Other salty	{celery}	8.2	7.1	5.5	133	98	0.9	14
469	semmeli	Breads, flakes and breakfast cereals	Breads and bread products	{}	0.9	48.5	9.2	245	10	1	22
470	mustard	Miscellaneous	Sauces	{mustard}	7.7	3.8	7.1	124	110	1.7	95
471	sesame oil	Fats and oils	Oils	{sesame}	90	\N	\N	810	\N	\N	\N
472	sesame seeds	Nuts, seeds and oil fruits		{sesame}	53.8	4	23.1	619	930	7.7	330
473	sherry	Alcoholic drinks	Wine	{}	\N	3.6	0.1	118	9	0.5	8
474	silver onion pickled in vinegar	Vegetables	Vegetables cooked (incl. canned)	{}	0.2	4.9	0.9	28	22	0.2	\N
475	syrup	Soft drinks	Syrup,Soft drinks	{}	\N	13.5	\N	55	6.2	0.1	1.2
476	soybean	Cereal products, pulses and potatoes	Legumes	{soy}	18.3	8.7	38.2	399	200	6.6	220
477	soy drink	Milk and dairy products	Milk substitutes	{milk}	2.2	0.8	3.9	40	13	0.4	17
478	soya flour	Cereal products, pulses and potatoes	Flours and starches	{soy}	20.6	3.1	40.8	398	200	12	250
479	soya oil	Fats and oils	Oils	{soy}	90	\N	\N	810	\N	\N	\N
480	soy sauce	Miscellaneous	Sauces	{soy}	0.6	4.1	8.1	56	33	1.5	74
481	bean sprouts	Vegetables	Sprouts and seedlings	{}	1	4.7	5.5	55	32	0.9	19
482	sunflower seeds	Nuts, seeds and oil fruits		{}	54.5	3.6	25.1	621	86	5	330
483	sunflower oil	Fats and oils	Oils	{}	90	\N	\N	810	0.9	0.1	\N
484	sorbet fruit	Sweets	Water-based glazes	{}	\N	32.1	0.2	137	12	0.2	4
485	asparagus	Vegetables	Vegetables fresh	{}	0.2	3.3	2.2	27	22	0.9	18
486	spinach	Vegetables	Vegetables fresh	{}	0.4	0.8	2.7	23	100	2.7	58
487	spirits 40 vol%	Alcoholic drinks	Spirits	{}	\N	\N	\N	222	\N	\N	\N
488	pomeranian	Sweets	Other sweet baked goods	{}	25.6	60.3	5.8	499	14	1	16
489	st paulin	Milk and dairy products	Hard cheese	{milk}	23	\N	21.8	294	700	0.4	35
490	gooseberry	Fruits	Fruits fresh	{}	0.2	7.1	0.8	39	29	0.6	15
491	celery	Vegetables	Vegetables fresh	{celery}	0.1	1.5	0.9	15	52	0.5	14
492	boletus	Vegetables	Mushrooms	{}	0.4	0.5	5.4	39	4.2	1	12
493	surimi	Fish	Fish products	{}	4.9	11.8	8.3	125	19	0.4	12
494	sweet potato	Cereal products, pulses and potatoes	Potatoes	{}	0.1	17.1	1.6	81	41	0.6	26
495	tea	Soft drinks	Tea	{}	\N	\N	\N	\N	\N	\N	1
496	pasta	Cereal products, pulses and potatoes	Pasta	{egg}	2.8	69.9	13.3	365	23	3	42
497	pasta without wholemeal	Cereal products, pulses and potatoes	Pasta	{}	2.5	60.6	12.6	338	34	3.9	120
498	terrine de campagne	Meat and sausage products	Cooked sausages	{}	26.5	1	13.6	298	17	4.2	14
499	ticino bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	5.2	57.1	10.3	323	13	1.3	29
500	tête de moine	Milk and dairy products	Hard cheese	{milk}	35.5	\N	24.2	417	700	0.1	27
501	tuna	Fish	Sea fish	{fish}	6.2	\N	23.4	149	28	1.1	34
502	thyme	Vegetables	Herbs	{}	1.2	7.3	1.5	52	310	20	36
503	tilsiter	Milk and dairy products	Hard cheese	{milk}	28	\N	24.1	351	840	0.1	29
504	tilsiter milk	Milk and dairy products	Hard cheese	{milk}	30.2	\N	25.6	376	900	0.3	24
505	toast wholemeal	Breads, flakes and breakfast cereals	Breads and bread products	{}	4.9	43.7	9.3	271	21	3.4	87
506	tofu	Meat substitutes		{soy}	8.5	2.9	14.7	148	100	2.4	100
507	tofu smoked	Meat substitutes		{soy}	9.5	2.9	16.4	164	62	2	140
508	tomato dried	Vegetables	Dried vegetables	{}	0.5	29.2	11.3	210	140	6.5	180
509	tomato	Vegetables	Vegetables fresh	{}	0.3	3.2	0.8	21	8.5	0.2	6.3
510	tomato paste	Vegetables	Vegetables cooked (incl. canned)	{}	0.2	12.9	4.5	77	48	1.6	48
511	tomato juice	Soft drinks	Fruit and vegetable juices,Vegetables	{}	0.1	3	0.8	16	14	0.5	13
512	tomato sauce	Miscellaneous	Sauces	{}	2.1	9.7	1.8	69	23	1.4	17
513	tomme	Milk and dairy products	Soft cheese	{milk}	22.5	\N	20.3	284	290	0.1	18
514	jerusalem artichoke	Vegetables	Vegetables fresh	{}	0.4	4	2.4	54	28	0.6	16
515	grape white	Fruits	Fruits fresh	{}	0.3	15.2	0.7	69	12	0.4	7.6
516	grape seed oil	Fats and oils	Oils	{}	90	\N	\N	810	\N	\N	\N
517	grape juice	Fruits	Fruit juices,Soft drinks	{}	0.1	17.3	0.3	71	8.8	0.5	8.9
518	dextrose	Sweets	Sugar and sweeteners	{}	\N	99.8	\N	399	1	0.3	\N
519	water	Soft drinks	Drinking water	{}	\N	\N	\N	\N	7	\N	1
520	dried meat	Meat and sausage products	Raw sausage products	{}	3.5	0.4	39.3	190	\N	4	37
521	turkey breast	Meat and offal	Poultry	{}	1.3	\N	31.8	139	11	0.9	35
522	vacherin mont d'or	Milk and dairy products	Soft cheese	{milk}	23.2	\N	17.2	279	430	0.1	20
523	vanilla cream	Sweets	Creams and puddings	{}	4.6	12.7	4.3	109	100	0.3	9.8
524	vegetarian minced meat	Meat substitutes		{}	2.3	1.6	13.4	92	160	0.3	38
525	vinaigrette	Fats and oils	Salad dressings	{}	25.1	2.3	4.7	255	24	0.7	9
526	wholemeal rice cake	Breads, flakes and breakfast cereals	Crispbreads, rusks, crackers and waffles	{}	2.8	81.5	7.7	390	11	1.5	130
527	whole milk powder	Milk and dairy products	Milk	{milk}	26.2	35.1	24.7	480	1060	0.7	88
528	whole cream	Fats and oils	Cream,Milk and dairy products	{}	34.8	3.1	2	334	71	0.1	6.2
529	full cream	Fats and oils	Cream,Milk and dairy products	{}	34.9	3.1	2	335	71	\N	6.3
530	valais rye bread	Breads, flakes and breakfast cereals	Breads and bread products	{gluten}	1	42.6	7.6	227	20	2.1	53
531	wasabi paste	Miscellaneous	Sauces	{}	10.6	49.6	2.9	308	\N	\N	\N
532	water ice	Sweets	Water-based glazes	{}	\N	22	\N	88	\N	\N	\N
533	watermelon	Fruits	Fruits fresh	{}	\N	8.3	0.7	37	6	0.2	11
534	soft caramels	Sweets	Sweets, fruit and chewing gum	{}	17.2	71.1	2.1	448	95	1.5	25
535	soft cheese	Milk and dairy products	Soft cheese	{milk}	27.4	\N	19.4	325	440	0.2	20
536	wine red	Alcoholic drinks	Wine	{}	\N	0.2	\N	76	\N	\N	\N
537	wine white	Alcoholic drinks	Wine	{}	\N	0.1	0.2	71	10	0.6	10
538	wine white sparkling	Alcoholic drinks	Wine	{}	\N	4.8	0.1	55	7.5	0.4	11
539	white bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	0.8	48.9	8.5	242	8.3	0.6	15
540	white cabbage	Vegetables	Vegetables fresh	{}	0.2	4.2	1.4	30	56	0.3	12
541	weisswurst	Meat and sausage products	Boiled sausage products	{}	18.9	0.6	11.8	220	21	0.7	10
542	wheat whole grain	Cereal products, pulses and potatoes	Other cereal products	{gluten}	1.8	59.6	11.4	327	33	3.2	97
543	wheat flakes	Breads, flakes and breakfast cereals	Flakes, bran and germ	{gluten}	1.8	59.6	13.5	335	33	3.2	97
544	wheat germ	Breads, flakes and breakfast cereals	Flakes, bran and germ,Special foods	{gluten}	9.5	35.1	29.2	375	54	6.9	250
545	wheat germ oil	Fats and oils	Oils	{gluten}	90	\N	\N	810	\N	\N	\N
546	wheat bran	Breads, flakes and breakfast cereals	Flakes, bran and germ	{gluten}	4.7	17.7	15.2	264	67	16	480
547	wheat flour, white, type 400	Cereal products, pulses and potatoes	Flours and starches	{gluten}	1.1	71	11.5	346	5	0.6	14
548	wheat starch	Cereal products, pulses and potatoes	Flours and starches,Miscellaneous	{gluten}	0.1	85.8	0.4	348	\N	\N	4
549	wholemeal wheat bread	Breads, flakes and breakfast cereals	Breads and bread products	{gluten}	1.3	38.3	8.6	213	20	3.1	82
550	vermouth	Alcoholic drinks	Wine	{}	\N	13.5	0.1	139	8	0.5	5.4
551	viennese sausage	Meat and sausage products	Boiled sausage products	{}	20.4	0.6	13.9	242	7.9	0.8	13
552	game meat	Meat and offal	Wild	{}	3.4	\N	21.1	115	15	2.5	21
553	wild boar	Meat and offal	Wild	{}	3.4	\N	19.5	108	10	1.8	22
554	savoy cabbage	Vegetables	Vegetables fresh	{}	0.3	2.9	2.8	31	64	0.6	12
555	root and tuber vegetables	Vegetables	Vegetables fresh	{}	0.3	6	1	36	33	0.3	12
556	goat	Meat and offal	Other species	{}	7.9	\N	19.5	149	10	2	20
557	goat's milk	Milk and dairy products	Milk	{milk}	3.2	4.2	2.8	57	120	\N	10
558	cinnamon	Miscellaneous	Salt, spices and flavours	{}	3.2	56	3.9	317	1230	38	56
559	cinnamon star	Sweets	Guetzli	{}	25.9	50.9	14.2	505	150	2.2	120
560	candied lemon peel	Sweets	Other sweets	{}	0.4	70	0.4	289	40	0.3	5
561	lemon	Fruits	Fruits fresh	{}	0.5	2.9	0.8	23	25	0.5	16
562	lemon juice	Fruits	Fruit juices,Soft drinks	{}	0.2	2.5	0.4	28	6	0.1	6
563	citrus fruits	Fruits	Fruits fresh	{}	0.3	8	0.8	41	32	0.2	12
564	courgettes	Vegetables	Vegetables fresh	{}	0.2	2	1.8	19	19	0.8	23
565	sugar brown	Sweets	Sugar and sweeteners	{}	\N	97.6	\N	390	85	1.9	22
566	sugar white	Sweets	Sugar and sweeteners	{}	\N	100	\N	400	1	0.1	\N
567	sweet corn	Vegetables	Vegetables cooked (incl. canned)	{}	1.2	18.2	3	100	4	0.6	22
568	sugar melon	Fruits	Fruits fresh	{}	0.1	14.8	1.1	62	11	0.2	16
569	plum	Fruits	Fruits fresh	{}	0.1	8.8	0.6	43	13	0.4	8
570	rusk	Breads, flakes and breakfast cereals	Crispbreads, rusks, crackers and waffles	{}	7.8	74.6	11.6	421	39	1.4	33
571	onion	Vegetables	Vegetables fresh	{}	0.2	7	1.3	39	28	0.3	9.4
572	ajowan	Spices		{}	\N	\N	\N	\N	\N	\N	\N
573	anis	Spices		{}	\N	\N	\N	\N	\N	\N	\N
574	annatto	Spices		{soy}	\N	\N	\N	\N	\N	\N	\N
575	asant	Spices		{}	\N	\N	\N	\N	\N	\N	\N
576	wild garlic	Spices		{}	\N	\N	\N	\N	\N	\N	\N
577	bärwurz	Spices		{}	\N	\N	\N	\N	\N	\N	\N
578	basil	Spices		{}	\N	\N	\N	\N	\N	\N	\N
579	mugwort	Spices		{}	\N	\N	\N	\N	\N	\N	\N
580	berbere	Spices		{}	\N	\N	\N	\N	\N	\N	\N
581	mountain cumin	Spices		{}	\N	\N	\N	\N	\N	\N	\N
582	bertram	Spices		{}	\N	\N	\N	\N	\N	\N	\N
583	fenugreek	Spices		{}	\N	\N	\N	\N	\N	\N	\N
584	savory	Spices		{}	\N	\N	\N	\N	\N	\N	\N
585	borage	Spices		{}	\N	\N	\N	\N	\N	\N	\N
586	bread clover	Spices		{}	\N	\N	\N	\N	\N	\N	\N
587	watercress	Spices		{}	\N	\N	\N	\N	\N	\N	\N
588	cardamom	Spices		{}	\N	\N	\N	\N	\N	\N	\N
589	cayenne pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
590	chilli	Spices		{}	\N	\N	\N	\N	\N	\N	\N
591	cilantro	Spices		{}	\N	\N	\N	\N	\N	\N	\N
592	cumin	Spices		{}	\N	\N	\N	\N	\N	\N	\N
593	curcuma	Spices		{}	\N	\N	\N	\N	\N	\N	\N
594	curry leaves	Spices		{}	\N	\N	\N	\N	\N	\N	\N
595	curry powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
596	dill	Spices		{}	\N	\N	\N	\N	\N	\N	\N
597	dost	Spices		{}	\N	\N	\N	\N	\N	\N	\N
598	mountain rue	Spices		{}	\N	\N	\N	\N	\N	\N	\N
599	pickling spices	Spices		{}	\N	\N	\N	\N	\N	\N	\N
600	angelica	Spices		{}	\N	\N	\N	\N	\N	\N	\N
601	epazote	Spices		{}	\N	\N	\N	\N	\N	\N	\N
602	vinegar tree	Spices		{}	\N	\N	\N	\N	\N	\N	\N
603	estagon	Spices		{}	\N	\N	\N	\N	\N	\N	\N
604	safflower	Spices		{}	\N	\N	\N	\N	\N	\N	\N
605	stonecrop	Spices		{}	\N	\N	\N	\N	\N	\N	\N
606	gagel	Spices		{}	\N	\N	\N	\N	\N	\N	\N
607	galangal	Spices		{}	\N	\N	\N	\N	\N	\N	\N
608	daisies	Spices		{}	\N	\N	\N	\N	\N	\N	\N
613	gomashia	Spices		{}	\N	\N	\N	\N	\N	\N	\N
614	harissa	Spices		{}	\N	\N	\N	\N	\N	\N	\N
615	herbes fines	Spices		{}	\N	\N	\N	\N	\N	\N	\N
616	honey	Spices		{}	\N	\N	\N	\N	\N	\N	\N
617	coltsfoot	Spices		{}	\N	\N	\N	\N	\N	\N	\N
618	ginger	Spices		{}	\N	\N	\N	\N	\N	\N	\N
619	kafernlimette	Spices		{}	\N	\N	\N	\N	\N	\N	\N
620	cocoa powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
621	kalmus	Spices		{}	\N	\N	\N	\N	\N	\N	\N
622	capers	Spices		{}	\N	\N	\N	\N	\N	\N	\N
623	nasturtium	Spices		{}	\N	\N	\N	\N	\N	\N	\N
624	green cardamom	Spices		{}	\N	\N	\N	\N	\N	\N	\N
625	black cardamom	Spices		{}	\N	\N	\N	\N	\N	\N	\N
626	chervil	Spices		{}	\N	\N	\N	\N	\N	\N	\N
627	kemirin nut	Spices		{}	\N	\N	\N	\N	\N	\N	\N
628	garlic powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
629	coriander	Spices		{}	\N	\N	\N	\N	\N	\N	\N
630	horseradish	Spices		{}	\N	\N	\N	\N	\N	\N	\N
631	cress	Spices		{}	\N	\N	\N	\N	\N	\N	\N
632	large mullein	Spices		{}	\N	\N	\N	\N	\N	\N	\N
633	cumin	Spices		{}	\N	\N	\N	\N	\N	\N	\N
634	cubeb pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
635	caraway	Spices		{}	\N	\N	\N	\N	\N	\N	\N
636	pumpkin seed oil	Spices		{}	\N	\N	\N	\N	\N	\N	\N
637	camp pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
638	liquorice	Spices		{}	\N	\N	\N	\N	\N	\N	\N
639	lavender	Spices		{}	\N	\N	\N	\N	\N	\N	\N
640	lovage	Spices		{}	\N	\N	\N	\N	\N	\N	\N
641	lime juice	Spices		{}	\N	\N	\N	\N	\N	\N	\N
642	laurel	Spices		{}	\N	\N	\N	\N	\N	\N	\N
643	spoonwort	Spices		{}	\N	\N	\N	\N	\N	\N	\N
644	nutmeg	Spices		{}	\N	\N	\N	\N	\N	\N	\N
645	almond	Spices		{shellFruit}	\N	\N	\N	\N	\N	\N	\N
646	marjoram	Spices		{}	\N	\N	\N	\N	\N	\N	\N
647	report	Spices		{}	\N	\N	\N	\N	\N	\N	\N
648	melissa	Spices		{}	\N	\N	\N	\N	\N	\N	\N
649	mint	Spices		{}	\N	\N	\N	\N	\N	\N	\N
650	mitsuba	Spices		{}	\N	\N	\N	\N	\N	\N	\N
651	poppy seed	Spices		{}	\N	\N	\N	\N	\N	\N	\N
652	myrrh chervil	Spices		{}	\N	\N	\N	\N	\N	\N	\N
653	carnation	Spices		{}	\N	\N	\N	\N	\N	\N	\N
654	clove pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
655	oil pumpkin	Spices		{}	\N	\N	\N	\N	\N	\N	\N
656	orange peel	Spices		{}	\N	\N	\N	\N	\N	\N	\N
657	oregano	Spices		{}	\N	\N	\N	\N	\N	\N	\N
658	pandanus	Spices		{}	\N	\N	\N	\N	\N	\N	\N
659	grains of paradise	Spices		{}	\N	\N	\N	\N	\N	\N	\N
660	paprika powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
661	parsnips	Spices		{}	\N	\N	\N	\N	\N	\N	\N
662	pepperoni	Spices		{}	\N	\N	\N	\N	\N	\N	\N
663	perilla	Spices		{}	\N	\N	\N	\N	\N	\N	\N
664	parsley	Spices		{}	\N	\N	\N	\N	\N	\N	\N
665	pepper white	Spices		{}	\N	\N	\N	\N	\N	\N	\N
666	pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
667	pepper green	Spices		{}	\N	\N	\N	\N	\N	\N	\N
668	peppermint	Spices		{}	\N	\N	\N	\N	\N	\N	\N
669	allspice	Spices		{}	\N	\N	\N	\N	\N	\N	\N
670	pimpinelle	Spices		{}	\N	\N	\N	\N	\N	\N	\N
671	purslane	Spices		{}	\N	\N	\N	\N	\N	\N	\N
672	quendel	Spices		{}	\N	\N	\N	\N	\N	\N	\N
673	ras el-hanout	Spices		{}	\N	\N	\N	\N	\N	\N	\N
674	rhubarb	Spices		{}	\N	\N	\N	\N	\N	\N	\N
675	rosemary	Spices		{}	\N	\N	\N	\N	\N	\N	\N
676	rouille	Spices		{}	\N	\N	\N	\N	\N	\N	\N
677	saffron	Spices		{}	\N	\N	\N	\N	\N	\N	\N
678	sambal	Spices		{}	\N	\N	\N	\N	\N	\N	\N
679	sassafras	Spices		{}	\N	\N	\N	\N	\N	\N	\N
680	sorrel	Spices		{}	\N	\N	\N	\N	\N	\N	\N
681	slaw	Spices		{}	\N	\N	\N	\N	\N	\N	\N
682	shallot	Spices		{}	\N	\N	\N	\N	\N	\N	\N
683	yarrow	Spices		{}	\N	\N	\N	\N	\N	\N	\N
684	chive garlic	Spices		{}	\N	\N	\N	\N	\N	\N	\N
685	chives	Spices		{}	\N	\N	\N	\N	\N	\N	\N
686	black cumin	Spices		{}	\N	\N	\N	\N	\N	\N	\N
687	selerie sheets	Spices		{}	\N	\N	\N	\N	\N	\N	\N
688	celery salt	Spices		{celery}	\N	\N	\N	\N	\N	\N	\N
689	mustard seeds	Spices		{mustard}	\N	\N	\N	\N	\N	\N	\N
690	soumbala	Spices		{}	\N	\N	\N	\N	\N	\N	\N
691	ribwort	Spices		{}	\N	\N	\N	\N	\N	\N	\N
692	star anise	Spices		{}	\N	\N	\N	\N	\N	\N	\N
693	stevia	Spices		{}	\N	\N	\N	\N	\N	\N	\N
694	sumac	Spices		{}	\N	\N	\N	\N	\N	\N	\N
695	sweet dole	Spices		{}	\N	\N	\N	\N	\N	\N	\N
696	szechaun pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
697	tamarind	Spices		{}	\N	\N	\N	\N	\N	\N	\N
698	tanduri masala	Spices		{}	\N	\N	\N	\N	\N	\N	\N
699	tasmanian mountain pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
700	tonka beans	Spices		{}	\N	\N	\N	\N	\N	\N	\N
701	tripmandam	Spices		{}	\N	\N	\N	\N	\N	\N	\N
702	truffle	Spices		{}	\N	\N	\N	\N	\N	\N	\N
703	chubritza	Spices		{}	\N	\N	\N	\N	\N	\N	\N
704	vanilla	Spices		{}	\N	\N	\N	\N	\N	\N	\N
705	juniper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
706	woodruff	Spices		{}	\N	\N	\N	\N	\N	\N	\N
707	wood willowherb	Spices		{}	\N	\N	\N	\N	\N	\N	\N
708	water pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
709	vine leaves	Spices		{}	\N	\N	\N	\N	\N	\N	\N
710	rue	Spices		{}	\N	\N	\N	\N	\N	\N	\N
711	ysob	Spices		{}	\N	\N	\N	\N	\N	\N	\N
712	chicory	Spices		{}	\N	\N	\N	\N	\N	\N	\N
713	lemon grass	Spices		{}	\N	\N	\N	\N	\N	\N	\N
714	titron balm	Spices		{}	\N	\N	\N	\N	\N	\N	\N
715	lemon peel	Spices		{}	\N	\N	\N	\N	\N	\N	\N
716	lemon thyme	Spices		{}	\N	\N	\N	\N	\N	\N	\N
717	citrus root	Spices		{}	\N	\N	\N	\N	\N	\N	\N
718	noodles, dry	Cereal products, pulses and potatoes	Pasta	{}	1.2	70.5	12.6	353	22	1.5	56
719	red wine vinegar	Miscellaneous	Salt, spices and flavours	{}	\N	\N	\N	\N	\N	\N	\N
720	bamboo skewers	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
721	black pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
722	ground pork	Meat and offal	Pig	{}	\N	\N	\N	\N	\N	\N	\N
723	bay leaves	Vegetables	Herbs	{}	\N	\N	\N	\N	\N	\N	\N
724	black beans	Cereal products, pulses and potatoes	Legumes	{}	\N	\N	\N	\N	\N	\N	\N
725	green chile pepper	Vegetables	Vegetables fresh	{}	\N	\N	\N	\N	\N	\N	\N
726	red bell pepper	Vegetables	Vegetables fresh	{}	\N	\N	\N	\N	\N	\N	\N
727	chorizo sausage	Meat and sausage products	Cooked sausages	{}	\N	\N	\N	\N	\N	\N	\N
728	canola oil	Fats and oils	Oils	{}	\N	\N	\N	\N	\N	\N	\N
729	beef top sirloin	Vegetables fresh	Beef	{}	\N	\N	\N	\N	\N	\N	\N
730	collard greens	Vegetables	Vegetables fresh	{}	\N	\N	\N	\N	\N	\N	\N
731	worcestershire sauce	Miscellaneous	Salt, spices and flavours	{}	\N	\N	\N	\N	\N	\N	\N
732	green bell pepper	Vegetables	Vegetables fresh	{}	\N	\N	\N	\N	\N	\N	\N
733	cajun seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
734	kidney beans	Cereal products, pulses and potatoes	Legumes	{}	\N	\N	\N	\N	\N	\N	\N
735	red snapper	Fish	Sea fish	{}	\N	\N	\N	\N	\N	\N	\N
736	lemon-pepper seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
737	scallops	Fish	Seafood	{}	\N	\N	\N	\N	\N	\N	\N
738	red pepper flakes	Spices		{}	\N	\N	\N	\N	\N	\N	\N
739	ground beef	Meat and offal	Beef	{}	\N	\N	\N	\N	\N	\N	\N
740	raisins	Fruits	Fruits dried	{}	\N	\N	\N	\N	\N	\N	\N
741	steak seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
742	long grain rice	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
743	yellow corn	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
744	quinoa,cereal products, pulses and potatoes			{}	\N	\N	\N	\N	\N	\N	\N
745	celery	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
746	chicken broth	Stews and soups	Meat Stews	{}	\N	\N	\N	\N	\N	\N	\N
747	ancho chilly dried	Spices		{}	\N	\N	\N	\N	\N	\N	\N
748	pork loin without bone	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
749	salad dressing italian style	Fats and oils		{}	\N	\N	\N	\N	\N	\N	\N
750	rump roast	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
751	spaghetti	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
752	gnocchi, refrigerated	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
753	chicken sausage, italian style	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
754	yellow onion	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
755	tomato crushed	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
756	pappardelle pasta	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
757	cornstarch	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
758	chicken, cubed	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
759	ramen noodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
760	green onion, sliced	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
761	chicken thights, boneless and skinless	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
762	plain yogurt	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
763	plain yogurt, low fat	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
764	bacon	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
765	zucchini, sliced	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
766	red onion	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
767	orzo pasta	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
768	brown lentil	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
769	plain greek style yogurt	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
770	penne pasta	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
771	eggplant, sliced	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
772	beef bouillon cube	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
773	white peppercorns	Spices		{}	\N	\N	\N	\N	\N	\N	\N
774	roasted peanuts	Nuts, seeds and oil fruits		{}	\N	\N	\N	\N	\N	\N	\N
775	bamboo shoots	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
776	corn oil	Fats and oils		{}	\N	\N	\N	\N	\N	\N	\N
777	chicken breast halves	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
778	salt pork	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
779	romano cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
780	bread crumbs	Breads, flakes and breakfast cereals		{}	\N	\N	\N	\N	\N	\N	\N
781	hot chutney	Spices		{}	\N	\N	\N	\N	\N	\N	\N
782	apricot jam	Sweets		{}	\N	\N	\N	\N	\N	\N	\N
783	polish sausage	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
784	sazon seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
785	adobo seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
786	sofrito	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
787	red pepper	Vegetable		{}	\N	\N	\N	\N	\N	\N	\N
788	serrano ham	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
789	green peas	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
790	mild paprika	Spices		{}	\N	\N	\N	\N	\N	\N	\N
791	butter beans	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
792	chourico sausage	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
793	linguica sausage	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
794	italian seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
795	fava beans	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
796	baking powder	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
797	sumac powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
798	basmati rice	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
799	russet potato	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
800	dried limes	Spices		{}	\N	\N	\N	\N	\N	\N	\N
801	pita bread	Breads, flakes and breakfast cereals		{}	\N	\N	\N	\N	\N	\N	\N
802	cooking spray	Fats and oils		{}	\N	\N	\N	\N	\N	\N	\N
803	recatio	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
804	gandules	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
805	pinto beans	Cereal		{}	\N	\N	\N	\N	\N	\N	\N
806	napa cabbage	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
807	cellophane noodles	Pasta		{}	\N	\N	\N	\N	\N	\N	\N
808	beef stock	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
809	beef sirloin steak	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
810	heavy cream	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
811	gruyere cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
812	yellow squash	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
813	yellow bell pepper	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
814	red bell pepper	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
815	thyme leaves	Spices		{}	\N	\N	\N	\N	\N	\N	\N
816	mascarpone cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
817	pork chops	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
818	beef flank steak	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
819	risotto rice	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
820	bone-in pork chops	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
821	yakisoba noodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
822	dashi stock	Fish		{}	\N	\N	\N	\N	\N	\N	\N
823	mirin	Alcoholic drinks		{}	\N	\N	\N	\N	\N	\N	\N
824	vegetarian refried beans	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
825	vegan cheese	Milk substitutes		{}	\N	\N	\N	\N	\N	\N	\N
826	dried seeweed	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
827	green enchilada sauce	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
828	green chiles	Spices		{}	\N	\N	\N	\N	\N	\N	\N
829	red chiles	Spices		{}	\N	\N	\N	\N	\N	\N	\N
830	rice vermicelli	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
831	cucumber	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
832	pickled cucumbers	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
833	rice wrapper	Miscellaneous		{" "}	\N	\N	\N	\N	\N	\N	\N
834	rice paper	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
835	thai basilikum	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
836	panko bread crumbs	Breads		{}	\N	\N	\N	\N	\N	\N	\N
837	yam	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
838	kaiser roll	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
839	potato salad	Courts		{}	\N	\N	\N	\N	\N	\N	\N
840	pimento pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
841	collard greens	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
842	goat cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
843	white truffle oil	Fats and oils		{}	\N	\N	\N	\N	\N	\N	\N
844	buffalo mozzarella	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
845	heirloom tomato	Vegtables		{}	\N	\N	\N	\N	\N	\N	\N
846	tortellini	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
847	split mung beans	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
848	monterey jack cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
849	tomato puree	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
850	fontina cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
851	feta cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
852	miso paste	Spices		{}	\N	\N	\N	\N	\N	\N	\N
853	soba noodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
854	sweet chili sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
855	pico de gallo	Courts		{}	\N	\N	\N	\N	\N	\N	\N
856	sriracha chile sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
857	caraway seed	Spices		{}	\N	\N	\N	\N	\N	\N	\N
858	colby cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
859	heavy whipping cream	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
860	linguine pasta	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
861	cajun seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
862	white cornmeal	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
863	hoagie rolls	Courts		{}	\N	\N	\N	\N	\N	\N	\N
864	enoa salami	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
865	deli hamrice papers	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
866	meatless ground beef substitute	Meat substitutes		{}	\N	\N	\N	\N	\N	\N	\N
867	white wine	Alcoholic drinks		{}	\N	\N	\N	\N	\N	\N	\N
868	taco seasoning mix	Spices		{}	\N	\N	\N	\N	\N	\N	\N
869	vegan cheddar cheese	Milk substitutes		{}	\N	\N	\N	\N	\N	\N	\N
870	hot italian pork sausage	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
871	parmigiano-reggiano cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
872	marinara sauce	Courts		{}	\N	\N	\N	\N	\N	\N	\N
873	greek yogurt	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
874	poblano pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
875	swiss cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
876	white beans	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
877	soy margarine	Milk substitutes		{}	\N	\N	\N	\N	\N	\N	\N
878	masala paste	Spices		{}	\N	\N	\N	\N	\N	\N	\N
879	tahini	Spices		{}	\N	\N	\N	\N	\N	\N	\N
880	monterey jack cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
881	sea bass fillets	Fish		{}	\N	\N	\N	\N	\N	\N	\N
882	sriracha sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
883	italian sausage	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
884	cottage cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
885	queso fresco	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
886	bok choy	Vegtables		{}	\N	\N	\N	\N	\N	\N	\N
887	chinese spice powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
888	cellophane noodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
889	hot pepper sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
890	ranch dressing	Spices		{}	\N	\N	\N	\N	\N	\N	\N
891	hot dog bun	Breads		{}	\N	\N	\N	\N	\N	\N	\N
892	sport peppers	Vegtables		{}	\N	\N	\N	\N	\N	\N	\N
893	seitan	Meat substitutes		{}	\N	\N	\N	\N	\N	\N	\N
894	hot chili oil	Fats and oils		{}	\N	\N	\N	\N	\N	\N	\N
895	shiitake mushrooms	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
896	provolone cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
897	lemon grass	Vegetables		{}	\N	\N	\N	\N	\N	\N	\N
898	udon noodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
899	ramen nooodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
900	coriander seed	Spices		{}	\N	\N	\N	\N	\N	\N	\N
901	rice vinegar	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
902	fontina cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
903	chile garlic sauce	Courts		{}	\N	\N	\N	\N	\N	\N	\N
904	ziti pasta	Spices		{}	\N	\N	\N	\N	\N	\N	\N
905	turkey cold cuts	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
906	garbanzo beans	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
907	pepitas	Nuts, seeds and oil fruits		{}	\N	\N	\N	\N	\N	\N	\N
908	greek seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
909	artichoke hearts	Vegtables		{}	\N	\N	\N	\N	\N	\N	\N
910	deli turkey	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
911	garlic salt	Spices		{}	\N	\N	\N	\N	\N	\N	\N
912	maggie sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
913	corn tortillas	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
914	mozzarella balls	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
915	ginger garlic paste	Spices		{}	\N	\N	\N	\N	\N	\N	\N
916	tandoori masala powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
917	chicken thighs	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
918	green cardamom pods	Nuts, seeds and oil fruits		{}	\N	\N	\N	\N	\N	\N	\N
919	creme fraiche	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
920	cornstarch	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
921	caraway seeds	Nuts, seeds and oil fruits		{}	\N	\N	\N	\N	\N	\N	\N
922	fennel seeds	Nuts, seeds and oil fruits		{}	\N	\N	\N	\N	\N	\N	\N
923	coriander seeds	Nuts, seeds and oil fruits		{}	\N	\N	\N	\N	\N	\N	\N
924	rosemary	Spices		{}	\N	\N	\N	\N	\N	\N	\N
925	beef rump	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
926	lemon pepper	Spices		{}	\N	\N	\N	\N	\N	\N	\N
927	brown lentils	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
928	wooden skewers	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
929	kabob skewers	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
930	metal skewers	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
931	penne pasta	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
932	soup base	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
933	worcestershire sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
934	beef rib eye steaks	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
935	sake	Alcoholic drinks		{}	\N	\N	\N	\N	\N	\N	\N
936	kimchi	Courts		{}	\N	\N	\N	\N	\N	\N	\N
937	bonito shavings	Fish		{}	\N	\N	\N	\N	\N	\N	\N
938	seaweed	Miscellaneous		{}	\N	\N	\N	\N	\N	\N	\N
939	lamb loin chops	Meat and offal		{}	\N	\N	\N	\N	\N	\N	\N
940	rice vermicelli	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
941	hoisin sauce	Spices		{}	\N	\N	\N	\N	\N	\N	\N
942	romano cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
943	lamb stew meat	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
944	beef stew meat	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
945	apricots	Fruits		{}	\N	\N	\N	\N	\N	\N	\N
946	saffron threads	Spices		{}	\N	\N	\N	\N	\N	\N	\N
947	chuck roast	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
948	pork roast	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
949	recaito	Spices		{}	\N	\N	\N	\N	\N	\N	\N
950	silken tofu	Meat substitutes		{}	\N	\N	\N	\N	\N	\N	\N
951	chipotle peppers	Spices		{}	\N	\N	\N	\N	\N	\N	\N
952	sausage	Meat and sausage products		{}	\N	\N	\N	\N	\N	\N	\N
953	dangmyun noodles	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
954	heirloom tomato	Vegtables		{}	\N	\N	\N	\N	\N	\N	\N
955	potatoes	Cereal products, pulses and potatoes		{}	\N	\N	\N	\N	\N	\N	\N
956	chili powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
957	smoked paprika	Spices		{}	\N	\N	\N	\N	\N	\N	\N
958	chili powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
959	onion powder	Spices		{}	\N	\N	\N	\N	\N	\N	\N
960	butter	Fats and oils	Fats,milk and dairy products	{}	39.8	3.5	4.8	391	120	\N	14
961	parmesan cheese	Milk and dairy products		{}	\N	\N	\N	\N	\N	\N	\N
962	beef broth	Stews and soups	Meat Stews	{}	0.3	0.2	0.3	5	1	0.2	10
963	vegetable broth	Stews and soups	Vegetable Stews	{}	0.4	0.4	0.3	6	1	0.1	4
964	vegetable oil	Fats and oils	Oils	{}	100	\N	\N	884	\N	\N	\N
965	lime	Fruits	Fruits fresh	{}	0.2	10.5	0.7	30	30	0.2	12
966	black peppercorn	Spices		{}	\N	\N	\N	\N	\N	\N	\N
967	green olives	Vegetables	Vegetables fresh	{}	15.3	3.8	1	145	\N	\N	\N
968	eggplant	Vegetables	Vegetables fresh	{}	0.2	5.9	1	25	20	0.6	14
969	glass noodles	Cereal products, pulses and potatoes	Pasta	{}	0.7	77	8	351	\N	\N	\N
970	dates	Fruits	Fruits dried	{}	0.4	63.4	2.5	282	\N	\N	\N
971	jalapeno pepper	Vegetables	Vegetables fresh	{}	0.2	5.9	1.2	29	\N	\N	\N
972	fruit preserves	Sweets	Jams and marmalades	{}	0.1	61	0.5	250	\N	\N	\N
973	toast	Breads, flakes and breakfast cereals	Breads and bread products	{}	4.9	43.7	9.3	271	21	3.4	87
974	lamb	Meat and offal	Lamb	{}	23.5	\N	16.3	294	\N	\N	\N
975	oil	Fats and oils	Oils	{}	100	\N	\N	884	\N	\N	\N
976	fish sauce	Miscellaneous	Sauces	{}	2.1	9.7	1.8	69	23	1.4	17
977	green curry paste	Spices		{}	\N	\N	\N	\N	\N	\N	\N
978	scallions	Vegetables	Vegetables fresh	{}	0.2	5.9	1.8	32	\N	\N	\N
979	cherry tomatoes	Vegetables	Vegetables fresh	{}	0.2	3.9	0.9	18	\N	\N	\N
980	curry paste	Spices		{}	\N	\N	\N	\N	\N	\N	\N
981	kale leaves	Vegetables	Vegetables fresh	{}	0.9	8.8	4.3	49	\N	\N	\N
982	chile peppers	Vegetables	Vegetables fresh	{}	0.2	8.8	1.9	40	\N	\N	\N
983	pineaaple	Fruits	Fruits fresh	{}	0.1	11.8	0.5	50	\N	\N	\N
984	cumin seeds	Spices		{}	\N	\N	\N	\N	\N	\N	\N
985	salsa	Miscellaneous	Sauces	{}	0.2	7	0.6	36	\N	\N	\N
986	maggie sauce	Miscellaneous	Sauces	{}	\N	\N	\N	\N	\N	\N	\N
987	fajita seasoning	Spices		{}	\N	\N	\N	\N	\N	\N	\N
988	aragula	Vegetables	Vegetables fresh	{}	0.7	3.7	2.6	25	\N	\N	\N
989	couscous	Cereal products, pulses and potatoes	Pasta	{}	0.6	77	12.8	376	\N	\N	\N
990	naan bread	Breads, flakes and breakfast cereals	Breads and bread products	{}	3	55	9	310	\N	\N	\N
991	taco shells	Breads, flakes and breakfast cereals	Breads and bread products	{}	20	63	7	475	\N	\N	\N
992	basil leaves	Vegetables	Herbs	{}	0.6	2.7	3.2	23	\N	\N	\N
993	hot sauce	Miscellaneous	Sauces	{}	0.3	7	0.7	35	\N	\N	\N
994	teriyaki sauce	Miscellaneous	Sauces	{}	0.1	20	0.5	89	\N	\N	\N
995	pickle slices	Vegetables	Vegetables fresh	{}	0.1	2.5	0.6	12	\N	\N	\N
996	quinoa	Cereal products, pulses and potatoes	Pasta	{}	6.1	64.2	14.1	368	\N	\N	\N
997	almond butter	Nuts, seeds and oil fruits	Nuts and kernels	{}	55.8	6.9	21.2	614	\N	\N	\N
998	cashews	Nuts, seeds and oil fruits	Nuts and kernels	{}	43.9	30.2	18.2	553	\N	\N	\N
999	lime zest	Fruits	Fruits fresh	{}	0.2	10.5	0.7	30	\N	\N	\N
1000	peeled tomatoes	Vegetables	Vegetables fresh	{}	0.2	3.9	0.9	18	\N	\N	\N
1001	escarole	Vegetables	Vegetables fresh	{}	0.2	3.7	1.2	19	\N	\N	\N
1002	pine nuts	Nuts, seeds and oil fruits	Nuts and kernels	{}	68.4	4.3	13.7	673	\N	\N	\N
1003	chestnuts	Nuts, seeds and oil fruits	Nuts and kernels	{}	1.3	45.5	2.4	213	\N	\N	\N
1004	cheddar cheese	Milk and dairy products	Hard cheese	{}	33.1	1.3	25.4	403	\N	\N	\N
\.


--
-- Data for Name: IngredientWithAmount; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."IngredientWithAmount" (id, unit, quantity, "ingredientId", "recipeId", condition) FROM stdin;
1	g	1814.25	371	1	boneless and skinless
2	\N	\N	425	1	
3	\N	\N	666	1	
4	tbsp	10	960	1	
5	cloves	6	254	1	minced
6	tsp	2	794	1	
7	tsp	0.5	738	1	
8	cup	1	867	1	
9	cup	2	746	1	
10	cup	1.5	859	1	
11	cup	1	1000	1	sliced
12	cup	1	21	1	chopped
13	can	1	249	2	
14	can	1	724	2	
15	can	1	805	2	
16	can	1	734	2	
17	cup	2	963	2	
18	cup	2	985	2	
19	cup	1.5	392	2	
20	tbsp	1	868	2	
21	ear	1	301	2	
22	head	1	111	2	torn into bite-sized pieces
23	\N	1	16	2	cut into wedges
24	cup	1	869	2	shredded
25	tbsp	5	591	2	chopped
26	\N	1	965	2	cut into wedges
27	(8 1/2-inch)	4	834	3	
28	\N	1	371	3	cut into thin strips
29	\N	1	726	3	cut into thin strips
30	\N	1	166	3	cut into thin strips
31	\N	1	240	3	cut into thin strips
32	sprigs	4	21	3	chopped
33	sprigs	4	649	3	chopped
34	sprigs	4	591	3	chopped
35	tsp	4	122	3	
36	tsp	4	480	3	
37	\N	\N	519	3	
38	tbsp	6	340	4	
39	cloves	2	254	4	minced
40	tbsp	1	562	4	
41	tbsp	1	359	4	chopped
42	tsp	1	21	4	
43	tsp	1	425	4	
44	tsp	1	721	4	ground
45	(6 ounce) fillets	2	278	4	
46	cup	1	996	5	
47	cup	1	519	5	
48	tsp	1	55	5	
49	cup	0.5	985	5	
50	tbsp	1	187	5	
51	tsp	2	592	5	ground
52	tsp	2	956	5	
53	tsp	0.5	628	5	
54	tsp	0.5	425	5	
55	tsp	0.5	721	5	
56	(14 ounce) package	1	506	6	drained and cut into stripes
57	tbsp	1	964	6	
58	\N	2	240	6	julienned
59	\N	1	726	6	julienned
60	\N	1	166	6	julienned
61	cup	1	418	6	shredded
62	\N	4	978	6	white parts thinly sliced lengthwise
63	\N	2	16	6	halved and sliced
64	\N	16	992	6	
65	\N	16	709	6	
66	g	113.5	759	6	
67	\N	16	834	6	
68	cup	0.5	122	6	
69	tbsp	2	480	6	
70	tbsp	2	641	6	
71	clove	1	254	6	minced
72	\N	2	199	7	
73	cup	1	486	7	torn
74	tbsp	1.5	961	7	grated
75	tsp	0.25	959	7	
76	tsp	0.25	644	7	ground
77	\N	\N	425	7	
78	\N	\N	666	7	
79	slices	4	408	8	cut into 1-inch pieces
80	\N	1	571	8	chopped
81	\N	3	955	8	chopped into 3/4-inch cubes
82	cup	0.25	519	8	
83	\N	2	967	8	sliced
84	cloves	2	254	8	minced
85	tsp	0.5	957	8	
86	\N	\N	425	8	
87	\N	\N	721	8	ground
88	large	4	199	8	
89	cup	1	1004	8	shredded
90	g	453.5	883	9	
91	small	1	571	9	diced
92	cloves	4	254	9	minced
93	(26 ounce) jar	1	872	9	
94	cup	2	519	9	
95	tsp	1	794	9	
96	(8 ounce) package	1	751	9	
97	cup	0.5	961	9	grated
98	cup	1	867	10	
99	cup	2	519	10	
100	\N	1	571	10	diced
101	tbsp	1	340	10	
102	cup	2	872	10	
103	cup	1	962	10	
104	tbsp	1	18	10	
105	tsp	0.25	738	10	
106	g	453.5	739	10	
107	g	113.5	870	10	casing removed
108	(10 ounce) can	1	509	10	diced
109	cup	0.25	359	10	chopped
110	cloves	4	254	10	minced
111	tsp	2	425	10	
112	tsp	1	721	10	ground
113	pinch	1	589	10	
114	cup	1	871	10	grated
115	large	4	732	10	halved lengthwise and seeded
116	cup	2	519	11	
117	cup	1	996	11	
118	pinch	1	425	11	
119	cup	0.25	340	11	
120	tsp	0.5	425	11	
121	cup	0.25	562	11	
122	\N	3	509	11	diced
123	\N	1	166	11	diced
124	bunches	2	967	11	diced
125	\N	2	240	11	grated
126	cup	1	359	11	chopped
127	tbsp	2	340	12	
128	cloves	2	254	12	minced
129	tsp	0.25	738	12	
130	\N	6	777	12	skinless, boneless
131	cup	2	872	12	
132	cup	0.25	21	12	chopped
133	(8 ounce) package	1	333	12	shredded
134	cup	0.5	961	12	grated
135	(5 ounce) package	1	254	12	
136	bag	1	337	13	
137	g	680.5	236	13	
138	cup	0.5	319	13	
139	large	2	199	13	
140	tbsp	3	961	13	grated
141	tbsp	2	323	13	
142	tsp	1	359	13	minced
143	tsp	0.5	425	13	
144	tsp	0.25	666	13	
145	pinch	1	644	13	ground
146	cup	1	780	13	
147	tbsp	6	960	13	
148	slices	4	561	13	
149	\N	1	372	14	meat removed and shredded
150	cup	0.5	240	14	shredded
151	cup	0.5	1003	14	chopped
152	tbsp	2	340	14	
153	tbsp	2	125	14	
154	tbsp	1	197	14	
155	tbsp	1	480	14	
156	clove	1	254	14	minced
157	cup	0.25	762	14	
158	pinch	1	738	14	
159	head	1	46	14	
160	tbsp	2	340	15	
161	small	1	571	15	diced
162	small	1	874	15	diced
163	clove	1	254	15	chopped
164	cup	1	798	15	
165	tsp	2	790	15	
166	tsp	1	592	15	ground
167	tsp	1	657	15	
168	\N	\N	425	15	
169	\N	\N	721	15	ground
170	tbsp	2	510	15	
171	cup	2	963	15	
172	(14 ounce) can	1	805	15	rinsed and drained
173	(15 ounce) cans	2	249	16	rinsed and drained
174	\N	0.5	812	16	peeled, seeded, and chopped
175	\N	1	571	16	chopped
176	\N	1	494	16	peeled and chopped
177	large	2	240	16	chopped
178	medium	3	955	16	chopped
179	tbsp	3	964	16	
180	tsp	1	425	16	
181	tsp	0.5	721	16	ground
182	tsp	1	959	16	
183	tsp	1	628	16	
184	tsp	1	922	16	ground
185	tsp	1	424	16	
186	\N	2	967	16	chopped
187	tbsp	2	728	17	
188	small	1	571	17	diced
189	clove	1	254	17	minced
190	cup	0.5	240	17	sliced
191	cup	0.5	49	17	chopped
192	cup	0.5	64	17	chopped
193	cup	0.5	85	17	sliced
194	tbsp	4	480	17	
195	cup	1	519	17	
196	cup	1	979	17	halved
197	\N	\N	425	17	
198	\N	\N	721	17	ground
199	tbsp	1	21	17	chopped
200	cup	2	392	17	
201	(15 ounce) cans	2	249	18	drained and rinsed
202	cup	1	519	18	
203	(1 ounce) package	1	868	18	
204	\N	1	16	18	peeled, pitted, and mashed
205	cup	0.5	1004	18	shredded
206	cup	0.5	985	18	
207	cup	0.25	591	18	chopped
208	\N	8	991	18	
209	g	907.25	462	19	trimmed
210	tbsp	2	565	19	
211	\N	5	682	19	sliced
212	cloves	3	254	19	chopped
213	tbsp	3	976	19	
214	\N	\N	721	19	ground
215	fluid ounces	13	264	19	
216	\N	6	198	19	peeled
217	cup	3	392	19	
218	cup	0.25	480	20	
219	cup	0.25	964	20	
220	tbsp	1.5	901	20	
221	tsp	1	471	20	
222	cup	0.25	967	20	chopped
223	tbsp	1	618	20	grated
224	tsp	1	254	20	minced
225	(2 pound)	2	278	20	skin removed
226	cup	3	392	20	
227	cup	2.25	963	21	
228	cup	1.25	519	21	
229	cup	2	989	21	
230	pinch	1	425	21	
231	pinch	1	721	21	ground
232	tbsp	5	340	21	
233	cup	0.5	1002	21	
234	cloves	4	254	21	minced
235	\N	1	682	21	minced
236	cup	0.5	339	21	sliced
237	cup	0.25	1000	21	drained and chopped
238	cup	0.25	359	21	chopped
239	cup	1	960	22	
240	cup	1.75	519	22	
241	cup	0.25	340	22	
242	cup	0.25	562	22	
243	cup	1	967	22	chopped
244	cup	1	359	22	chopped
245	cup	0.25	649	22	chopped
246	\N	3	509	22	chopped
247	\N	1	166	22	chopped
248	tsp	1	425	22	
249	\N	\N	721	22	ground
250	g	453.5	496	23	
251	cup	2	859	23	
252	cup	1	967	23	chopped
253	cup	1	359	23	chopped
254	tbsp	1	21	23	chopped
255	tbsp	1	502	23	chopped
256	tsp	2	425	23	
257	tsp	2	721	23	ground
258	tsp	1.5	738	23	
259	tsp	1	665	23	ground
260	g	226.75	151	23	peeled and deveined
261	g	226.75	737	23	
262	cup	0.5	875	23	shredded
263	cup	0.5	961	23	grated
264	tbsp	3	960	24	
265	cup	3	85	24	diced
266	\N	\N	425	24	
267	\N	0.5	571	24	diced
268	\N	\N	721	24	ground
269	pinch	1	589	24	
270	cup	1	819	24	
271	cup	2.5	746	24	
272	cup	0.75	859	24	
273	cup	0.5	871	24	grated
274	tbsp	2	442	24	chopped
275	tbsp	3	340	25	
276	cloves	4	254	25	minced
277	cup	4	746	25	
278	pinches	2	738	25	
279	(15 ounce) cans	2	876	25	drained
280	\N	1	428	25	
281	tsp	2	657	25	chopped
282	tsp	0.5	561	25	
283	head	1	1001	25	chopped
284	\N	\N	425	25	
285	\N	\N	721	25	ground
286	cup	1	319	26	
287	cup	0.5	477	26	
288	cup	0.25	519	26	
289	cup	0.25	877	26	melted
290	tbsp	2	3	26	
291	tbsp	1	565	26	
292	tsp	0.25	425	26	
293	\N	1	727	27	chopped
294	tbsp	2	951	27	
295	\N	4	913	27	
296	tbsp	2	571	27	chopped
297	tbsp	2	591	27	chopped
298	(14.5 ounce) can	1	979	28	
299	tbsp	4	873	28	
300	cloves	2	254	28	chopped
301	(1 inch) piece	1	618	28	chopped
302	tbsp	2	964	28	
303	\N	1	571	28	chopped
304	tbsp	2	878	28	
305	\N	4	371	28	skinless, boneless, cut into 1-inch pieces
306	\N	\N	425	28	
307	\N	\N	721	28	ground
308	cup	0.25	519	28	
309	tbsp	1	319	28	
310	tbsp	3	591	28	chopped
311	cup	2	392	28	
312	g	453.5	739	29	
313	cloves	5	254	29	crushed
314	tbsp	1	618	29	grated
315	tsp	2	471	29	
316	cup	0.5	480	29	
317	cup	0.25	565	29	
318	tsp	0.25	787	29	crushed
319	\N	6	967	29	chopped
320	cup	2	392	29	
321	tbsp	1	472	29	
322	heads	2	46	30	chopped
323	\N	2	341	30	peeled, pith removed, and cut into segments
324	cup	0.5	842	30	crumbled
325	\N	2	129	30	cut into 1-inch cubes
326	\N	\N	425	30	
327	\N	\N	721	30	ground
328	tbsp	2	340	30	
329	tbsp	2	125	30	
330	tbsp	4	964	31	
331	tsp	2	618	31	chopped
332	cloves	1.5	254	31	chopped
333	tbsp	1	757	31	
334	small head	1	64	31	cut into florets
335	cup	0.75	240	31	julienned
336	cup	0.5	789	31	
337	cup	0.5	789	31	halved
338	tbsp	2.5	519	31	
339	tbsp	2	480	31	
340	cup	0.25	571	31	chopped
341	tbsp	0.5	425	31	
342	cup	3	392	31	
343	tbsp	2	340	32	
344	\N	1	571	32	diced
345	head	1	254	32	sliced
346	(8 ounce) package	1	85	32	sliced
347	\N	1	968	32	chopped
348	cup	6	812	32	diced
349	(28 ounce) can	1	509	32	diced
350	cup	1	927	32	
351	cup	4	496	32	
352	cup	6	964	32	
353	cup	0.25	901	32	
354	cup	0.25	480	32	
355	tbsp	1	510	32	
356	cup	1	187	32	
357	(.75 ounce) package	1	992	32	cut into thin strips
358	tsp	0.5	790	32	
359	pinch	1	721	32	ground
360	tsp	1	340	33	
361	g	567	521	33	
362	cup	1	726	33	diced
363	tbsp	1	254	33	minced
364	tsp	2	794	33	
365	tsp	0.5	721	33	ground
366	tsp	0.25	425	33	
367	tsp	0.25	738	33	
368	cup	3	872	33	
369	cup	2	486	33	
370	\N	4	765	33	cut into noodle-shape strands
371	cup	1	963	34	
372	cup	0.5	996	34	
373	cup	1.75	414	34	
374	cup	0.25	240	34	cubed
375	cup	0.25	661	34	peeled and cubed
376	\N	0.5	766	34	chopped
377	tsp	2	340	34	
378	(15 ounce) can	1	249	34	drained and patted dry
379	tsp	1	610	34	ground
380	cup	0.25	879	34	
381	tbsp	2	562	34	
382	tbsp	1	3	34	
383	tbsp	5	519	34	
384	\N	1	16	34	mashed
385	cup	0.5	318	35	
386	cup	0.5	873	35	
387	\N	2	903	35	chopped
388	large	2	913	35	
389	cup	0.5	46	35	shredded
390	cup	1.5	848	35	shredded
391	\N	1	16	35	peeled, pitted, and diced
392	slices	4	408	35	cooked, chopped
393	\N	1	766	35	chopped
394	\N	1	509	35	chopped
395	\N	2	371	35	cooked, cut into chunks
396	tbsp	1	340	36	
397	\N	1	571	36	chopped
398	cloves	2	254	36	minced
399	\N	0.5	726	36	thinly sliced
400	\N	1	240	36	chopped
401	cup	0.5	85	36	sliced
402	cup	0.5	536	36	
403	(14 ounce) can	1	509	36	diced
404	cup	1	963	36	
405	(15 ounce) can	1	927	36	drained
406	tsp	1	790	36	ground
407	tsp	1	21	36	
408	tsp	1	657	36	
409	pinch	1	644	36	ground
410	g	340.25	496	36	
411	cup	6	963	37	
412	(28 ounce) can	1	509	37	crushed
413	(15 ounce) can	1	734	37	drained
414	large	1	571	37	chopped
415	large	2	240	37	diced
416	ribs	2	491	37	diced
417	cup	1	789	37	
418	small	1	765	37	chopped
419	cloves	3	254	37	minced
420	tbsp	1	359	37	minced
421	tsp	1.5	657	37	
422	tsp	1	425	37	
423	tsp	0.75	502	37	
424	tsp	0.25	721	37	ground
425	cup	0.5	496	37	
426	cup	4	486	37	chopped
427	cup	0.25	961	37	grated
428	large	2	199	38	
429	thin slices	2	258	38	diced
430	tbsp	2	1004	38	shredded
431	tsp	1	859	38	
432	tsp	0.5	960	38	
433	cup	2	519	39	
434	cup	1	867	39	
435	tbsp	1	340	39	
436	\N	1	571	39	sliced
437	tsp	1	425	39	
438	tbsp	2	510	39	
439	cloves	4	254	39	minced
440	tsp	2	790	39	
441	tsp	1	592	39	ground
442	\N	\N	589	39	
443	(14 ounce) can	1	266	39	
444	tsp	1	480	39	
445	\N	1	726	39	halved and thinly sliced
446	\N	2	971	39	seeded and thinly sliced
447	cup	0.25	760	39	chopped
448	g	680.5	881	39	cut into chunks
449	cup	0.25	591	39	chopped
450	tbsp	2	641	39	
451	(16 ounce) package	1	751	40	
452	cup	0.25	340	40	
453	cloves	5	254	40	minced
454	bunch	1	116	40	chopped
455	tbsp	2	187	40	
456	(15 ounce) can	1	249	40	
457	\N	\N	425	40	
458	\N	\N	721	40	ground
459	(14 ounce) can	1	266	41	
460	cup	0.25	122	41	
461	tbsp	2	480	41	
462	tbsp	2	565	41	
463	tbsp	1	641	41	
464	tsp	1	882	41	
465	tsp	0.5	666	41	ground
466	tbsp	1	340	41	
467	\N	2	240	41	diced
468	\N	1	726	41	diced
469	(14 ounce) package	1	506	41	drained and cut into 1-inch cubes
470	cloves	4	254	41	minced
471	tbsp	2	618	41	minced
472	cup	4	486	41	
473	cup	1.5	392	41	
474	(12 ounce) package	1	506	42	
475	tsp	2	964	42	
476	small	1	571	42	chopped
477	stalk	1	491	42	chopped
478	cup	0.25	1004	42	shredded
479	large	1	199	42	beaten
480	\N	\N	425	42	
481	\N	\N	666	42	
482	leaves	6	111	42	
483	\N	1	509	42	sliced
484	tbsp	6	318	42	
485	\N	6	791	42	
486	(28 ounce) can	1	1000	43	drained, juice reserved
487	tbsp	4	340	43	
488	medium	1	571	43	chopped
489	cloves	3	254	43	minced
490	(8 ounce) can	1	512	43	
491	tsp	1	657	43	
492	tsp	1.25	425	43	
493	tsp	0.5	721	43	ground
494	g	453.5	866	43	
495	tbsp	1	780	43	
496	tsp	1.5	359	43	chopped
497	tsp	0.25	628	43	
498	tsp	0.25	959	43	
499	(12 ounce) package	1	751	43	
500	(16 ounce) package	1	496	44	
501	tsp	1	340	44	
502	cloves	2	254	44	minced
503	\N	2	371	44	skinless, boneless, cut into bite-sized pieces
504	pinch	1	738	44	
505	cup	0.5	357	44	
506	cup	0.25	1000	44	drained and cut into strips
507	cup	2	770	45	
508	g	453.5	883	45	
509	can	1	509	45	
510	cloves	4	254	45	minced
511	\N	1	571	45	diced
512	cup	1	205	45	
513	cup	2	333	45	shredded
514	\N	4	955	46	peeled and cubed
515	tbsp	2	964	46	
516	\N	1	571	46	diced
517	cloves	3	254	46	minced
518	tsp	4	595	46	
519	tsp	4	609	46	
520	tsp	2	592	46	ground
521	tsp	2	425	46	
522	(1 inch) piece	1	618	46	peeled and minced
523	tsp	1.5	589	46	
524	(15 ounce) can	1	249	46	rinsed and drained
525	(15 ounce) can	1	116	46	drained
526	(14.5 ounce) can	1	509	46	diced
527	(14 ounce) can	1	266	46	
528	tbsp	1	975	47	
529	\N	4	240	47	chopped
530	\N	1	242	47	chopped
531	\N	2	285	47	chopped
532	\N	1	571	47	chopped
533	\N	1	494	47	shredded
534	(15 ounce) can	1	724	47	rinsed and drained
535	tbsp	2	592	47	ground
536	tsp	1	657	47	
537	tsp	1	956	47	
538	pinch	1	589	47	
539	\N	\N	425	47	
540	\N	\N	721	47	ground
541	(6 inch)	16	913	47	
542	\N	1	16	47	peeled, pitted, and mashed
543	cup	0.5	885	47	crumbled
544	cup	0.5	985	47	
545	cup	0.25	591	47	chopped
546	tsp	0.5	641	47	
547	(12 ounce) package	1	496	48	bow tie
548	tbsp	2	340	48	
549	g	453.5	883	48	chopped
550	tsp	0.5	738	48	
551	cup	0.5	571	48	diced
552	cloves	3	254	48	minced
553	(28 ounce) can	1	509	48	drained and coarsely chopped
554	cup	1.5	810	48	
555	tsp	0.5	425	48	
556	tbsp	3	359	48	minced
557	cup	0.25	480	49	
558	cup	0.25	901	49	
559	cup	0.25	964	49	
560	tsp	1	999	49	
561	tbsp	3	641	49	(from 2 limes)
562	tbsp	1	618	49	
563	tbsp	1	197	49	
564	lb	2	533	49	rind removed and cut into 1-inch pieces
565	cup	0.5	318	49	
566	cup	4	867	49	
567	avocados, sliced	2	16	49	
568	\N	1	166	49	sliced
569	cup	1	382	49	
570	cup	1	513	49	thawed
571	\N	1	240	49	shredded
572	tbsp	1	472	49	
573	\N	1	967	49	sliced
574	cup	1	909	50	drained and chopped
575	cup	0.5	851	50	crumbled
576	cup	0.5	967	50	thinly sliced
577	tbsp	1	562	50	
578	tsp	1	425	50	
579	tsp	0.5	721	50	ground
580	(6 inch)	2	801	50	split and toasted
581	g	113.5	371	50	sliced
582	tbsp	2	262	51	
583	g	1134	886	51	cut into bite-sized pieces
584	cloves	6	254	51	grated
585	(3 inch) piece	1	618	51	grated
586	cup	3	240	51	shredded
587	tsp	2	887	51	
588	tsp	1	592	51	ground
589	cup	12	963	51	
590	(2 ounce) packages	2	807	51	
591	cup	3	481	51	
592	\N	5	978	51	trimmed and thinly sliced
593	(6 inch)	10	913	52	
594	cup	2	333	52	shredded
595	(2 ounce) can	1	339	52	sliced
596	\N	2	16	52	peeled, pitted and sliced
597	tsp	2	889	52	
598	tbsp	2	964	53	
599	cup	0.5	571	53	chopped
600	tbsp	1	254	53	minced
601	tbsp	1	618	53	grated
602	tbsp	2	980	53	
603	(13.5 ounce) can	1	266	53	
604	cup	1	963	53	
605	tsp	0.5	425	53	
606	(15 ounce) cans	2	249	53	rinsed and drained
607	cup	3	486	53	
608	tbsp	1	641	53	
609	cup	0.5	998	53	toasted and coarsely chopped
610	sprig	1	591	53	
611	cup	2	392	53	
612	tbsp	1	340	54	
613	small	3	571	54	chopped
614	clove	1	254	54	crushed
615	tsp	1	359	54	minced
616	tsp	1	491	54	minced
617	\N	\N	425	54	
618	\N	\N	666	54	
619	cup	1.5	85	54	sliced
620	cup	1	323	54	
621	cup	0.25	810	54	
622	cup	1	819	54	
623	cup	5	964	54	
624	tsp	1	960	54	
625	cup	1	961	54	grated
626	cup	1	435	55	
627	tbsp	3	591	55	
628	\N	2	965	55	zested and juiced
629	clove	1	254	55	minced
630	tsp	1	425	55	
631	tsp	2	956	55	
632	tsp	0.5	589	55	
633	tsp	2	592	55	ground
634	tsp	0.75	628	55	
635	tsp	0.5	957	55	
636	tsp	0.5	657	55	
637	tsp	0.25	666	55	
638	g	907.25	151	55	peeled and deveined
639	\N	1	571	55	thinly sliced
640	\N	1	667	55	sliced vertically
641	\N	1	787	55	sliced vertically
642	cup	0.25	964	55	
643	\N	1	965	55	juiced
644	\N	10	913	55	
645	\N	1	16	55	peeled, pitted, and sliced
646	cup	1	985	55	
647	bunch	1	591	55	chopped
648	cup	0.5	340	56	
649	cup	0.25	641	56	
650	clove	1	254	56	minced
651	tsp	1	425	56	
652	tsp	0.25	589	56	ground
653	(15 ounce) cans	2	724	56	rinsed and drained
654	can	1	301	56	
655	\N	1	16	56	peeled, pitted and diced
656	\N	1	726	56	chopped
657	\N	2	509	56	chopped
658	\N	6	967	56	thinly sliced
659	cup	0.5	591	56	chopped
660	tbsp	5	963	57	
661	cup	0.5	571	57	chopped
662	cloves	3	254	57	minced
663	\N	0.5	971	57	minced
664	\N	2	494	57	diced
665	tbsp	2	956	57	
666	tbsp	1	592	57	ground
667	tsp	0.5	957	57	
668	tsp	0.5	657	57	
669	tsp	0.5	738	57	
670	tsp	1.5	510	57	
671	cup	2	963	57	
672	(28 ounce) can	1	509	57	diced
673	cans	1	734	57	drained and rinsed
674	(15 ounce) can	1	249	58	drained and rinsed
675	\N	1	166	58	chopped
676	cup	1	1000	58	halved
677	cup	0.25	571	58	chopped
678	tbsp	1	254	58	minced
679	tsp	0.5	359	58	choped
680	tsp	0.25	21	58	
681	tbsp	1	961	58	grated
682	tbsp	1	340	58	
683	tbsp	3	18	58	
684	tsp	0.25	425	58	
685	\N	2	765	59	ends trimmed
686	\N	2	240	59	
687	head	1	418	59	thinly sliced
688	\N	1	726	59	thinly sliced
689	cup	0.5	481	59	
690	cup	0.75	997	59	
691	\N	2	341	59	juiced
692	tbsp	2	197	59	
693	tbsp	1	618	59	minced
694	tbsp	1	480	59	
695	tbsp	1	852	59	
696	clove	1	254	59	minced
697	tsp	0.25	589	59	
698	tbsp	2	340	60	
699	\N	3	240	60	chopped
700	\N	1	571	60	chopped
701	large	4	85	60	chopped
702	cloves	4	254	60	minced
703	cup	4	963	60	
704	cup	2	996	60	
705	tbsp	1	480	60	
706	tsp	1	618	60	ground
707	cup	2	981	60	
708	tbsp	1	854	61	
709	tbsp	1	480	61	
710	tbsp	1	471	61	
711	cloves	2	254	61	crushed
712	tsp	0.5	618	61	grated
713	g	226.75	506	61	drained and diced
714	cup	1	789	61	trimmed
715	cup	1	418	61	shredded
716	small	2	240	61	grated
717	tbsp	2	119	61	chopped
718	cup	0.5	890	62	
719	cup	0.25	435	62	
720	(1 ounce) packet	1	868	62	
721	tbsp	1	985	62	
722	cup	2	758	62	rotisserie, shredded
723	(6 inch)	8	913	62	
724	\N	\N	46	62	shredded
725	\N	1	509	62	chopped
726	\N	4	967	62	sliced
727	(4 ounce) can	1	339	62	sliced
728	\N	1	16	62	peeled, pitted and diced
729	cup	1	848	62	shredded
730	cup	0.25	340	63	
731	cup	0.25	125	63	
732	tsp	1	657	63	
733	tsp	1	956	63	
734	tsp	1	565	63	
735	\N	\N	425	63	
736	\N	\N	666	63	
737	small	2	765	63	julienned
738	small	2	812	63	julienned
739	large	1	571	63	sliced
740	\N	2	726	63	sliced
741	(8.75 ounce) can	1	301	63	drained
742	(15 ounce) can	1	724	63	drained
743	\N	12	913	63	
744	\N	1	952	64	
745	\N	1	891	64	with poppy seeds
746	tbsp	1	470	64	
747	tbsp	1	995	64	
748	tbsp	1	571	64	chopped
749	\N	2	509	64	chopped
750	\N	1	832	64	
751	\N	2	892	64	
752	pinch	1	425	64	
753	cup	1	509	65	crushed
754	cup	2	392	65	
755	(15 ounce) can	1	824	65	
756	(16 ounce) can	0.5	509	65	diced
757	tbsp	3	828	65	
758	g	226.75	893	65	sliced
759	(8 ounce) package	0.5	825	65	shredded
760	(6 inch)	9	913	65	
761	(15 ounce) can	1	827	65	
762	(16 ounce) package	1	751	66	
763	cup	0.5	471	66	
764	cup	0.5	480	66	
765	cup	0.25	18	66	
766	tbsp	1	894	66	
767	cup	0.25	565	66	
768	tbsp	1	472	66	
769	\N	1	760	66	chopped
770	\N	1	726	66	diced
771	tsp	1	960	67	
772	\N	2	199	67	
773	slices	2	66	67	
774	\N	1	16	67	pitted, peeled
775	tsp	1	562	67	
776	pinch	1	589	67	
777	\N	\N	425	67	
778	\N	\N	721	67	ground
779	tbsp	1	964	68	
780	tbsp	2	618	68	grated
781	tsp	2	980	68	
782	stalk	1	713	68	minced
783	cup	4	746	68	
784	tbsp	3	976	68	
785	tbsp	1	565	68	
786	(13.5 ounce) cans	3	266	68	
787	g	226.75	895	68	fresh, sliced
788	g	453.5	151	68	peeled and deveined
789	tbsp	2	641	68	
790	\N	\N	425	68	
791	cup	0.25	591	68	chopped
792	tbsp	4	964	69	
793	cup	0.75	798	69	
794	cup	0.25	105	69	
795	cup	1.5	963	69	
796	tsp	1	254	69	
797	tsp	0.25	957	69	
798	tsp	1.5	959	69	
799	(10 ounce) package	0.5	85	69	sliced
800	tbsp	2	359	69	chopped
801	pinch	1	425	69	
802	g	453.5	904	70	
803	\N	1	571	70	chopped
804	g	453.5	739	70	
805	(26 ounce) jars	2	512	70	
806	g	170	896	70	sliced
807	cup	1.5	435	70	
808	g	170	333	70	shredded
809	tbsp	2	961	70	grated
810	cup	1	847	71	dried
811	cup	5	519	71	
812	cup	0.25	571	71	diced
813	cup	0.25	491	71	thinly sliced
814	tbsp	1	248	71	
815	tbsp	1	340	71	
816	pinch	1	425	71	
817	cloves	2	254	71	crushed
818	\N	3	723	71	
819	cup	1	240	71	sliced
820	\N	\N	721	71	ground
821	(32 fluid ounce) containers	3	963	72	
822	stalks	6	713	72	cut into 1-inch pieces
823	tbsp	2	55	72	
824	\N	5	692	72	whole star
825	(16 ounce) package	1	759	72	
826	(8 ounce) package	1	481	72	
827	(8 ounce) package	1	85	72	sliced
828	\N	2	965	72	sliced
829	bunch	1	591	72	
830	(.75 ounce) package	1	21	72	
831	bunch	1	967	72	sliced
832	cup	0.25	994	72	
833	cup	0.25	480	72	
834	cup	0.25	982	72	
835	cup	0.25	471	72	
836	tbsp	1	728	73	
837	medium	2	766	73	chopped
838	cloves	2	254	73	minced
839	(1.5 inch) piece	1	618	73	chopped
840	tsp	1	565	73	
841	tsp	0.75	592	73	ground
842	tsp	1.5	980	73	
843	medium	4	955	73	peeled and cubed
844	(28 ounce) can	1	509	73	whole peeled, chopped or pureed, juices reserved
845	(14 ounce) can	1	266	73	
846	cup	1	927	73	
847	tsp	0.5	55	73	
848	tsp	1	562	73	
849	\N	\N	425	73	
850	\N	\N	721	73	ground
851	tbsp	1	318	74	
852	slices	2	66	74	
853	slices	2	875	74	
854	slices	2	905	74	
855	cup	0.25	486	74	
856	\N	8	240	75	chopped
857	cup	2	963	75	
858	(14 ounce) can	1	266	75	
859	\N	1	571	75	chopped
860	cloves	4	254	75	peeled
861	tbsp	1	980	75	
862	tsp	2	425	75	
863	tsp	1	721	75	ground
864	tbsp	2	591	75	chopped
865	tbsp	1	340	76	
866	g	453.5	739	76	
867	tsp	2	868	76	
868	tsp	1	956	76	
869	tsp	1	592	76	ground
870	tsp	1	957	76	
871	tsp	1	254	76	
872	tsp	0.5	589	76	
873	tsp	0.5	425	76	
874	tsp	0.5	721	76	ground
875	cup	3	955	76	diced
876	can	1	509	76	diced
877	tbsp	3	828	76	
878	g	56.75	1004	76	shredded
879	\N	2	967	76	sliced
880	sprigs	1	591	76	
881	cup	0.5	726	76	chopped
882	cup	0.5	571	76	chopped
883	cup	0.25	122	77	
884	tbsp	2	480	77	
885	tbsp	2	125	77	
886	tbsp	2	565	77	
887	tbsp	1	471	77	
888	g	283.5	898	77	
889	\N	20	151	77	peeled, deveined, tails left intact
890	cup	1	64	77	
891	cup	0.25	774	77	chopped
892	tbsp	3	480	78	
893	tbsp	2	471	78	
894	tbsp	1.5	565	78	
895	tbsp	1	901	78	
896	tsp	2	903	78	
897	tsp	1	618	78	grated
898	tbsp	3	122	78	
899	(3 ounce) packages	2	759	78	
900	tbsp	2	119	78	chopped
901	medium	2	967	78	sliced diagonally
902	tsp	2	340	79	
903	g	113.5	758	79	diced, cooked
904	cup	0.5	301	79	
905	\N	1	726	79	sliced
906	\N	\N	425	79	
907	\N	\N	721	79	ground
908	cup	1	392	79	
909	cup	0.5	985	79	
910	cup	0.25	848	79	shredded
911	tbsp	2	960	80	softened
912	cup	0.25	836	80	
913	cup	2	746	80	
914	cup	1	867	80	
915	tsp	0.5	425	80	
916	pinch	1	589	80	
917	\N	2	765	80	chopped
918	\N	0.75	811	80	shredded
919	tsp	2	657	80	chopped
920	tbsp	3	340	81	
921	\N	1	571	81	chopped
922	\N	8	85	81	halved and sliced
923	cloves	4	254	81	minced
924	\N	1	837	81	peeled and cubed
925	tsp	2	592	81	ground
926	tsp	2	629	81	ground
927	tsp	1	689	81	
928	tsp	1	956	81	
929	tsp	1	790	81	
930	tsp	1	610	81	ground
931	head	0.5	49	81	chopped
932	(15 ounce) can	1	249	81	drained
933	tsp	0.5	425	81	
934	\N	\N	721	81	ground
935	cup	0.75	964	81	
936	tbsp	1	510	81	
937	cup	3	486	81	chopped
938	bunch	1	359	81	chopped
939	\N	1	561	81	juiced
940	\N	1	965	81	juiced
941	tbsp	2	340	82	
942	cup	0.25	571	82	chopped
943	\N	0.5	758	82	rotisserie, chopped
944	cup	0.25	408	82	cooked, crumbled
945	tbsp	2	254	82	roasted
946	tsp	0.5	425	82	
947	tsp	0.5	721	82	ground
948	tsp	0.5	628	82	
949	bunch	1	967	82	chopped
950	tbsp	2	890	82	
951	tbsp	2	435	82	
952	(6 inch)	15	913	82	
953	cup	2	1004	82	shredded
954	cup	1	827	82	
955	\N	1	838	83	
956	g	340.25	739	83	
957	g	113.5	722	83	
958	\N	1	571	83	chopped
959	cup	0.25	359	83	chopped
960	large	1	199	83	
961	tsp	1	790	83	
962	\N	\N	425	83	
963	\N	\N	721	83	ground
964	gram	200	839	83	
965	tbsp	4	340	84	
966	(14 ounce) package	1	506	84	drained
967	tsp	1	425	84	
968	\N	\N	721	84	
969	tsp	1.5	959	84	
970	tsp	1.5	628	84	
971	tsp	0.5	610	84	ground
972	tbsp	3	562	84	
973	cup	1	766	84	diced
974	\N	2	971	84	seeded and chopped
975	cloves	3	254	84	minced
976	cup	2	509	84	chopped
977	tsp	1.5	592	84	
978	cup	0.5	591	84	chopped
979	(15.5 ounce) can	1	724	84	drained and rinsed
980	\N	1	16	84	peeled, pitted and sliced
981	tsp	1	993	84	
982	\N	6	801	85	
983	(6.5 ounce) can	1	512	85	
984	(4 ounce) can	1	339	85	drained and sliced
985	g	28.25	840	85	drained and diced
986	small	2	509	85	thinly sliced
987	g	113.5	333	85	shredded
988	g	113.5	47	85	crumbled
989	pinch	1	21	85	
990	pinch	1	657	85	
991	pinch	1	900	85	crushed
992	tsp	1.5	592	86	ground
993	tsp	0.5	558	86	ground
994	tsp	0.25	589	86	
995	tsp	0.25	738	86	
996	tsp	0.25	722	86	
997	tsp	1	425	86	
998	medium	2	494	86	cut into 1/2-inch pieces
999	cup	1	571	86	diced
1000	cup	0.5	726	86	diced
1001	cloves	4	254	86	minced
1002	(3 inch) piece	1	618	86	peeled and minced
1003	(28 ounce) can	1	509	86	crushed
1004	cup	0.5	122	86	
1005	cup	2	519	86	
1006	cup	3	730	86	chopped
1007	\N	\N	591	86	chopped
1008	\N	\N	119	86	chopped
1009	cup	0.25	1002	87	
1010	cup	8	486	87	chopped
1011	cup	1	979	87	halved
1012	cup	1.5	758	87	cooked, chopped
1013	large	1	16	87	peeled, pitted, and sliced
1014	cup	0.5	301	87	
1015	cup	0.25	842	87	crumbled
1016	tbsp	3	125	87	
1017	tbsp	2	340	87	
1018	tbsp	1	470	87	
1019	pinch	1	721	87	ground
1020	pinch	1	425	87	
1021	slices	8	66	88	
1022	tbsp	2	843	88	
1023	g	226.75	844	88	thinly sliced
1024	cup	0.5	992	88	
1025	large	1	845	88	thinly sliced
1026	\N	\N	425	88	
1027	\N	\N	721	88	ground
1028	g	453.5	739	89	
1029	tsp	1	794	89	
1030	tsp	0.5	425	89	
1031	tsp	0.5	254	89	
1032	(28 ounce) jar	1	872	89	
1033	(14.5 ounce) can	1	509	89	diced
1034	cup	1	519	89	
1035	cup	0.25	536	89	
1036	(16 ounce) package	1	846	89	
1037	(8 ounce) package	1	142	89	cubed
1038	g	113.5	333	89	shredded
1039	tbsp	1	123	90	
1040	small	1	571	90	chopped
1041	tbsp	1	618	90	minced
1042	clove	1	254	90	chopped
1043	cup	1	927	90	
1044	cup	1	812	90	peeled, seeded, and cubed
1045	cup	0.25	591	90	chopped
1046	cup	2	519	90	
1047	g	198.5	266	90	
1048	tbsp	2	510	90	
1049	tsp	1	595	90	
1050	pinch	1	589	90	
1051	pinch	1	644	90	ground
1052	\N	\N	425	90	
1053	\N	\N	666	90	
1054	cup	4	519	91	
1055	cup	0.5	798	91	
1056	cup	0.5	847	91	
1057	tsp	1	618	91	grated
1058	tsp	1	629	91	ground
1059	tsp	1	657	91	
1060	clove	1	254	91	minced
1061	tsp	0.5	592	91	ground
1062	tsp	0.25	922	91	
1063	cup	0.5	340	92	
1064	cup	0.5	125	92	
1065	tsp	1.5	628	92	
1066	tsp	1.5	21	92	
1067	tsp	1.5	657	92	
1068	tsp	0.75	721	92	ground
1069	tsp	0.75	565	92	
1070	(.18 ounce) packet	1	496	92	
1071	cup	3	85	92	sliced
1072	\N	15	979	92	halved
1073	cup	1	726	92	sliced
1074	cup	0.75	851	92	crumbled
1075	cup	0.5	967	92	chopped
1076	(4 ounce) can	1	339	92	
1077	cup	0.75	662	92	sliced, cut into strips
1078	\N	2	509	93	diced
1079	\N	1	571	93	chopped
1080	\N	2	965	93	juiced
1081	tbsp	2	591	93	chopped
1082	\N	1	971	93	seeded and minced
1083	\N	\N	425	93	
1084	\N	\N	666	93	
1085	tbsp	2	340	93	
1086	\N	2	777	93	skinless, boneless, cut into strips
1087	\N	0.5	571	93	sliced
1088	\N	1	732	93	thinly sliced
1089	cloves	2	254	93	minced
1090	(12 inch)	4	913	93	
1091	cup	1	848	93	shredded
1092	cup	0.25	435	93	
1093	tbsp	1	964	94	
1094	(12 ounce) package	1	506	94	drained and cubed
1095	tbsp	1	425	94	
1096	tbsp	1	960	94	
1097	small	1	571	94	chopped
1098	cloves	3	254	94	minced
1099	(10 ounce) can	1	266	94	
1100	tsp	2	595	94	
1101	tsp	0.5	425	94	
1102	tsp	0.25	721	94	ground
1103	cup	0.25	591	94	chopped
1104	cup	2	392	94	
1105	cup	0.5	340	95	
1106	large	2	571	95	quartered
1107	cloves	3	254	95	minced
1108	g	907.25	509	95	chopped
1109	\N	3	199	95	sliced into 1/2-inch rounds
1110	\N	6	765	95	cut into 1/2-inch slices
1111	cup	0.5	849	95	
1112	tbsp	3	615	95	
1113	\N	\N	425	95	
1114	\N	\N	721	95	ground
1115	cup	3	392	95	
1116	g	453.5	739	96	
1117	cup	0.5	571	96	chopped
1118	(15 ounce) can	1	512	96	
1119	(15 ounce) can	1	724	96	rinsed and drained
1120	can	1	509	96	diced
1121	tbsp	2	641	96	
1122	\N	\N	591	96	
1123	(8.75 ounce) can	1	301	96	drained
1124	(4.5 ounce) can	1	828	96	chopped and drained
1125	tsp	2	956	96	
1126	tsp	1	592	96	ground
1127	tsp	1	254	96	minced
1128	tsp	0.5	657	96	
1129	tsp	0.5	738	96	
1130	\N	6	913	96	
1131	cup	2	1004	96	shredded
1132	g	1360.75	955	97	
1133	cup	0.5	323	97	hot
1134	cup	0.5	142	97	softened
1135	cup	0.5	967	97	chopped
1136	\N	1	199	97	lightly beaten
1137	tbsp	3	960	97	
1138	cloves	3	254	97	crushed and chopped
1139	tsp	0.5	425	97	
1140	cup	0.5	1004	97	shredded
1141	cup	0.75	480	98	
1142	cup	0.25	565	98	
1143	tsp	0.5	618	98	ground
1144	pinch	1	738	98	
1145	tbsp	2	519	98	
1146	tbsp	2	757	98	
1147	tsp	2	964	98	
1148	\N	3	777	98	skinless, boneless, cut into chunks
1149	\N	1	571	98	sliced
1150	cup	3	64	98	
1151	cup	1.5	392	98	
1152	(6.75 ounce) package	1	759	99	
1153	cloves	3	254	99	minced
1154	cup	0.25	901	99	
1155	tbsp	3	976	99	
1156	tbsp	1	956	99	
1157	tsp	1	565	99	
1158	tsp	0.25	425	99	
1159	\N	4	967	99	chopped
1160	cup	1	240	99	cut into thin matchsticks
1161	\N	\N	21	99	
1162	\N	\N	649	99	
1163	\N	\N	591	99	
1164	cup	0.5	119	99	chopped
1165	tsp	1	471	99	
1166	cup	0.25	340	100	
1167	tbsp	1	254	100	minced
1168	tsp	0.5	425	100	
1169	\N	8	509	100	sliced
1170	(12 inch)	2	367	100	pre-baked
1171	g	226.75	142	100	shredded
1172	g	113.5	850	100	shredded
1173	\N	10	992	100	
1174	cup	0.5	961	100	grated
1175	cup	0.5	851	100	crumbled
1176	tbsp	2	964	101	
1177	cloves	4	254	101	chopped
1178	g	226.75	739	101	
1179	small head	0.5	260	101	shredded
1180	\N	1	726	101	cut into strips
1181	tbsp	2	480	101	
1182	tsp	1	757	101	
1183	cup	0.5	519	101	
1184	tsp	1	721	101	ground
1185	pinch	1	425	101	
1186	cup	2	392	101	
1187	cup	0.25	852	102	
1188	cup	0.25	728	102	
1189	tbsp	2	901	102	
1190	tbsp	1	341	102	grated
1191	tbsp	1	343	102	
1192	tbsp	1	618	102	grated
1193	tsp	1	823	102	
1194	tsp	1	122	102	
1195	tsp	1	903	102	
1196	(8.8 ounce) package	1	853	102	
1197	cup	2	486	102	
1198	cup	1	240	102	cut into matchstick-size pieces
1199	cup	0.5	260	102	shredded
1200	cup	0.5	789	102	sliced
1201	\N	8	979	102	
1202	\N	16	151	102	cooked, peeled and deveined
1203	\N	2	967	102	finely chopped
1204	tbsp	1	472	102	
1205	cup	1.5	867	103	
1206	cup	1	519	103	
1207	(8 ounce) can	1	983	103	crushed and undrained
1208	cup	0.75	266	103	
1209	tsp	0.25	738	103	
1210	\N	1	965	103	zested and juiced
1211	tbsp	1	964	104	
1212	tbsp	2	254	104	chopped
1213	(14 ounce) package	1	506	104	drained and cubed
1214	cup	0.5	119	104	
1215	tbsp	2	480	104	
1216	large	2	166	104	peeled and thinly sliced
1217	cup	0.5	854	104	
1218	cup	0.25	641	104	
1219	bunch	1	591	104	chopped
1220	cup	0.5	824	105	
1221	large	1	913	105	
1222	\N	2	46	105	
1223	\N	0.5	16	105	peeled and sliced
1224	cup	0.25	855	105	
1225	cup	0.25	519	106	
1226	tbsp	3	641	106	
1227	tbsp	3	976	106	
1228	tbsp	3	565	106	
1229	clove	1	254	106	minced
1230	tsp	1	618	106	minced
1231	tsp	0.5	856	106	
1232	(8 ounce) package	1	759	106	
1233	cup	2	88	106	thinly sliced
1234	cup	1.5	240	106	cut into matchsticks
1235	g	226.75	151	106	grilled
1236	cup	1	481	106	
1237	\N	0.5	166	106	cut into thin slices
1238	\N	2	967	106	thinly sliced
1239	tbsp	2.75	649	106	chopped
1240	tbsp	2.75	591	106	chopped
1241	tbsp	2.75	21	106	chopped
1242	cup	0.5	119	106	chopped
1243	tbsp	2	964	107	
1244	\N	4	817	107	(3/4 inch) thick
1245	cloves	2	254	107	minced
1246	\N	1	571	107	thinly sliced
1247	g	453.5	434	107	
1248	tsp	1	857	107	
1249	tbsp	2	9	107	
1250	\N	\N	425	107	
1251	\N	\N	666	107	
1252	(16 ounce) package	1	950	108	crumbled
1253	tbsp	2	964	108	
1254	clove	1	254	108	minced
1255	cup	0.5	571	108	chopped
1256	tsp	2	956	108	
1257	tsp	0.25	790	108	
1258	tsp	0.25	589	108	
1259	tsp	0.25	592	108	ground
1260	tsp	0.25	425	108	
1261	\N	0.5	965	108	juiced
1262	cup	0.5	512	108	
1263	cup	0.25	591	108	chopped
1264	medium	8	991	108	heated
1265	cup	2	46	108	shredded
1266	\N	2	509	108	chopped
1267	\N	1	16	108	peeled, pitted and diced
1268	cup	1	1004	108	shredded
1269	cup	0.25	985	108	
1270	tbsp	2	204	109	
1271	\N	1	990	109	
1272	cup	1	988	109	
1273	\N	1	970	109	pitted and finely chopped
1274	tsp	2	275	109	
1275	tsp	1	18	109	
1276	(1 pound)	1	278	110	halved
1277	small	1	509	110	chopped
1278	\N	5	967	110	chopped
1279	tsp	0.25	425	110	
1280	tsp	0.25	666	110	
1281	cup	1	392	110	
1282	g	453.5	739	111	
1283	cup	1.5	985	111	
1284	(10 ounce) can	1	301	111	drained
1285	cup	0.75	318	111	
1286	tsp	1	956	111	
1287	cup	2	300	111	crushed
1288	cup	2	858	111	
1289	tbsp	1	960	112	
1290	cup	2	392	112	
1291	(15 ounce) can	1	724	112	drained and rinsed
1292	medium	1.5	16	112	
1293	tbsp	4	591	112	
1294	tbsp	3	641	112	
1295	pint	1	979	112	halved
1296	cup	1	301	112	
1297	tsp	1	425	112	
1298	tsp	0.5	721	112	ground
1299	cup	0.25	300	112	
1300	tsp	2	340	113	
1301	cloves	4	254	113	minced
1302	tbsp	2	960	113	
1303	cup	3	746	113	
1304	tsp	0.5	721	113	ground
1305	tsp	0.25	425	113	
1306	g	453.5	751	113	
1307	cup	1	961	113	grated
1308	cup	0.75	810	113	
1309	tbsp	1.5	359	113	
1310	tbsp	1	340	114	
1311	bunch	1	967	114	chopped
1312	(14.5 ounce) can	1	509	114	peeled and diced with juice
1313	(12 ounce) package	1	950	114	drained and mashed
1314	\N	\N	610	114	ground
1315	\N	\N	425	114	
1316	\N	\N	666	114	
1317	cup	0.5	1004	114	shredded
1318	tbsp	2	960	115	
1319	\N	1	571	115	chopped
1320	cloves	4	254	115	minced
1321	tbsp	1	592	115	ground
1322	tsp	1	425	115	
1323	tsp	1	618	115	ground
1324	tsp	1	589	115	
1325	tsp	0.5	558	115	ground
1326	tsp	0.25	610	115	ground
1327	(14 ounce) can	1	512	115	
1328	cup	1	810	115	
1329	tbsp	1	565	115	
1330	tsp	2	790	115	
1331	tbsp	1	964	115	
1332	\N	4	777	115	skinless, boneless , cut into bite-size pieces
1333	tsp	0.5	595	115	
1334	cup	3	392	115	
1335	(6 ounce) tub	1	358	116	
1336	(6 inch)	6	801	116	
1337	\N	2	509	116	chopped
1338	bunch	1	486	116	rinsed and chopped
1339	\N	4	85	116	sliced
1340	cup	0.5	851	116	crumbled
1341	tbsp	2	961	116	grated
1342	tbsp	3	340	116	
1343	\N	\N	721	116	ground
1344	tbsp	1	964	117	
1345	g	453.5	739	117	
1346	tbsp	1	987	117	
1347	can	1	805	117	drained and rinsed
1348	jar	1	985	117	
1349	cup	1	392	117	cooked
1350	cup	0.5	1004	117	
1351	(7- to 8-inch)	2	863	118	
1352	thin slices	6	412	118	
1353	slices	6	864	118	
1354	thin slices	6	409	118	
1355	slices	2	896	118	halved
1356	cup	0.25	20	118	
1357	\N	\N	509	118	sliced
1358	shredded	\N	46	118	
1359	\N	\N	766	118	
1360	\N	\N	340	118	
1361	\N	\N	719	118	
1362	pinch	1	657	118	
1363	\N	\N	425	118	
1364	\N	\N	721	118	ground
1365	cup	1	392	119	
1366	cup	2	519	119	
1367	tbsp	2	340	119	
1368	clove	1	254	119	minced
1369	(12 ounce) package	1	506	119	drained and diced
1370	cup	1.75	872	119	
1371	\N	\N	425	119	
1372	\N	\N	721	119	ground
1373	\N	2	726	119	halved and seeded
1374	\N	2	732	119	halved and seeded
1375	cup	2	333	119	shredded
1376	slices	8	509	119	
1377	package	1	953	120	
1378	tsp	5	471	120	
1379	cup	0.25	480	120	
1380	tsp	4	565	120	
1381	tbsp	1	964	120	
1382	\N	3	240	120	cut into matchsticks
1383	\N	1	571	120	thinly sliced
1384	cup	1	895	120	sliced
1385	\N	6	967	120	chopped
1386	cloves	4	254	120	minced
1387	bag	1	486	120	
1388	tbsp	1	472	120	
1389	tbsp	1	340	121	
1390	cloves	2	254	121	minced
1391	tsp	0.5	425	121	
1392	tsp	0.25	721	121	ground
1393	cup	4	49	121	sliced
1394	cup	2	979	121	
1395	can	1	906	121	drained
1396	\N	1	965	121	cut into wedges
1397	tbsp	1	591	121	chopped
1398	cup	0.5	318	122	
1399	cup	0.5	76	122	
1400	cup	0.25	357	122	
1401	,	1	562	122	
1402	clove	1	254	122	
1403	\N	\N	721	122	ground
1404	(5.8 ounce) package herb and garlic	1	989	122	
1405	g	226.75	278	122	with skin
1406	tsp	1	908	122	
1407	tsp	1	960	122	
1408	tsp	1	340	122	
1409	\N	2	509	122	seeded and chopped
1410	cup	2	988	122	roughly chopped
1411	cup	1	486	122	roughly chopped
1412	tbsp	2	961	122	shredded
1413	tbsp	2	907	122	
1414	can	1	249	123	drained and rinsed
1415	stalk	1	491	123	chopped
1416	\N	0.5	571	123	chopped
1417	tbsp	1	318	123	
1418	tbsp	1	562	123	
1419	tsp	1	596	123	
1420	\N	\N	425	123	
1421	\N	\N	666	123	
1422	cup	2	955	124	
1423	\N	\N	340	124	
1424	cup	2	979	124	
1425	cup	2	789	124	1-inch cut
1426	cloves	4	254	124	minced
1427	tsp	2	21	124	
1428	tsp	1	425	124	
1429	can	1	906	124	drained and rinsed
1430	tsp	2	340	124	
1431	\N	\N	721	124	ground
1432	\N	\N	425	124	
1433	(6 ounce) jar	1	909	125	drained and chopped
1434	cup	0.25	596	125	chopped
1435	tbsp	1	340	125	
1436	tbsp	1	562	125	
1437	cloves	2	254	125	minced
1438	tsp	0.5	721	125	ground
1439	cup	1	486	125	chopped
1440	(5 ounce) can	1	501	125	drained
1441	\N	1	726	125	chopped
1442	package	1	142	126	with chives
1443	tbsp	2	470	126	
1444	(8 inch)	6	913	126	
1445	cup	1.5	111	126	shredded
1446	slices	12	910	126	sliced
1447	cup	0.75	875	126	shredded
1448	slices	6	408	126	cooked and crumbled
1449	large	1	509	126	seeded and diced
1450	large	1	16	126	sliced
1451	cup	0.25	728	127	
1452	tbsp	1	959	127	
1453	tbsp	1	628	127	
1454	cup	1	867	127	
1455	cup	1.5	519	127	
1456	can	1	512	127	
1457	tbsp	1	340	128	
1458	\N	4	777	128	skinless and boneless
1459	\N	1	571	128	chopped
1460	cup	2	1004	128	shreded
1461	pint	0.5	435	128	
1462	tbsp	1	359	128	
1463	tsp	0.5	657	128	
1464	tsp	0.5	721	128	ground
1465	(15 ounce) can	1	512	128	
1466	cup	0.25	732	128	chopped
1467	clove	1	254	128	minced
1468	tbsp	1	956	128	
1469	tsp	0.5	425	128	
1470	cup	0.5	519	128	
1471	(10 inch)	8	913	128	
1472	(12 ounce) jar	1	512	128	
1473	g	453.5	777	129	skinless and boneless
1474	tsp	2	964	129	
1475	tbsp	1	571	129	minced
1476	cup	0.25	512	129	
1477	pinch	1	592	129	ground
1478	pinch	1	956	129	
1479	tbsp	3	964	130	
1480	cup	1	742	130	
1481	tsp	1	911	130	
1482	tsp	0.5	592	130	ground
1483	cup	0.25	571	130	chopped
1484	cup	2	746	130	
1485	cup	0.5	512	130	
1486	cup	1.25	742	131	
1487	cup	0.5	591	131	chopped
1488	\N	2	965	131	zested and juiced
1489	g	680.5	371	131	skinless and boneless, cut into 1/2 inch slices
1490	small	2	666	131	sliced
1491	large	1	766	131	sliced
1492	tbsp	2	987	131	
1493	tbsp	2	340	131	
1494	tsp	1.5	425	131	
1495	tsp	0.5	721	131	ground
1496	cup	1.5	746	131	
1497	\N	1	965	131	cut into wedges
1498	g	226.75	371	132	skinless and boneless
1499	\N	\N	425	132	
1500	\N	\N	721	132	ground
1501	cup	0.5	240	132	peeled and chopped
1502	cup	0.5	491	132	sliced
1503	can	1	724	132	rinsed and drained
1504	cup	0.5	301	132	
1505	tbsp	2	510	132	
1506	tsp	2	592	132	ground
1507	tsp	2	956	132	
1508	cup	4	746	132	
1509	(8 inch)	2	913	132	cut into strips
1510	tbsp	2	591	132	chopped
1511	\N	1	16	132	chopped
1512	\N	1	971	132	sliced
1513	g	680.5	371	133	skinless and boneless
1514	\N	2	967	133	chopped
1515	cup	0.25	719	133	
1516	\N	0.5	965	133	juiced
1517	cloves	2	254	133	minced
1518	tsp	1	657	133	
1519	tsp	1	565	133	
1520	tsp	0.5	425	133	
1521	tsp	0.5	721	133	ground
1522	(6 inch)	10	913	133	
1523	\N	1	509	133	diced
1524	cup	0.25	46	133	shredded
1525	cup	0.25	848	133	shredded
1526	cup	0.25	985	133	
1527	g	453.5	777	134	skinless and boneless, cut
1528	cup	1	295	134	
1529	tbsp	2	340	134	
1530	tbsp	1	641	134	
1531	tsp	1.5	199	134	
1532	tsp	0.5	628	134	
1533	tsp	0.5	959	134	
1534	\N	1	723	134	
1535	(12 ounce) package	1	913	134	
1536	large	2	509	134	chopped
1537	head	1	46	134	shredded
1538	(8 ounce) package	1	1004	134	shredded
1539	jar	1	985	134	
1540	container	1	435	134	
1541	\N	1	509	135	
1542	\N	3	982	135	
1543	\N	2	982	135	seeded
1544	\N	1	983	135	sliced
1545	cup	0.5	343	135	
1546	\N	1	571	135	quartered
1547	cup	0.25	125	135	
1548	\N	2	951	135	
1549	tbsp	1	425	135	
1550	cloves	2	254	135	crushed
1551	\N	3	611	135	
1552	tsp	1	984	135	
1553	tsp	1	657	135	
1554	g	907.25	462	135	boneless, sliced
1555	cup	0.5	571	135	chopped
1556	cup	0.5	591	135	chopped
1557	large	3	777	136	skinless and boneless, cut
1558	\N	\N	425	136	
1559	\N	\N	666	136	
1560	cup	0.5	319	136	
1561	tbsp	2	964	136	
1562	clove	1	254	136	minced
1563	cup	1	746	136	
1564	\N	0.5	561	136	thinly sliced
1565	cup	0.25	562	136	
1566	tbsp	2	622	136	drained and rinsed
1567	tbsp	3	960	136	
1568	tbsp	2	359	136	
1569	cup	0.25	340	137	
1570	(12 ounce) packages	2	752	137	refrigerated
1571	cloves	3	254	137	minced
1572	tsp	0.25	738	137	
1573	pinch	1	425	137	
1574	pinch	1	565	137	
1575	can	1	509	137	
1576	g	226.75	914	137	
1577	\N	\N	359	137	
1578	tbsp	2	340	138	
1579	g	226.75	753	138	
1580	cup	1.5	571	138	diced
1581	cloves	2	254	138	minced
1582	(15 ounce) can	1	876	138	rinsed and drained
1583	tsp	1	794	138	
1584	cup	4	746	138	
1585	cup	3	981	138	chopped
1586	tbsp	2	961	138	grated
1587	tbsp	2	340	139	
1588	(2 pound)	1	403	139	roast, boneless, cut
1589	tsp	1	721	139	ground
1590	tsp	3	425	139	
1591	\N	1	571	139	chopped
1592	cloves	6	254	139	chopped
1593	tbsp	2	614	139	
1594	tbsp	2	510	139	
1595	cup	1	536	139	
1596	can	1	509	139	crushed
1597	\N	1	723	139	
1598	g	453.5	496	139	
1599	\N	\N	961	139	grated
1600	g	680.5	729	140	sliced
1601	cup	2	519	140	
1602	cup	1	742	140	
1603	cup	0.25	565	140	
1604	cup	0.25	901	140	
1605	tbsp	2	343	140	
1606	tbsp	1	480	140	
1607	tsp	1	425	140	
1608	cup	2	975	140	
1609	cup	0.25	757	140	
1610	tbsp	3	618	140	grated
1611	tbsp	1.5	254	140	minced
1612	tsp	2	341	140	
1613	\N	8	64	140	lightly steamed
1614	tbsp	0.5	471	141	
1615	\N	1	571	141	diced
1616	g	680.5	758	141	cooked and cut
1617	tbsp	2	480	141	
1618	large	2	240	141	diced
1619	stalks	2	491	141	diced
1620	large	1	726	141	diced
1621	cup	0.75	116	141	
1622	large	0.5	732	141	diced
1623	cup	6	392	141	
1624	large	2	199	141	scrambled
1625	cup	0.25	480	141	
1626	(3 ounce) packages	2	759	142	
1627	tbsp	4	964	142	
1628	large	3	199	142	beaten
1629	\N	4	967	142	sliced
1630	small	1	240	142	peeled and grated
1631	cup	0.5	789	142	
1632	cup	0.25	726	142	minced
1633	tbsp	2	471	142	
1634	tsp	1	480	142	
1635	cup	0.25	964	143	
1636	medium	2	571	143	chopped
1637	tbsp	1	915	143	
1638	\N	1	723	143	
1639	large	4	955	143	peeled and chopped
1640	cup	1	116	143	
1641	cup	0.5	849	143	
1642	tsp	1.5	609	143	
1643	tsp	1.5	790	143	
1644	tsp	1	565	143	
1645	tsp	1	425	143	
1646	tbsp	2	591	143	chopped
1647	tbsp	3	340	144	
1648	\N	1	571	144	chopped
1649	cloves	2	254	144	minced
1650	tsp	2	618	144	minced
1651	can	1	249	144	drained
1652	can	1	1000	144	
1653	can	1	266	144	
1654	\N	1	494	144	cut
1655	tbsp	1	609	144	
1656	tsp	1	592	144	ground
1657	tsp	1	610	144	ground
1658	tsp	0.5	425	144	
1659	tsp	0.25	738	144	
1660	cup	1	486	144	
1661	\N	1	571	145	chopped
1662	\N	1	509	145	chopped
1663	(1 inch) piece	1	618	145	
1664	cloves	4	254	145	
1665	\N	1	725	145	seeded and chopped
1666	tbsp	3	340	145	
1667	\N	2	723	145	
1668	tsp	1	956	145	
1669	tsp	1	629	145	
1670	tsp	1	609	145	
1671	tsp	0.5	610	145	
1672	pinch	1	425	145	
1673	\N	\N	519	145	
1674	can	1	249	145	
1675	cup	1	392	145	
1676	tsp	1	591	145	
1677	tsp	2	609	146	
1678	tsp	2	916	146	
1679	tsp	2	595	146	
1680	tsp	1	592	146	ground
1681	tsp	0.5	588	146	ground
1682	tsp	0.5	589	146	ground
1683	\N	\N	425	146	
1684	\N	\N	721	146	ground
1685	g	680.5	917	146	boneless and skinless, cut
1686	tbsp	3	960	146	
1687	\N	1	571	146	chopped
1688	cloves	4	254	146	minced
1689	tbsp	1	562	146	
1690	tsp	2	618	146	minced
1691	cup	1	849	146	
1692	cup	0.25	762	146	
1693	cup	0.25	998	146	
1694	bunch	1	591	146	
1695	cup	2	392	146	
1696	tbsp	2	960	147	
1697	tbsp	2	964	147	
1698	large	4	917	147	skinless and boneless, cut
1699	\N	1	571	147	diced
1700	cloves	3	254	147	minced
1701	(6 ounce) can	1	510	147	
1702	tbsp	1	980	147	
1703	tsp	2	595	147	
1704	tsp	2	916	147	
1705	tsp	1	609	147	
1706	\N	15	918	147	
1707	(14 ounce) can	1	266	147	
1708	cup	1	762	147	
1709	\N	\N	425	147	
1710	cup	0.5	319	148	
1711	large	1	199	148	
1712	tsp	0.5	425	148	
1713	pinch	1	589	148	
1714	tbsp	1	919	148	
1715	tbsp	3	323	148	
1716	cup	4	955	149	cubed
1717	slices	6	408	149	
1718	cup	1	491	149	diced
1719	\N	3	967	149	diced
1720	cup	0.5	318	149	
1721	cup	0.25	125	149	
1722	tsp	2	565	149	
1723	tsp	1	470	149	
1724	tsp	1	425	149	
1725	tsp	0.25	721	149	ground
1726	cup	1	1004	149	shredded
1727	cup	1	780	150	
1728	tbsp	1	319	150	
1729	\N	\N	425	150	
1730	\N	\N	666	150	
1731	tbsp	2	964	150	
1732	\N	4	462	150	
1733	\N	1	199	150	beaten
1734	medium	1	571	150	diced
1735	(8 ounce) can	1	85	150	sliced
1736	cup	1.5	519	150	
1737	cube	1	772	150	
1738	tbsp	1	757	150	
1739	cup	0.5	435	150	
1740	tsp	1	425	151	
1741	tsp	0.5	921	151	
1742	tsp	0.5	424	151	
1743	tsp	0.25	922	151	
1744	tsp	0.25	923	151	
1745	tsp	0.25	416	151	
1746	tbsp	2	790	151	
1747	tsp	2	628	151	
1748	tsp	2	319	151	
1749	tsp	1	959	151	
1750	tbsp	5	964	151	
1751	(4 pound)	1	758	151	broiler-fryer, cut in half lengthwise
1752	g	1360.75	925	152	roast
1753	large	2	571	152	chopped
1754	cup	1	719	152	
1755	cup	1	519	152	
1756	tbsp	1	425	152	
1757	tbsp	1	721	152	ground
1758	tbsp	1	565	152	
1759	\N	10	611	152	whole
1760	\N	2	723	152	
1761	tbsp	2	319	152	
1762	\N	\N	425	152	
1763	\N	\N	721	152	ground
1764	tbsp	2	964	152	
1765	g	2268	955	153	peeled and cut into wedges
1766	cup	1	519	153	
1767	cup	0.75	340	153	
1768	cup	0.25	562	153	
1769	cloves	6	254	153	minced
1770	\N	\N	425	153	
1771	\N	\N	721	153	ground
1772	tbsp	1.5	657	153	
1773	tsp	1	649	153	chopped
1774	package	1	851	153	crumbled
1775	g	907.25	955	154	peeled and thinly sliced
1776	large	4	765	154	sliced
1777	small	4	766	154	sliced
1778	\N	6	509	154	pureed
1779	cup	0.5	340	154	
1780	tbsp	2	359	154	chopped
1781	\N	\N	721	154	ground
1782	\N	\N	425	154	
1783	\N	4	777	155	skinless and boneless
1784	cup	1	340	155	
1785	medium	1	561	155	juiced
1786	tsp	2	254	155	crushed
1787	tsp	1.5	721	155	
1788	tsp	1	425	155	
1789	tsp	0.25	790	155	
1790	cup	1.5	767	156	
1791	cans	2	909	156	marinated
1792	\N	1	166	156	seeded and chopped
1793	\N	1	509	156	seeded and chopped
1794	\N	1	766	156	chopped
1795	cup	1	851	156	crumbled
1796	can	1	339	156	drained
1797	cup	0.25	359	156	chopped
1798	tbsp	1	562	156	
1799	tsp	0.5	657	156	
1800	tsp	0.5	926	156	
1801	g	226.75	927	157	
1802	cup	0.25	340	157	
1803	medium	1	571	157	minced
1804	large	1	240	157	chopped
1805	tbsp	1	254	157	minced
1806	quart	1	519	157	
1807	\N	2	723	157	
1808	tsp	1	657	157	
1809	pinch	1	416	157	
1810	tbsp	1	510	157	
1811	\N	\N	425	157	
1812	\N	\N	721	157	ground
1813	tsp	1	340	157	
1814	tsp	1	125	157	
1815	cup	0.25	340	158	
1816	cloves	3	254	158	minced
1817	tbsp	2	562	158	
1818	tsp	1	657	158	
1819	tsp	0.5	425	158	
1820	g	680.5	777	158	skinless and boneless
1821	\N	6	928	158	
1822	container	1	762	158	Greek-style
1823	\N	0.5	166	158	
1824	tsp	2	125	158	
1825	cup	2	770	159	
1826	cup	0.75	340	159	
1827	cup	0.25	125	159	
1828	cloves	2	254	159	crushed
1829	tbsp	1	562	159	
1830	tsp	2	657	159	
1831	\N	\N	425	159	
1832	\N	\N	666	159	
1833	\N	10	979	159	halved
1834	\N	1	732	159	chopped
1835	\N	1	726	159	chopped
1836	small	1	766	159	chopped
1837	\N	0.5	166	159	sliced
1838	cup	0.5	339	159	sliced
1839	cup	0.5	851	159	crumbled
1840	g	1360.75	955	160	
1841	cup	0.25	340	160	
1842	\N	2	561	160	juiced
1843	tsp	2	425	160	
1844	tsp	1	657	160	
1845	tsp	0.5	721	160	ground
1846	cup	3	746	160	
1847	cup	1.5	480	161	
1848	cup	1.5	519	161	
1849	cup	0.75	125	161	
1850	tbsp	3	197	161	
1851	tbsp	1.5	254	161	minced
1852	\N	3	723	161	
1853	tsp	0.5	721	161	
1854	g	1360.75	917	161	skinless and boneless
1855	tbsp	2	964	162	
1856	tbsp	2	722	162	
1857	tbsp	1.5	254	162	chopped
1858	cup	4	392	162	
1859	tsp	1.5	425	162	
1860	\N	\N	721	162	ground
1861	cup	2	319	163	
1862	cup	0.25	565	163	
1863	tsp	0.5	425	163	
1864	cup	0.5	519	163	
1865	large	1	199	163	
1866	tbsp	2	319	163	
1867	tbsp	2	960	163	melted
1868	tbsp	1	964	164	
1869	small	1	571	164	chopped
1870	tsp	1	425	164	
1871	(1/2 inch) piece	1	618	164	chopped
1872	\N	2	509	164	
1873	g	453.5	817	164	
1874	cup	4	519	164	
1875	package	1	932	164	
1876	g	226.75	789	164	trimmed
1877	tbsp	2	728	165	
1878	tbsp	1	471	165	
1879	\N	2	777	165	skinless and boneless
1880	cloves	2	254	165	minced
1881	tbsp	2	982	165	
1882	cup	0.5	480	165	
1883	tbsp	1	728	165	
1884	medium head	0.5	260	165	sliced
1885	\N	1	571	165	sliced
1886	\N	2	240	165	
1887	tbsp	1	425	165	
1888	g	907.25	821	165	
1889	tbsp	2	618	165	
1890	cup	0.75	822	166	
1891	tsp	2	565	166	
1892	tsp	2	823	166	
1893	tsp	2	480	166	
1894	tsp	0.5	425	166	
1895	tbsp	1	964	166	
1896	small	1	571	166	chopped
1897	(3 ounce)	2	817	166	sliced
1898	\N	2	199	166	beaten
1899	cup	1.5	742	166	
1900	tbsp	2	480	167	
1901	tbsp	2	519	167	
1902	tbsp	1	565	167	
1903	tsp	1.5	197	167	
1904	tsp	1.5	731	167	
1905	tsp	1.25	125	167	
1906	tsp	1	340	167	
1907	tsp	0.25	959	167	
1908	tsp	0.25	628	167	
1909	tsp	0.25	618	167	ground
1910	(6 ounce)	2	934	167	
1911	g	907.25	729	168	boneless
1912	tbsp	3	757	168	
1913	can	1	962	168	
1914	cup	0.5	480	168	
1915	tbsp	2	565	168	
1916	tbsp	2	964	168	
1917	cup	4	895	168	
1918	head	1	88	168	
1919	medium	2	787	168	
1920	stalks	3	491	168	sliced
1921	medium	2	967	168	
1922	\N	\N	742	168	
1923	tbsp	2	480	169	
1924	tbsp	2	935	169	
1925	tbsp	2	823	169	
1926	tbsp	1	618	169	grated
1927	g	453.5	462	169	
1928	tbsp	3	964	169	
1929	package	1	496	170	
1930	tsp	0.5	471	170	
1931	cup	2	64	170	chopped
1932	\N	0.5	732	170	
1933	small	2	240	170	
1934	\N	0.5	765	170	sliced
1935	tbsp	2	480	170	
1936	tbsp	2	823	170	
1937	tbsp	1	903	170	
1938	tsp	0.75	618	170	minced
1939	packages	2	898	171	
1940	tbsp	1.5	197	171	
1941	tbsp	1	480	171	
1942	tbsp	1	882	171	
1943	tbsp	0.5	901	171	
1944	strips	2	408	171	chopped
1945	cup	1.5	936	171	chopped
1946	clove	1	254	171	minced
1947	tsp	1	471	171	
1948	\N	4	978	171	diagonally sliced
1949	g	226.75	718	172	
1950	cup	0.5	746	172	
1951	tbsp	3	480	172	
1952	tbsp	3	122	172	
1953	tbsp	1.5	618	172	
1954	tbsp	1.5	197	172	
1955	cloves	3	254	172	minced
1956	tsp	2	894	172	
1957	cup	0.25	967	172	chopped
1958	cup	0.25	119	172	chopped
1959	cup	4	392	173	
1960	cup	5.5	519	173	
1961	tsp	0.25	425	173	
1962	cup	0.25	937	173	
1963	sheets	2	938	173	
1964	tbsp	2	472	173	
1965	tbsp	2.5	565	174	
1966	tbsp	2	976	174	
1967	\N	\N	721	174	ground
1968	g	1360.75	917	174	
1969	tbsp	3	519	174	
1970	tbsp	1	976	174	
1971	tsp	3	901	174	
1972	tbsp	3	964	174	
1973	cloves	5	254	174	minced
1974	\N	2	971	174	sliced
1975	\N	15	939	175	
1976	cloves	2	254	175	sliced
1977	tsp	1	628	175	
1978	pinch	1	956	175	
1979	tbsp	2	565	175	
1980	\N	\N	721	175	ground
1981	tbsp	1	641	175	
1982	tbsp	1	480	175	
1983	tbsp	2	340	175	
1984	cup	0.25	591	175	chopped
1985	\N	2	965	175	
1986	\N	2	561	175	
1987	g	56.75	830	176	
1988	\N	8	833	176	
1989	large	8	151	176	cooked
1990	leaves	2	46	176	chopped
1991	tbsp	3	649	176	
1992	tbsp	3	591	176	
1993	tbsp	1	21	176	
1994	cup	0.25	519	176	
1995	tbsp	2	641	176	
1996	tbsp	2	565	176	
1997	tsp	4	976	176	
1998	clove	1	254	176	minced
1999	tsp	0.5	903	176	
2000	tbsp	3	941	176	
2001	tsp	1	119	176	chopped
2002	cup	0.25	319	177	
2003	tsp	1	592	177	ground
2004	tsp	0.25	589	177	
2005	tsp	0.75	425	177	
2006	tbsp	2	964	177	
2007	\N	4	462	177	boneless
2008	cup	0.25	746	177	
2009	cup	0.5	266	177	
2010	tbsp	2	122	177	
2011	tbsp	1	197	177	
2012	tsp	1	618	177	ground
2013	cup	0.25	760	177	chopped
2014	cup	0.25	726	177	
2015	cup	0.25	119	177	roasted
2016	cup	0.25	591	177	
2017	(8 ounce) cans	2	775	178	drained and thinly sliced
2018	tbsp	3	776	178	
2019	cup	2	392	178	
2020	tbsp	3	977	178	
2021	g	453.5	462	178	boneless
2022	cans	2	266	178	
2023	small	1	726	178	
2024	tbsp	1	565	178	
2025	tsp	0.5	425	178	
2026	tsp	2	976	178	
2027	cup	0.5	21	178	
2028	g	907.25	371	179	skinless and boneless
2029	\N	\N	425	179	
2030	\N	\N	721	179	ground
2031	tbsp	1.5	964	179	
2032	tbsp	2	595	179	
2033	\N	0.5	571	179	sliced
2034	cloves	2	254	179	crushed
2035	(14.5 ounce) can	1	509	179	stewed, diced
2036	(14 ounce) can	1	266	179	
2037	(8 ounce) can	1	512	179	
2038	tbsp	3	565	179	
2039	tbsp	2	480	180	
2040	tbsp	1	319	180	
2041	g	453.5	777	180	skinless, boneless, cut into 1 inch cubes
2042	tbsp	2	802	180	
2043	tbsp	2	977	180	
2044	\N	2	967	180	chopped
2045	cloves	3	254	180	peeled and chopped
2046	tsp	1	618	180	chopped
2047	cup	2	266	180	
2048	tbsp	2	565	180	
2049	tbsp	1	976	180	
2050	cup	0.5	591	180	
2051	g	226.75	898	181	
2052	cup	0.5	746	181	
2053	tbsp	3	480	181	
2054	tbsp	3	122	181	
2055	tbsp	1.5	618	181	minced
2056	tbsp	1.5	197	181	
2057	cloves	3	254	181	minced
2058	tsp	2	894	181	
2059	cup	0.25	967	181	chopped
2060	cup	0.25	119	181	chopped
2061	(12 ounce) package	1	759	182	
2062	tbsp	2	960	182	
2063	g	453.5	777	182	boneless, skinless, cut into bite-sized pieces
2064	cup	0.25	964	182	
2065	\N	4	199	182	
2066	tbsp	3	565	182	
2067	tbsp	2	976	182	
2068	tbsp	1	125	182	
2069	tsp	0.5	787	182	crushed
2070	cup	2	481	182	
2071	\N	3	967	182	chopped
2072	cup	0.25	119	182	crushed
2073	\N	1	561	182	cut into wedges
2074	g	113.5	778	183	cubed
2075	small	1	571	183	chopped
2076	cup	1.5	244	183	
2077	\N	1	199	183	
2078	tsp	0.75	425	183	
2079	tsp	0.25	721	183	ground
2080	pinch	1	644	183	ground
2081	cup	2.5	319	183	sifted
2082	gallon	1	519	183	
2083	containers	2	962	183	
2084	\N	4	955	184	
2085	tbsp	2	960	184	melted
2086	\N	\N	425	184	
2087	\N	\N	666	184	
2088	tbsp	2	779	184	grated
2089	tbsp	1	780	184	
2090	cup	1	762	185	
2091	tsp	2	595	185	
2092	tbsp	1	565	185	
2093	tbsp	1	964	185	
2094	large	1	571	185	
2095	cup	1	943	185	cubed
2096	g	340.25	945	185	dried
2097	\N	8	929	185	
2098	tbsp	1	975	186	
2099	medium	3	571	186	diced
2100	medium	2	732	186	diced
2101	medium	3	240	186	diced
2102	medium	3	509	186	diced
2103	small	2	828	186	chopped
2104	cup	0.25	519	186	
2105	cube	1	55	186	
2106	tsp	1	595	186	
2107	tsp	1	956	186	
2108	\N	\N	425	186	
2109	\N	\N	721	186	ground
2110	tbsp	1	964	187	
2111	g	1587.5	974	187	chopped
2112	tbsp	2	319	187	
2113	large	1	571	187	chopped
2114	g	1020.5	509	187	chopped
2115	tbsp	1	125	187	
2116	\N	2	723	187	
2117	cube	1	772	187	
2118	tsp	1	425	187	
2119	tsp	1	565	187	
2120	\N	6	773	187	
2121	tsp	0.5	721	187	ground
2122	dash	1	731	187	
2123	medium	2	955	187	quartered
2124	tbsp	2	964	188	
2125	medium	2	571	188	minced
2126	g	680.5	739	188	
2127	cup	1	323	188	
2128	slices	2	973	188	
2129	cup	0.5	740	188	
2130	tbsp	1	781	188	
2131	tbsp	0.5	595	188	
2132	tsp	1	782	188	
2133	tsp	1	425	188	
2134	tsp	0.5	721	188	ground
2135	\N	1	199	188	
2136	\N	1	723	188	
2137	medium	7	955	189	chopped
2138	(28 ounce) can	1	509	189	diced
2139	large	1	571	189	chopped
2140	cloves	2	254	189	minced
2141	g	453.5	952	189	sliced
2142	(16 ounce) package	1	927	189	
2143	\N	\N	425	189	
2144	\N	\N	666	189	
2145	tsp	1	964	190	
2146	small	1	571	190	chopped
2147	medium	1	240	190	diced
2148	cup	0.5	64	190	chopped
2149	cup	0.25	726	190	diced
2150	clove	1	254	190	minced
2151	cup	3	963	190	
2152	cup	1.5	392	190	
2153	(1.41 ounce) package	1	784	190	
2154	pinch	1	785	190	
2155	cup	0.5	960	191	softened
2156	(3 ounce) package	1	142	191	
2157	cup	1	319	191	sifted
2158	cup	1	972	191	
2159	cup	0.25	565	191	
2160	tsp	1	558	191	ground
2161	g	453.5	944	192	
2162	\N	\N	425	192	
2163	\N	\N	721	192	ground
2164	cup	0.5	571	192	chopped
2165	cloves	2	254	192	minced
2166	cup	2	955	192	chopped
2167	can	1	509	192	diced
2168	jar	1	786	192	
2169	cup	0.5	967	192	
2170	cup	1	340	193	
2171	g	907.25	955	193	baked and cut
2172	\N	\N	425	193	
2173	\N	\N	666	193	
2174	\N	2	571	193	sliced into rings
2175	large	6	199	193	
2176	\N	1	787	193	roasted, drained and cut into strips
2177	g	85	788	193	chopped
2178	tbsp	2	359	193	chopped
2179	tbsp	1	340	194	
2180	\N	0.5	758	194	cut
2181	\N	0.5	239	194	cut
2182	cloves	1	254	194	
2183	medium	1	509	194	chopped
2184	can	1	791	194	
2185	package	0.5	789	194	
2186	package	0.5	789	194	
2187	tsp	1	790	194	
2188	cup	6	519	194	
2189	\N	\N	425	194	
2190	pinch	1	946	194	
2191	pinch	1	502	194	
2192	pinch	1	416	194	
2193	cup	3	742	194	
2194	large	4	955	195	cut
2195	large	4	371	195	skinless and boneless
2196	package	1	792	195	cubed
2197	can or bottle	1	403	195	
2198	\N	4	240	195	cut
2199	\N	1	571	195	cut
2200	cup	0.5	359	195	chopped
2201	tbsp	5	786	195	
2202	cup	0.25	536	195	
2203	packets	3	784	195	
2204	cloves	4	254	195	minced
2205	\N	\N	425	195	
2206	\N	\N	721	195	ground
2207	tbsp	2	340	196	
2208	g	226.75	793	196	sliced
2209	\N	1	571	196	sliced
2210	\N	1	732	196	chopped
2211	g	1814.25	758	196	
2212	tsp	1.5	657	196	chopped
2213	tsp	0.25	21	196	chopped
2214	tsp	1	425	196	
2215	tsp	0.5	721	196	ground
2216	cup	1	867	196	
2217	cup	1	746	196	
2218	\N	2	723	196	
2219	tsp	0.25	738	196	
2220	\N	1	341	196	cut into wedges
2221	cup	2	519	197	
2222	cup	1	392	197	
2223	tbsp	2	340	197	
2224	\N	1	792	197	
2225	\N	0.25	571	197	finely chopped
2226	cloves	3	254	197	minced
2227	cup	1.5	512	197	
2228	tsp	0.5	738	197	
2229	tsp	1	794	197	
2230	\N	\N	425	197	
2231	\N	\N	666	197	
2232	can	0.5	795	197	rinsed and drained
2233	tbsp	1	677	198	
2234	tbsp	3	964	198	
2235	cup	0.5	571	198	chopped
2236	g	453.5	739	198	
2237	tsp	1	425	198	
2238	tsp	0.5	721	198	ground
2239	tsp	0.25	610	198	ground
2240	cup	3	260	198	chopped
2241	tsp	1	558	198	ground
2242	tsp	0.25	618	198	ground
2243	cup	2	798	198	
2244	cup	4	519	198	
2245	tbsp	1	960	198	
2246	g	453.5	739	199	
2247	large	1	571	199	chopped
2248	\N	1	971	199	chopped
2249	tbsp	2	595	199	
2250	cup	5	746	199	
2251	cup	1	512	199	
2252	g	453.5	789	199	cut
2253	cup	3	798	199	rinsed and drained
2254	tbsp	3	964	199	
2255	\N	2	571	200	peeled
2256	g	453.5	739	200	
2257	g	453.5	739	200	
2258	\N	1	760	200	diced
2259	tsp	2	796	200	
2260	tsp	1	425	200	
2261	tsp	1	721	200	ground
2262	tsp	1	797	200	
2263	tsp	0.5	610	200	ground
2264	\N	2	199	200	
2265	\N	8	930	200	
2266	quarts	3	519	201	
2267	tbsp	3	425	201	
2268	cup	2	798	201	rinsed
2269	tbsp	2	340	201	
2270	\N	1	242	201	cut
2271	pinch	1	592	201	ground
2272	\N	\N	425	201	
2273	tbsp	3	960	201	
2274	pinch	1	677	201	
2275	tbsp	1.5	519	201	
2276	tbsp	1	359	201	chopped
2277	cup	0.25	728	202	
2278	large	1	571	202	chopped
2279	tsp	1	610	202	ground
2280	g	680.5	947	202	boneless
2281	cup	1.5	486	202	chopped
2282	cup	1	967	202	chopped
2283	cup	0.5	359	202	chopped
2284	cup	0.25	591	202	chopped
2285	cup	0.25	442	202	chopped
2286	cup	1.5	519	202	
2287	\N	\N	425	202	
2288	\N	\N	721	202	ground
2289	\N	1	561	202	juiced
2290	\N	4	965	202	dried
2291	can	1	734	202	drained and rinsed
2292	cup	5	519	203	
2293	tbsp	6.5	340	203	
2294	g	453.5	677	203	
2295	\N	2	571	203	chopped
2296	clove	1	254	203	minced
2297	g	907.25	777	203	skinless and boneless
2298	cup	2	746	203	
2299	(16 ounce) cans	2	249	203	drained
2300	g	113.5	740	203	
2301	tbsp	1	790	203	
2302	cup	3	519	204	
2303	g	680.5	371	204	skinless and boneless
2304	large	1	571	204	chopped
2305	cloves	6	254	204	minced
2306	tsp	1	610	204	ground
2307	tsp	1	425	204	
2308	tsp	0.25	721	204	ground
2309	cup	2	798	204	
2310	medium	1	240	204	chopped
2311	tbsp	3	562	204	
2312	tbsp	2	359	204	chopped
2313	g	453.5	392	205	
2314	cup	6.25	519	205	
2315	\N	\N	425	205	
2316	cup	2	927	205	rinsed
2317	cup	0.25	964	205	
2318	large	2	571	205	sliced
2319	tsp	0.5	677	205	
2320	cup	0.75	970	205	chopped
2321	cup	0.75	740	205	
2322	\N	4	801	206	sliced
2323	tbsp	1	340	206	
2324	\N	4	777	206	skinless and boneless
2325	medium	2	571	206	chopped
2326	clove	1	254	206	minced
2327	can	1	849	206	
2328	\N	\N	592	206	ground
2329	\N	\N	425	206	
2330	\N	\N	721	206	ground
2331	cup	0.5	960	206	melted
2332	cup	1	873	206	
2333	cup	0.25	359	206	chopped
2334	g	453.5	948	207	diced
2335	tsp	3	254	207	minced
2336	can	1	724	207	drained
2337	cup	1	949	207	
2338	jar	1	967	207	pittted
2339	package	1	784	207	
2340	cup	3	742	207	rinsed
2341	cup	2.75	519	207	
2342	tbsp	1	340	208	
2343	cup	0.5	786	208	
2344	cloves	2	254	208	chopped
2345	package	1	784	208	
2346	tbsp	0.5	785	208	
2347	cup	2	392	208	
2348	cup	2	746	208	
2349	cup	1.5	519	208	
2350	can	1	804	208	drained and rinsed
2351	tbsp	2	591	208	chopped
2352	tbsp	1	340	209	
2353	cup	0.25	512	209	
2354	tbsp	2	786	209	
2355	packet	1	784	209	
2356	tsp	0.25	721	209	
2357	cup	2	805	209	cooked
2358	cup	1.5	519	209	
2359	\N	\N	425	209	
2360	tbsp	1	480	210	
2361	tbsp	1	471	210	
2362	\N	2	967	210	chopped
2363	clove	1	254	210	minced
2364	tsp	1	472	210	
2365	tsp	1	565	210	
2366	tsp	0.25	721	210	
2367	g	113.5	729	210	sliced
2368	tbsp	2	964	210	
2369	cup	0.5	240	210	sliced
2370	cup	0.5	775	210	sliced
2371	g	113.5	88	210	sliced
2372	cup	2	486	210	chopped
2373	g	85	807	210	
2374	tbsp	2	480	210	
2375	tbsp	1	565	210	
2376	tsp	0.5	425	210	
2377	tsp	0.25	721	210	
2378	cup	0.25	480	211	
2379	\N	2	967	211	sliced
2380	\N	0.25	571	211	sliced
2381	tbsp	3	565	211	
2382	cloves	3	254	211	minced
2383	tbsp	2	472	211	
2384	tbsp	1	471	211	
2385	tsp	0.25	738	211	
2386	tsp	0.25	618	211	minced
2387	tsp	0.25	721	211	ground
2388	g	680.5	809	211	
2389	tsp	1	197	211	
2390	package	1	969	212	
2391	cup	0.5	519	212	
2392	cup	0.5	480	212	
2393	cup	0.25	565	212	
2394	tbsp	3	964	212	
2395	tsp	1	472	212	
2396	g	1360.75	955	213	peeled and thinly sliced
2397	cloves	3	254	213	minced
2398	tsp	0.75	425	213	
2399	cup	1	810	213	
2400	\N	\N	721	213	ground
2401	\N	\N	644	213	grated
2402	cup	2	811	213	shredded
2403	g	907.25	955	214	
2404	tbsp	2	340	214	
2405	\N	4	571	214	sliced
2406	tbsp	2	254	214	chopped
2407	cup	0.5	960	214	
2408	\N	\N	425	214	
2409	\N	\N	665	214	ground
2410	tbsp	1	359	214	minced
2411	(6 ounce) can	1	510	215	
2412	\N	0.5	571	215	chopped
2413	cup	0.25	254	215	minced
2414	cup	0.75	519	215	
2415	tbsp	4	340	215	
2416	\N	\N	425	215	
2417	\N	\N	721	215	ground
2418	small	1	968	215	very thinly sliced
2419	\N	1	765	215	very thinly sliced
2420	\N	1	812	215	very thinly sliced
2421	\N	1	726	215	very thinly sliced
2422	\N	1	813	215	very thinly sliced
2423	tsp	1	815	215	
2424	tbsp	3	816	215	
2425	tsp	2	340	216	
2426	g	680.5	739	216	
2427	cup	1	571	216	diced
2428	tsp	1	425	216	
2429	tsp	0.5	721	216	ground
2430	tsp	2	592	216	
2431	tsp	0.5	558	216	ground
2432	\N	2	723	216	
2433	tsp	0.25	589	216	
2434	cloves	4	254	216	minced
2435	tbsp	3	719	216	
2436	cup	3	509	216	crushed
2437	cup	0.25	519	216	
2438	cup	0.25	740	216	
2439	cup	0.5	967	216	
2440	g	680.5	817	217	boneless
2441	pint	1	519	217	
2442	\N	1	965	217	juiced
2443	sprig	1	502	217	
2444	\N	8	966	217	
2445	tbsp	1	628	217	
2446	tbsp	1	959	217	
2447	\N	\N	425	217	
2448	tbsp	2	340	217	
2449	large	1	571	217	halved and sliced
2450	cloves	3	254	217	peeled and sliced
2451	\N	1	965	217	juiced
2452	cup	0.25	591	217	chopped
2453	(4 pound)	1	948	218	
2454	tsp	1.5	425	218	
2455	tsp	1	721	218	ground
2456	cup	0.75	343	218	
2457	cup	0.5	641	218	
2458	cup	0.5	340	218	
2459	cup	0.25	591	218	chopped
2460	cloves	6	254	218	pressed
2461	\N	2	341	218	zested
2462	\N	1	965	218	zested
2463	\N	2	723	218	
2464	tsp	2	657	218	
2465	tsp	1	592	218	ground
2466	tbsp	1	964	219	
2467	g	907.25	818	219	
2468	cup	1	962	219	
2469	(8 ounce) can	1	512	219	
2470	(6 ounce) can	1	510	219	
2471	\N	1	732	219	seeded and sliced into strips
2472	small	1	571	219	sliced
2473	cloves	2	254	219	chopped
2474	tsp	1	592	219	ground
2475	tsp	1	591	219	chopped
2476	tbsp	1	340	219	
2477	tbsp	1	125	219	
2478	tbsp	1	340	220	
2479	small	1	571	220	chopped
2480	\N	0.5	732	220	chopped
2481	clove	1	254	220	minced
2482	g	453.5	739	220	
2483	(8 ounce) can	1	512	220	
2484	\N	6	967	220	pitted
2485	cup	0.5	740	220	
2486	tbsp	1	622	220	
2487	packages	2	784	220	
2488	tbsp	1	592	220	ground
2489	tsp	1	565	220	
2490	\N	\N	425	220	
2491	cup	2	392	220	
2492	cup	0.5	927	221	
2493	cup	1.5	519	221	
2494	small	1	509	221	chopped
2495	small	1	571	221	chopped
2496	tsp	2	592	221	ground
2497	tsp	1	425	221	
2498	tbsp	1	964	221	
2499	small	2	955	221	cubed
2500	(8 ounce) package	1	333	222	
2501	cup	2	862	222	
2502	cup	2.5	519	222	
2503	tsp	1.5	425	222	
2504	cup	0.25	728	222	
2505	g	113.5	860	223	
2506	\N	2	777	223	boneless, skinless, sliced into thin strips
2507	tsp	2	733	223	
2508	tbsp	2	960	223	
2509	\N	1	732	223	chopped
2510	\N	0.5	726	223	chopped
2511	\N	4	85	223	sliced
2512	\N	1	760	223	minced
2513	cup	1.5	810	223	
2514	tsp	0.25	21	223	
2515	tsp	0.25	926	223	
2516	tsp	0.25	425	223	
2517	tsp	0.25	628	223	
2518	tsp	0.25	721	223	ground
2519	tbsp	2	961	223	grated
2520	g	113.5	860	224	
2521	\N	2	777	224	skinless, boneless
2522	tsp	2	733	224	
2523	tbsp	2	960	224	
2524	\N	1	726	224	sliced
2525	\N	1	732	224	sliced
2526	\N	4	85	224	sliced
2527	\N	1	760	224	chopped
2528	cup	1	810	224	
2529	tsp	0.25	21	224	
2530	tsp	0.25	926	224	
2531	tsp	0.25	425	224	
2532	tsp	0.25	628	224	
2533	tsp	0.25	721	224	ground
2534	cup	0.25	961	224	grated
2535	tsp	1	957	225	
2536	tsp	0.5	628	225	
2537	tsp	0.5	959	225	
2538	tsp	0.5	425	225	
2539	tsp	0.5	657	225	
2540	tsp	0.25	721	225	ground
2541	tsp	0.25	589	225	
2542	tsp	0.25	502	225	
2543	g	907.25	151	225	peeled and deveined
2544	tbsp	2	340	225	
2545	cup	0.5	960	225	
2546	tbsp	2	359	225	minced
2547	wedges	6	561	225	
2548	cup	3	392	225	
2549	\N	4	278	226	
2550	tbsp	2	340	226	
2551	tbsp	2	565	226	
2552	cloves	4	254	226	minced
2553	tsp	1	957	226	
2554	tsp	1	790	226	
2555	tsp	1	956	226	
2556	\N	0.5	561	226	
2557	cup	2	392	226	
2558	tbsp	1	728	227	
2559	g	113.5	727	227	chopped
2560	g	113.5	409	227	cooked, chopped
2561	medium	1	571	227	chopped
2562	cloves	2	254	227	minced
2563	(1 pound)	2	494	227	peeled and diced
2564	large	1	726	227	diced
2565	(14.5 ounce) cans	2	509	227	diced with juice
2566	small	1	725	227	diced
2567	cup	1.5	519	227	
2568	(16 ounce) cans	2	724	227	rinsed and drained
2569	\N	1	311	227	peeled, seeded and diced
2570	cup	0.25	591	227	chopped
2571	tsp	0.25	425	227	
2572	g	907.25	955	228	cut into 1 1/2-inch cubes
2573	tbsp	4	340	228	
2574	\N	\N	425	228	
2575	\N	\N	721	228	ground
2576	bunch	0.5	359	228	chopped
2577	bunch	0.5	21	228	chopped
2578	cloves	4	254	228	minced
2579	tbsp	2	125	228	
2580		1	181	229	\N
2581	g	250	724	229	\N
\.


--
-- Data for Name: Preferences; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Preferences" (id, "userId", "formOfDiet", allergens, days, servings, "wantsDinner", "wantsLunch") FROM stdin;
1	markus.fichtner1999@gmail.com	omnivore	{}	{monday,tuesday,wednesday,thursday,friday,saturday,sunday}	1	t	t
2	testUser1@test.de	omnivore	{}	{monday,tuesday,wednesday,thursday,friday,saturday,sunday}	1	t	t
3	testUser2@test.de	omnivore	{lupine,mustard}	{monday,tuesday,wednesday,thursday,friday,saturday,sunday}	2	t	f
\.


--
-- Data for Name: Recipe; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Recipe" (id, name, img, description, "cookingTime", "preparingTime", "totalTime", servings, tags, "formOfDiet", "userId") FROM stdin;
1	Chicken with Creamy Sun-Dried Tomato Sauce	ChickenwithCreamySunDriedTomatoSauce.jpg	This creamy sun-dried tomato chicken dinner is wonderful for company. Everything is cooked in one skillet, which makes it even better!	30	0	50	12	{"meat and poultry",chicken,"chicken breast","creamy chicken"}	omnivore	\N
2	Instant Pot Vegan Tex-Mex Bowl	InstantPotVeganTexMexBowls.jpg	A complete meal using from-scratch ingredients. Beans, rice, and salsa cook together and are served over lettuce then topped with avocado and vegan Cheddar for your taco Tuesday. You can cook the beans the night before if you prefer.	35	0	55	5	{cuisine,"latin american",mexican}	vegan	\N
3	Fresh Spring Rolls with Peanut Dip	ChefJohnsFreshSpringRolls.jpg	Fresh spring rolls are a burst of freshness and flavors, where vibrant veggies, succulent proteins, and fragrant herbs come together in a delicate rice paper wrap.	0	0	35	4	{"appetizers and snacks","wraps and rolls"}	omnivore	\N
4	Baked Salmon	BakedSalmon.jpg	This baked salmon is a great recipe for beginners.	35	0	50	2	{"main dishes","seafood main dishes",salmon,"baked salmon recipes"}	pescetarian	\N
5	Instant Pot Quinoa Taco Meat Substitute	InstantPotQuinoaTacoMeatSubstitute.jpg	Amazingly flavorful taco 'meat' made with quinoa, smoky seasonings, and salsa, right in the Instant Pot! Baked until hot and crispy. A great substitute for ground beef, with just 9 ingredients.	40	0	55	4	{"everyday cooking",vegan}	vegan	\N
6	Vegan Spring Rolls with Peanut Dip	SpringRollswithCoconutPeanutSauce.jpg	Strips of carrot, bell pepper, cucumber and shredded red cabbage and more are rolled into rice noodle wrappers and served with a creamy peanut sauce.	0	0	35	8	{"appetizers and snacks","wraps and rolls",vegan}	vegan	\N
7	Baby Spinach Omlett	BabySpinachOmelet.jpg	Enjoy this spinach omelet with tender baby greens, Parmesan cheese, and a little nutmeg cooked together for the perfect start to the day.	10	0	15	1	{"breakfast and brunch",eggs,"omelet recipes"}	pescetarian	\N
8	Loaded Breakfast Skillet	LoadedBreakfastSkillet.jpg	This breakfast skillet is loaded with potatoes, bacon, onions, eggs, and shredded cheese for a hearty and delicious breakfast or brunch dish.	40	0	55	4	{"breakfast and brunch",potatoes}	omnivore	\N
9	One-Pot Spaghetti with Meat Sauce	OnePotSpaghettiwithMeatSauce.jpg	One-pot spaghetti puts Italian sausage, pasta sauce, and noodles together for a dish you can have on the table in less than 45 minutes. It doesn't get much easier than this by cooking everything in one pot.	30	0	40	4	{"main dishes",pasta,spaghetti}	omnivore	\N
10	Stuffed Peppers	ChefJohnsStuffedPeppers.jpg	This is the best stuffed peppers recipe, easy and delicious. Its roots can be traced back to the Great Depression, when farmers first began selling the unripe peppers out of necessity. Of course, we did what Americans always do when faced with a new variety of food, we stuffed meat in it.	20	0	50	8	{"main dishes",stuffed,"stuffed bell pepper recipes"}	omnivore	\N
11	Quinoa Tabbouleh	QuinoaTabbouleh.jpg	This tabbouleh recipe is different. Instead of using bulgur like traditional tabbouleh, this recipe uses quinoa. It's a great meal for a hot summer day.	15	0	30	4	{salad,grains,tabbouleh}	vegan	\N
12	Parmesan Chicken Bake	TheBestParmesanChickenBake.jpg	This Parmesan-style chicken bake is done casserole style (so, no breading or frying!), but still offers up that irresistible combination of tender chicken, crunchy-cheesy coating, and flavorful sauce.	35	0	50	6	{"main dishes",chicken,parmesan}	omnivore	\N
13	Wiener Schnitzel	WienerSchnitzel.jpg	This wiener schnitzel is an easy German recipe and one of our favorites.	15	0	30	4	{cuisine,european,german}	omnivore	\N
14	No-Cook Chicken Lettuce Wraps	NoCookChickenLettuceWraps.jpg	These Asian-inspired chicken lettuce wraps are great for summer nights, refreshing, and require no cooking!	0	0	10	4	{chicken,asian,"appetizers and snacks"}	omnivore	\N
15	Mexican Rice and Beans	MexicanRiceandBeans.jpg	This Mexican beans and rice recipe is spicy and delicious.	25	0	35	4	{"main dishes",rice,"beans and rice recipes"}	vegan	\N
16	Vegetarian Sheet Pan Dinner with Chickpeas and Veggies	VegetarianSheetPanDinnerwithChickpeasandVeggies.jpg	Adding chickpeas to root vegetables on a sheet pan makes for an easy dinner!	45	0	10	8	{"fruits and vegetables",vegetables,squash}	vegan	\N
17	Vegan Stir-Fry	VeganStirFry.jpg	This is a quick and easy vegetable stir-fry, perfect to use up whatever fresh vegetables you have in your fridge.	20	0	40	4	{"everyday cooking",vegetarian,"main dishes",stir-fry}	vegan	\N
18	Vegetarian Chickpea Tacos	VegetarianChickpeaTacos.jpg	Quick healthy tacos.	5	0	15	4	{"main dishes","taco recipes","vegetarian taco recipes"}	vegetarian	\N
19	Thit Kho (Caramelized Pork Belly)	ThitKhoCaramelizedPorkBelly.jpg	Thit kho tau is a very popular dish in Vietnamese households for everyday eating, but it's also traditionally served during the Vietnamese Lunar New Year. The longer you cook the pork belly, the more tender it becomes. If you make this dish ahead of time, the fat will congeal on the surface, making it easier to remove and a little healthier! This also allows the flavors to meld a little more.	15	0	45	6	{cuisine,asian,vietnamese}	omnivore	\N
20	Grilled Salmon	CedarPlankedSalmon.jpg	This cedar plank salmon is a quick and healthy dish.	20	0	40	6	{"bbq & grilling",seafood,salmon}	pescetarian	\N
21	Couscous with Olives and Sun-Dried Tomato	CouscouswithOlivesandSunDriedTomato.jpg	A delicate, flavorful dish that will satisfy vegans and carnivores alike! It contains no animal products or fats, but has enough flavor and visual impact to make you feel like you're not sacrificing a thing!	30	0	50	4	{cuisine,african,"north african",egyptian}	vegan	\N
22	Cucumber Bulgur Tabbouleh	CucumberTabbouleh.jpg	A delicious bulgur salad that is filled with tomatoes, green onions, and cucumber. It is seasoned in the traditional way, with fresh mint and lemon juice.	20	0	25	8	{salad,grains}	vegetarian	\N
23	Cajun Seafood Pasta	CajunSeafoodPasta.jpg	This Cajun-inspired seafood pasta recipe is a hot one, but delicious! If you don't like as much spice, divide the amounts of pepper in half. Better to add more later than spoil your creation.	30	0	45	6	{seafood,shellfish,scallops}	omnivore	\N
24	Baked Mushroom Risotto	ChefJohnsBakedMushroomRisotto.jpg	The beginning and the end of this risotto recipe are pretty standard, but we've moved the middle 15 minutes into the oven in an attempt to eliminate those dreaded 'variables.' Besides being easier and more repeatable, this method produced a risotto that was identical in looks, taste, and texture to anything I can do on the stove.	35	0	45	4	{"main dishes",rice,"risotto recipes"}	omnivore	\N
25	Beans and Greens	ChefJohnsBeansandGreens.jpg	This beans and greens dish has it all! It's very easy and inexpensive to make, it's highly nutritious, it's soulful and comforting, and it can be served as a main course, side dish, soup, vegetable stew, or an appetizer.	30	0	45	6	{cuisine,european,italian}	omnivore	\N
26	Vegan Crepes	VeganCrepes.jpg	Tasty vegan crepes! For a twist, replace the maple syrup with hazelnut syrup, or any other flavor you like.	20	0	25	4	{"breakfast and brunch",crepes,sweet}	vegetarian	\N
27	Easy Chorizo Tacos	EasyChorizoStreetTacos.jpg	These chorizo tacos use just 5 ingredients and taste amazing.	10	0	20	2	{cuisine,"latin american",mexican}	omnivore	\N
28	Indian Chicken Tikka Masala	IndianChickenTikkaMasala.jpg	This Indian chicken tikka masala is an easy but flavorful version of everyone's favorite mild-medium curry! Serve with naan bread and mango chutney. Garnish with additional cilantro leaves.	25	0	45	4	{cuisine,asian,indian}	omnivore	\N
29	Easy Korean Ground Beef Bowl	EasyKoreanGroundBeefBowl.jpg	This Korean beef bowl is quick and easy to make. The ingredients can easily be adjusted to suit your taste. Serve over warm rice or spiralized vegetables.	15	0	25	4	{"main dishes",bowls,"rice bowl"}	omnivore	\N
30	Orange, Fig, and Gorgonzola Salad	OrangeFigandGorgonzolaSalad.jpg	Great combination of oranges, figs, and cheese!	0	0	15	4	{salad,"fruit salad recipes","orange salad recipes"}	vegetarian	\N
31	Ginger Veggie Stir-Fry	GingerVeggieStirFry.jpg	This vegetable stir-fry is filling light on the tummy!	15	0	40	6	{cuisine,asian}	vegan	\N
32	Vegan Pasta and Lentil One Pot	VeganPastaandLentilCasserole.jpg	Protein packed pasta recipe.	35	0	5	8	{vegan,"one-pot meal recipes",pasta}	vegan	\N
33	Turkey Spaghetti Zoodles	TurkeySpaghettiZoodles.jpg	A super simple one-pot dinner that's low calorie, low carb, paleo, gluten-free and takes just 10 minutes to make.	9	0	24	5	{"meat and poultry",turkey,"ground turkey recipes"}	omnivore	\N
34	Chickpea Buddha Bowl	ChickpeaBuddhaBowl.jpg	This delicious vegan dish is perfect for when you don't have much time. For this dish, we've used a mix of carrots, onions, parsnips and Brussels sprouts with chickpeas and quinoa.	20	0	40	2	{"main dishes",bowls}	vegan	\N
35	California Club Chicken Wraps	CaliforniaClubChickenWraps.jpg	Quick and healthy wraps packed with protein.	1	0	16	2	{"meat and poultry",chicken,"chicken breast","wraps and rolls"}	omnivore	\N
36	Lentil Bolognese	LentilBolognese.jpg	Delicious vegetarian sauce for pasta, so tasty, and as nice as a meat bolognese.	32	0	52	4	{"sauces and condiments",sauces,"pasta sauces",vegetarian}	vegan	\N
37	Vegetarian Minestrone	SlowCookerVegetarianMinestrone.jpg	Ideal for a weeknight dinner! Delivers a delicious, hearty meal that everyone's sure to enjoy. Serve with a green salad and garlic bread for dipping.	25	0	40	8	{"soups, stews and chili recipes","soup recipes","vegetable soup recipes",minestrone}	vegetarian	\N
38	Scrambled Eggs	BestScrambledEggs.jpg	This is the best scrambled eggs recipe you will come across. Quick, easy and packed with lot's of protein.	5	0	10	1	{"breakfast and brunch",eggs,scrambled}	omnivore	\N
39	Brazilian Fish Stew	ChefJohnsBrazilianFishStew.jpg	Brazilian Fish Stew, known as Moqueca, is a tantalizing fusion of seafood, coconut milk, and aromatic spices.	20	0	32	6	{cuisine,"latin american","south american",brazilian}	pescetarian	\N
40	Easy Vegan Pasta with Kale and Chickpeas	EasyVeganPastawithKaleandChickpeas.jpg	These is one of our go-to recipes for a quick, healthy midweek meal though it is good enough for guests, too.	17	0	22	4	{vegan,pasta}	vegan	\N
41	Tofu Stir-Fry with Peanut Sauce	TofuStirFrywithPeanutSauceVegan.jpg	This recipe for tofu stir-fry with peanut sauce is healthy, filling, and full of flavor!	15	0	35	4	{"main dishes",stir-fry,vegan}	vegan	\N
42	Tofu Burgers	TofuBurgers.jpg	These popular tofu burgers made with onion, celery, and cheese are delicious! Serve them on buns with your favorite toppings, such as lettuce, onion, tomato, and mayo.	15	0	20	6	{"main dishes","burger recipes",veggie}	omnivore	\N
43	Vegan Spaghetti and (Beyond) Meatballs	VeganSpaghettiandBeyondMeatballs.jpg	This vegan spaghetti features plant-based "meatballs" made with Beyond Meat Beyond Beef. You can use any meat substitute you like. They're slow-simmered in tomato sauce for a hearty and satisfying vegan meal.	35	0	55	4	{"main dishes",pasta,spaghetti,vegan}	vegan	\N
44	Pesto Pasta with Chicken	PestoPastawithChicken.jpg	This chicken pesto pasta is easy and delicious.	20	0	30	8	{"main dishes",chicken,"pesto chicken recipes"}	omnivore	\N
45	Lasagna Toss	LasagnaToss.jpg	This is a quick, and EASY, alternative to lasagna when you don't have much time, it's great for a weeknight meal!	25	0	40	8	{pasta,italian}	omnivore	\N
46	Spicy Vegan Potato Curry	SpicyVeganPotatoCurry.jpg	This vegan potato curry has abundant spices that make this better than any restaurant curry we've tasted.	30	0	0	6	{cuisine,asian,indian}	vegan	\N
47	Mexican Veggie Tacos	DavesMexicanVeggieTacos.jpg	These Mexican veggie tacos are a one-pan recipe with great spice.	30	0	50	8	{cuisine,"latin american",mexican}	vegetarian	\N
48	Pasta with Sausage, Tomatoes, and Cream	BowTieswithSausageTomatoesandCream.jpg	A delicious creamy sausage pasta dish. This is a very easy recipe.	30	0	45	6	{cuisine,european,italian,pasta}	omnivore	\N
49	Watermelon-Tuna Poke Bowl	WatermelonTunaPokeBowl.jpg	Marinating and baking chunks of watermelon (yes, really!) creates a tender, tuna-like texture fit for poke: traditionally a bowl of diced raw fish with lots of toppers.	0	0	200	4	{"fruits and vegetables",fruits,melons,watermelons}	pescetarian	\N
50	Mediterranean Chicken Pitas	MediterraneanChickenPitas.jpg	A perfect way to use leftover chicken breasts in these amazing Mediterranean-style pita sandwiches, served with artichokes and feta cheese.	0	0	15	2	{chicken,"sandwich recipes"}	omnivore	\N
51	Ginger Noodle Bowl	GingerNoodleBowlTheVeganVersion.jpg	An Asian-inspired noodle bowl with a vegan makeover!	15	0	45	4	{"soups, stews and chili recipes","soup recipes","noodle soup recipes"}	vegetarian	\N
52	Quesadillas	QuesadillasI.jpg	A delicious, cheesy treat. Perfect for those cheese cravings. Serve with sour cream and salsa.	10	0	20	5	{cuisine,"latin american",mexican}	vegetarian	\N
53	Coconut Chickpea Curry	CoconutChickpeaCurry.jpg	A delicious vegetarian curry that is spicy, but savory and delightful in all the best ways. You can adjust the amount of curry paste to your personal paste.	20	0	35	4	{"main dishes",curries,coconut}	vegan	\N
54	Mushroom Risotto	MushroomRisotto.jpg	Delicious mushroom risotto made with vegetable broth, cream, and a variety of fresh vegetables.	35	0	45	4	{"main dishes",rice,"risotto recipes"}	omnivore	\N
55	Skillet Shrimp Fajitas with Cilantro-Lime Cream	SkilletShrimpFajitaswithCilantroLimeCream.jpg	Shrimp, bell peppers, onions, and seasonings come together in one skillet for delicious shrimp fajitas, drizzled with cilantro-lime cream, and wrapped in warm tortillas. This cooks quickly, so you'll want to have the shrimp cleaned and vegetables sliced before you begin.	15	0	40	5	{"latin american",mexican,"main dishes","fajita recipes"}	omnivore	\N
56	Black Bean and Corn Salad	BlackBeanandCornSalad.jpg	This black bean and corn salad is very colorful and includes a delicious lime and garlic dressing.	0	0	25	6	{salad,beans,"black bean salad recipes"}	vegan	\N
57	Vegan Sweet Potato Chili	VeganSweetPotatoChili.jpg	Quick, easy cool-weather vegan chili.	30	0	45	6	{"soups, stews and chili recipes","chili recipes",vegan}	vegan	\N
58	Chickpea Salad	ChickpeaSaladII.jpg	A tasty and nutritious version of a classic Mediterranean salad.	0	0	50	4	{salad,vegetarian}	vegetarian	\N
59	Raw Pad Thai	RawPadThai.jpg	This is an uncooked version of pad Thai.	0	0	30	4	{cuisine,asian}	vegan	\N
60	Savory Vegetarian Quinoa	SavoryVegetarianQuinoa.jpg	I've been experimenting with quinoa and vegetarian cooking. Came up with this last night and it was delicious! I wanted to save the recipe here and share it with others. I topped mine with some chopped avocado and chia seeds for extra health benefits.	31	0	56	8	{"everyday cooking",vegan}	vegan	\N
61	Tofu Salad	TofuSalad.jpg	This tofu salad is made with marinated tofu, snow peas, ginger, and garlic.	5	0	35	4	{salad,"vegetable salad recipes"}	vegan	\N
62	Ranch Chicken Tacos	RanchChickenTacos.jpg	These ranch chicken tacos are a great change from regular Mexican-style tacos. A quick, cool summer dinner made with leftover rotisserie chicken.	5	0	25	4	{cuisine,"latin american",mexican}	omnivore	\N
63	Vegan Fajitas	VeganFajitas.jpg	These vegan fajitas are a wonderful meatless version of traditional fajitas. This recipe can be prepared in advance or enjoyed right away.	20	0	0	6	{"latin american",mexican,"main dishes","fajita recipes",vegan}	vegan	\N
64	Chicago-Style Hot Dog	ChicagoStyleHotDog.jpg	This hot dog is a Windy City classic and a big favorite with sports fans!	5	0	15	1	{"main dishes","sandwich recipes","hot dogs and corn dogs recipes"}	omnivore	\N
65	Vegan Enchilada Bake	VeganEnchiladaBake.jpg	Casserole-style vegan enchiladas.	45	0	0	6	{mexican,"main dishes","enchilada recipes",vegetarian}	vegan	\N
66	Sesame Noodle Salad	SesameNoodleSalad.jpg	This amazing salad recipe is quick and easy to prepare.	10	0	25	8	{salad,"pasta salad","vegetarian pasta salad recipes"}	vegan	\N
67	Avocado Toast with Egg	AvocadoToastwithEgg.jpg	We love avocado toast, and if you add an egg to it you have a full meal.	5	0	10	2	{"main dishes","sandwich recipes"}	pescetarian	\N
68	The Best Thai Coconut Soup	TheBestThaiCoconutSoup.jpg	This Thai coconut soup is full of authentic, bold, and delicious Thai flavors. This is the best Thai soup recipe out there, you won't be disappointed with this one! Serve over steamed rice.	30	0	0	8	{cuisine,asian,thai,"soups and stews"}	omnivore	\N
69	Rice and Orzo Pilaf with Mushrooms	InstantPotRiceandOrzoPilafwithMushrooms.jpg	In just minutes, this dish transforms simple ingredients into a flavorful and comforting side or main course that the whole family will love.	30	0	50	4	{"pasta and noodles","pasta by shape recipes"}	pescetarian	\N
70	Baked Ziti	BakedZiti.jpg	Baked ziti is a classic Italian-American comfort dish that combines al dente ziti pasta with a rich tomato sauce, sour cream, mozzarella cheese, and ground meat, all baked until bubbling and golden.	45	0	0	10	{"main dishes",pasta}	omnivore	\N
71	Simple Vegan Split Pea Soup	SimpleVeganSplitPeaSoup.jpg	Create a simple vegan split pea soup by simmering onions, carrots, celery, split peas, and seasonings in vegetable broth until tender to create a satisfying bowl of plant-based comfort.	35	0	45	4	{"soups, stews and chili recipes","soup recipes","beans and peas","split pea soup recipes"}	vegan	\N
72	Basic Vegetarian Pho	BasicVegetarianPho.jpg	This recipe is a Vietnamese noodle soup, a plant-based alternative rich in aromatic flavors and hearty ingredients.	30	0	0	8	{"soups, stews and chili recipes","soup recipes","vegetable soup recipes"}	vegan	\N
73	One-Pot Vegan Potato Lentil Curry	OnePotVeganPotatoLentilCurry.jpg	This potato and lentil curry is a tasty and filling one-pot dish. Not all curry paste is the same, so you may want to start with one teaspoon and add more to taste if it's not spicy enough.	35	0	55	4	{cuisine,asian,indian,"one-pot meal recipes"}	vegan	\N
74	Grilled Turkey and Swiss Sandwich	GrilledTurkeyandSwissSandwich.jpg	Very simple but awesome flavor.	5	0	15	1	{"sandwich recipes",turkey}	omnivore	\N
99	Spicy Rice Noodle Salad	SpicyRiceNoodleSalad.jpg	This spicy rice noodle salad is a zesty and refreshing dish made with cooked rice noodles, fresh vegetables, herbs, and a spicy dressing.	30	0	50	6	{salad,"pasta salad"}	vegan	\N
75	Instant Pot Spicy Vegan Carrot Soup	InstantPotSpicyVeganCarrotSoup.jpg	This easy creamy, dairy-free, and vegan carrot soup, seasoned with curry paste and cilantro, comes together in minutes in your Instant Pot.	20	0	35	4	{"soups, stews and chili recipes","soup recipes","vegetable soup recipes","carrot soup recipes"}	vegan	\N
76	Tex-Mex Ground Beef and Potato Skillet	TexMexGroundBeefandPotatoSkillet.jpg	This versatile Tex-Mex ground beef and potato skillet works on its own as well as for the filling for a lettuce wrap, or as a nacho topping. It also works as a filling for corn or flour tortillas, or as a hash-type dish, for fried eggs.	25	0	40	4	{"everyday cooking","one-pot meal recipes"}	omnivore	\N
77	Shrimp and Peanut Butter Noodles	ShrimpandPeanutButterNoodles.jpg	This shrimp dish with peanut sauce is a sweet, salty, nutty dish that can be cooked up in less than 15 minutes.	15	0	25	4	{cuisine,asian}	pescetarian	\N
78	Spicy Asian Ramen Noodles	SpicyAsianRamenNoodles.jpg	In this yummy recipe, expect fast, easy, and spicy with salty, sweet, and sour flavors kicking in.	5	0	15	3	{"pasta and noodles","noodle recipes","ramen noodle recipes"}	vegan	\N
79	Baja-Style Chicken Bowl	BajaStyleChickenBowl.jpg	A Baja-style chicken bowl is a delicious and colorful dish featuring chicken served with a variety of fresh ingredients like pepper, rice, salsa, and corn, inspired by the flavors of the Baja California region in Mexico.	5	0	20	2	{"main dishes",bowls}	omnivore	\N
80	Cheesy Zucchini Rice	CheesyZucchiniRice.jpg	Try this cheesy zucchini rice, similar to risotto, but with much less effort. An easy recipe especially if you have an abundance of zucchini.	22	0	32	2	{"side dish","rice side dish recipes"}	omnivore	\N
81	Falafel Hash	FalafelHash.jpg	Falafel hash is a flavorful dish made by combining crispy falafel patties with diced vegetables, spices, resulting in a hearty and satisfying meal with Middle Eastern influences.	25	0	0	4	{"everyday cooking",vegan}	vegan	\N
82	Bacon-Ranch Chicken Enchiladas	BaconRanchChickenEnchiladas.jpg	These bacon-ranch chicken enchiladas are not authentically Mexican in the slightest, but holy buckets are they good! Great way to use up leftover rotisserie chicken.	20	0	40	6	{mexican,"main dishes","enchilada recipes",chicken}	omnivore	\N
83	German Hamburgers (Frikadellen)	GermanHamburgersFrikadellen.jpg	Frikadellen, the original hamburger, are served like a flattened meatball with string beans and salad. Serve with steamed string beans and tossed salad. Or serve on a kaiser roll with lettuce, tomato, pickled cucumbers, finely sliced deep-fried onions, and curry ketchup.	10	0	40	4	{cuisine,european,german}	omnivore	\N
84	Tofu Breakfast Burrito Bowls	UltimateTofuBreakfastBurritoBowls.jpg	Tofu scrambles up just like eggs, and with some clever spices, even non-vegans will barely notice the difference.	30	0	45	3	{"breakfast and brunch",potatoes}	vegan	\N
85	Pita Pizza	PitaPizza.jpg	Pita pizza is always a favorite as an appetizer or light lunch. These mini pizzas are easy to make with any readily available ingredients. Blue cheese adds a unique flavor, and pita bread is the perfect crust.	10	0	15	12	{lunch}	pescetarian	\N
86	Vegan African Peanut Stew	VeganAfricanPeanutStewintheInstantPot.jpg	Yummy, healthy, comfort food.	30	0	45	4	{cuisine,african,vegan,"one-pot meal recipes"}	omnivore	\N
87	Spinach Salad with Chicken, Avocado, and Goat Cheese	SpinachSaladwithChickenAvocadoandGoatCheese.jpg	Great salad with chicken, avocado, and goat cheese.	0	0	20	4	{salad,"green salad recipes","spinach salad recipes"}	omnivore	\N
88	Caprese Salad Sandwiches	CapreseSaladSandwiches.jpg	Everyone knows there's no salad like a Caprese salad on a hot summer day. Fresh-picked basil and tomatoes with just a hint of seasoning. The notes of the spelt combine perfectly with the light/summery flavors of the other ingredients. Very earthy.	0	0	15	4	{"sandwich recipes"}	vegetarian	\N
89	One Pot Tortellini Bake	OnePotTortelliniBake.jpg	This main dish comes together in under an hour and the best part, it cooks in one pot.	30	0	40	6	{"pasta and noodles","pasta by shape recipes","tortellini recipes"}	omnivore	\N
90	Vegan Red Lentil Soup	VeganRedLentilSoup.jpg	This vegan red lentil soup recipe is creamy and delicious.	40	0	55	4	{"soups, stews and chili recipes","soup recipes","beans and peas","lentil soup recipes"}	vegan	\N
91	Khitchari	Khitchari.jpg	Yummy, healthy, comfort food. This simple dish of beans and rice is tasty and helps cleanse the body and heal digestion for all body types.	25	0	35	3	{"beans and rice recipes",vegetarian}	vegan	\N
92	Greek Pasta Salad	GreekPastaSaladI.jpg	This is a great make-ahead pasta salad!	10	0	25	4	{salad,"pasta salad","tomato pasta salad recipes"}	vegetarian	\N
93	Pico de Gallo Chicken Quesadillas	PicodeGalloChickenQuesadillas.jpg	Flour tortillas filled with chicken breast, onions, peppers, pico de gallo, and Monterey Jack cheese.	30	0	55	4	{cuisine,"latin american",mexican}	omnivore	\N
94	Thai Curry Tofu	ThaiCurryTofu.jpg	Curried tofu made with coconut milk.	35	0	45	4	{"main dishes",curries,vegetarian}	vegetarian	\N
95	Ratatouille Provencale	RatatouilleProvenale.jpg	In France, this ratatouille recipe is made all year long to serve as a main dish with white rice or as a side with fish or meat. It is naturally vegan and tastes especially good when made with sun-ripened vegetables.	5	0	30	6	{"fruits and vegetables",vegetables,eggplant}	vegetarian	\N
96	Mexican Quesadilla Casserole	MexicanQuesadillaCasserole.jpg	This Mexican quesadilla casserole is a layered and baked dish consisting of tortillas, seasoned ground beef, melted cheese, and reminiscent of the flavors found in traditional quesadillas but prepared in a casserole form for easy serving and sharing.	25	0	45	8	{cuisine,"latin american",mexican}	omnivore	\N
97	Garlic Mashed Potato Casserole	GarlicMashedPotatoCasserole.jpg	A great make-ahead recipe, and a nice amount of extra flavor instead of your standard mashed.	5	0	20	6	{"side dish",potato,"mashed potato recipes"}	omnivore	\N
98	Broccoli and Chicken Stir-Fry	BroccoliandChickenStirFry.jpg	Broccoli and chicken stir-fry is a quick and nutritious dish made by stir-frying chicken pieces and fresh broccoli florets in a flavorful sauce.	20	0	35	3	{cuisine,asian}	omnivore	\N
100	Four Cheese Margherita Pizza	FourCheeseMargheritaPizza.jpg	This is a fantastic version of an Italian classic. The feta cheese adds a rich flavor that brings this dish to life. Incredibly easy and incredibly delicious!	10	0	40	8	{cuisine,european,italian}	omnivore	\N
101	Black Pepper Beef and Cabbage Stir Fry	BlackPepperBeefandCabbageStirFry.jpg	A very simple Chinese stir-fry dish which is fabulous in taste.	20	0	35	4	{cuisine,asian,chinese}	omnivore	\N
102	Shrimp and Soba Noodle Salad	ShrimpandSobaNoodleSalad.jpg	A shrimp and soba noodle salad is a delightful dish featuring cooked soba noodles and succulent shrimp, combined with a medley of fresh vegetables.	5	0	25	4	{salad,"shrimp salad recipes"}	pescetarian	\N
103	Pineapple-Coconut-Lime Rice	InstantPotPineappleCoconutLimeRice.jpg	Easy one pot recipe. Get ready for some perfectly cooked, jazzed-up rice with a tasty blend of sweet-tart.	20	0	30	4	{"side dish","rice side dish recipes","one-pot meal recipes"}	vegan	\N
104	Vietnamese Tofu Salad	VietnameseTofuSalad.jpg	This recipe combines spicy and sweet red chile sauce with cool cucumber, tasty lime and garlicky pan fried tofu.	10	0	40	6	{salad,"vegetable salad recipes"}	vegan	\N
105	Big Bad Bean Burrito	RicksBigBadBeanBurrito.jpg	This is a full meal in wrap.	5	0	15	1	{"wraps and roll-ups","wraps and rolls",vegetarian}	vegan	\N
106	Saigon Noodle Salad	SaigonNoodleSalad.jpg	This Vietnamese-style noodle salad is bursting with flavor.	0	0	30	4	{salad,"seafood salad recipes","shrimp salad recipes"}	pescetarian	\N
107	Pork Chops and Sauerkraut	PorkChopsandSauerkraut.jpg	Pork chops and sauerkraut is a classic comfort food dish consisting of pork chops that are seared and then simmered alongside sauerkraut, a fermented cabbage dish, creating a hearty and savory combination of flavors, often enjoyed in German and Eastern European cuisines.	30	0	45	4	{"main dishes",pork,"pork chop recipes","pan fried"}	omnivore	\N
108	Tofu Tacos	TofuTacos.jpg	A great tofu taco recipe for a meatless meal.	10	0	35	8	{"main dishes","taco recipes","vegetarian taco recipes"}	vegetarian	\N
109	Arugula and Hummus Mini Pizzas	ArugulaandHummusMiniPizzas.jpg	A nice quick and fresh snack that is healthy and delicious! This can also be made on pita bread instead of naan.	0	0	10	1	{"appetizers and snacks"}	vegan	\N
110	Best Salmon Bake	BestSalmonBake.jpg	Cook salmon in the oven for a deliciously quick and simple dinner for any occasion. These salmon fillets are topped with chopped tomato and green onion, and baked in the oven to perfection.	20	0	35	2	{"main dishes","seafood main dishes",salmon,"baked salmon recipes"}	pescetarian	\N
111	Beef Nacho Casserole	BeefNachoCasserole.jpg	This nacho casserole is a simple meal to whip up in less than an hour. Layers of seasoned ground beef, corn, and tortilla chips are baked under a layer of Colby cheese.	25	0	40	6	{cuisine,"latin american",mexican}	omnivore	\N
112	Rice and Bean Bowl Dinner	RiceandBeanBowlDinner.jpg	This dinner bowl recipe comes together in mere minutes and appeals to vegans and omnivores alike.	5	0	25	4	{"main dishes",rice,dinner}	vegetarian	\N
113	Creamy Garlic Pasta	CreamyGarlicPasta.jpg	As far as creamy pasta recipes, this is the best we have ever had.	20	0	30	4	{"main dishes",pasta,spaghetti}	omnivore	\N
114	Scrambled Tofu	ScrambledTofu.jpg	This is a wonderful vegetarian dish with a great flavor.	15	0	25	4	{"everyday cooking",vegetarian}	vegetarian	\N
115	Chicken Tikka Masala	CurryStandChickenTikkaMasalaSauce.jpg	This tikka masala sauce is the kind of nuclear-orange tikka masala you crave when you stumble out of a pub at 2 a.m..	40	0	55	6	{asian,indian,"main dishes",chicken}	omnivore	\N
116	Spinach and Feta Pita Bake	SpinachandFetaPitaBake.jpg	This feta and spinach pita bake is tasty, full of flavor, and good for you. The crunchy crust is what you'll really like!	15	0	25	6	{cuisine,european,greek}	pescetarian	\N
117	Skillet Burrito Bowl	SkilletBurritoBowl.jpg	We really like taco and burrito bowls and wanted to make something that was quick and easy at home. We really like how this turned out! Spoon into bowls and top with sour cream, crushed tortilla chips, lettuce, etc.	5	0	15	4	{cuisine,"latin american",mexican}	omnivore	\N
118	Baked Italian Sub	BakedItalianSub.jpg	Forget about ordering Italian sub sandwiches from a restaurant, and start making them at home. They are so quick and easy to make and more budget-friendly. Buy good quality hoagie rolls and deli meats, and get ready for a delicious, homemade sandwich hot out of the oven.	5	0	15	2	{"main dishes","sandwich recipes"}	omnivore	\N
119	Tofu and Rice Stuffed Peppers	TofuandRiceStuffedPeppers.jpg	Italian style stuffed bell peppers for the vegetarian (can easily be prepared vegan). Even my meat-eating husband loved these.	10	0	35	4	{"appetizers and snacks",tapas}	vegetarian	\N
120	Vegan Japchae Korean Noodles	VeganJapchaeKoreanNoodles.jpg	This vegan japchae is a delicious Korean noodle dish typically served cold but also very good hot! Korean meets vegan in this quick and easy japchae recipe: a chewy and crunchy medley of glass noodles, spinach, mushrooms, green onions, and carrots.	12	0	27	4	{"pasta and noodles","noodle recipes"}	vegan	\N
121	Easy Vegan Sheet Pan Roasted Cauliflower, Tomatoes, and Garbanzo Beans	EasyVeganSheetPanRoastedCauliflowerTomatoesandGarbanzoBeans.jpg	This cauliflower and beans dish is a wonderful, quick-and-easy, and one-pan vegan dinner for two! Cauliflower, tomatoes, and garbanzo beans are seasoned with garlic, lime, and cilantro.	25	0	35	2	{"fruits and vegetables",vegetables,cauliflower,roasted}	vegan	\N
122	Salmon Couscous Salad	SalmonCouscousSalad.jpg	This salmon couscous salad recipe features salmon, couscous, and arugula salad layered in a bowl and drizzled with homemade pesto dressing for a unique presentation. This dish is a nod to a dish I tried at a local restaurant.	10	0	30	2	{"main dishes","seafood main dishes",salmon}	omnivore	\N
123	Vegetarian Chickpea Sandwich Filling	VegetarianChickpeaSandwichFilling.jpg	Spread this chickpea sandwich filling on crusty whole grain rolls or pita bread and serve with lettuce and tomato.	0	0	20	3	{"main dishes","sandwich recipes"}	vegetarian	\N
124	Vegan Green Bean, Tomato, and Basil Sheet Pan Dinner	VeganGreenBeanTomatoandBasilSheetPanDinner.jpg	Toss together this quick and easy vegan sheet pan dinner of roasted baby potatoes, green beans, chickpeas, and tomatoes seasoned with basil.	45	0	55	4	{"everyday cooking","sheet pan dinner recipes"}	vegan	\N
125	Tuna-Artichoke Salad	TunaArtichokeSalad.jpg	A delicious, healthy dish perfect for lunch or a light dinner.	0	0	10	4	{}	pescetarian	\N
126	Turkey Wraps	TurkeyWraps.jpg	These tasty turkey wraps are great for lunch or sliced into smaller pieces for little after-school snacks or party appetizers.	0	0	20	6	{"main dishes","sandwich recipes","wraps and roll-ups"}	omnivore	\N
127	Easy Authentic Mexican Rice	EasyAuthenticMexicanRice.jpg	This easy Mexican rice recipe is cooked with onion powder, garlic powder, and tomato sauce for a simple side dish. Add green bell pepper, red bell pepper, or fresh tomato to the rice before simmering for extra flavor and color, according to your family's taste. Use chicken stock in place of water for even more savory flavor.	25	0	25	8	{"latin american",mexican,"side dishes",rice}	vegan	\N
128	Chicken Enchiladas	ChickenEnchiladas.jpg	This chicken enchilada recipe is easy to make with tortillas, tender chicken, and a deliciously cheesy sauce for a family-pleasing Mexican meal.	35	0	50	8	{mexican,"main dishes","enchilada recipes",chicken}	omnivore	\N
129	Easy Shredded Chicken Taco Filling	SarahsEasyShreddedChickenTacoFilling.jpg	This shredded chicken taco recipe is quick to make. Serve the warm chicken filling in a taco shell, covered with lettuce, tomatoes, cheese, or other favorite toppings.	15	0	30	4	{"meat and poultry",chicken,"chicken breast","mexican-style chicken"}	omnivore	\N
130	Mexican Rice	MexicanRice.jpg	This Mexican rice recipe makes a wonderful restaurant-style side dish for any Mexican dinner.	25	0	30	4	{"latin american",mexican,"side dishes",rice}	omnivore	\N
131	Chicken Fajita Rice Casserole	ChickenFajitaRiceCasserole.jpg	This rice and chicken casserole is very easy to pull together and has a lot of flavor. Don't skip toasting the rice - it is an incredibly easy way to add just a hint of nuttiness and more depth of flavor. Top with shredded Cheddar cheese, sour cream, chopped tomatoes, or whatever topping you prefer.	0	0	65	8	{"main dishes","casserole recipes",chicken,rice}	omnivore	\N
132	Instant Pot Chicken Tortilla Soup	InstantPotChickenTortillaSoup.jpg	Our Instant Pot Chicken Tortilla Soup brings all the rich flavors of classic soup together in no time at all. We love this soup because it's so customizable. For example, we like topping it with tortilla strips, cilantro, avocado, or jalapeno, but feel free to use whatever you like.	20	0	30	4	{"everyday cooking"}	omnivore	\N
133	Lime Chicken Soft Tacos	LimeChickenSoftTacos.jpg	These chicken tacos seasoned with lime, oregano, and garlic are flavorful and delicious.	30	0	50	10	{mexican,"main dishes",tacos,chicken}	omnivore	\N
134	Chicken Tacos	ChickenTacos.jpg	These chicken tacos are perfect for those nights when you don't have a lot of time for dinner preparations. Feel free to add chili powder or paprika to the chicken.	15	0	30	4	{mexican,"main dishes",tacos,chicken}	omnivore	\N
135	Authentic Tacos al Pastor	AuthenticTacosalPastor.jpg	Tacos al pastor is a quintessential Mexican dish, with tender pork and pineapple marinated in a savory and aromatic chile sauce. Serve with warm corn tortillas, tomatillos salsa, and lemon or lime wedges.	30	0	300	10	{"latin american",mexican,"main dishes",tacos}	omnivore	\N
136	Lemon Chicken Piccata	LemonChickenPiccata.jpg	This delicious lemon chicken piccata dish is exquisite and easy to prepare. The light and luscious lemon sauce really pops without being too acidic; it is simply divine. Serve it with herb-roasted potatoes or lemon-rice pilaf.	30	0	50	4	{"main dishes",chicken,"chicken piccata recipes"}	omnivore	\N
137	Gnocchi with Pomodoro Sauce	GnocchiwithPomodoroSauce.jpg	Fluffy potato dumplings sauteed for a crispy exterior and tender interior with a simple tomato sauce. We used the oil from the marinated mozzarella ball container for the sauce with great success.	20	0	30	4	{"pasta and noodles","pasta by shape recipes","gnocchi recipes"}	vegetarian	\N
138	Instant Pot Tuscan Bean and Sausage Soup	InstantPotTuscanBeanandSausageSoup.jpg	Our recipe for Instant Pot Tuscan Bean and Sausage Soup is reminiscent of Italian wedding soup but is even easier since you're adding chicken sausage instead of making meatballs. Cannellini beans and kale give it extra goodness while Swanson Chicken Broth, garlic, onion, and Italian seasoning give this soup fabulous flavor.	25	0	45	6	{"everyday cooking"}	omnivore	\N
139	Beef Ragu	BeefRagu.jpg	Beef ragu traditional Italian dish, is a slow-simmered sauce made with beef, tomatoes, pasta, etc. Many newer ragu recipes use sambal oelek or anchovy paste to help build flavor, so we have used harissa, but feel free to replace with 1/2 teaspoon crushed red pepper or 1 teaspoon fennel seeds or omit. If you like you can add rosemary sprigs to the sauce as it simmers.	180	0	200	4	{"sauces and condiments",sauces,"pasta sauces","meat sauce"}	omnivore	\N
140	Crispy Orange Beef	CrispyOrangeBeef.jpg	A delicious orange beef recipe that is crispy and sweet yet mildly spiced. This beef stir-fry recipe is great served with steamed rice and broccoli.	50	0	100	6	{cuisine,asian,chinese}	omnivore	\N
141	Chinese Chicken Fried Rice	ChineseChickenFriedRice.jpg	This chicken fried rice recipe tastes just like what they serve in restaurants. A stir-fry with chicken, rice, soy sauce, and veggies like peas, carrots, celery, and bell peppers.	15	0	40	7	{"main dishes",rice,"fried rice recipes"}	omnivore	\N
142	Easy Chinese Fried Noodles	EasyChineseFriedNoodles.jpg	These fried noodles are a quick, easy, and delicious recipe that all will enjoy. Try adding cooked, cubed pork or chicken. Bean sprouts, water chestnuts, sliced almonds, or any of your favorite vegetables can also be added to this versatile recipe.	25	0	40	6	{"side dish",vegetables,"green peas"}	vegetarian	\N
143	Aloo Matar	AlooMatar.jpg	Here is a delightful dish: potatoes and peas in a tomato puree sauce. It's pretty easy to rustle up, and adds zing to any meal. The best thing is that all of the ingredients are readily available. Serve hot with naan, puris, rotis, or plain rice.	30	0	45	4	{cuisine,asian,indian}	vegan	\N
144	Vegan Sweet Potato Chickpea Curry	VeganSweetPotatoChickpeaCurry.jpg	This sweet potato chickpea curry is a yummy vegan dish. Serve with basmati rice and naan bread.	20	0	30	6	{cuisine,asian,indian}	vegan	\N
145	Chana Masala	ChanaMasalaSavoryIndianChickPeas.jpg	Savory Indian Chick Peas Recipe. Give this chana masala dish a try and don't look back. Indian food is not just curried sauces. This spin on an Indian chickpea curry features a healthy mixture of chickpeas, tomatoes, onion, and spices. Both carnivores and vegetarians will enjoy this meal. Leave out the green chile if the kiddies will be eating. Serve over basmati or jasmine rice and enjoy. Namaste y'all!	15	0	30	2	{cuisine,asian,indian}	vegan	\N
146	Butter Chicken (Murgh Makhani)	ButterChickenMurghMakhani.jpg	This butter chicken recipe is so delicious, flavorful, and easy to prepare at home. Serve over warm basmati rice for a delicious Indian meal.	40	0	60	4	{cuisine,asian,indian}	omnivore	\N
147	Slow Cooker Butter Chicken	SlowCookerButterChicken.jpg	Butter chicken is one of my favorite Indian dishes. It's easy to prep for the slow cooker in the morning to come home to the wonderful aroma of warm Indian spices... I love it! Serve with basmati rice and warm naan bread.	255	0	270	6	{cuisine,asian,indian}	omnivore	\N
148	Spaetzle	SpaetzleakaSpaetzle.jpg	Apparently spaetzle translates to little swallows in German, which makes a lot of sense when you consider their shape. These micro-dumplings cook in a just a few minutes, and are great plain with browned butter or topped with slowly braised meat.	10	0	20	2	{"side dish"}	omnivore	\N
149	Hot German Potato Salad Casserole	HotGermanPotatoSaladCasserole.jpg	A hot potato salad with bacon, cheese and a creamy/vinegar sauce makes this a wonderful dish to serve with bratwurst on a cold fall day in Deutschland or wherever you might be. I usually double the bacon and sauce to make this extra flavorful.	60	0	80	8	{salad,"potato salad recipes","german potato salad recipes"}	omnivore	\N
150	Jagerschnitzel	Jagerschnitzel.jpg	It is best served with French fries to clean up the remaining gravy and a nice garden salad.	25	0	40	4	{cuisine,european,german}	omnivore	\N
151	Crispy Roasted Chicken	CrispyRoastedChicken.jpg	This roasted half chicken is inspired by Brathuehnchen, commonly served in Bavarian biergartens, small shops, and food carts. You can serve this oven-roasted chicken with many side dishes, but favorites include fried potatoes or spaetzle and a nice garden salad. Weiss beer doesn't hurt at all!	60	0	90	6	{cuisine,european,german}	omnivore	\N
152	Traditional Sauerbraten	TraditionalSauerbraten.jpg	This is an old traditional German recipe. Serve with potato dumplings.	240	0	255	6	{cuisine,european,german}	omnivore	\N
153	Herbed Greek Roasted Potatoes with Feta Cheese	HerbedGreekRoastedPotatoeswithFetaCheese.jpg	These feta potatoes with lemon, garlic, and herbs have a nice Mediterranean flavor. They are so delicious out of the oven, topped with plenty of cheese.	80	0	100	10	{"side dish",vegetables,"roasted vegetable recipes"}	vegetarian	\N
154	Briam (Greek Baked Zucchini and Potatoes)	BriamGreekBakedZucchiniandPotatoes.jpg	Briam is a traditional Greek roasted vegetable dish with potatoes, zucchini, tomatoes, and red onions with lots of olive oil. It is a typical example of Greek cuisine where a few simple ingredients are turned into an utterly delicious dish with little effort. With olive oil as the only source of fat, it is a quintessential example of the Mediterranean diet and it's vegan to boot. Briam can be served as a main course with a hearty chunk of feta on the side.	90	0	120	4	{cuisine,european,greek}	vegan	\N
155	Greek-Style Garlic Chicken Breasts	GreekStyleGarlicChickenBreasts.jpg	This recipe for Greek-style chicken was passed down through my family for years. If you're looking for great-tasting, tender chicken breasts, you'll want to try this!	10	0	500	4	{cuisine,european,greek}	omnivore	\N
156	Greek Orzo Salad	GreekOrzoSalad.jpg	This orzo salad is a delicious, colorful salad with artichoke hearts and feta.	10	0	85	6	{salad,"pasta salad","vegetarian pasta salad recipes"}	vegetarian	\N
157	Greek Lentil Soup (Fakes)	GreekLentilSoupFakes.jpg	Greek lentil soup or fakes (pronounced "fah-kehs") is a staple in the Greek kitchen and an incredibly filling meal. It is traditionally served with a drizzle of olive oil and lots of vinegar. Though the vinegar is, of course, optional, try it! It lifts the lentils and adds another dimension of flavor.	60	0	70	4	{"soups, stews and chili recipes","soup recipes","beans and peas","lentil soup recipes"}	vegan	\N
158	Chicken Souvlaki with Tzatziki Sauce	ChickenSouvlakiwithTzatzikiSauce.jpg	Chicken souvlaki skewers are marinated Greek kabobs. Fantastic flavor for chicken. The marinade can also be used for pork.	15	0	150	6	{"bbq & grilling",chicken,"skewers and kabobs"}	omnivore	\N
159	Greek Pasta Salad	GreekPastaSalad.jpg	This Greek pasta salad recipe makes a great summer salad.	10	0	30	8	{salad,"pasta salad","tomato pasta salad recipes"}	vegetarian	\N
160	Greek-Style Lemon Roasted Potatoes	GreekStyleLemonRoastedPotatoes.jpg	These Greek potatoes wedges with lemon and oregano are roasted until tender. They're a great complement to souvlaki. All you need is a great Greek salad for a full meal!	60	0	75	6	{"side dish",potato,"roasted potato recipes"}	omnivore	\N
161	Grilled Chicken Adobo	GrilledChickenAdobo.jpg	This is a very tasty and easy-to-make Filipino chicken dish made with soy sauce, garlic, and vinegar. Serve over rice with just a little of the sauce (not too much).	35	0	50	8	{cuisine,asian,filipino}	omnivore	\N
162	Garlic Rice	GarlicRice.jpg	This fried garlic rice is a simple Philippine dish bursting with flavor and aroma.	5	0	10	4	{"side dish","rice side dish recipes"}	omnivore	\N
163	Empanada Dough	EmpanadaDough.jpg	This basic empanada dough can be filled with any type of filling, then fried or baked.	0	0	20	24	{"appetizers and snacks",pastries,empanadas}	pescetarian	\N
187	Tomato Bredie	TomatoBredie.jpg	Tomato bredie is a popular South African meal and good winter fare. Bredie is an old Cape name for a dish of meat and vegetables stewed together so that the flavors intermingle. The gravy is rich, thick, and full-bodied and obtained by using meat with a fair amount of bone and fat, rolling it in flour, and browning it before the vegetables are added. The flavor improves if left a day or two before eating. Nice with brown rice.	135	0	165	6	{cuisine,african}	omnivore	\N
164	Pork Sinigang	PorkSinigang.jpg	Sinigang is a Filipino soup cooked with pork. Serve with rice and for additional sauce, use soy or fish sauce. If you want to, you can add what Filipinos call gabi gabi, which is a small taro root. When peeled they look like potatoes. You can add five to six of them when you add the water and make sure they are cooked through. Take them out when they are cooked because they can get too soft.	60	0	75	4	{"soups, stews and chili recipes","soup recipes","pork soup recipes"}	omnivore	\N
165	Chicken Yakisoba	ChickenYakisoba.jpg	This traditional Japanese yakisoba noodle dish includes cabbage and chicken in a spicy sauce.	15	0	35	4	{cuisine,asian,japanese}	omnivore	\N
166	Japanese-Style Crispy Fried Pork Bowl (Tonkatsu Donburi)	JapaneseStyleCrispyFriedPorkBowlTonkatsuDonburi.jpg	Recipe for a popular Japanese rice bowl, also known as Katsudon. Garnish with sliced green onions.	7	0	32	2	{cuisine,asian,japanese}	omnivore	\N
167	Teriyaki Rib Eye Steaks	TeriyakiRibEyeSteaks.jpg	Great Japanese teriyaki-style marinated ribeye steak with a from-scratch teriyaki sauce.	15	0	145	2	{cuisine,asian,japanese}	omnivore	\N
168	Japanese Beef Stir-Fry	JapaneseBeefStirFry.jpg	Tender beef strips are quickly stir-fried with crisp and colorful vegetables to make this delicious restaurant-style dinner in your own kitchen.	15	0	45	8	{dinner}	omnivore	\N
169	Japanese Ginger Pork	JapaneseGingerPork.jpg	This recipe uses thinly sliced pork for a quick Japanese-style sautee. It is excellent with rice and steamed veggies on the side. You can also double the recipe and use whole pork chops or chicken breasts for grilling.	10	0	80	4	{cuisine,asian,japanese}	omnivore	\N
170	Japanese Pan Noodles	JapanesePanNoodles.jpg	This is a great recipe to make any time. Lots of flavor. Top with cilantro and bean sprouts.	25	0	50	4	{cuisine,asian,japanese}	vegan	\N
171	Kimchi Udon Noodle Stir-Fry	KimchiUdonNoodleStirFry.jpg	This is a sweet, nutty, and spicy kimchi udon stir-fry your whole family will love - and it takes mere minutes to make from start to finish! Top with cooked eggs and shredded nori if you like.	15	0	30	4	{cuisine,asian}	omnivore	\N
172	Peanut Butter Noodles	PeanutButterNoodles.jpg	These peanut butter noodles are kid-friendly and full of bright flavors. You can also make this recipe with spaghetti pasta.	10	0	25	4	{"side dish"}	omnivore	\N
173	Onigiri (Japanese Rice Balls)	OnigiriJapaneseRiceBalls.jpg	This easy onigiri recipe is also fun to make! These rice balls are a staple of Japanese lunchboxes (bento). You can put almost anything in these rice balls; try substituting grilled salmon, pickled plums, beef, pork, turkey, or tuna with mayonnaise.	20	0	60	4	{"side dish","rice side dish recipes"}	pescetarian	\N
174	Vietnamese Caramel Chicken	VietnameseCaramelChicken.jpg	Asian-style chicken with steamed rice.	15	0	35	6	{cuisine,asian,vietnamese}	omnivore	\N
175	Vietnamese Aromatic Lamb Chops	VietnameseAromaticLambChops.jpg	These are the most delicious lamb chops you'll ever taste! Plan ahead so you can marinate the lamb overnight.	20	0	510	5	{cuisine,asian,vietnamese}	omnivore	\N
176	Vietnamese Fresh Spring Rolls	VietnameseFreshSpringRolls.jpg	These Vietnamese spring rolls are a refreshing change from the usual fried variety. They are a great summertime appetizer and delicious dipped in one or both of the sauces.	5	0	50	8	{"appetizers and snacks","wraps and rolls"}	pescetarian	\N
177	Thai Pork with Peanut Sauce	ThaiPorkwithPeanutSauce.jpg	This recipe for Thai pork chops is a very simple and quick dish that combines the standard pork chop with the wonderful flavor of coconut and peanuts.	10	0	20	4	{cuisine,asian,thai}	omnivore	\N
178	Authentic Thai Green Curry	AuthenticThaiGreenCurry.jpg	This is a classic Thai green curry (kaeng kiau wan). You can substitute chicken or tofu for the pork, but make sure you serve it with lots of jasmine rice.	30	0	40	4	{cuisine,asian,thai}	omnivore	\N
179	Curried Coconut Chicken	CurriedCoconutChicken.jpg	This chicken coconut curry recipe features chicken simmered in coconut milk and tomatoes for a mouthwatering hint of the tropics! Goes well with rice and vegetables.	40	0	60	6	{cuisine,asian,thai}	omnivore	\N
180	Thai Green Curry Chicken	ThaiGreenCurryChicken.jpg	This Thai green curry recipe never fails to please! It is quick and easy to make and the chicken stays moist and tender. Serve over jasmine rice for a satisfying meal.	30	0	50	4	{cuisine,asian,thai}	omnivore	\N
181	Peanut Butter Noodles	PeanutButterNoodles.jpg	These peanut butter noodles are kid-friendly and full of bright flavors. You can also make this recipe with spaghetti pasta.	10	0	25	4	{"side dish"}	omnivore	\N
182	Pad Thai	PadThai.jpg	This is a traditional pad thai recipe used by a friend's mother. You can use chicken, pork, beef, tofu, or a combination. You may want to start with less pepper and work your way up.	15	0	45	6	{cuisine,asian,thai}	omnivore	\N
183	Kroppkakor - Swedish Potato Dumplings	KroppkakorSwedishPotatoDumplings.jpg	Kroppkakor are a big favorite of my Swedish-raised husband. Whenever I make this potato dumpling recipe, it reminds him of his grandma's kitchen every time. Serve hot with butter. These are great as leftovers, sliced and fried, served with a fried egg.	35	0	95	12	{"side dish",potato}	omnivore	\N
184	Hasselback Potatoes	HasselbackPotatoes.jpg	This Hasselback potatoes recipe makes seasoned potatoes crisp on the outside and tender on the inside. This Swedish dish takes its name from Hasselbacken, the Stockholm restaurant where it was first served.	55	0	75	4	{"side dish",potato,"roasted potato recipes"}	pescetarian	\N
185	South African Lamb Sosaties (Kebabs)	SouthAfricanLambSosatiesKebabs.jpg	This is a traditional South African braai (bbq) dish that can also be prepared using venison or beef. This dish is best if meat and vegetables are allowed to marinate overnight before grilling.	30	0	540	8	{cuisine,african}	omnivore	\N
186	Chakalaka	Chakalaka.jpg	This is a staple food in South Africa as well as other parts.	20	0	35	4	{cuisine,african,"south african"}	vegan	\N
188	Best Bobotie	BestBobotie.jpg	Bobotie is a South African dish similar to meatloaf but so much better. Ground beef is seasoned with slightly sweet curry, topped with a milk and egg custard, and baked until golden brown. It's delicious!	95	0	110	8	{cuisine,african}	omnivore	\N
189	Lentil Stew	LentilStew.jpg	It is great traditional spanish recipe.	35	0	50	12	{"soups, stews and chili recipes",stews}	omnivore	\N
190	Yellow Rice with Vegetables	YellowRicewithVegetables.jpg	Spanish yellow rice with vegetables, cooked in broth and seasoned with savory, garlicky seasonings.	35	0	50	6	{"side dish","rice side dish recipes"}	vegan	\N
191	Empanadas	Empanadas.jpg	Better make plenty - these disappear fast. The unbaked dough may be frozen. The baked cookies may also be frozen.	0	0	0	12	{bread}	pescetarian	\N
192	Slow Cooker Spanish Beef Stew	SlowCookerSpanishBeefStew.jpg	Preferably the stew is served with white rice, it all depends on your taste. You can season the beef with a packet of Sazon instead of salt and pepper, for even more Spanish style.	250	0	260	6	{"soups, stews and chili recipes","soup recipes","beef soup recipes"}	omnivore	\N
193	Tortilla Espaneola (Spanish Tortilla)	TortillaEspanolaSpanishTortilla.jpg	Tortilla espaneola is a potato and onion omelet. It's a classic tapas dish, prepared all over Spain. This version also includes roasted red peppers and Spanish Serrano ham. Unlike most omelets, a Spanish tortilla is served at room temperature.	45	0	140	6	{"appetizers and snacks",tapas}	omnivore	\N
194	Authentic Paella Valenciana	AuthenticPaellaValenciana.jpg	A traditional paella Valenciana. This recipe is for those who would like to try a taste of Spain. First and foremost you will need a special paella pan called a paellera or just a paella.	90	0	120	8	{cuisine,european,spanish}	omnivore	\N
195	Chicken Sofrito	ChickenSofrito.jpg	Yummy Portuguese chicken with veggies. Use spices according to your preferences.	150	0	180	8	{"soups, stews and chili recipes",stews,chicken}	omnivore	\N
196	Portuguese Braised Chicken	PortugueseBraisedChicken.jpg	A delicious chicken dish with wonderful Portuguese flavors. A terrific comfort food yet light and refreshing. Serve with parsley potatoes.	60	0	75	10	{cuisine,european,portuguese}	omnivore	\N
197	Portuguese Chourico, Beans, and Rice	PortugueseChouricoBeansandRice.jpg	It's such a warm and satisfying dish.	30	0	40	2	{cuisine,european,portuguese}	omnivore	\N
198	Kalam Polo (Persian Cabbage and Rice)	KalamPoloPersianCabbageandRice.jpg	This kalam polo is a traditional Persian dish with an aromatic flavor. You can omit the ground beef if you want to make it vegetarian. Serve it with Shirazi salad, it will taste wonderful.	70	0	115	4	{cuisine,asian}	omnivore	\N
199	Lubia Polo (Green Bean Rice)	LubiaPoloGreenBeanRice.jpg	Lubia polo is a one-pot Persian dish with rice, ground beef, green beans, tomato sauce, and curry spices. You will need a nonstick pan so you can invert the dish onto a serving platter and preserve its crisp rice crust.	70	0	90	6	{cuisine,"middle eastern",persian}	omnivore	\N
200	Kabob Koobideh (Persian Ground Meat Kabobs)	KabobKoobidehPersianGroundMeatKabobs.jpg	Kabob koobideh is made with ground lamb or beef or a combination of the two. The kabobs are usually grilled over hot coals or any BBQ.	25	0	85	8	{cuisine,"middle eastern",persian}	omnivore	\N
201	Persian Rice	PersianRice.jpg	This Persian rice takes the grand prize.	55	0	70	8	{"side dish","rice side dish recipes",pilaf}	vegetarian	\N
202	Ghormeh Sabzi (Persian Herb Stew)	GhormehSabziPersianHerbStew.jpg	Ghormeh sabzi is deliciously savory and loaded with the flavors of several different green herbs. It's traditionally served atop white rice (polow). You can also serve it with lavash bread.	145	0	190	6	{"soups, stews and chili recipes",stews,beef}	omnivore	\N
203	Savory Saffron Chicken Polow	SavorySaffronChickenPolow.jpg	This recipe has a twist on a traditional Persian chicken and rice dish. It can be served as main meal accompanied with a salad.	75	0	105	6	{cuisine,"middle eastern",persian}	omnivore	\N
204	Shadi's One-Pot Turmeric Chicken and Rice	ShadisOnePotTurmericChickenandRice.jpg	There are so many healing dishes in Persian cooking! It doesn't have a particular name in Persian. We just call it "berenj va morgh ba zarchoobeh," which means rice and chicken with turmeric. The chicken is cooked first in some water with spices, onion, and garlic. Then we remove the chicken and cook the rice in that broth. Later we shred the chicken and add it back to the pot.	50	0	65	6	{"everyday cooking","one-pot meal recipes"}	omnivore	\N
205	Adas Polow (Persian Rice and Lentils)	AdasPolowPersianRiceandLentils.jpg	It is an Iranian food.	75	0	275	8	{"main dishes",rice,"beans and rice recipes"}	vegan	\N
206	Iskender Kebab	IskenderKebab.jpg	This dish was named after Alexander the Great, whom the Persians called "Iskender." Apparently, it was his favorite food.	15	0	30	4	{cuisine,"middle eastern",persian}	omnivore	\N
207	Puerto Rican Rice and Beans	PuertoRicanRiceandBeans.jpg	This is a very tasty Puerto Rican rice and black beans recipe. It's a very forgiving recipe, you can add leftover chicken to make it a meal. Great with hot sauce.	45	0	60	10	{"main dishes",rice,"beans and rice recipes"}	omnivore	\N
208	Puerto Rican Rice and Beans (Arroz con Gandules)	PuertoRicanRiceandBeansArrozconGandules.jpg	Afraid of rice so you use Minute rice? No more boxed rice!	40	0	60	8	{"side dish","rice side dish recipes"}	omnivore	\N
209	Habichuelas Guisadas	HabichuelasGuisadas.jpg	A perfect side dish for Carne Guisada. These are the Puerto Rican version of beans.	20	0	20	4	{"side dish","beans and peas"}	omnivore	\N
210	Chap Chee Noodles	ChapCheeNoodles.jpg	A Korean-style noodle dish made with meat and vegetables.	20	0	55	4	{cuisine,asian,korean}	omnivore	\N
211	Easy Bulgogi (Korean BBQ Beef)	EasyBulgogiKoreanBBQBeef.jpg	Bulgogi, or Korean barbecued beef, is made with marinated sliced beef. Most recipes call for crushed pear to tenderize the meat. This recipe uses very thinly-sliced sirloin steak, so tenderization isn't necessary. It's delicious served with rice, lettuce leaves, and chile paste or kimchi.	5	0	75	6	{cuisine,asian,korean}	omnivore	\N
212	Yummy Korean Glass Noodles (Japchae)	YummyKoreanGlassNoodlesJapchae.jpg	This may not be the traditional japchae that includes meats and vegetables, but it's sweet and delightful. Serve as an appetizer or pair with chicken or meat.	5	0	25	4	{"everyday cooking",vegan,"side dishes"}	vegan	\N
213	Rich and Creamy Potatoes au Gratin	RichandCreamyPotatoesauGratin.jpg	This recipe for au gratin potatoes with Gruyere makes the easiest, cheesiest, most delicious potatoes. Yum!	70	0	90	8	{"side dish",potato,"potatoes au gratin recipes"}	pescetarian	\N
214	Lyonnaise Potatoes	LyonnaisePotatoes.jpg	These Lyonnaise potatoes are a classic dish made with sliced potatoes and onions.	25	0	55	6	{"side dish",potato}	vegetarian	\N
215	Ratatouille	DisneysRatatouille.jpg	This ratatouille recipe makes the beautiful dish. Long and narrow vegetables work best. Serve with crusty bread or over a bed of brown rice, couscous, or pasta.	45	0	90	4	{"side dish",vegetables,eggplant}	vegetarian	\N
216	Chef John's Picadillo	ChefJohnsPicadillo.jpg	A Cuban creation, picadillo is one of the world's great ground meat dishes. Serve it with rice.	45	0	55	4	{cuisine,"latin american",caribbean}	omnivore	\N
217	Cuban Shredded Pork	CubanShreddedPork.jpg	This is a popular Spanish shredded pork dish known as Lechon Asado. My version is a shortcut. The pork is simmered in a broth until tender, then shredded. It's traditionally served with black beans and rice.	75	0	135	5	{cuisine,"latin american",caribbean}	omnivore	\N
218	Slow Cooker Mojo Pork	SlowCookerMojoPork.jpg	A Cuban-style pork roast marinated and cooked low and slow. Normally bitter oranges are used but they can be hard to find. Serve with black beans and white rice for a complete meal. Plan ahead because this roast is marinated from 6 hours to overnight.	425	0	805	16	{cuisine,"latin american",caribbean}	omnivore	\N
219	Cuban Ropa Vieja	CubanRopaVieja.jpg	This ropa vieja is great served on tortillas or over rice. Add sour cream, cheese, and fresh cilantro on the side.	240	0	255	6	{cuisine,"latin american",caribbean}	omnivore	\N
220	Classic Cuban-Style Picadillo	ClassicCubanStylePicadillo.jpg	This is a classic Cuban picadillo recipe for ground beef that is typically eaten over white rice. It can also be used as a filling for tacos or empanadas. It's delicious with fried ripe plantains.	20	0	30	4	{"meat and poultry",beef,"ground beef recipes"}	omnivore	\N
221	Colombian Lentils	ColombianLentils.jpg	This is a great starter. You can make it with a bit more water and you get somewhat of a soup, or let it cook and eat it with a plate of rice.	45	0	55	3	{"side dish","beans and peas"}	vegan	\N
222	Arepas de Queso	ArepasdeQueso.jpg	These arepas have a crispy crust while the cheese inside stays melty and gives you that cheese-pull that everyone knows and loves.	30	0	55	14	{"appetizers and snacks",cheese}	vegetarian	\N
223	Creamy Cajun Chicken Pasta	CreamyCajunChickenPasta.jpg	Try this when you are feeling daring and want to mix things up a bit! A Southern inspired recipe that is sure to add a little fun to your dinner table. Try serving it with corn bread.	15	0	30	2	{"meat and poultry",chicken,"chicken breast","chicken pasta"}	omnivore	\N
224	Cajun Chicken Pasta	CajunChickenPasta.jpg	Cajun chicken pasta is easy and delicious. Cajun cooking combines French, Southern, and other influences. It's robust, country-style cookery, just like this dish.	20	0	40	2	{"main dishes",pasta,chicken}	omnivore	\N
225	Sheet Pan Cajun Butter Shrimp	SheetPanCajunButterShrimp.jpg	Homemade Cajun seasoning and butter are the main stars in this simple dish.	8	0	23	6	{seafood,shellfish,shrimp}	omnivore	\N
226	Easy Brazilian Spiced Salmon	EasyBrazilianSpicedSalmon.jpg	A South American twist on North American fish, with Brazilian-inspired spices.	15	0	20	4	{cuisine,"latin american","south american",brazilian}	pescetarian	\N
227	Brazilian Black Bean Stew	BrazilianBlackBeanStew.jpg	This easy yet wonderful stew can be made any time of year.	30	0	45	6	{"soups, stews and chili recipes",stews}	omnivore	\N
228	Chimichurri Roasted Potatoes	ChimichurriRoastedPotatoes.jpg	These chimichurri potatoes are a great side dish all year round. They stand up to grilled and roasted meats very well.	35	0	55	4	{"side dish",potato,"roasted potato recipes"}	vegan	\N
229	Test Recipe	https://tastyplan-images.s3.eu-central-1.amazonaws.com/78052ff24fd6cc03f560.jpg	\N	\N	\N	\N	1	{"Main dishes",Asian}	vegetarian	testUser1@test.de
\.


--
-- Data for Name: Step; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Step" (id, description, "stepCount", "recipeId") FROM stdin;
1	Place chicken breasts in a resealable plastic bag and pound to an even thickness. If breasts are very large, cut them in half. Season lightly with salt and pepper.	1	1
2	Melt 1/3 of the butter in a large nonstick skillet over medium heat and cook 1/2 of the chicken breasts until they are no longer pink in the center and the juices run clear, 5 to 10 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C). Remove from skillet and set aside. Melt another 1/3 of butter and repeat with the remaining chicken breasts. Set aside.	2	1
3	Melt remaining 1/3 of butter in the same skillet and add minced garlic, Italian seasoning, and red pepper flakes. Cook, stirring constantly, for 1 minute. Pour in wine and bring to a boil. Reduce heat and simmer for 2 minutes. Pour in chicken broth, return to a boil, reduce heat, and simmer for 5 minutes. Stir in cream and dried tomatoes. Simmer for 5 minutes.	3	1
4	Stir in basil and return chicken to the skillet. Cook until chicken is thoroughly heated and sauce has thickened, about 5 minutes.	4	1
5	Add vegetable broth, 3/4 of salsa, rice, and taco seasoning to a 7-quart multi-functional pressure cooker (such as Instant Pot). Stir to combine.	1	2
6	Cut the corn into 5 pieces. Nestle each piece into the rice mixture, with some space between each. Close and lock the lid. Cook on Rice function for 22 minutes.	2	2
7	Allow pressure to release naturally for 5 minutes. Manually release any remaining pressure, 5 to 10 minutes more. Fluff with a rice paddle. Rinse all beans and add to pot.	3	2
8	Divide lettuce between serving bowls. Top with equal amounts of rice. Add equal amounts of avocado, vegan cheese, and cilantro. Serve with remaining salsa and lime wedges.	4	2
9	The strips of chicken and vegetables should be no longer than about 6 inches to leave an inch margin open on the sides of the wrappers for tucking. Soak a rice paper wrapper in cold water just until it becomes flexible, 30 seconds or less. Place on a slightly damp towel. Place some baby greens near the bottom of the round. Top with strips of chicken and pepper, leaving about a 1-inch margin on the sides. Roll tightly just until the bottom edge meets the center of the paper and sticks there. Then continue to add more chicken strips and vegetable strips. Finish with torn pieces of herbs. Complete the roll, pressing the ingredients to keep roll tight and tucking in the sides.	1	3
10	Transfer completed rolls to a plate lined with damp paper towels. Cover each roll with damp papers towels as you work to prevent them from drying out. Don't let the rolls touch each other or they will stick together.	2	3
11	For the peanut dip combine peanut butter and soy sauce in a small bowl. According to the consistency of the dip add water and combine.	3	3
12	Whisk olive oil, garlic, lemon juice, parsley, basil, salt, and pepper together in a medium bowl.	1	4
13	Arrange salmon fillets in a small glass or ceramic baking dish; pour marinade over salmon. Cover and marinate in the refrigerator for about 1 hour, turning occasionally.	2	4
14	Preheat the oven to 375 degrees F (190 degrees C).	3	4
15	Transfer salmon fillets onto a large piece of aluminum foil. Spoon marinade on top and fold up the foil to seal. Place sealed foil packs on a baking sheet.	4	4
16	Bake in preheated oven until fish flakes easily with a fork, about 35 to 45 minutes. Serve hot and enjoy.	5	4
17	Rinse quinoa thoroughly in a mesh strainer. Add quinoa and water to a multi-functional pressure cooker (such as an Instant Pot). Stir in vegetable bouillon. Close and lock the lid. Select high pressure; set timer for 10 minutes. Allow 10 to 15 minutes for pressure to build.	1	5
18	Preheat the oven to 375 degrees F (190 degrees C). Line a baking sheet with parchment paper.	2	5
19	Release pressure carefully using the quick-release method, about 5 minutes. Unlock and remove the lid.	3	5
20	Transfer cooked quinoa to a large bowl. Add salsa, nutritional yeast, cumin, chili powder, garlic powder, salt, and pepper. Toss to combine. Spread mixture on the prepared baking sheet.	4	5
21	Bake in the preheated oven for 15 minutes; stir. Continue baking until quinoa is dry and crisp, 5 to 15 minutes more.	5	5
22	Chop all vegetables and tofu to 2-inch length and cook rice noodles according to instructions on pack. Fry the tofu in a pan with oil on high heat for 5 minutes.	1	6
23	Working one at a time, soak a sheet of rice paper in a shallow dish of warm water until soft, about 10 seconds.	2	6
24	Lay softened sheet gently on a flat surface, then mount vegetables, noodles and avocado or tofu in the center of sheet.	3	6
25	Gently fold bottom and top of rice paper to cover filling and then roll up like a burrito. Repeat with remaining rice paper and fillings.	4	6
26	To serve, mix peanut butter, soy sauce, lime juice and minced garlic in a small bowl and serve with spring rolls.	5	6
27	Beat eggs in a bowl, and stir in baby spinach and Parmesan cheese. Season with onion powder, nutmeg, salt, and pepper.	1	7
28	Spray a small skillet with cooking spray and place over medium heat. Once warm, add in the egg mixture and cook until partially set, about 3 minutes. Flip with a spatula, and continue cooking, 2 to 3 minutes.	2	7
29	Reduce heat to low and continue cooking, 2 to 3 minutes, or until omelet reaches desired doneness.	3	7
30	Cook bacon in a large skillet over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain on paper towels; reserve most of the bacon fat in the skillet. Crumble bacon and set aside.	1	8
31	Reduce heat to medium. Cook and stir onion in reserved bacon fat until slightly softened, about 5 minutes. Add potatoes; toss to coat evenly in bacon fat. Pour in water and cover the skillet. Cook, stirring occasionally, until potatoes are tender, about 20 minutes. Mix in green onions, garlic, and paprika. Season with kosher salt and pepper.	2	8
32	Make 4 wells in potato mixture using a wooden spoon, revealing the bottom of the skillet. Crack an egg into each well; season with salt and pepper. Sprinkle Cheddar cheese and bacon over the entire skillet. Cover and cook until egg whites are set and yolks are still runny, about 5 minutes.	3	8
33	If potatoes start to brown too quickly, add more water.	4	8
34	Combine ground sausage, onions, and garlic in a large pot or skillet with tall sides. Cook over medium heat until sausage is cooked through, 5 to 8 minutes. Drain and discard grease.	1	9
35	Stir pasta sauce, water, and Italian seasoning into the pot; bring to a boil. Stir in spaghetti noodles, return to a boil, and cook, stirring occasionally, until noodles are cooked through and sauce has thickened, 20 minutes.	2	9
36	Serve topped with grated Parmesan cheese.	3	9
37	Bring rice and water to a boil in a saucepan over high heat. Reduce heat to medium-low, cover, and simmer until the rice is tender, and the liquid has been absorbed, 20 to 25 minutes. Set the cooked rice aside.	1	10
38	Meanwhile, preheat the oven to 375 degrees F (190 degrees C).	2	10
39	Make sauce: Cook half of the diced onions and olive oil over medium heat until onions begins to soften, about 5 minutes. Transfer the cooked onions to a large bowl and set aside.	3	10
40	Stir marinara sauce, beef broth, balsamic vinegar, and red pepper flakes into the skillet with cooked onions; cook and stir for 1 minute.	4	10
41	Pour sauce mixture into a 9x13-inch baking dish and set aside.	5	10
42	Combine ground beef, Italian sausage, diced tomatoes, Italian parsley, garlic, salt, black pepper, and cayenne pepper into the bowl with remaining onions; mix well. Stir in cooked rice and Parmigiano Reggiano. Stuff green bell peppers with beef and sausage mixture.	6	10
43	Place stuffed green bell pepper halves in the baking dish over tomato sauce; sprinkle with remaining Parmigiano-Reggiano, cover baking dish with aluminum foil, and bake in the preheated oven for 45 minutes.	7	10
44	Remove aluminum foil and bake until the meat is no longer pink, the green peppers are tender and the cheese is browned on top, an additional 20 to 25 minutes.	8	10
45	In a saucepan bring water to a boil. Add quinoa and a pinch of salt. Reduce heat to low, cover and simmer for 15 minutes. Allow to cool to room temperature; fluff with a fork.	1	11
46	Meanwhile, in a large bowl, combine olive oil, sea salt, lemon juice, tomatoes, cucumber, green onions, carrots and parsley. Stir in cooled quinoa.	2	11
47	Preheat the oven to 350 degrees F (175 degrees C).	1	12
48	Coat the bottom of a 9x13-inch casserole dish with olive oil, and sprinkle with garlic and red pepper flakes.	2	12
49	Arrange chicken breasts on the bottom of the dish.	3	12
50	Pour marinara sauce over chicken. Sprinkle basil over marinara sauce, and top with half of the mozzarella cheese, followed by half of the Parmesan cheese, and croutons.	4	12
51	Top with remaining mozzarella cheese and remaining Parmesan cheese.	5	12
52	Bake in the preheated oven until cheese and croutons are golden brown and the chicken is no longer pink inside, about 35 minutes to an hour, depending on the shape and thickness of your chicken breasts. An instant-read thermometer inserted into the thickest part of a chicken breast should read at least 160 degrees F (70 degrees C).	6	12
53	Prepare fries according to instructions on the bag.	1	13
54	Place veal cutlets between 2 sheets of heavy plastic on a solid, level surface. Firmly pound cutlets with the smooth side of a meat mallet to a 1/4-inch thickness. Dip cutlets in flour to coat; shake off excess.	2	13
55	Beat together eggs, Parmesan cheese, milk, parsley, salt, pepper, and nutmeg in a shallow bowl until combined. Place bread crumbs on a plate. Dip each cutlet into the egg mixture, then press in bread crumbs to coat.	3	13
56	Melt butter in a large skillet over medium heat. Cook breaded cutlets in butter until browned, about 3 minutes per side. Transfer cutlets to a serving platter and pour pan juices over them. Serve with fries and lemon slices.	4	13
57	Mix chicken, carrots, and water chestnuts in a large bowl.	1	14
58	Combine olive oil, vinegar, honey, soy sauce, garlic and yogurt together in a separate bowl until smooth; pour over the chicken mixture and toss to coat.	2	14
59	Spoon chicken mixture into lettuce leaves. Season with red pepper flakes.	3	14
60	Heat olive oil in a medium pot over medium-high heat. Cook and stir onion, poblano pepper, and garlic in hot oil for 2 to 3 minutes. Add rice and cook, stirring occasionally, until rice is completely coated in oil, about 2 minutes. Season with paprika, cumin, oregano, salt, and black pepper.	1	15
61	Stir in tomato paste and cook for 1 to 2 minutes. Add vegetable broth and pinto beans. Bring to a boil; reduce heat to low. Cover and simmer until rice is tender, 15 to 20 minutes.	2	15
62	Remove the pot from the heat, keep covered, and let stand for at least 5 minutes. Fluff with a fork.	3	15
63	Preheat the oven to 350 degrees F (175 degrees C). Grease a large sheet pan.	1	16
64	Cut butternut squash, onion, sweet potato, carrots, and potatoes into 1-inch pieces. Make sure to cut the vegetables the same size or they won't cook properly! Place chickpeas and the chopped vegetables on the prepared sheet pan. Drizzle with vegetable oil and toss to coat.	2	16
65	Combine salt, black pepper, onion powder, garlic powder, fennel seeds, ground , and rubbed sage in a bowl. Sprinkle over vegetables on the sheet pan and toss to coat.	3	16
66	Bake in the preheated oven for 25 minutes. Stir and bake until vegetables are soft and lightly browned and chickpeas are slightly crisp, 20 to 25 minutes more. Season with additional salt and black pepper to taste, and top with chopped green onion before serving.	4	16
67	Cook rice according instructions.	1	17
68	Heat oil a large skillet over medium heat and cook onion until soft and translucent, about 4 minutes. Add garlic and cook until fragrant, about 30 seconds. Add veggies in the following order with approximately 2 minutes of sauteing between each addition: carrots, cauliflower, broccoli, and mushrooms last. Pour in soy sauce and mix until all vegetables are well coated with sauce. Cook for 2 minutes.	2	17
69	Pour in water and add tomatoes, salt, and pepper. Bring to a boil, reduce heat, and bring to a simmer. Cook until all vegetables are fork-tender, but not too soft, 3 to 5 minutes. Add basil towards the end.	3	17
70	Serve warm on a bed of rice.	4	17
71	Place chickpeas in a saucepan over medium heat. Add water and taco seasoning. Cook and stir until thoroughly heated, 5 to 7 minutes. Remove from heat. Mash mixture to crush chickpeas.	1	18
72	Assemble tacos: divide chickpea filling evenly among taco shells and add avocado mash, cheese, salsa and garnish with cilantro.	3	18
73	Slice pork belly into 1-inch pieces layered with skin, fat, and meat.	1	19
74	Heat sugar in a large wok or pot over medium heat until it melts and caramelizes into a light brown syrup, about 5 minutes. Add pork and increase the heat to high. Cook and stir to render some of the pork fat, 3 to 5 minutes.	2	19
158	Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally, until tender yet firm to the bite, about 12 minutes. Drain, reserving about 1 cup of cooking water.	1	40
75	Stir shallots and garlic into the wok. Add fish sauce and black pepper; stir until pork is evenly coated. Pour in coconut water and bring to a boil. Add hard-boiled eggs and reduce the heat to low. Cover and simmer, checking occasionally and adding a little water if the liquid evaporates too much, until pork is tender, about 1 hour.	3	19
76	In the meantime cook rice.	4	19
77	Remove pork from the heat and let stand for about 10 minutes. Skim fat from the surface of the dish. Serve with rice.	5	19
78	Stir soy sauce, vegetable oil, rice vinegar, sesame oil, green onions, ginger, and garlic together in a shallow dish.	1	20
79	Place salmon fillets in soy mixture and turn to coat. Cover and marinate for at least 15 minutes refrigerated.	2	20
80	In the meantime cook rice.	3	20
81	Preheat an outdoor grill for medium heat. Alternatively you can also bake the salmon in the oven.	4	20
82	Remove salmon from marinade; discard marinade.	5	20
83	Close grill cover. Grill salmon until it flakes easily with a fork, about 20 minutes; salmon will continue to cook after you remove it from the grill.	6	20
84	Bring half of the vegetable broth and water to a boil in a saucepan, stir in couscous, and mix in salt and black pepper. Reduce heat to low and simmer until liquid is absorbed, about 8 minutes.	1	21
85	Heat half of the olive oil in a skillet over medium-high heat; stir in pine nuts and cook, stirring frequently, until pine nuts smell toasted and are golden brown, about 1 minute. Remove from heat.	2	21
86	Heat remaining olive oil in a saucepan; cook and stir garlic and shallot in the hot oil until softened, about 2 minutes. Stir black olives and dried tomatoes into garlic mixture and cook until heated through, 2 to 3 minutes, stirring often. Slowly pour in the remaining vegetable broth and bring mixture to a boil. Reduce heat to low and simmer until sauce has reduced, 8 to 10 minutes.	3	21
87	Transfer couscous to a large serving bowl, mix with sauce, and serve topped with parsley and pine nuts.	4	21
88	Combine bulgur and boiling water in a pot. Cover and simmer for 20 minutes.	1	22
89	In the meantime add oil, lemon juice, onions, parsley, mint, tomatoes, cucumber and bulgur to a large bowl; toss to combine. Season to taste with salt and black pepper. Optional: Cover, and refrigerate for an 1 hour.	2	22
90	Chop all vegetables.	1	23
91	Fill a large pot with lightly salted water and bring to a rolling boil. Cook fettuccine at a boil until tender yet firm to the bite, about 8 minutes. Drain once done cooking.	2	23
92	Meanwhile, pour cream into a large skillet. Cook over medium heat, stirring constantly, until just about boiling. Reduce heat and add green onions, parsley, basil, thyme, salt, black pepper, red pepper flakes, and white pepper. Simmer until thickened, 7 to 8 minutes.	3	23
93	Stir in shrimp and scallops. Cook until shrimp is no longer translucent.	4	23
94	Stir in cheeses, blending well. Serve sauce over pasta.	5	23
95	Preheat oven to 400 degrees F (200 degrees C).	1	24
96	Melt butter in large, oven-proof skillet over medium-high heat. Add mushrooms; season with salt, and cook and stir mushrooms until brown. They will begin browning after the moisture evaporates.	2	24
97	Reduce heat to medium and stir in diced onion. Sprinkle with black pepper and cayenne pepper. Cook and stir until onions are translucent and soft.	3	24
98	Pour rice into skillet and stir until each rice grain is coated with butter. Season with salt.	4	24
99	Pour half of the chicken broth into the rice mixture. Raise heat to medium-high and cook, stirring rice until liquid is completely absorbed by the rice.	5	24
100	Pour the other half chicken stock into the rice and stir until mixture comes to a simmer.	6	24
101	Bake in preheated oven until grains are almost tender but still slightly firm, about 15 minutes. Transfer skillet to stovetop. Season with more salt, if necessary.	7	24
102	Pour cream into the skillet. Cook on medium heat, stirring constantly until rice is tender, 1 or 2 minutes. If there isn't enough liquid then add some water. Remove skillet from heat.	8	24
103	Add the grated Parmigiano-Reggiano and chives; stir. Serve immediately.	9	24
104	Heat half of the olive oil in a saucepan over medium heat. Add garlic; cook and stir until bubbling and sizzling, about 20 seconds. Pour in chicken broth and bring to a boil. Cook until liquid is reduced by half, 6 to 8 minutes. Stir in a pinch of red pepper flakes.	1	25
105	Stir in cannellini beans and bring to a boil. Cook until you can see the tops of the beans just below the surface of the liquid, 6 to 8 minutes. Stir in anchovy fillet, oregano, and lemon zest; simmer for 3 minutes.	2	25
106	Add escarole and reduce the heat to low. Cook and stir until escarole wilts, about 5 minutes. Season with salt and pepper, then drizzle with remaining olive oil and add another pinch of red pepper flakes.	3	25
107	Mix flour, soy milk, water, soy margarine, maple syrup, sugar, and salt together in a large mixing bowl until combined.	1	26
108	Lightly grease a 6-inch skillet with some soy margarine. Heat the skillet over medium heat.	2	26
109	Pour 2 to 3 tablespoons of batter into the skillet and immediately rotate the skillet to spread batter out in a thin layer. Cook until the top of the crepe is no longer wet and the bottom has turned light brown, 1 to 2 minutes. Run a spatula around the edge of the skillet to loosen crepe; flip and cook until the other side has turned light brown, about 1 minute more. Repeat with remaining batter.	3	26
110	Combine crumbled chorizo and chipotle peppers in a bowl.	1	27
111	Heat a skillet over medium-high heat; add chorizo mixture and cook until crisp, 5 to 7 minutes. Transfer to a plate, reserving grease in the skillet.	2	27
112	Heat tortillas in reserved grease in the skillet over medium heat until warmed, 1 to 2 minutes per side. Stack 2 tortillas for each taco, then fill with chorizo, onion, and cilantro.	3	27
113	Combine tomatoes, yogurt, garlic, and ginger in a blender and process until smooth.	1	28
114	Heat oil in a large frying pan over medium heat. Add onion and fry until soft, 3 to 4 minutes, stirring constantly. Stir in curry paste and fry until fragrant, 1 minute more, stirring once or twice. Add the tomato mixture and chicken to the pan and mix together. Season with salt and pepper. Remove pan from heat.	2	28
115	Cook rice according instructions.	3	28
159	Heat olive oil in a large skillet over medium heat and cook garlic until fragrant, about 1 minute. Add kale and cook, stirring constantly, until wilted, about 3 minutes.	2	40
116	Mix water and flour together in a bowl. Stir into the chicken mixture in the frying pan. Return pan to the heat and bring to a boil, stirring constantly, about 5 minutes. Reduce heat to low, cover, and cook until thickened, about 15 minutes more. Sprinkle with cilantro and serve with rice.	4	28
117	Cook rice according instructions.	1	29
118	Heat a large skillet over medium-high heat. Add beef and cook, stirring and crumbling into small pieces until browned, 5 to 7 minutes. Drain excess grease.	2	29
119	Stir in garlic, ginger, and sesame oil and cook until fragrant, about 2 minutes. Stir in soy sauce, brown sugar, and red pepper. Cook until beef absorbs some sauce, about 7 minutes. Add 1/2 of chopped green onions.	3	29
120	Serve over rice; garnish with sesame seeds and remaining green onions.	4	29
121	Combine lettuce, oranges, Gorgonzola cheese, and figs in a large bowl. Drizzle olive oil, vinegar, salt and black pepper over salad and toss to coat.	1	30
122	Cook rice according instructions.	1	31
123	Chop all vegetables and tofu.	2	31
124	Place 1/2 vegetable oil, 1/2 ginger, garlic, and cornstarch in a large bowl; mix until cornstarch is dissolved.	3	31
125	Add broccoli, carrots, snow peas, green beans and tofu; toss lightly to coat.	4	31
126	Heat remaining vegetable oil in a large skillet or wok over medium heat. Add vegetable and tofu mixture and cook for 2 minutes, stirring constantly to prevent burning.	5	31
127	Stir in water and soy sauce; add onion, salt, and remaining 1 teaspoon ginger. Cook and stir until vegetables are tender but crisp. Serve with rice.	6	31
128	Combine oil, onion, and garlic in a big pot over medium heat. Cook and stir until onion softens, 3 to 5 minutes. Add mushrooms, eggplant, and buttercup squash sequentially, stirring well after each addition.	1	32
129	Stir tomatoes into the pot. Stir in red lentils; add pasta. Pour in stock; reduce heat to medium-low and simmer, covered, until pasta is almost fully cooked, about 30 minutes. Stir occasionally to ensure pasta doesn't stick to the bottom of the pot.	2	32
130	Mix rice vinegar, soy sauce, and tomato paste together in a small bowl. Pour into the pot; stir to combine. Stir in nutritional yeast. Add basil, paprika, and black pepper; stir once more.	3	32
131	Heat olive oil in a large skillet over medium heat. Add turkey breast, green pepper, garlic, Italian seasoning, black pepper, ground, salt, and red pepper flakes; cook and stir until turkey is lightly browned, 4 to 5 minutes.	1	33
132	Stir marinara sauce and baby spinach into the turkey mixture; cook and stir until marinara sauce is warm through, about 3 minutes.	2	33
133	To make the zucchini noodles, use a spiralizer or vegetable peeler. Stir zucchini noodles into the sauce; cook and stir until the zucchini is slightly tender, 2 to 3 minutes.	3	33
134	Preheat oven to 400 degrees F (200 degrees C).	1	34
135	Place vegetable broth and quinoa in a saucepan; bring to a boil. Simmer until quinoa is tender, about 15 minutes.	2	34
136	Place Brussels sprouts, carrots, parsnips, and red onion on a baking sheet; drizzle with 1/2 olive oil.	3	34
137	Bake in the preheated oven until softened, about 10 minutes.	4	34
138	Mix chickpeas with turmeric in a bowl. Heat remaining 1/2 olive oil in a skillet over medium heat. Cook and stir chickpeas until browned, about 8 minutes.	5	34
139	Mix tahini, lemon juice, and maple syrup in a bowl until well combined. Add hot water, 1 tablespoon at a time, until dressing is thin and smooth.	6	34
140	Assemble quinoa, roasted vegetables, chickpeas, and mashed avocado bin a bowl. Drizzle dressing over bowl.	7	34
141	Whisk mayonnaise, yogurt, and chipotle chiles together in a bowl.	1	35
142	Cook tortillas in the microwave until warm and pliable, about 30 seconds.	2	35
143	Spread 1 tablespoon chipotle mayonnaise down the center of each tortilla. Spread lettuce, Monterey Jack cheese, avocado, bacon, red onions, tomatoes, and chicken in the center of each tortilla. Fold opposing edges of tortilla to overlap the filling. Roll 1 of the opposing edges around the filling into a wrap. Repeat until all tortillas are filled.	3	35
144	If desired, place wrap in a panini maker for 1 to 2 minutes, or until wrap has grill marks and cheese is slightly melted.	4	35
145	Heat olive oil in a large pot over medium heat. Cook and stir onion and garlic until soft, about 5 minutes. Stir in red bell pepper and carrot; cook for 4 to 5 minutes. Add mushrooms; cook and stir until softened, about 2 minutes.	1	36
146	Pour wine into the pot; simmer until slightly reduced, about 1 minute. Stir in diced tomatoes and vegetable broth. Bring sauce to a boil; reduce heat and simmer until flavors combine, 10 to 15 minutes. In the meantime cook pasta. To sauce stir in lentils, paprika, basil, oregano, dried herbs, and nutmeg; cook until lentils are heated through, about 5 minutes.	2	36
147	Substitute white wine for the red wine if preferred.	3	36
148	Cut all ingredients.	1	37
149	Combine broth, tomatoes, kidney beans, onion, carrots, celery, green beans, zucchini, garlic, parsley, oregano, salt, thyme, and pepper in a pot. Cover and cook for 20 minutes.	2	37
150	Bring a large pot of lightly salted water to a boil. Cook pasta in the boiling water, stirring occasionally, until cooked through but firm to the bite, 8 minutes; drain.	3	37
151	Stir pasta and spinach into the pot with sauce; cover and cook for 5 more minutes.	4	37
152	Ladle into bowls and sprinkle with Parmesan cheese.	5	37
153	Whisk eggs in a small bowl until smooth. Mix in ham, Cheddar cheese, and heavy cream.	1	38
154	Melt butter in a skillet over medium heat. Pour in egg mixture; cook and stir until set but still moist, 3 to 5 minutes.	2	38
155	Bring water and rice to a boil in a saucepan. Reduce heat to medium-low, cover, and simmer until rice is tender and liquid has been absorbed, 20 to 25 minutes.	1	39
156	Heat olive oil in a skillet over medium heat. Add onions and salt. Cook and stir just until onions start to get soft, 3 or 4 minutes. Add tomato paste, garlic, paprika, cumin, and cayenne pepper. Continue cooking about 3 minutes. Pour in coconut milk and add soy sauce. When mixture starts to bubble, let it simmer about 5 minutes.	2	39
157	Increase heat to medium-high. Stir in bell peppers, jalapeno peppers, and green onions. Let mixture come back to a simmer. Transfer fish to skillet; stir. Cover and cook over medium-high heat until fish starts to flake, about 5 minutes. Remove from heat. Add salt, cilantro, and lime juice; stir carefully to avoid breaking up the fish. Serve with rice.	3	39
160	Stir cooked spaghetti into the skillet. Add nutritional yeast. Add enough of the reserved cooking water to create a thick sauce. Stir well. Add chickpeas and heat until warmed, 2 to 4 minutes. Season with salt and pepper.	3	40
161	Cook brown rice according instructions.	1	41
162	Whisk coconut milk, peanut butter, soy sauce, brown sugar, lime juice, Sriracha sauce, and ground chili pepper together in a bowl until a smooth sauce forms.	2	41
163	Heat oil in a large skillet over medium-high heat. Add carrots and bell pepper; sautee until just tender, 1 to 2 minutes. Add tofu and sautee until lightly browned, about 4 minutes per side. Add garlic and ginger; cook and stir until fragrant, about 30 seconds.	3	41
164	Pour sauce into the skillet and stir to coat tofu and vegetables. Cook until flavors combine, about 5 minutes. Reduce the heat to low, then stir in spinach, 1 cup at a time, until wilted. Serve over brown rice.	4	41
165	Remove tofu from the package and transfer to a plate. Place another plate on top of tofu. Set a 3- to 5-pound weight on top. Press tofu for 20 to 30 minutes; drain and discard the accumulated liquid.	2	42
166	While tofu is draining, heat vegetable oil in a small skillet over medium heat. Add onion and celery; sautee until soft and lightly browned, about 5 minutes. Remove from the heat.	3	42
167	Finely chop tofu and place into a mixing bowl. Add onion and celery mixture, Cheddar, egg, salt, and pepper; mix until thoroughly combined.	4	42
168	Pour 1/4 inch oil into a large skillet and heat over medium-high heat. Drop tofu mixture into the skillet in six equal portions. Flatten with a spatula to form patties. Fry until golden brown, 5 to 7 minutes per side. Instead of frying these burgers, you can bake them in an oven preheated to 350 degrees F (175 degrees C) for 30 minutes.	5	42
169	Assemble tofu burgers on iceberg lettuce, tomatoes and mayonnaise in burger bun.	6	42
170	Dice tomatoes and return them to the can with their juice.	1	43
171	Heat 1/2 olive oil in a saucepan over medium-high heat. Add onion and garlic to the hot oil and cook, stirring frequently, for 2 minutes. Stir in diced tomatoes and their juice, tomato sauce, oregano, 1/2 salt, and 1/2 pepper until well blended. Bring sauce to a simmer and reduce heat to low. Let simmer while preparing meatballs.	2	43
172	Combine beef substitute with bread crumbs, parsley, remaining salt, remaining pepper, garlic powder, and onion powder in a bowl; mix until ingredients are well combined. Roll the mixture into 1 1/2-inch balls.	3	43
173	Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally, until tender yet firm to the bite, about 12 minutes.	4	43
174	Meanwhile, heat remaining olive oil in a deep skillet over medium-high heat. Add meatballs to the pan and saute, turning occasionally, until all sides are browned and a bit crisp, about 10 minutes total. Reduce heat to low.	5	43
175	Pour simmering tomato sauce over the meatballs and mix. Simmer sauce with meatballs for an additional 10 minutes. Serve meatballs and sauce over spaghetti.	6	43
176	Bring a large pot of lightly salted water to a boil. Add pasta and cook until al dente, 8 to 10 minutes; drain.	1	44
177	Heat oil in a large skillet over medium heat. Sautee garlic until tender, then stir in chicken and season with red pepper flakes. Cook until chicken is golden and cooked through.	2	44
178	Combine pasta, chicken, pesto, and dried tomatoes in a large bowl; toss to coat evenly.	3	44
179	Preheat an oven to 350 degrees F (175 degrees C). Grease a 2.5 quart baking dish.	1	45
180	Bring a large pot of lightly salted water to a boil. Place pasta in the pot, cook for 8 to 10 minutes, until tender, and drain.	2	45
181	Cook and stir the Italian sausage in a large skillet over medium heat until browned, about 8 to 10 minutes. Drain the fat from the meat, pour the cooked pasta, onions, garlic and tomatoes into the skillet, and stir well to combine. Bring the mixture to a boil.	3	45
182	Pour half of the hot pasta-sausage mixture into the prepared baking dish, spread with the cottage cheese in an even layer, and sprinkle with half the mozzarella cheese. Spread the remaining pasta mixture over the cheese, and top with the remaining mozzarella cheese.	4	45
183	Bake in the preheated oven for about 25 minutes, until the casserole is hot and the cheese is melted and lightly browned. Let it stand 5 minutes to firm up before serving.	5	45
184	Place potatoes into a large pot and cover with salted water. Bring to a boil, then reduce heat to medium-low, cover, and simmer until just tender, about 15 minutes. Drain and allow to steam dry for 1 to 2 minutes.	1	46
185	Meanwhile, heat oil in a large skillet over medium heat. Cook and stir onion and garlic in hot oil until onion has softened and turned translucent, about 5 minutes. Season with curry powder, garam masala, cumin, salt, ginger, and cayenne pepper; cook and stir for 2 minutes more.	2	46
186	Add cooked potatoes, chickpeas, peas, and tomatoes. Pour in coconut milk; bring to a simmer and continue cooking for 5 to 10 minutes.	3	46
187	Make filling: Heat oil in a large skillet over medium heat; cook and stir carrots in hot oil until lightly browned, about 5 minutes. Add potato; cook and stir until lightly browned and mostly tender, 5 to 10 minutes. Add leeks and onion; cook and stir until onion is lightly browned, 5 to 10 minutes.	1	47
188	Mix in sweet potato, beans, cumin, oregano, chili powder, cayenne pepper, salt, and pepper; cook and stir until sweet potato is tender, about 10 minutes. Remove from heat and transfer sweet potato mixture to a bowl, scraping the skillet clean with a rubber spatula.	2	47
189	Assemble tacos: Heat each tortilla in the same skillet over medium heat until warmed, about 30 seconds per side. Spread mashed avocado onto each warmed tortilla; top with sweet potato mixture, queso fresco, salsa, cilantro, and lime juice.	3	47
190	Bring a large pot of lightly salted water to a boil. Cook pasta in boiling water until al dente, 8 to 10 minutes; drain.	1	48
191	Heat oil in a large, deep skillet over medium heat. Cook sausage and pepper flakes until sausage is evenly brown.	2	48
192	Stir in onion and garlic, and cook until onion is tender.	3	48
193	Stir in tomatoes, cream, and salt. Simmer until mixture thickens, 8 to 10 minutes.	4	48
194	Stir cooked pasta into sauce and heat through. Sprinkle with parsley.	5	48
195	For marinade, whisk together soy sauce, vinegar, oil, lime zest, lime juice, ginger, and honey in a large bowl. Add watermelon; toss to coat. Chill, covered, at least 2 hours.	1	49
196	Preheat the oven to 350 degrees F (175 degrees C). Line a 10x15-inch baking pan with parchment paper.	2	49
197	Transfer watermelon from marinade to prepared pan with a slotted spoon, allowing marinade to drip off. Chill remaining marinade, covered, while watermelon bakes. Bake watermelon until browned, about 1 hour. Let cool slightly.	3	49
198	For dressing, stir some of the reserved marinade into mayonnaise in a small bowl. Pour remaining reserved marinade over baked watermelon.	4	49
199	Assemble rice toped with watermelon, avocados, cucumber, radishes, edamame, and carrot. Drizzle with dressing and sprinkle with sesame seeds. Garnish with green onions.	5	49
200	Combine artichokes with feta cheese, green onions, lemon juice, salt, and pepper in a bowl. Spoon into pita halves. Divide chicken slices and add to pita pockets.	1	50
201	Heat coconut oil in a large pot over medium-high heat. Add bok choy; cook and stir until wilted, 3 to 5 minutes. Stir in garlic and ginger; cook until fragrant, about 1 minute. Add carrots, Chinese spice powder, and cumin.	1	51
202	Pour vegetable broth into the pot. Bring the soup to a boil. Add noodles; reduce heat and simmer until noodles soften, about 3 minutes. Stir in bean sprouts and scallions. Remove soup from heat; let stand until flavors combine, about 5 minutes.	2	51
203	Heat a large frying pan or griddle over a medium heat. Place one tortilla flat on the frying pan. After 1 minute flip the tortilla over. Sprinkle some cheese on the tortilla, followed by some olives, avocado, and hot pepper sauce. Place another tortilla on top to make a sandwich. Cover the quesadilla with a lid. After one minute, flip the quesadilla. When the cheese has melted on the inside, remove the quesadilla. Repeat with remaining ingredients.	1	52
204	Cut the quesadillas into triangles and serve.	2	52
205	Heat oil in a large high-sided skillet over medium. Add onion and cook, stirring often, until softened, about 4 minutes. Add garlic and ginger; cook, stirring constantly, until fragrant, about 1 minute. Add red curry paste and cook, stirring constantly, until lightly darkened and vegetables are coated, about 1 minute. Stir in coconut milk, broth, and salt; bring to a boil over medium-high. Stir in chickpeas.	1	53
206	Reduce heat to medium to maintain a simmer and simmer, stirring occasionally, until thickened slightly, 15 to 20 minutes.	2	53
207	Remove from heat and stir in spinach; stir until wilted, about 1 minute. Stir in lime juice. Serve with cashews, cilantro, and rice.	3	53
208	Heat olive oil in a large skillet over medium-high heat. Saute the onion and garlic in the olive oil until onion is tender and garlic is lightly browned. Remove garlic, and stir in the parsley, celery, salt, and pepper. Cook until celery is tender, then add the mushrooms. Reduce heat to low, and continue cooking until the mushrooms are soft.	1	54
209	Pour the milk and cream into the skillet, and stir in the risotto rice. Heat to a simmer. Stir the vegetable stock into the rice one cup at a time, until it is absorbed.	2	54
210	When the rice has finished cooking, stir in the butter and Parmesan cheese, and remove from heat. Serve hot.	3	54
211	For cilantro-lime cream, place sour cream in a small bowl with a lid. Add cilantro, zest and juice of 2 limes, garlic, and 1/2 salt. Stir together well, cover, and refrigerate until ready to serve.	1	55
212	For fajita seasoning, combine chili powder, cayenne pepper, cumin, paprika, oregano, salt and pepper in a small bowl; set aside.	2	55
213	In a large bowl or resealable plastic bag, add 1/2 oil, half of lime juice, and fajita seasoning. Stir together or squeeze the bag to combine. Add shrimp and mix well to coat shrimp; set aside.	3	55
214	Heat remaining oil in a large skillet over medium heat. Stir onion and peppers into the hot oil, and cook, stirring frequently, until some color begins to develop on the vegetables, 3 to 5 minutes. Remove vegetables from the skillet and set aside.	4	55
215	Add shrimp to the same skillet and cook for 2 to 3 minutes. Return cooked vegetables to the skillet. Cook and stir until shrimp is opaque and pink, 2 to 3 minutes. Squeeze remaining lime juice over the skillet contents.	5	55
216	Fill warm tortillas with shrimp, peppers, and onions, and garnish with avocado slices, salsa, and additional cilantro, if desired. Drizzle with cilantro-lime cream.	6	55
217	Place olive oil, lime juice, garlic, salt, and cayenne pepper in a small jar. Close the lid tightly and shake the jar until the dressing is well combined.	1	56
218	Combine in a salad bowl beans, corn, avocado, bell pepper, tomatoes, green onions, and cilantro.	2	56
219	Shake dressing again, pour over salad, and toss to coat.	3	56
220	Heat vegetable broth in a large skillet over medium heat. Cook and stir onion, garlic, and jalapeno pepper in the hot broth until slightly tender, about 5 minutes. Add sweet potatoes, chili powder, cumin, paprika, oregano, and red pepper flakes to onion mixture. Pour remaining 2 cups vegetable broth over sweet potato mixture.	1	57
221	Bring vegetable broth mixture to a boil, reduce heat to medium, and simmer until sweet potatoes are tender, 20 to 25 minutes. Stir tomatoes and kidney beans into sweet potato mixture and simmer over low heat until flavors have blended, about 5 minutes.	2	57
222	In a large bowl, toss together chickpeas, cucumber, tomatoes, onion, garlic, parsley flakes, dried basil, and Parmesan cheese. Drizzle with olive oil and balsamic vinegar, and season to taste with salt. Toss until well combined, and adjust seasoning as needed. Cover and refrigerate at least 30 minutes before serving. Serve chilled.	1	58
223	Slice zucchini lengthwise with a vegetable peeler to create long thin 'noodles'.	1	59
224	Slice carrots into long strips with vegetable peeler similar to the zucchini.	2	59
225	Combine carrots, cabbage, red bell pepper, and bean sprouts in a large bowl.	3	59
226	Whisk together almond butter, orange juice, honey, ginger, soy sauce, miso, garlic, and cayenne pepper in a bowl.	4	59
227	Pour half of sauce into cabbage mixture and toss to coat.	5	59
228	Top zucchini 'noodles' with cabbage mixture. Pour remaining sauce over each portion.	6	59
229	Heat oil in a large pot over medium heat. Add carrots, onion, and mushrooms; cook and stir until softened, 5 to 7 minutes. Add garlic; cook and stir until fragrant, about 1 minute.	1	60
230	Pour broth into the pot; bring to a boil. Add quinoa, soy sauce, and ginger. Reduce heat and simmer until quinoa is mostly tender, about 17 minutes. Add baby kale; cook until wilted, about 3 minutes. Remove from heat and let stand until quinoa absorbs remaining cooking liquid, about 5 minutes.	2	60
231	Substitute baby spinach for the baby kale if desired.	3	60
468	Transfer to baking dish and place in an even layer over rice mixture. Pour in chicken broth and cover with aluminum foil.	5	131
232	Make the tofu: Whisk chili sauce, soy sauce, sesame oil, garlic, and ginger together in a large bowl. Add tofu and toss to coat. Cover and marinate for 15 minutes in the refrigerator.	1	61
233	In the meantime bring a pot of water to a boil. Add snow peas and blanch for 1 to 2 minutes. Transfer with a slotted spoon to a bowl of cold water. Drain and blot dry.	2	61
234	Make the salad: Combine snow peas, cabbage, carrots, and peanuts in a bowl. Add tofu and marinade and toss gently to combine.	3	61
235	Combine ranch dressing, sour cream, some taco seasoning, and salsa in a small bowl. Cover and refrigerate until serving.	1	62
236	Toss chicken with remaining taco seasoning. Cover bowl loosely with wax paper or plastic wrap. Microwave chicken until chicken is heated through, about 2 to 3 minutes.	2	62
237	Warm tortillas in a skillet for about a minute on each side to make them pliable. Place a scoop of chicken on the tortilla and top with lettuce, tomato, green onion, olives, avocado, cheese, and a spoonful of the ranch dressing mixture.	3	62
238	Make the marinade: Combine 1/2 olive oil, vinegar, oregano, chili powder, sugar, salt, and pepper in a large bowl.	1	63
239	Prepare fajitas: Add zucchini, yellow squash, onion, and bell peppers to the marinade. Marinate vegetables in the refrigerator for at least 20 minutes, but not more than 24 hours.	2	63
240	Heat remaining oil in a large skillet over medium-high heat. Drain vegetables and saute until tender, about 10 to 15 minutes. Stir in corn and black beans. Increase the heat to high to brown vegetables, about 5 minutes.	3	63
241	Assemble vegetables on tortillas.	4	63
242	Bring a pot of water to a boil over high heat. Reduce heat to low, place hot dog in water, and cook until warmed through, about 5 minutes. Remove hot dog from water and set aside.	1	64
243	Place a steamer basket into the pot and steam hot dog bun until warm, about 2 minutes.	2	64
244	Place hot dog in steamed bun. Pile on toppings in this order: mustard, pickle, onion, tomato, pickle, peppers, and salt.	3	64
245	Preheat the oven to 350 degrees F (175 degrees C).	1	65
246	Pour crushed tomatoes into the bottom of a casserole dish. Layer 1/3 of the rice, 1/3 of the beans, 1/3 of the diced tomatoes, 1/3 of the green chiles, 1/3 of the seitan, 1/3 of the vegan cheese, 1/3 of the tortillas, and 1/3 of the enchilada sauce into the dish, in that order. Repeat with 2 more layers.	2	65
247	Bake in the preheated oven until vegan cheese melts and casserole is heated through, about 45 minutes.	3	65
248	Fill a large pot with lightly salted water and bring to a rolling boil over high heat. Once the water is boiling, stir in the spaghetti, and return to a boil. Cook the pasta uncovered, stirring occasionally, until the pasta has cooked through, but is still firm to the bite, 8 to 10 minutes. Drain well in a colander set in the sink.	1	66
249	Whisk together the sesame oil, soy sauce, balsamic vinegar, chili oil, and sugar in a large bowl. Toss the pasta in the dressing, then sprinkle with sesame seeds, green onion, and bell pepper. Serve warm, or cover and refrigerate for a cold salad.	2	66
250	Melt butter in a skillet over medium-low heat. Crack eggs into the skillet side by side and cook until eggs are white on the bottom layer and firm enough to flip, 2 to 3 minutes. Flip eggs, trying not to crack the yolk, and cook until egg reaches desired doneness, 2 to 5 minutes more.	1	67
251	Meanwhile, toast bread slices to desired doneness, 3 to 5 minutes.	2	67
252	Mash avocado in a bowl; stir in lemon juice, cayenne pepper, and salt. Spread avocado mixture onto toast. Top with fried egg and season with salt and pepper.	3	67
253	Heat oil in a large pot over medium heat. Add ginger, curry paste, and lemongrass; cook and stir in the hot oil for 1 minute.	1	68
254	Gradually stir in chicken broth, then stir in fish sauce and brown sugar; reduce heat to low and simmer for 15 minutes.	2	68
255	Add coconut milk and mushrooms; cook and stir until mushrooms are soft, about 5 minutes.	3	68
256	Add shrimp; cook until no longer translucent, about 5 minutes. Stir in lime juice; season with salt and garnish with cilantro.	4	68
257	Add 1/2 tablespoons oil, rice, and orzo to pot. Saute, stirring and scraping the bottom of the pot constantly, until orzo is brown, about 5 minutes. Pour in 1/4 broth and bring to a boil while scraping the browned bits of food off the bottom.	1	69
258	Add remaining broth, garlic, paprika, and onion powder to pot. Close and lock the lid. Cook on high pressure; set timer for 15 minutes. Stir every now and then so it doesn't burn on the bottom of the pot.	2	69
259	Meanwhile, heat remaining oil in a medium skillet over medium-high heat. Add mushrooms and saute until lightly browned, about 5 minutes.	3	69
260	Once the rice is done fluff the rice. Add mushrooms and parsley. Taste and adjust salt as needed.	4	69
261	Bring a large pot of lightly salted water to a boil. Add ziti pasta, and cook until al dente, about 8 minutes; drain.	1	70
262	Meanwhile, brown ground beef and onion in a large skillet over medium heat; stir in spaghetti sauce and simmer for 15 minutes.	2	70
263	Preheat the oven to 350 degrees F (175 degrees C). Butter a baking dish.	3	70
264	Spread 1/2 of the ziti in the bottom of the prepared dish; top with Provolone cheese, sour cream, 1/2 of the meat sauce, remaining ziti, mozzarella cheese, and remaining meat sauce. Top with grated Parmesan cheese.	4	70
265	Bake in the preheated oven until heated through and cheeses have melted, about 30 minutes.	5	70
266	Inspect peas, discarding any stones, foreign matter, or unattractive peas. Place peas in a fine mesh strainer and rinse under cold running water to remove pea dust.	1	71
267	Transfer drained peas into a pot with a lid and a heavy, heat-diffusing bottom. Add water, onion, celery, ketchup, olive oil, salt, garlic, and bay leaves. Cover and bring to a boil over medium-high heat. Reduce heat to a very slow simmer. Cook, stirring and scraping the bottom every 5 to 10 minutes, until peas have largely fallen apart, about 20 minutes.	2	71
268	Stir carrots into the soup. Cook, covered, stirring often, until soup is thick, about 15 minutes more. Remove and discard bay leaves. Season with pepper.	3	71
269	Combine vegetable broth, lemon grass, vegetable bouillon, and star anise pods in a saucepan and bring to a boil. Reduce heat and let simmer until flavors are combined, 30 to 45 minutes. Remove lemon grass and star anise with a slotted spoon and discard.	1	72
344	Uncover and check the level of liquid in the pot. Continue cooking for 30 minutes, uncovered if there is too much liquid or covered if the amount of liquid looks right.	3	95
270	Place rice noodles in a bowl and cover with hot water to soften, about 10 minutes. Drain and cut into shorter pieces with kitchen shears; divide noodles equally between soup bowls. Fill bowls with hot broth to cover noodles.	2	72
271	Place bean sprouts, mushrooms, limes, cilantro, basil, and green onions into separate bowls. Place teriyaki sauce, soy sauce, chile paste, and sesame oil in separate bowls. Serve soup alongside garnishes and flavorings.	3	72
272	Heat oil in a pot over medium-low heat. Add onions, garlic, and ginger; cook and stir until fragrant, 3 to 5 minutes. Sprinkle in sugar and cumin; cook and stir until sugar caramelizes, about 2 minutes, making sure cumin does not burn.	1	73
273	Stir in curry paste and cook for 1 to 2 minutes. Add potatoes, tomatoes with their juices, coconut milk, lentils, and bouillon; bring to a boil. Reduce the heat, then cover and simmer, stirring occasionally, until potatoes and lentils are cooked through, 20 to 25 minutes. Season with lemon juice, salt, and pepper.	2	73
274	Set oven rack about 6 inches from the heat source and preheat the oven's broiler.	1	74
275	Spread mayonnaise onto 1 side of each bread slice. Layer Swiss cheese, turkey, and spinach onto the mayonnaise-side of 1 bread slice; top with second bread slice. Place sandwich on a baking sheet.	2	74
276	Broil in the preheated oven until heated through and cheese is bubbling, about 5 minutes.	3	74
277	Combine carrots, vegetable broth, coconut milk, onion, garlic, curry paste, salt, and pepper in a pot. Cook on high heat with lid; set timer for 20 minutes.	1	75
278	Blend soup with an immersion blender until smooth and creamy, about 3 minutes. Serve in bowls and sprinkle with fresh cilantro.	2	75
279	Dice potatoes into 1/2-inch cubes. In a pot cover potatoes with water and cook until nearly tender.	1	76
280	In the meantime heat oil in a nonstick skillet over medium heat. When oil shimmers, add ground beef. Cook and stir beef in the hot skillet until browned and crumbly, 5 to 8 minutes.	2	76
281	Sprinkle taco seasoning, chili powder, cumin, smoked paprika, garlic granules, cayenne, salt, and pepper over beef, and stir to combine. Cook 1 to 2 minutes more.	3	76
282	Stir in potatoes, bell peppers and onions, and cook 2 to 3 minutes, then add tomatoes, with juice and green chilies. Cook until potatoes are tender and most of the liquid is absorbed, 4 to 5 minutes more.	4	76
283	Mix together peanut butter, soy sauce, vinegar, sugar, and sesame oil in a small bowl until sauce is well combined. Set aside.	1	77
284	Bring a large pot of water to a boil. Stir in udon noodles and cook for 5 minutes. Add shrimp to the pot of boiling noodles and cook until shrimp are pink and opaque, about 3 minutes. Turn the heat off and leave the pot on the burner. Stir in broccoli; cover and let sit for 2 to 3 minutes.	2	77
285	Drain noodle mixture and transfer to a large serving bowl. Pour sauce on top; stir to coat evenly. Garnish with peanuts to serve.	3	77
286	Whisk soy sauce, sesame oil, brown sugar, rice vinegar, chili garlic sauce, and ginger together in a small bowl. Add peanut butter, whisking until well combined, and set aside.	1	78
287	Bring 4 cups of water to a boil in a pot. Discard the flavor packet and add ramen noodles to the boiling water. Cook until noodles are tender, 4 to 5 minutes. Drain noodles, reserving some of the noodle water in case you need to thin out the sauce later.	2	78
288	Pour sauce over ramen noodles, tossing until well coated. If sauce is too thick, thin out with a small amount of the reserved noodle water until you reach your desired consistency. Your hot noodles will soak up the sauce. Garnish with peanuts and green onion, and serve.	3	78
289	Cook rice according instructions.	1	79
290	Heat oil in a skillet over medium heat. Cook and stir chicken, corn, and red pepper in hot oil until heated through and pepper is slightly softened, about 5 minutes. Season with salt and pepper.	2	79
291	Spoon rice into bowls, divide chicken mixture between the bowls, and top each with salsa and Monterey Jack cheese.	3	79
292	Gather all ingredients.	1	80
293	For crumb topper, melt 1/2 butter in a medium saucepan over medium heat. Add bread crumbs. Cook and stir until toasted, about 2 minutes. Remove from saucepan.	2	80
294	Add chicken broth to saucepan. Bring to boiling. Add rice, zucchini, salt and cayenne pepper.	3	80
295	Cover, reduce heat and simmer until liquid is absorbed and rice is tender, 20 minutes.	4	80
296	Add cheese; cover and let stand 5 minutes. Sprinkle with crumb topper.	5	80
297	Heat oil in a large flat-sided skillet over medium heat. Add onion; cook and stir until translucent, about 5 minutes. Add mushrooms and garlic; cook and stir until softened, about 2 minutes. Add yam and cook for 2 minutes.	1	81
298	Stir cumin, coriander, black mustard seeds, chile powder, paprika, and turmeric into the skillet; cook and stir until evenly distributed, about 2 minutes. Add cauliflower, chickpeas, salt, and black pepper; stir until combined.	2	81
299	Mix vegetable stock and tomato paste together in a small bowl; pour into the skillet. Cover and cook until yam is tender, about 15 minutes. Stir in spinach, parsley, lemon juice, and lime juice and cook until flavors combine, about 1 minute.	3	81
300	Preheat the oven to 450 degrees F (230 degrees C). Spray a brownie pan with cooking spray.	1	82
301	Heat olive oil in a large skillet over medium heat. Add onion and cook until soft, about 5 minutes. Stir in chicken, bacon, and roasted garlic. Season with salt, pepper, and garlic powder. Stir in green onions.	2	82
302	Mix ranch dressing and sour cream together in a small bowl. Remove chicken mixture from heat and stir just enough ranch mixture into the skillet to barely coat chicken.	3	82
303	Hold tortilla and spoon some chicken mixture across the middle. Sprinkle some of the Cheddar cheese over chicken and roll tortilla up. Place filled tortilla, seam-side down, against the short end of the pan so it does not unroll. Repeat with remaining tortillas and filling until pan is jammed full of enchiladas.	4	82
304	Pour enchilada sauce on top of filled tortillas to cover without drowning them. Sprinkle remaining Cheddar cheese generously on top of everything.	5	82
305	Bake in the preheated oven until bubbly on top, about 15 minutes.	6	82
306	Soak kaiser roll in a medium bowl of water for 10 minutes. Drain and squeeze out excess water; crumble into a large bowl.	1	83
307	Add ground meats, onion, parsley, egg, paprika, salt, and black pepper to crumbled roll; mix until well blended. Shape mixture into large flattened meatballs.	2	83
345	Serve with rice.	4	95
308	Heat a large nonstick skillet over medium heat. Fry meatballs in the hot skillet until browned and no longer pink in the center, about 5 minutes per side. An instant-read thermometer inserted into the center of a patty should read at least 160 degrees F (70 degrees C). Serve with potato salad.	3	83
309	Preheat a large, heavy skillet over medium-high heat. Add 1/4 oil. Break tofu apart over skillet into bite-size pieces, sprinkle with salt and pepper, then cook, stirring frequently with a thin metal spatula, until liquid cooks out and tofu browns, about 10 minutes.	1	84
310	Add onion and garlic powders, turmeric, 1/2 lemon juice, and 1/4 olive oil and toss to coat. Cook 5 minutes more.	2	84
311	Preheat a heavy-bottomed saucepan over medium-high heat. Add remaining oil. Cook onion and jalapenos with some salt, stirring, until translucent, about 5 minutes, Add garlic and cook, stirring, until fragrant, about 30 seconds. Add tomatoes, cumin, and remaining salt, and cook, stirring, until tomatoes become saucy, about 5 minutes. Add cilantro and lemon juice. Let cilantro wilt in. Add beans and heat through, stirring occasionally, about 2 minutes. Taste for salt and seasoning.	3	84
312	Spoon a scoop of beans and a scoop of scramble into bowl. Top with avocado, a squeeze of fresh lemon juice, and a sprinkle of cilantro. Serve with hot sauce and hash brown potatoes.	4	84
313	Preheat the oven to 425 degrees F (220 degrees C).	1	85
314	Warm pitas in a microwave until soft, about 1 minute. Lightly spread tomato sauce on each pita, pressing to flatten while spreading. Sprinkle each pita with black olives, pimento peppers, tomatoes, mozzarella cheese, blue cheese, basil, oregano, and coriander.	2	85
315	Arrange prepared pitas on a large baking sheet and place in the preheated oven until the pita bread has reached desired crispness, about 8 minutes. Serve whole or cut into slices.	3	85
316	Mix cumin, cinnamon, cayenne, chile flakes, cloves, and salt together in a bowl. Set spice mixture aside.	1	86
317	Allow a pot to preheat for 2 minutes. Add sweet potato, onion, and bell pepper. Cook, stirring occasionally, for 3 minutes. Add a splash of water and stir if vegetables stick to the pot. Add garlic, ginger, and spice mixture; cook and stir continually for 1 minute.	2	86
318	Add tomatoes and peanut butter. Stir until dissolved. Add water and stir. Cook for 25 minutes.	3	86
319	Stir in collard greens.	4	86
320	Place cilantro and chopped peanuts in separate bowls and serve alongside stew.	5	86
321	Heat a small skillet over medium-high heat. Toast pine nuts in hot skillet until lightly browned and fragrant, 3 to 5 minutes.	1	87
322	Put spinach into a large salad bowl; top with pine nuts, tomatoes, chicken, avocado, corn, and goat cheese.	2	87
323	Beat vinegar, olive oil, and mustard together in a small bowl until smooth; season with salt and pepper. Drizzle dressing over the salad and toss lightly to coat.	3	87
324	Drizzle each slice of bread evenly with truffle oil and cover bread slices with slices of buffalo mozzarella cheese, basil leaves, and tomato slices. Season to taste with sea salt and black pepper. Top each sandwich with a remaining bread slice.	1	88
325	Heat a skillet over medium-high heat. Add ground beef and cook until brown and crumbly, 5 to 10 minutes. Add Italian seasoning, salt, and granulated garlic; mix to combine.	1	89
326	Stir in marinara sauce, diced tomatoes with liquid, water, and red wine until well combined. Reduce heat to low; add tortellini and cook until warmed through, about 10 to 15 minutes.	2	89
327	Meanwhile, preheat the oven to 375 degrees F (190 degrees C).	3	89
328	Add cream cheese to tortellini mixture and stir gently to blend; sprinkle mozzarella cheese over the surface.	4	89
329	Bake in the preheated oven until cheese is melted and golden brown, about 15 minutes. Serve immediately.	5	89
330	Heat oil in a large pot over medium heat. Add onion, ginger, garlic; cook and stir until onion is tender.	1	90
331	Add lentils, squash, and cilantro, then stir in water, coconut milk, and tomato paste. Season with curry powder, cayenne pepper, nutmeg, salt, and pepper; bring to a boil. Reduce the heat to low and simmer for 30 minutes, or until lentils and squash are tender.	2	90
332	Combine water, basmati rice, split mung beans, ginger, coriander, oregano, garlic, cumin, and fennel seeds in a saucepan. Bring to a boil; reduce heat to medium-low. Simmer, covered, until most of the water is absorbed and the mixture has a smooth consistency, 20 to 25 minutes.	1	91
333	Cook pasta according instructions. Rinse with cold water.	1	92
334	In a large bowl, whisk together olive oil, vinegar, garlic powder, basil, oregano, black pepper, and sugar. Add cooked pasta, mushrooms, tomatoes, red peppers, feta cheese, green onions, olives, and pepperoni. Toss until evenly coated.	2	92
335	In a small bowl, combine tomatoes, onion, lime juice, cilantro, jalapeno, salt, and pepper. Set pico de gallo aside.	1	93
336	In a large skillet, heat 1/2 olive oil. Add chicken and saute until cooked through and juices run clear. Remove chicken from skillet and set aside.	2	93
337	Put the remaining olive oil in the hot skillet and saute the sliced onion and green pepper until tender. Stir in the minced garlic and saute until the aroma is strong. Mix in half of the pico de gallo and chicken breast meat. Set aside; keep warm.	3	93
338	In a heavy skillet, heat one flour tortilla. Spread some shredded cheese on the tortilla and top with chicken mixture. Sprinkle cheese over the chicken and top with another tortilla. When bottom tortilla is lightly brown and cheese has started to melt, flip quesadilla and cook on the opposite side. Remove quesadilla from skillet and cut into quarters. Repeat with remaining ingredients. Serve quesadillas with sour cream and remaining pico de gallo.	4	93
339	Cook rice according instructions.	1	94
340	In the meantime heat oil in a large skillet over medium-high heat. Add tofu cubes, season with seasoned salt and fry until golden on all sides, stirring occasionally, about 15 minutes. Remove to paper towels, and set aside.	2	94
341	Melt butter in the same skillet over medium heat. Add the onion and garlic; cook and stir until tender. Stir in coconut milk, curry powder, salt, pepper and cilantro. Return the tofu to the skillet. Simmer over low heat for 15 minutes, stirring occasionally.	3	94
342	Pour olive oil into a large pot over high heat. Add onions and garlic and saute for 2 minutes. Reduce heat and add tomatoes, eggplants, zucchini, tomato puree, and herbes de Provence; season with salt and pepper. Cover and simmer for 30 minutes.	1	95
343	Cook rice according instructions.	2	95
346	Preheat oven to 350 degrees F (175 degrees C). Prepare a baking dish with cooking spray.	1	96
347	Heat a large skillet over medium-high heat. Cook and stir beef and onion in the hot skillet until beef is completely browned, 5 to 7 minutes; drain and discard grease.	2	96
348	Stir tomato sauce, black beans, diced tomatoes, lime juice, cilantro, corn, and chopped green chiles into the ground beef mixture; season with chili powder, cumin, garlic, oregano, and red pepper flakes. Reduce heat to low and cook mixture at a simmer for 5 minutes.	3	96
349	Spread some beef mixture into the bottom of the prepared baking dish; top with 3 tortillas, overlapping as needed. Spread some more beef mixture over the tortillas. Sprinkle some Cheddar cheese over beef. Finish with layers of remaining tortillas, beef mixture, and Cheddar cheese, respectively.	4	96
350	Bake in preheated oven until heated throughout and the cheese is melted, about 15 minutes. Cool 5 minutes before serving.	5	96
351	Place potatoes into a large pot and cover with salted water; bring to a boil. Reduce heat to medium-low and simmer until tender, about 20 minutes. Drain and return to pot.	1	97
352	Preheat the oven to 375 degrees F (190 degrees C). Grease a baking dish.	2	97
353	Combine milk, cream cheese, 1/2 green onions, egg, butter, garlic, and salt in a bowl. Pour onto the prepared potatoes. Mash together until mixture is smooth. Spoon into the prepared baking dish. Sprinkle with Cheddar cheese and remaining green onions.	3	97
354	Bake in the preheated oven until lightly browned, about 40 minutes.	4	97
355	Gather all ingredients. Cook rice according instructions.	1	98
356	Stir soy sauce, brown sugar, ginger, and red pepper flakes together in a bowl until sugar dissolves. Mix water and cornstarch together in a small bowl; stir with a whisk until cornstarch dissolves completely.	2	98
357	Heat oil in a large skillet over high heat. Fry chicken and onion in hot oil until chicken is no longer pink in the center and onion is tender, 5 to 7 minutes.	3	98
358	Stir in broccoli with chicken and onion; saute until broccoli is hot, about 5 minutes.	4	98
359	Push chicken and vegetable mixture to the side of the skillet. Pour soy sauce mixture into the vacant part of the skillet. Stir cornstarch slurry into soy sauce mixture until the color is consistent.	5	98
360	Move chicken and vegetables back into the center of the pan; saute until sauce thickens and coats chicken and vegetables, about 5 minutes more. Serve with rice.	6	98
361	Place noodles in a large bowl and cover with hot water. Stir and allow to soak until softened, about 15 minutes. Drain and rinse thoroughly.	1	99
362	Combine garlic, rice vinegar, fish sauce, chile paste, brown sugar and salt in a bowl. Stir in green onions, carrots, basil, mint, and cilantro. Toss in rice noodles, peanuts, and sesame oil. Allow to sit for 30 minutes to absorb flavors. Garnish with additional green onions and peanuts.	2	99
363	Stir together olive oil, garlic, and salt; toss with tomatoes, and allow to stand for 15 minutes. Preheat oven to 400 degrees F (200 degrees C).	1	100
364	Brush each pizza crust with some of the tomato marinade. Sprinkle the pizzas evenly with Mozzarella and Fontina cheeses. Arrange tomatoes overtop, then sprinkle with shredded basil, Parmesan, and feta cheese.	2	100
365	Bake in preheated oven until the cheese is bubbly and golden brown, about 10 minutes.	3	100
366	Gather ingredients. Cook rice according instructions.	1	101
367	Heat a wok or large skillet over medium-high heat, and add oil. Saute garlic for about 5 seconds, then add ground beef. Stir-fry until beef is evenly brown, 5 to 7 minutes; drain excess fat.	2	101
368	Stir in cabbage and pepper, and cook until vegetables are tender and beef is fully cooked. Stir in soy sauce.	3	101
369	Mix together cornstarch and water, and stir in. Season with pepper; add salt to taste. Cook, stirring, until sauce has thickened. Serve with rice.	4	101
370	Whisk miso paste, canola oil, rice vinegar, orange zest, orange juice, ginger, mirin, peanut butter, and chile garlic sauce together in a bowl until dressing is blended.	1	102
371	Bring water to a boil in a large pot. Stir in soba noodles and return water to a boil. Boil noodles until tender, 5 to 8 minutes. Drain noodles in a colander under cold running water until cool, about 1 minute. Toss cooked soba noodles with 1/2 of the miso dressing in a large bowl until thoroughly coated.	2	102
372	Divide spinach among bowls; top each with dressed noodles. Divide carrots, cabbage, snow peas, and cherry tomatoes among each bowl; top each with shrimps. Drizzle remaining miso dressing onto each bowl to taste; sprinkle with green onions and toasted sesame seeds.	3	102
373	Rinse rice well until water runs clear. Place drained rice in a pot. Add water, pineapple chunks and juice, coconut milk, and red pepper flakes. Place the lid on the pot.	1	103
374	Cook on high heat, about 20 minutes. Stir in lime zest and juice.	2	103
375	Heat the vegetable oil over medium heat in a large frying pan. Cook the garlic until fragrant, about 30 seconds. Gently stir in the tofu and peanuts; cook until the tofu has lightly browned. Pour in the soy sauce, and cook, stirring frequently, until absorbed by the tofu. Remove from heat and let cool. Refrigerate for at least 20 minutes.	1	104
376	Toss the sliced cucumbers together with the chili sauce, lime juice, and cilantro. Gently fold in the chilled tofu.	2	104
377	Stir refried beans in a saucepan over medium-low heat until hot, 2 to 4 minutes.	1	105
378	Warm tortilla in a skillet over low heat until softened, 1 to 2 minutes. Transfer tortilla to a plate.	2	105
379	Layer lettuce onto tortilla. Spread warmed refried beans, avocado slices, and pico de gallo on top of lettuce. Roll tortilla around the fillings into a burrito shape.	3	105
380	Whisk water, lime juice, fish sauce, brown sugar, garlic, ginger, and chile sauce together in a bowl until the sugar is dissolved.	1	106
381	Bring a large pot of water to a full boil; remove from heat and soak rice noodles in the hot water for 1 minute. Stir to separate the noodles and continue soaking until the noodles are tender, about 3 minutes more. Drain noodles and rinse with cold water until cooled. Shake noodles in colander to drain as much water as possible.	2	106
382	Mix noodles, cabbage, carrots, shrimp, bean sprouts, cucumber slices, green onions, mint, cilantro, and basil together in a large bowl. Drizzle the dressing over the salad and toss to coat. Top with chopped peanuts.	3	106
383	Heat oil in a large skillet over medium heat. Brown chops on all sides and remove from pan.	1	107
467	Place chicken, peppers, onion, fajita seasoning, olive oil, salt, and pepper in a large bowl and toss until chicken and vegetables are evenly coated.	4	131
384	Add the garlic, onion, sauerkraut, caraway seed, apple juice, and salt and pepper to taste to the hot skillet. Saute for 3 to 4 minutes. Lay browned pork chops on top of sauerkraut mixture, cover, reduce heat to low and cook for 20 minutes, stirring occasionally.	2	107
385	Cook tofu, oil, garlic, and onion in a large skillet over medium heat for 5 minutes. Add chili powder, paprika, cayenne, cumin, salt, lime juice, and tomato sauce to the skillet and stir. Cook for 3 minutes.	1	108
386	Stir in cilantro. Spoon mixture into a bowl.	2	108
387	Spoon tofu mixture into taco shells. Top the mixture with lettuce, tomatoes, avocado, cheese, and salsa.	3	108
388	Spread hummus onto naan bread; top with arugula, date, and pumpkin seeds. Drizzle balsamic vinegar over pizza.	1	109
389	Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C).	1	110
390	Place salmon on a lightly oiled sheet pan or in a shallow baking dish, folding under thin outer edges of fillets for even cooking.	2	110
391	Top salmon with chopped tomatoes and green onions, and season with salt and pepper.	3	110
392	Cook salmon in the preheated oven, uncovered, until fish flakes easily with a fork, about 20 minutes. Cook rice according instructions. Serve with rice.	4	110
393	Preheat the oven to 350 degrees F (175 degrees C).	1	111
394	Cook ground beef in a large skillet over medium-high heat until browned and crumbly, 5 to 7 minutes. Remove from the heat and drain.	2	111
395	Stir salsa, corn, salad dressing, and chili powder into the skillet until well combined.	3	111
396	Layer 1/2 of the ground beef mixture in an ungreased casserole dish; top with 1/2 of the tortilla chips and 1/2 of the cheese. Repeat layers once more.	4	111
397	Bake, uncovered, in the preheated oven, until heated through and cheese is melted, about 20 minutes.	5	111
398	Cook rice according instructions. When rice is tender add beans and butter, combine and heat until everything is hot.	1	112
399	In the meantime in a blender or mini food processor, combine 1/2 of avocado, 1/2 cilantro, and lime juice. Blend until sauce is thin. Add water if needed.	2	112
400	Heat a large skillet over medium heat. Melt butter in skillet; add rice and beans, stirring frequently. Cook until heated through, about 3 minutes. Add water, as needed, to get rice to desired texture. Remove from heat; set aside.	3	112
401	Evenly divide rice and bean mixtur, tomatoes, and corn among bowls. Sprinkle with salt and pepper. Drizzle with avocado-cilantro sauce. Top evenly with remaining avocado and cilantro. Add some crushed tortilla chips to each bowl.	4	112
402	Heat olive oil in a medium pan over medium heat. Add garlic and stir until fragrant, 1 to 2 minutes. Add butter and stir constantly until melted. Pour in chicken broth; add pepper and salt. Bring to a boil.	1	113
403	Add spaghetti and cook, stirring occasionally, until tender yet firm to the bite, about 12 minutes. Add more chicken broth if pasta starts to stick to the pan.	2	113
404	Add Parmesan cheese, cream, and parsley and mix until thoroughly combined. Serve immediately.	3	113
405	Heat olive oil in a medium skillet over medium heat, and saute green onions until tender. Stir in tomatoes with juice and mashed tofu. Season with salt, pepper, and turmeric. Reduce heat, and simmer until heated through. Sprinkle with Cheddar cheese to serve.	1	114
406	Heat butter in a large skillet over medium heat. Add onion; cook and stir until translucent, about 5 minutes. Stir in garlic; cook and stir just until fragrant, about 1 minute. Stir cumin, salt, ginger, cayenne pepper, cinnamon, and turmeric into onion mixture; fry until fragrant, about 2 minutes.	1	115
407	Stir tomato sauce into onion and spice mixture; bring to a boil and reduce heat to low. Simmer sauce for 10 minutes, then mix in cream, sugar, and paprika. Bring sauce back to a simmer and cook, stirring often, until sauce is thickened, 10 to 15 minutes.	2	115
408	Heat vegetable oil in a separate skillet over medium heat. Stir chicken into hot oil; add curry powder. Sear chicken until lightly browned but still pink inside, about 3 minutes; stir often.	3	115
409	Transfer chicken and any pan juices into sauce. Simmer chicken in sauce until no longer pink, about 20 minutes; In the meantime cook rice according instructions. Serve together.	4	115
410	Preheat the oven to 350 degrees F (175 degrees C).	1	116
411	Spread pesto red onto one side of each pita bread and place them pesto-side up on a baking sheet. Top with tomatoes, spinach, mushrooms, feta cheese, and Parmesan cheese; drizzle with olive oil and season with pepper.	2	116
412	Bake in the preheated oven until pita breads are crisp, about 12 minutes. Cut pitas into quarters to serve.	3	116
413	Heat oil n a large skillet over medium-high heat. Cook and stir beef in the hot skillet until browned and crumbly, 5 to 10 minutes; drain and discard grease. Stir fajita seasoning into ground beef until evenly coated.	1	117
414	Mix pinto beans, salsa, and brown rice into ground beef mixture; top with Mexican cheese blend.	2	117
415	Preheat the oven to 350 degrees F (175 degrees C). Line a baking sheet with parchment paper.	1	118
416	Slice rolls in half lengthwise, but do not cut all the way through. Place rolls on the prepared baking sheet, open side up.	2	118
417	Evenly layer rolls with ham, salami, and capicola, folding to fit. Place the halved provolone and banana peppers on top of the meat.	3	118
418	Bake in the preheated oven just until cheese starts to melt, 5 to 8 minutes.	4	118
419	Remove sandwiches from the oven, dress with tomatoes, lettuce, and red onion as desired. Lightly drizzle with olive oil and red wine vinegar; sprinkle with oregano and season with salt and pepper. Serve warm.	5	118
420	Place rice and water in a pot and bring to a boil. Cover, reduce heat to low, and simmer 45 minutes, or until tender.	1	119
421	Heat the olive oil in a skillet over medium heat, and stir in garlic and tofu. Cook about 5 minutes. Mix in 1/4 cup marinara sauce, season with salt and pepper, and continue to cook and stir until tofu is evenly brown.	2	119
422	Preheat oven to 350 degrees F (175 degrees C).	3	119
423	Using a wooden spoon or spatula, press an equal amount of rice into each pepper half. Layer rice with remaining marinara sauce, and 1/2 the cheese. Press equal amounts of tofu into the pepper halves. Place 1 tomato slice on each pepper, and top peppers with remaining mozzarella. Arrange stuffed peppers in a baking dish.	4	119
424	Bake 25 minutes in the preheated oven, until cheese is melted. Serve 1/2 of each color pepper to each person.	5	119
425	Fill a large pot with lightly salted water and bring to a rolling boil; stir in noodles and return to a boil. Cook noodles uncovered, stirring occasionally, until tender yet firm to the bite, about 5 minutes. Drain and rinse with cold water.	1	120
426	Toss noodles with half with half the number of teaspoons in a bowl. Cut into shorter pieces using kitchen shears. Set aside.	2	120
427	Combine soy sauce and sugar in a bowl; set aside.	3	120
428	Heat vegetable oil in a skillet over medium-high heat. Sautee carrots and onion until soft, about 1 minute. Add mushrooms, green onions, and garlic. Sautee until fragrant, about 30 seconds. Add noodles, soy sauce mixture, and spinach. Cook and stir until noodles are heated through, 2 to 3 minutes more.	4	120
429	Remove the skillet from heat. Toss in remaining tablespoon sesame oil and sesame seeds.	5	120
430	Preheat the oven to 450 degrees F (230 degrees C). Line a baking sheet with aluminum foil and grease with cooking spray.	1	121
431	Combine olive oil, garlic, salt, and pepper in a bowl. Add cauliflower, tomatoes, and garbanzo beans; toss until well coated. Spread in a single layer on the prepared baking sheet. Add lime wedges.	2	121
432	Roast in the preheated oven until vegetables are caramelized, about 25 minutes. Remove lime wedges and top with fresh cilantro.	3	121
433	Add mayonnaise, buttermilk, pesto, lemon juice, and garlic to the bowl of a food processor. Blend until smooth. Season to taste with black pepper. Set dressing aside.	1	122
434	Meanwhile, heat a skillet over medium-high heat. Season salmon with Greek seasoning. Cut salmon into two filets. Melt butter in a skillet over medium heat and add olive oil. Place salmon, skin side down, in the hot skillet. Cook until salmon flakes easily with a fork, about 8 minutes.	2	122
435	Bring water to a boil in a saucepan; remove from heat and stir couscous into the water. Cover saucepan and let stand until water is absorbed completely, about 10 minutes.	3	122
436	To assemble, place arugula and spinach into dinner bowls, and sprinkle chopped tomatoes over the salad. Fluff couscous with a fork. Mound couscous in the center of each bowl. Sprinkle Parmesan cheese around couscous. Place a salmon filet to the side of the couscous. Pour some tablespoons pesto dressing on top of dish. Sprinkle with pepitas. Serve immediately.	4	122
437	Mash chickpeas in a medium bowl with a fork. Mix in celery, onion, mayonnaise, lemon juice, and dill until well combined. Season with salt and pepper.	1	123
438	You can use any raw, chopped vegetable instead of celery.	2	123
439	You can use your favorite salad dressing instead of mayonnaise.	3	123
440	Preheat the oven to 425 degrees F (220 degrees C). Line a jelly roll pan with aluminum foil.	1	124
441	Toss potatoes with some olive oil in a medium bowl. Pour into the prepared pan.	2	124
442	Roast in the preheated oven until tender, about 30 minutes.	3	124
443	Toss cherry tomatoes, green beans, garlic, basil, and sea salt with some olive oil.	4	124
444	Remove potatoes from the oven, push them to one side of the pan, and add the tomato and green bean mixture. Roast until tomatoes start to wilt, 15 to 20 minutes more.	5	124
445	Remove from the oven and pour into a serving dish. Stir in garbanzo beans, add some olive oil, and season with salt and pepper.	6	124
446	Mix artichoke hearts, dill, olive oil, lemon juice, garlic, and black pepper together in a bowl; add spinach, tuna, and red bell pepper and toss.	1	125
447	Mix cream cheese and Dijon mustard together until smooth; spread about 2 tablespoons of cream cheese mixture on each tortilla, spreading to within 1/4 inch of the edge.	1	126
448	Arrange a liitle bit of shredded lettuce on each tortilla; press lettuce down into cream cheese mixture. Place 2 turkey slices per tortilla over the lettuce, and sprinkle with some shredded Swiss cheese. Top each tortilla evenly with crumbled bacon, tomato, and avocado slices.	2	126
449	Roll each tortilla up tightly; cut in half across the middle with a slightly diagonal cut.	3	126
450	Heat canola oil in a skillet over medium-high heat; season with onion powder and garlic powder. Stir in rice and cook until golden, 2 to 4 minutes.	1	127
451	Stir in water and tomato sauce; bring to a boil. Reduce heat to medium-low, cover, and simmer until rice is tender, about 15 minutes.	2	127
452	Preheat the oven to 350 degrees F (175 degrees C).	1	128
453	Heat oil in a nonstick skillet over medium heat. Add chicken and cook until no longer pink and juices run clear, 5 to 7 minutes per side.	2	128
454	Transfer chicken to a cutting board and slice into cubes. Return chicken to the skillet.	3	128
455	Add onion, half of Cheddar cheese, sour cream, parsley, oregano, and black pepper. Cook and stir over low heat until cheese melts. Stir in tomato sauce, green pepper, garlic, chili powder, and salt. Add water if needed.	4	128
456	Spoon chicken mixture into tortillas and roll into enchiladas. Arrange enchiladas, seam-side down, in a 9x13-inch baking dish. Top with taco sauce and remaining half of Cheddar cheese.	5	128
457	Bake in the preheated oven, uncovered, until cheese has melted, about 20 minutes. Let cool briefly before serving.	6	128
458	Place chicken breasts in a saucepan and cover with water. Bring to a boil over medium heat, then simmer until no longer pink, 10 to 12 minutes.	1	129
459	Transfer chicken breasts to a bowl. Allow to cool briefly, then shred with 2 forks.	2	129
460	Heat vegetable oil in a saucepan over medium heat. Add onion and cook until translucent, 2 to 3 minutes. Stir in shredded chicken, tomato sauce, cumin, and chili powder. Bring to a boil, then reduce heat to low and simmer until chicken is hot and flavors have blended, about 3 minutes.	3	129
461	If you prefer more sauce, add additional tomato sauce a spoonful at a time to your liking.	4	129
462	Heat oil in a large saucepan over medium heat. Add rice and season with garlic salt and cumin; cook, stirring constantly, until puffed and golden.	1	130
463	Add onion; cook and stir until onion has softened. Stir in chicken broth and tomato sauce; bring to a boil. Reduce heat to low, cover, and simmer for 20 to 25 minutes. Fluff rice with a fork.	2	130
464	Preheat the oven to 350 degrees F (175 degrees C).	1	131
465	Add uncooked rice to a dry saucepan over medium; cook, stirring constantly, until rice is fragrant and no longer translucent, 3 to 4 minutes.	2	131
466	Transfer to an ungreased baking dish and stir in cilantro, lime zest, and lime juice; mix until combined.	3	131
617	Mix cornstarch, broth, soy and sugar until smooth. Set aside.	2	168
469	Bake in preheated oven until chicken is cooked through and rice is tender, about 45 to 50 minutes.	6	131
470	Remove from oven, uncover, and top with desired toppings. Serve with lime wedges.	7	131
471	Season the chicken with salt and pepper. Add the chicken, carrot, celery, beans, corn, tomato paste, cumin, chili powder, and Chicken Broth to a 6-quart Instant Pot.	1	132
472	Lock the lid and close the pressure release valve. Pressure cook on High pressure, setting the timer to 5 minutes (timer will begin counting down once pressure is reached- it takes about 15 minutes). When done, press Cancel and use the quick-release method to release the pressure.	2	132
473	Remove the chicken from the pot. Shred the chicken and return to the pot. Season to taste. Serve topped with tortilla strips, fresh chopped cilantro, avocado, or sliced jalapeno pepper, if desired.	3	132
474	Sautee chicken in a medium saucepan over medium high heat until tender, about 15 to 20 minutes. Add green onions, vinegar, lime juice, garlic, oregano, sugar, salt, and pepper. Simmer over low heat for 10 minutes.	1	133
475	Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.	2	133
476	Combine chicken, lemonade, olive oil, lime juice, and Worcestershire sauce in a large skillet over medium heat. Stir in garlic powder, onion powder, and bay leaf. Simmer until chicken is tender and juices run clear, 15 to 20 minutes.	1	134
477	Meanwhile, warm the tortillas in the oven or microwave until soft. When chicken is fully cooked, transfer to serving bowl. Place chopped tomatoes, lettuce, cheese, salsa, and sour cream in serving dishes. Each person can create their own wrap, using their preferred ingredients.	2	134
478	Cook tomato on a ridged grill pan over medium-high heat until slightly blackened, about 5 minutes. Remove from heat and cool until easily handled. Peel off skin and remove seeds.	1	135
479	Bring a small pot of water to a boil. Add guajillo and ancho chile peppers; cook until softened, about 5 minutes. Drain.	2	135
480	Combine tomato flesh, softened chile peppers, 2 slices pineapple, orange juice, quartered onion, vinegar, chipotle peppers, salt, garlic, cloves, cumin seeds, and oregano in a blender; blend until smooth.	3	135
481	Arrange pork slices in a glass or ceramic baking dish. Pour blended mixture over pork, ensuring all sides are evenly coated. Cover baking dish with plastic wrap.	4	135
482	Marinate pork in the refrigerator, 4 hours to overnight.	5	135
483	Cook remaining pineapple slices on a ridged grill pan over medium-high heat until slightly blackened and soft, about 5 minutes per side. Chop into small pieces.	6	135
484	Wipe out grill pan and preheat over medium-high heat. Cook marinated pork in the hot pan, turning once, until browned, 4 to 5 minutes.	7	135
485	Chop pork coarsely into small pieces against the grain. Serve with pineapple, chopped onion, and cilantro.	8	135
486	Preheat oven to 200 degrees F (95 degrees C). Place a serving platter into the oven to warm.	1	136
487	Season the chicken breast pieces with salt and pepper and dredge them in flour. Shake off excess flour. Heat the vegetable oil in a skillet; pan-fry the chicken pieces until golden brown on both sides, about 3 minutes per side. Work in batches and do not crowd skillet, adding oil as needed . Place the chicken pieces onto the warmed platter in the oven. When finished with all the chicken, drain most of the oil from the skillet, leaving a thin coating on the surface of the pan.	2	136
488	Cook and stir the minced garlic in the skillet until fragrant, about 20 seconds. Pour in the chicken broth. Scrape and dissolve any brown bits from the bottom of the skillet. Stir in the lemon slices and bring the mixture to a boil. Let cook, stirring occasionally, until the sauce reduces strongly, 5 to 8 minutes. Add the lemon juice and capers; simmer until the sauce is reduced and slightly thickened, about 5 minutes more. Drop the butter into the skillet and swirl it into the sauce by tilting the skillet until the butter is melted and incorporated. Add the parsley; remove from heat and set aside.	3	136
489	Arrange the chicken medallions on serving plates and spoon sauce over each portion to serve.	4	136
490	Open marinated mozzarella balls and measure out 1/4 of the oil.	1	137
491	Pour oil into a heavy skillet over medium-high heat. Cook gnocchi in batches in the hot oil until golden and heated through. Divide gnocchi evenly on dishes.	2	137
492	Add garlic and red chili flakes to the oil in the same skillet. Cook until garlic is fragrant, about 30 seconds. Stir in salt and sugar. Pour in tomatoes. Use a wooden spoon to break up and crush the tomatoes.	3	137
493	Bring sauce to a boil, reduce heat, cover and simmer tomatoes for 15 minutes.	4	137
494	Set an oven rack about 6 inches from the heat source and preheat the oven's broiler.	5	137
495	Taste sauce and adjust seasonings if desired. Spoon tomato sauce over the gnocchi. Top each dish evenly with marinated mozzarella balls and set on a baking sheet.	6	137
496	Add baking sheet to oven and broil until mozzarella balls are melted and golden browned, 3 to 5 minutes. Garnish with parsley or basil if desired and serve immediately.	7	137
497	On a 6-quart Instant Pot, select the Saute setting. Heat the oil. Add the sausage and cook for 10 minutes or until well browned, stirring often to separate meat. Press Cancel.	1	138
498	Add the onion, garlic, beans, Italian seasoning, and Chicken Broth. Lock the lid and close the pressure release valve. Pressure cook on High pressure, setting the timer to 3 minutes (timer will begin counting down once pressure is reached- it takes about 10 minutes).	2	138
499	When done, press Cancel and use the quick-release method to release the pressure.	3	138
500	Stir in the kale and let stand for 5 minutes. Season to taste and sprinkle with the cheese.	4	138
501	Trim kale leaves from stems before finely chopping.	5	138
502	Heat oil in a large Dutch oven over medium-high. Season chuck roast with pepper and salt. Sear meat until browned on every side, working in batches if necessary, about 10 minutes. Remove from Dutch oven and transfer to a large plate.	1	139
503	Reduce heat to medium and stir in onion. Cook, stirring often, until softened, about 8 minutes. Add garlic and cook, stirring constantly, until fragrant, about 1 minute. Stir in harissa and tomato paste; cook, stirring constantly, until caramelized, about 2 minutes.	2	139
576	Combine pasta, artichoke hearts, cucumber, tomato, onion, feta, olives, parsley, lemon juice, oregano, and lemon pepper in a large bowl; toss well. Chill in the refrigerator for 1 hour.	4	156
504	Pour in wine and cook, scraping the bottom of the pot with a wooden spoon to loosen any browned bits, until reduced by two thirds, about 5 minutes. Stir in tomatoes, bay leaf, chuck roast, and remaining 1 teaspoon salt. Reduce heat to medium-low and cover. Cook, stirring occasionally, until meat is tender, sauce has thickened, and flavors meld, about 2 1/2 hours.	3	139
505	In the meantime cook pasta and drain.	4	139
506	Remove and discard bay leaf. Transfer meat from Dutch oven to a cutting board and shred using 2 forks. Return meat to pot and stir in pasta. Top with grated Parmesan cheese.	5	139
507	Lay beef in a single layer on a baking sheet lined with paper towels. Allow to dry in the refrigerator for 30 minutes.	1	140
508	Meanwhile, bring water and rice to a boil in a medium saucepan. Reduce heat to medium-low, cover, and simmer until rice is tender, about 20 minutes.	2	140
509	Mix together sugar, rice vinegar, orange juice concentrate, soy sauce, and salt in a small bowl. Set aside.	3	140
510	Heat oil in a wok over medium-high heat. Toss dried beef in cornstarch to coat. Fry coated beef in hot oil in small batches until crispy and golden brown; set aside. Drain oil from the wok, leaving about 1 tablespoon.	4	140
511	Add ginger, garlic, and orange zest to remaining oil in wok. Cook and stir briefly until fragrant. Pour in soy sauce mixture; bring to a boil and cook until thick and syrupy, about 5 minutes. Stir in fried beef and cook until heated through. Serve hot over steamed rice and garnish with broccoli.	5	140
512	Heat sesame oil in a large skillet over medium heat. Add onion and sautee until soft. Add cooked chicken and 2 tablespoons soy sauce; stir-fry for 5 to 6 minutes.	1	141
513	Stir in carrots, celery, red bell pepper, pea pods, and green bell pepper; stir-fry for 5 minutes. Mix in cooked rice until thoroughly combined.	2	141
514	Stir in scrambled eggs and soy sauce; cook until heated through and serve hot.	3	141
515	Bring a medium pot of water to a boil. Cook ramen noodles, reserving seasoning packets, in boiling water until softened, about 3 minutes. Drain noodles and set aside.	1	142
516	Heat 1/4 vegetable oil in a small skillet. Cook and stir beaten eggs in hot oil until scrambled and firm. Set aside.	2	142
517	Heat 1/4 vegetable oil in a large skillet over medium heat. Cook and stir green onions in hot oil until softened, 2 to 3 minutes. Remove green onions to a plate; set aside.	3	142
518	Heat 1/4 vegetable oil in the same skillet over medium heat. Cook and stir carrots, peas, and bell pepper separately until softened, removing each to the plate with green onions when done.	4	142
519	Combine sesame oil with remaining vegetable oil in the same large skillet or a wok over medium heat. Fry cooked noodles in hot sesame-vegetable oil, tossing frequently, until golden, 3 to 5 minutes. Season with desired amounts of sesame oil, soy sauce, and reserved ramen seasoning packets; toss to coat. Stir in cooked vegetables, tossing frequently, until heated through, about 5 more minutes.	5	142
520	Heat the oil in a wok over medium heat. Stir in the onions, ginger garlic paste, and bay leaf. Cook until the onions are tender. Mix in the potatoes and peas. Cover and cook until the potatoes are tender, about 15 minutes. Remove the bay leaf.	1	143
521	Stir the tomato puree, garam masala, paprika, sugar, and salt into the vegetable mixture. Continue cooking about 10 minutes. Mix in the cilantro and continue cooking about 2 minutes.	2	143
522	Heat oil in a skillet over medium heat. Cook onion, garlic, and ginger in hot oil until softened, about 5 minutes. Add chickpeas, tomatoes, coconut milk, and sweet potato. Bring to a boil, reduce heat to low, and simmer until tender, about 15 minutes.	1	144
523	Season with garam masala, cumin, turmeric, salt, and chile flakes. Add spinach right before serving.	2	144
524	Grind onion, tomato, ginger, garlic, and chile pepper together in a food processor into a paste.	1	145
525	Heat olive oil in a large skillet over medium heat. Fry bay leaves in hot oil until fragrant, about 30 seconds. Pour the paste into the skillet and cook until the oil begins to separate from the mixture and is golden brown in color, 2 to 3 minutes. Season the mixture with chili powder, coriander, gram masala, turmeric, and salt; cook and stir until very hot, 2 to 3 minutes.	2	145
526	Stir enough water into the mixture to get a thick gravy; bring to a boil and stir chickpeas into the gravy. Reduce heat to medium and cook until the chickpeas are heated through, 5 to 7 minutes. Garnish with cilantro.	3	145
527	Serve with a 'Mattar Paneer' recipe to round out this Indian dinner.	4	145
528	Cook rice according instructions and serve everything together	5	145
529	Make a spice mix by combining garam masala, tandoori masala, curry powder, cumin, cardamom, cayenne, salt, and black pepper in a small bowl; set aside.	1	146
530	Place chicken in a large bowl and add 1/2 of the spice mixture; turn to coat evenly.	2	146
531	Melt 1/3 of butter in a large skillet over medium heat. Add chicken; cook and stir until lightly browned, about 10 minutes. Remove from heat.	3	146
532	Melt remaining 2/3 of butter in a large saucepan over medium heat. Add onion; cook and stir until soft and translucent, about 5 minutes. Stir in remainder of the spice mixture, garlic, lemon juice, and ginger; cook and stir until combined, about 1 minute.	4	146
533	Stir tomato puree into onion mixture and cook, stirring frequently, about 2 minutes. Pour in yogurt. Reduce heat to low and simmer sauce, stirring frequently, about 10 minutes. Remove from heat.	5	146
534	Blend cashews in a blender until finely ground. Add sauce to the blender; puree until smooth.	6	146
535	Cook rice according instructions.	7	146
536	In the meantime pour blended sauce over chicken in the skillet. Simmer until thickened, 10 to 15 minutes. Serve with rice and garnish with cilantro.	8	146
537	Heat butter and vegetable oil in a large skillet over medium heat. Stir in chicken, onion, and garlic. Cook and stir until onion has softened and turned translucent, about 10 minutes. Stir in tomato paste, curry paste, curry powder, tandoori masala, and garam masala until no lumps of tomato paste remain.	1	147
538	Pour mixture into a slow cooker; stir in cardamom pods, coconut milk, and yogurt. Season with salt. Pierce a needle with thread through the top of a cardamom pod. Continue with all the cardamom pods, then tie the ends together in a knot, so it looks like a ring. This makes it easy to remove the pods after cooking and prevents someone from biting down on one while eating.	2	147
539	Cook on High for 4 to 6 hours (or on Low for 6 to 8 hours) until chicken is tender and sauce has reduced to desired consistency. Remove and discard cardamom pods before serving.	3	147
540	Place flour, egg, salt, cayenne, cream fraiche, and milk in a mixing bowl. Whisk together until batter drips slowly off the whisk. If batter seems too thin, add a bit more flour; if too thick, add a bit more milk. You can test the thickness using the smooth side of a cheese grater with fairly large holes. If a dollop of the batter does not drip through the grating holes, it's the right consistency.	1	148
541	Bring a pot of salted water to a simmer over medium-high heat. Use a spatula to push a spoonful of batter through the holes of the smooth side of the grater into the simmering water.	2	148
542	When dumplings rise to the surface of the water, they are done. This will take just a few minutes. Remove dumplings with a slotted spoon, and repeat in batches with remaining batter.	3	148
543	If you're planning to eat this with butter, be sure to melt the butter in a skillet and cook it until it's nutty brown before you make the spaetzle. Remove skillet from the heat until your spaetzle are cooked. Turn the heat up to medium and cook and stir the spaetzle until they are coated with butter. Sprinkle with chopped parsley and serve.	4	148
544	Preheat oven to 350 degrees F (175 degrees C).	1	149
545	Bring potatoes to a boil in a large pot of salted water. Reduce heat to medium-low and simmer until tender, about 20 minutes. Drain; transfer potatoes to a large baking dish.	2	149
546	Place bacon in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain the bacon slices on paper towels; crumble and sprinkle over potatoes.	3	149
547	Heat a skillet over medium heat; cook and stir celery and green onion until celery is tender, about 5 minutes. Transfer vegetables to baking dish.	4	149
548	Whisk mayonnaise, vinegar, sugar, mustard, salt, and black pepper in a bowl until smooth. Pour mixture over potatoes and stir until well mixed. Sprinkle with Cheddar cheese.	5	149
549	Bake in preheated oven until cheese is melted, 20 to 35 minutes.	6	149
550	In a shallow dish, mix together the bread crumbs and flour. Season with salt and pepper. Place the egg in a separate dish. Heat oil in a large skillet over medium-high heat. Dip pork steaks in egg, then coat with the bread crumb mixture. Fry in the hot oil until browned on both sides and cooked through, about 5 minutes per side.	1	150
551	Remove the pork to a platter and keep warm. Add onion and mushrooms to the skillet and cook until lightly browned. Pour in water and dissolve the bouillon cube. Simmer for about 20 minutes. Stir together the cornstarch and sour cream; stir into the skillet. Cook over low heat until thickened but do not boil. Spoon over the pork cutlets and serve immediately.	2	150
552	Preheat the oven to 425 degrees F (220 degrees C).	1	151
553	Combine salt, caraway, sage, fennel, coriander, and rosemary in a spice grinder or mortar. Grind to a coarse powder. Transfer spice mixture to a bowl; stir in paprika, garlic powder, flour, and onion powder. Mix in vegetable oil to make a smooth paste.	2	151
554	Pat chicken halves dry with paper towels and tuck wing tips behind the back. Brush spice paste onto chicken halves, coating all sides and seasoning under wings and legs. Place chicken halves, skin-sides up, in a baking dish or roasting pan, leaving space around chickens so halves aren't touching.	3	151
555	Roast in the preheated oven until no longer pink at the bone and the juices run clear, about 1 hour. An instant-read thermometer inserted into the thickest part of the thigh, near the bone, should read 165 degrees F (74 degrees C). Remove from the oven and let rest for 10 minutes before slicing.	4	151
556	Place beef rump roast, onions, vinegar, water, salt, black pepper, sugar, cloves, and bay leaves in a large pot. Cover and refrigerate for 2 to 3 days, turning meat daily. Remove meat from marinade and pat dry with paper towels, reserving marinade.	1	152
557	Season flour to taste with salt and black pepper in a large bowl. Sprinkle flour mixture over beef.	2	152
558	Heat vegetable oil in a large Dutch oven or pot over medium heat; cook beef until brown on all sides, about 10 minutes.	3	152
559	Pour reserved marinade over beef, cover, and reduce heat to medium-low. Simmer until beef is tender, 3 1/2 to 4 hours.	4	152
560	Remove beef to a platter and slice.	5	152
561	Strain solids from remaining liquid and continue cooking over medium heat. Simmer until gravy is thickened, about 10 minutes. Serve gravy over sliced beef.	6	152
562	Preheat the oven to 450 degrees F (230 degrees C). Lightly oil a large baking dish.	1	153
563	Stir together potatoes, water, olive oil, lemon juice, garlic, salt, and pepper in a large bowl until potatoes are evenly coated. Pour into the prepared baking dish.	2	153
564	Roast in the preheated oven until potatoes begin to brown, about 40 minutes. Season potatoes with oregano and mint. If mixture appears dry, pour another 1/2 cup water into the dish. Return to the oven and bake until potatoes are very tender, about 40 minutes more. Top with feta cheese to serve.	3	153
565	Preheat the oven to 400 degrees F (200 degrees C).	1	154
566	Spread potatoes, zucchini, and red onions in an extra-large baking dish (9x13-inch or larger, or use 2 baking dishes if necessary). Cover with pureed tomatoes, olive oil, and parsley; season liberally with salt and pepper. Toss all ingredients together so that vegetables are evenly coated.	2	154
567	Bake in the preheated oven for 1 hour. Stir, then continue to bake until vegetables are tender and the moisture has evaporated, about 30 minutes more. If vegetables are too dry, add a few tablespoons hot water. There should be no water left in the end, however.	3	154
568	Remove from the oven and cool slightly before serving, or serve at room temperature.	4	154
569	Cut three slits in each chicken breast to allow marinade to penetrate. Place chicken into a large bowl.	1	155
570	Whisk oil, lemon juice, garlic, pepper, salt, and paprika together for about 30 seconds. Pour over chicken; use your hands to work marinade into chicken. Cover and refrigerate, 8 hours to overnight.	2	155
571	Preheat an outdoor grill for medium heat and lightly oil the grate.	3	155
572	Cook chicken on the preheated grill until meat is no longer pink and juices run clear, 10 to 12 minutes, flipping halfway through. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).	4	155
573	Bring a large pot of lightly salted water to a boil. Add pasta and cook until al dente, 8 to 10 minutes; drain.	1	156
574	Drain artichoke hearts, reserving liquid.	2	156
575	Gather prepared ingredients together.	3	156
577	Just before serving, drizzle reserved artichoke marinade over salad.	5	156
578	Place lentils in a large saucepan; add enough water to cover by 1 inch. Bring water to a boil and cook for 10 minutes; drain.	1	157
579	Heat olive oil in a saucepan over medium heat. Add onion, carrot, and garlic; cook and stir until onion has softened and turned translucent, about 5 minutes. Pour in lentils, then add water, bay leaves, oregano, and rosemary. Bring to a boil. Cover and reduce heat to medium-low; simmer for 10 minutes.	2	157
580	Stir in tomato paste; season with salt and pepper. Cover and simmer, stirring occasionally, until lentils have softened, 30 to 40 minutes. Add additional water if soup becomes too thick. Drizzle with olive oil and red wine vinegar to serve.	3	157
581	Prepare kabobs: Combine most of the olive oil, 1/2 garlic, lemon juice, oregano, and salt in a large resealable bag. Add chicken, coat with the marinade, squeeze out excess air and seal the bag; marinate in the refrigerator for 2 hours.	1	158
582	Prepare sauce: Mix yogurt, cucumber, remaining olive oil, vinegar, remaining garlic, and salt together in a bowl. Refrigerate sauce for flavors to blend, 1 to 2 hours.	2	158
583	Soak wooden skewers in a bowl of cold water for about 15 minutes. Preheat an outdoor grill for medium-high heat and lightly oil the grate.	3	158
584	Remove chicken from marinade and thread onto the soaked skewers. Discard unused marinade.	4	158
585	Cook the skewers on the preheated grill, turning frequently until browned on all sides and chicken is no longer pink in the center, about 7 to 8 minutes per side. Serve with tzatziki sauce.	5	158
586	Fill a large pot with lightly salted water and bring to a rolling boil. Stir in penne and return to a boil. Cook pasta uncovered, stirring occasionally, until tender yet firm to the bite, about 10 minutes; rinse with cold water and drain well.	1	159
587	Whisk olive oil, vinegar, garlic, lemon juice, oregano, salt, and pepper together in a bowl; set aside.	2	159
588	Combine pasta, tomatoes, green and red peppers, onion, cucumber, olives, and feta cheese in a large bowl. Pour vinaigrette over the pasta mixture and mix well. Optional: Cover and chill for 3 hours before serving.	3	159
589	Preheat the oven to 400 degrees F (200 degrees C).	1	160
590	Put potato wedges in a large bowl. Drizzle with olive oil and lemon juice and toss to coat. Season with salt, oregano, and black pepper; toss again to coat.	2	160
591	Spread potato wedges in a single layer in a 2-inch-deep pan. Pour chicken broth over potatoes.	3	160
592	Roast potatoes in the preheated oven until tender and golden brown, about 1 hour. Alternately, you could roast these in a foil pan on the grill for 30 to 40 minutes.	4	160
593	Preheat an outdoor grill for high heat, and lightly oil grate.	1	161
594	In a large pot, mix soy sauce, water, vinegar, honey, garlic, bay leaves, and pepper. Bring the mixture to a boil, and place the chicken into the pot. Reduce heat, cover, and cook 35 to 40 minutes.	2	161
595	Remove chicken, drain on paper towels, and set aside. Discard bay leaves. Return the mixture to a boil, and cook until it is strongly reduced.	3	161
596	Place chicken on the prepared grill, about 5 minutes on each side, until browned and crisp. Serve with the remaining soy sauce mixture.	4	161
597	Heat oil in a large skillet over medium-high heat. Cook and stir ground pork and garlic in hot oil until garlic is golden brown; do not allow garlic to burn, or it will taste bitter.	1	162
598	Stir in cooked rice; season with garlic salt and black pepper. Cook and stir until heated through and well blended, about 3 minutes.	2	162
599	Whisk flour, sugar, and salt together in a bowl until well blended. Make a well in the center.	1	163
600	Whisk water and egg yolk together in a small bowl until smooth; pour into the well and mix to form a stiff dough.	2	163
601	Transfer the dough to a lightly floured surface and knead until smooth and elastic, about 8 minutes. Roll dough with a rolling pin until thin, dusting with flour as needed to prevent sticking. Brush melted butter over top and roll dough into a log.	3	163
602	Cut the log crosswise into same sized pieces. Roll each slice into a disk.	4	163
603	Preheat the oven to 350 degrees F (175 degrees C). Fill each empanada disk with about 1 tablespoon of your favorite filling. Fold the disk over the filling into a half-moon and seal firmly. Place empanadas onto a foil-lined baking sheet and brush the tops with beaten egg white. Bake in the preheated oven until golden brown, about 30 minutes.	5	163
604	Heat vegetable oil in a skillet over medium heat. Add onion; cook and stir until softened and translucent, about 5 minutes. Season with salt.	1	164
605	Stir in ginger, tomatoes, and pork chops. Cover and reduce heat to medium-low. Turn the pork occasionally, until browned.	2	164
606	Pour in water and tamarind soup base. Bring to a boil, then reduce heat and simmer until the pork is tender and cooked through, about 30 minutes.	3	164
607	Stir in green beans and cook until tender.	4	164
608	Heat canola oil and sesame oil in a large skillet over medium-high heat. Cook and stir chicken and garlic in hot oil until fragrant, about 1 minute. Stir chile paste into chicken mixture; cook and stir until chicken is completely browned, 3 to 4 minutes. Add soy sauce and simmer for 2 minutes. Pour chicken and sauce into a bowl.	1	165
609	Heat canola oil in the skillet over medium-high heat; cook and stir cabbage, onion, carrots, and salt in hot oil until cabbage is wilted, 3 to 4 minutes.	2	165
610	Stir the chicken mixture into the cabbage mixture. Add noodles; cook and stir until noodles are hot and chicken is no longer pink inside, 3 to 4 minutes. Garnish with pickled ginger.	3	165
611	Mix dashi, sugar, mirin, soy sauce, and salt together in a small bowl.	1	166
612	Heat vegetable oil in a small skillet over medium heat. Add onion; cook and stir until translucent, about 5 minutes. Stir in dashi mixture. Lay pork slices carefully on top of the onions. Drizzle eggs around the slices. Cover skillet and cook until eggs are set, about 2 minutes.	2	166
613	Divide rice between serving bowls. Top each with onions, eggs, and pork slices(needed already to be breaded and fried).	3	166
614	Whisk together the soy sauce, water, sugar, honey, Worcestershire sauce, vinegar, olive oil, onion powder, garlic powder, and ginger, ground in a large bowl. Pierce steaks several times with a fork. Marinate steaks in soy sauce mixture for at least 2 hours.	1	167
615	Cook the steaks in a hot skillet, wok, or hibachi over medium heat; 7 minutes per side for medium. An instant-read thermometer inserted into the center should read 140 degrees F (60 degrees C).	2	167
616	Slice beef into very thin strips.	1	168
618	Heat oil in saucepot or wok over high heat. Add beef in 2 batches and stir-fry until browned. Set beef aside.	3	168
619	Add oil. Add the mushrooms, cabbage, peppers, celery and green onions in 2 batches and stir-fry over medium heat until tender-crisp. Set vegetables aside.	4	168
620	Stir cornstarch mixture and add. Cook until mixture boils and thickens, stirring constantly. Return beef and vegetables to saucepot and heat through. Serve over rice.	5	168
621	Mix together soy sauce, sake, mirin, and ginger in a large bowl until combined. Add sliced pork; stir to coat. Cover the bowl and marinate for about 1 hour.	1	169
622	Heat oil in a large skillet or wok over high heat. Sautee pork in hot oil until browned and cooked through; discard marinade. An instant-read thermometer inserted into pork should read at least 145 degrees F (63 degrees C). Do not sautee the pork on low or medium heat, as the juices will not cook fast enough to get a crispy texture.	2	169
623	Bring a large pot of lightly salted water to a boil. Cook udon in boiling water, stirring occasionally, until noodles are tender yet firm to the bite, 10 to 12 minutes. Drain and rinse with cold water. Stir in a few drops of sesame oil.	1	170
624	Heat the remaining sesame oil in a large skillet over medium heat. Cook broccoli until bright green and still crunchy, about 5 minutes. Add green bell pepper and carrots; cook and stir until slightly softened, about 2 minutes. Add zucchini; cook until slightly softened, about 2 minutes more. Add soy sauce, mirin, chili-garlic sauce, and ginger; stir to combine. Mix in the noodles; cook and stir until noodles absorb some of the sauce, 1 to 2 minutes more.	2	170
625	Bring a large pot of lightly salted water to a boil. Cook udon noodles in boiling water, stirring occasionally, until noodles are tender yet firm to the bite, 3 to 5 minutes. Drain.	1	171
626	Mix honey, soy sauce, sriracha sauce, and rice vinegar in a bowl. Set sauce aside.	2	171
627	Place bacon in a large pan and cook over high heat until fat is rendered but bacon is not yet crispy, 2 to 3 minutes. Add kimchi and garlic; cook for 1 minute. Add the sauce, udon noodles, and sesame oil; stir well. Remove from heat and transfer noodles to a plate. Top with scallions.	3	171
628	Bring a large pot of lightly salted water to a boil. Cook udon in boiling water, stirring occasionally, until noodles are tender yet firm to the bite, 10 to 12 minutes. Drain.	1	172
629	Meanwhile, combine chicken broth, soy sauce, peanut butter, ginger, honey, garlic, and chili paste in a medium saucepan. Cook and stir over medium heat until peanut butter melts and sauce is heated through.	2	172
630	Add drained noodles to peanut butter sauce; toss to coat. Garnish with green onions and peanuts.	3	172
631	Wash rice in a mesh strainer until water runs clear. Combine washed rice and water in a saucepan. Bring to a boil over high heat, stirring occasionally. Reduce heat to low; cover, and simmer rice until water is absorbed, 15 to 20 minutes. Let rice rest for 15 minutes to continue to steam and become tender. Allow cooked rice to cool.	1	173
632	Combine remaining 1 cup water with salt in a small bowl; use to dampen hands before handling rice. Divide cooked rice into equal portions. Use one portion of rice for each onigiri.	2	173
633	Divide one portion of rice in two. Create a dimple in rice and fill with a heaping teaspoon of bonito flakes. Cover with remaining portion of rice and press lightly to enclose filling inside rice ball. Gently press rice to shape into a triangle; wrap with a strip of nori and sprinkle with sesame seeds. Repeat with remaining portions of rice.	3	173
634	Combine some sugar, fish sauce, and black pepper in a shallow plate and turn chicken in the marinade. Set aside for 10 minutes.	1	174
635	Combine water, fish sauce, remaining sugar, and rice vinegar in a bowl. Set caramel sauce aside.	2	174
636	Heat a cast-iron skillet over medium-high heat. Add 1/2 oil and pan-fry chicken, skin-side up, until bottoms turn slightly crispy and brown, about 5 minutes. Turn and cook until skin is slightly charred, about 5 minutes. Remove chicken from skillet and transfer to a plate.	3	174
637	Add remaining oil to the skillet and cook garlic for 30 seconds. Return chicken to the skillet and add caramel sauce. Reduce heat to a simmer and cook until chicken is no longer pink at the bone and the juices run clear. Caramel sauce should be reduced and turn amber in color. Add jalapenos and cook for 1 more minute.	4	174
638	Place the lamb chops into a roasting pan, and season evenly with the garlic, garlic powder, chili powder, sugar, salt, and pepper. Drizzle with lime juice, soy sauce and olive oil. Cover and refrigerate overnight.	1	175
639	Preheat the oven to 400 degrees F (200 degrees C). Allow the lamb to stand at room temperature while the oven preheats.	2	175
640	Roast uncovered in the preheated oven to your desired degree of doneness, about 20 minutes for medium, or 30 minutes for well done. Garnish with a sprinkle of cilantro and squeeze lemon and lime juice over the top before serving.	3	175
641	Fill a large pot with lightly salted water and bring to a rolling boil; stir in vermicelli pasta and return to a boil. Cook pasta uncovered, stirring occasionally, until the pasta is tender yet firm to the bite, 3 to 5 minutes.	1	176
642	Fill a large bowl with warm water. Dip one wrapper into the hot water for 1 second to soften. Lay wrapper flat; place 2 shrimp halves in a row across the center, add some vermicelli, lettuce, mint, cilantro, and basil, leaving about 2 inches uncovered on each side. Fold uncovered sides inward, then tightly roll the wrapper, beginning at the end with lettuce. Repeat with remaining ingredients.	2	176
643	For the sauces: Mix water, lime juice, sugar, fish sauce, garlic, and chili sauce in a small bowl until well combined. Mix hoisin sauce and peanuts in a separate small bowl.	3	176
644	Serve rolled spring rolls with fish sauce and hoisin sauce mixtures.	4	176
645	On a plate, combine flour, cumin, cayenne pepper, and 1/2 of salt. Stir to distribute the spices. Coat pork chops with flour mixture, and shake off any excess.	1	177
646	Heat oil in a large skillet over medium-high heat. Place pork chops in the hot skillet, and fry for about 4 minutes per side, until cooked through.	2	177
647	While the pork chops cook, stir together chicken broth, coconut milk, peanut butter, honey, ginger, and rest of salt.	3	177
648	Remove pork chops to a serving platter, and keep warm.	4	177
649	Pour peanut sauce into the skillet. Cook, stirring constantly, for 2 minutes, or until thickened. Pour peanut sauce over chops, and garnish with green onion, bell pepper, peanuts, and cilantro.	5	177
650	Bring a large pot of water to a boil and cook bamboo shoots for 5 minutes. Drain.	1	178
651	Heat oil in a large pot over medium heat and cook curry paste until fragrant, about 2 minutes. Add pork, increase heat, and cook until starting to brown, 3 to 5 minutes. Add bamboo shoots, coconut milk, and red bell pepper.	2	178
652	Reduce heat and bring to a simmer. Season with sugar and salt; simmer for 10 minutes. Cook for 1 more minute. Season with fish sauce. Stir in Thai basil and serve.	3	178
653	Cook rice according to instructions and serve it with the rest of the food.	4	178
654	Season chicken pieces with salt and pepper; set aside.	1	179
655	Heat oil in a large skillet over medium-high heat. Cook and stir curry powder in hot oil for 1 minute. Stir in onions and garlic; cook 1 minute. Add chicken, tossing lightly to coat with curry oil. Reduce heat to medium and cook, stirring occasionally, until chicken is no longer pink in the center and juices run clear, 7 to 10 minutes.	2	179
656	Stir tomatoes, coconut milk, tomato sauce, and sugar into the skillet. Cover and simmer, stirring occasionally, for 30 to 40 minutes.	3	179
657	Pour 1/2 soy sauce into a shallow dish. Place flour into a separate shallow dish. Toss chicken pieces in soy sauce, then in flour, coating pieces evenly.	1	180
658	Heat oil in a large skillet over medium-high heat. Add chicken; cook and stir until browned, about 5 minutes. Transfer chicken to a plate; set aside.	2	180
659	Reduce heat to medium and stir in curry paste. Cook for 1 minute until fragrant. Add green onions, garlic, and ginger; cook an additional 2 minutes. Return chicken to the skillet, stirring to coat with curry paste. Stir in coconut milk, sugar, fish sauce, and remaining soy sauce; simmer over medium heat until chicken is tender and cooked through, about 20 minutes. Serve curry with cilantro leaves.	3	180
660	Bring a large pot of lightly salted water to a boil. Cook udon in boiling water, stirring occasionally, until noodles are tender yet firm to the bite, 10 to 12 minutes. Drain.	1	181
661	Meanwhile, combine chicken broth, soy sauce, peanut butter, ginger, honey, garlic, and chili paste in a medium saucepan. Cook and stir over medium heat until peanut butter melts and sauce is heated through.	2	181
662	Add drained noodles to peanut butter sauce; toss to coat. Garnish with green onions and peanuts.	3	181
663	Gather all ingredients.	1	182
664	Soak rice noodles in cold water until soft, 30 to 50 minutes. Drain and set aside.	2	182
665	Meanwhile, heat butter in a wok; add chicken and saute until browned. Remove chicken and set aside.	3	182
666	Heat oil in the wok over medium-high heat. Crack eggs into hot oil and cook until firm. Stir in chicken and cook for 5 minutes.	4	182
667	Add softened noodles, sugar, fish sauce, vinegar, and red pepper; mix well until noodles are tender. Adjust seasonings to taste.	5	182
668	Stir bean sprouts into wok and cook for 3 minutes.	6	182
669	Serve topped with green onions, crushed peanuts, and a wedge of lemon.	7	182
670	Fry salt pork with onion in a skillet until salt pork is golden brown, about 10 minutes. Drain fat and set salt pork and onion mixture aside.	1	183
671	Mix mashed potatoes, egg, salt, black pepper, and nutmeg together in a bowl; stir half of flour into potato mixture. Sprinkle half of flour onto a work surface and turn dough out onto flour. Knead flour on the work surface into dough.	2	183
672	Cut dough into 12 equal pieces and roll into balls, dusting your hands and sprinkling work surface with remaining(unspread) flour. Press your thumb into each dumpling to make an indentation, and fill with a small amount of salt pork-onion mixture. Pinch dumplings closed and roll in flour.	3	183
673	Bring water to a boil in a large pot. If desired, replace 1/2 of the water with beef broth. Drop dumplings into boiling water and broth; reduce heat to low. Simmer until cooked through, about 25 minutes. Drain and transfer to a serving bowl.	4	183
674	Preheat the oven to 425 degrees F (220 degrees C).	1	184
675	Peel potatoes and place in a bowl of cold water to prevent browning.	2	184
676	One at a time, dry potatoes and place in a large wooden or metal serving spoon. Using a sharp knife, slice potato crosswise at 1/8-inch intervals, cutting until the knife touches the spoon, being careful not to cut all the way through so the potato stays intact.	3	184
677	Arrange potatoes cut-side up in a shallow baking dish or small roasting pan. Drizzle with 1/2 of the melted butter, then season with salt and pepper.	4	184
678	Bake in the preheated oven for 35 to 40 minutes; drizzle with remaining butter and sprinkle Romano cheese and bread crumbs on top. Season with a little more salt and pepper and bake until nicely browned, about 20 minutes.	5	184
679	Make the sauce by mixing together the yogurt, curry powder, sugar and oil in a small bowl. Taste and adjust seasonings to your liking.	1	185
680	Peel and cut the onion into 1 inch cubes. Thread skewers alternating lamb cubes, onion dried apricot halves. Place them into a large resealable bag and pour in the sauce. Make sure the kabobs are evenly well coated. Refrigerate and allow to marinate overnight or for at least 8 hours.	2	185
681	Preheat grill to medium heat and lightly oil grate.	3	185
682	Grill the kabobs over medium coals for 8 to 10 minutes on each side, or to your desired doneness.	4	185
683	Heat oil in a skillet over medium heat; stir in onions and bell peppers. Cook and stir until the onion has softened and turned translucent, about 5 minutes.	1	186
684	Add carrots, tomatoes, green chiles, water, bouillon cube, curry powder, chili powder, salt, and pepper. Cook until mixture is well combined and thickened, 15 to 20 minutes.	2	186
685	Heat oil in a large, heavy-bottomed saucepan over medium-high heat.	1	187
686	Dredge lamb in flour; shake off excess.	2	187
687	Cook lamb in hot oil until browned all over. Transfer lamb to a plate, reserving drippings in the pan.	3	187
688	Cook and stir onion in drippings until soft, about 5 minutes. Mix in tomatoes. Season with bay leaves, bouillon, salt, brown sugar, white peppercorns, black pepper, and Worcestershire sauce. Cover, reduce heat, and simmer for 1 hour and 15 minutes. Stir occasionally, making sure nothing sticks to the bottom of the pan.	4	187
689	Stir in potatoes; continue cooking until potatoes are cooked and meat is tender, about 45 minutes more.	5	187
690	Preheat the oven to 350 degrees F (175 degrees C). Lightly grease a baking dish.	1	188
691	Heat oil in a large skillet over medium-high heat. Cook onions in hot oil until soft, 2 to 3 minutes. Crumble ground beef into the skillet; cook and stir until brown, 8 to 10 minutes.	2	188
692	Pour milk in a shallow dish. Soak bread in milk. Squeeze excess milk from bread and set milk aside.	3	188
693	Add bread to beef mixture. Stir in raisins, chutney, curry powder, apricot jam, salt, and black pepper. Pour mixture into the prepared baking dish.	4	188
694	Bake in the preheated oven for 1 hour.	5	188
695	Whisk together reserved milk, egg, and a pinch of salt. Pour over top of beef mixture. Lay bay leaf on top of milk mixture.	6	188
696	Continue baking until top is golden brown, 25 to 30 minutes. Remove bay leaf before serving.	7	188
697	Place the potatoes, tomatoes, onion, garlic, and sausage in a large pot with enough water to cover. Bring to a boil, and cook 15 minutes.	1	189
698	Stir lentils into the pot. Add more water if necessary to just cover all ingredients. Season with salt and pepper. Bring to a boil. Reduce heat to medium-low, and continue cooking 20 minutes, stirring occasionally, until lentils are tender.	2	189
699	Heat oil in a saucepan over medium heat. Add onion, carrot, broccoli, bell pepper, and garlic; cook and stir until vegetables soften and garlic just begins to brown, about 5 minutes.	1	190
700	Stir in broth, rice, sazon seasoning, and adobo seasoning; bring to a boil. Reduce the heat to low and cook until liquid is absorbed and rice is tender, about 25 minutes.	2	190
701	Fluff rice with a fork to serve.	3	190
702	DAY BEFORE: Cream butter and cream cheese together until smoothly blended. Beat in the flour. Shape dough into a smooth ball, wrap in foil or cling wrap, and refrigerate overnight or up to a week.	1	191
703	AT BAKING TIME: Remove dough from refrigerator 30 minutes before using. Start heating oven to 375 degrees F (190 degrees C).	2	191
704	Roll chilled dough thin. Cut with 3 or 4 inch round cookie cutter. Place small spoonful of jam in center of each round, moisten edges with water.	3	191
705	Fold round over and press edges together. Bake on ungreased cookie sheet 15 to 20 minutes. Immediately roll in sugar mixed with cinnamon (traditional) OR in confectioners' sugar if preferred.	4	191
706	Heat a large skillet over medium heat. Cook beef in hot skillet until completely browned, about 5 minutes; season with salt and pepper. Transfer beef to a slow cooker, retaining some of the beef drippings in the skillet.	1	192
707	Return skillet to heat and heat the retained drippings. Saute onion and garlic in hot drippings until softened, about 5 minutes; add to beef in slow cooker.	2	192
708	Stir potatoes, diced tomatoes, sofrito, and olives into the beef mixture.	3	192
709	Cook on Low until beef and potatoes are fork-tender, 4 to 5 hours.	4	192
710	Cook rice according instructions and serve everything together	5	192
711	Heat 1/2 olive oil in a large skillet over medium-low heat. Add 1/2 of the potato slices, and cook, stirring occasionally, until just tender, 15 to 20 minutes. Transfer potatoes to a large bowl, leaving oil in the skillet. Add remaining potatoes to the skillet; cook, stirring occasionally, until just tender, 15 to 20 minutes. Transfer potatoes to the bowl, reserving oil in the skillet. Season potatoes with salt and pepper.	1	193
712	Meanwhile, heat 1/4 olive oil in a separate skillet over medium heat. Stir in onion rings, and gently cook until soft and golden brown, about 15 minutes. Spoon onions onto a plate, and allow to cool.	2	193
713	Whisk eggs in a large bowl until smooth. Stir in cooled onions, roasted peppers, and serrano ham. Gently fold in cooked potatoes.	3	193
714	Heat the large skillet with 1/4 olive oil over low heat. Pour in egg mixture, and gently cook until the sides have started to set and the bottom has turned golden brown, 8 to 10 minutes. Loosen tortilla with a spatula if needed, then carefully slide onto a large plate. Turn the skillet upside down and place onto the uncooked side of tortilla. Turn the skillet right-side-up, and remove the plate. Return the skillet to the stove, and continue cooking until tortilla has set in the center, about 4 minutes.	4	193
715	Slide the tortilla onto a serving plate and allow to cool to room temperature. Cut into wedges and sprinkle with parsley to serve.	5	193
716	Heat a paella pan over medium-high heat, and coat with olive oil. Add chicken, rabbit, and garlic; cook and stir until nicely browned. Move the browned meat to the sides of the pan, and add tomato, butter beans, peas, and green beans. Season with paprika, and mix well.	1	194
717	Fill the paella pan almost to the top with water, measuring the water as you add it so you can determine the amount of rice to add later. Bring to a boil. Simmer for about 1 hour to make a nice broth.	2	194
718	Season with a generous amount of salt, just enough saffron for a yellow color, thyme, and rosemary. Stir in half as much rice as the amount of water added to the pan. Cover, reduce heat to low, and simmer until all of the liquid has been absorbed, about 20 minutes.	3	194
719	Preheat oven to 300 degrees F (150 degrees C).	1	195
720	Place potatoes, chicken, chourico, beer, carrots, onion, parsley, sofrito, cooking wine, sazon seasoning, garlic, salt, and black pepper in a large Dutch oven; mix well to combine. Cover with aluminum foil.	2	195
721	Bake in the preheated oven until an instant-read thermometer inserted into the chicken reads at least 165 degrees F (74 degrees C) and vegetables are tender, about 2 1/2 hours.	3	195
722	Heat oil in a Dutch oven over medium heat. Add sausage, onion, and bell pepper; saute until vegetables are softened and sausage is browned, about 10 minutes. Remove with a slotted spoon to a plate, leaving drippings in the pot.	1	196
723	Combine oregano, basil, salt, and pepper in a small bowl and rub on chicken. Add chicken to the pot, raise heat to medium-high, and brown on all sides, about 10 minutes.	2	196
724	Stir sausage and vegetable mixture into the pot with wine, broth, bay leaves, and red pepper flakes. Bring to a boil; reduce heat to medium-low and let simmer, covered, until chicken is no longer pink in the centers, 35 to 45 minutes.	3	196
725	Remove and discard bay leaves. Serve chicken with orange wedges.	4	196
726	Bring the water to a boil in a pot; stir the rice into the boiling water, reduce heat to low, place cover on the pot, and allow the rice to cook until all the moisture is absorbed, about 30 minutes.	1	197
727	As the rice cooks, heat the oil in a skillet over medium heat. Cook the chourico in the hot oil for 2 minutes. Add the onions and garlic to the sausage and continue cooking until the vegetables are soft and the chourico has browned, 5 to 7 minutes.	2	197
759	Add rice and carrot to the broth in the pot. Bring to a simmer; reduce heat to medium-low; and simmer, covered, until rice is tender, about 20 minutes.	3	204
760	Meanwhile, shred chicken using two forks.	4	204
728	Stir the tomato sauce into the chourico mixture. Reduce heat to low. Season with the red pepper flakes, Italian seasoning, salt, and pepper; simmer until thoroughly heated, 10 to 15 minutes. Stir the fava beans into the mixture and continue cooking just long enough for the beans to heat, 2 to 3 minutes. Serve over rice.	3	197
729	Pour boiling water over ground saffron; let sit for 30 minutes. Reserve 1/4 cup for rice; save remaining brewed saffron for another use.	1	198
730	Heat 2/3 of vegetable oil in a pan over medium-high heat. Sautee onion until light brown, 5 to 7 minutes. Stir in ground beef, half of salt, half of black pepper, and turmeric. Cook and stir until beef is browned and crumbly, 5 to 7 minutes. Cover the pan and cook over low heat for 15 minutes.	2	198
731	Heat remaining oil in another pan over medium heat. Sautee cabbage until tender, about 5 minutes. Add cinnamon and ginger. Stir mixture into ground beef mixture and continue to cook over low heat, covered, for 5 minutes, adding 1 tablespoon of water if the mixture is dry.	3	198
732	Rinse and drain rice; transfer to a pot. Add cold water, butter, and remaining salt. Bring mixture to a boil, uncovered. Reduce heat to medium-low and simmer until rice is half-cooked and water has evaporated, 10 to 15 minutes. Fluff with a fork.	4	198
733	Add beef mixture to the rice and slowly mix to incorporate. Turn the heat to low. Add hot water and reserved 1/4 cup brewed saffron to the rice, cover the pot, and let cook until rice is tender, about 20 minutes.	5	198
734	Heat a large nonstick pan (one that has a lid) over medium-high heat. Cook and stir beef until browned and crumbly, 5 to 7 minutes; drain and discard grease. Stir in onion and jalapegno, and cook until tender. Season with curry powder; stir in chicken broth and tomato sauce. Bring to a boil, and stir in green beans. Reduce heat to medium and simmer until beans are tender, about 15 minutes.	1	199
735	Stir in rice, and cover the pan. Cook on medium heat for 10 to 15 minutes or until much of the liquid is absorbed. Be careful not to overcook rice at this point, or the dish will be mushy; the rice should be firm. Transfer everything in the pan to a bowl or heatproof container, and return the pot to the stove.	2	199
736	Heat oil in the nonstick pan over medium heat. Carefully dump cooked rice mixture back into the pan. Wrap a clean dish towel around the inside of the pot's lid. (The ends of the dish towel will be folded over the edges on top of the lid.) Put the lid on the pot. Cook over medium-low heat for 35 minutes without uncovering or stirring. Remove the lid and place a tray on top of the pot, then carefully flip it over. The rice will hold the shape of the pot and have a nice crust on top called "tah digh."	3	199
737	Shave onions with a grater into a fine mesh strainer. Gently press pulp into the strainer to remove juices. Place pulp into the center of the cheesecloth and gently press until no further juice drips out.	1	200
738	Place lamb and beef in a pot. Add green onion and onion pulp; mix until thoroughly combined. Mix in baking powder, salt, pepper, sumac, and turmeric. Add eggs and mix thoroughly. Cover the pot and place in the refrigerator until flavors have melded, at least 30 minutes.	2	200
739	Preheat an outdoor grill for medium heat and lightly oil the grate.	3	200
740	Mold meat mixture onto the skewers.	4	200
741	Cook on the preheated grill, rotating every minute, until nicely browned on all sides, and meat is no longer pink in the center, about 25 minutes.	5	200
742	Place water and kosher salt in a pot; bring to a boil. Add rice; cook and stir for exactly 7 minutes. Drain.	1	201
743	Heat olive oil in a pot over medium-high heat. Cover the bottom of the pot with 1 layer of potato slices. Sprinkle cumin and salt over potatoes. Cook until potatoes are sizzling, 2 to 3 minutes; top potatoes with rice to form an even layer. Reduce heat to low and place butter slices over rice.	2	201
744	Top the pot with a layer of clean paper towels, then place the lid over the towels. Steam until rice is fluffy, about 45 minutes.	3	201
745	Grind saffron threads with a mortar and pestle. Mix crushed saffron with 1 1/2 tablespoons hot water in a large bowl. Add a couple of spoonfuls of rice to saffron mixture and stir until rice is yellow.	4	201
746	Spoon remaining rice into a serving bowl. Top with saffron rice and line the edges of the bowl with potatoes. Garnish with parsley.	5	201
747	Heat 2 tablespoons oil in a large pot over medium-high heat. Add onion; cook and stir until deep golden brown, 10 to 15 minutes. Stir in turmeric for 1 to 2 minutes. Add chuck cubes; cook until coated in turmeric and browned on all sides, 8 to 10 minutes.	1	202
748	Heat remaining 2 tablespoons oil in a separate pot over medium heat. Add spinach, green onions, parsley, cilantro, and chives; cook and stir until deep dark green in color, 5 to 10 minutes.	2	202
749	Stir spinach mixture into onion and chuck mixture. Pour in enough water to create a slurry consistency. Season with salt and pepper. Stir in lemon juice. Reduce heat, cover, and simmer stew until greens soften, about 1 hour.	3	202
750	Pierce dried limes with a fork; add to stew. Continue simmering until chuck is tender, 30 minutes to 1 hour. Stir in red kidney beans. Cook until flavors combine, about 30 more minutes. Discard dried limes before serving.	4	202
751	Bring water and olive oil to a boil in a large pot; stir in saffron rice. Reduce heat to low, cover, and simmer until rice is tender and liquid is absorbed, 20 minutes.	1	203
752	Heat olive oil in a skillet over medium-high heat; cook and stir onions and garlic in hot oil until lightly browned and softened, 5 to 10 minutes.	2	203
753	Stir chicken into skillet and cook until seared on all sides; add chicken broth. Bring broth to a boil, reduce heat to low, cover, and simmer until broth is reduced and chicken is tender, 30 to 45 minutes. Remove from heat. Shred chicken using two forks to pull chicken cubes apart.	3	203
754	Preheat oven to 385 degrees F (196 degrees C). Grease a baking dish.	4	203
755	Spread 1/2 the rice in a layer on the bottom of the baking dish. Spoon chicken and onion mixture over rice; spread chickpeas and raisins over chicken mixture. Top with remaining rice and sprinkle with paprika.	5	203
756	Bake in the preheated oven until liquid is almost completely cooked off and rice is lightly browned at the edges, about 30 minutes. Cool for 15 minutes before serving.	6	203
757	Put the water, chicken breasts, onion, garlic, turmeric, salt, and pepper in a pot. Bring to a boil over medium-high heat. Reduce heat to medium, cover, and simmer until chicken is cooked through, 20 to 25 minutes. An instant-read thermometer inserted near the bone should read 165 degrees F (74 degrees C). Remove chicken from pot and set aside.	1	204
758	Rinse rice in a sieve under running water a few times to get rid of excess starch.	2	204
761	Once rice is cooked, fluff it using a fork. Gently mix in shredded chicken and drizzle with lemon juice. Taste and add more salt as needed. Sprinkle with parsley.	5	204
762	Place the rice in a bowl, and cover with water. Soak the rice for about 3 hours, and drain off the water. Bring the rice, salt, and half the water to a boil in a saucepan. Reduce heat to medium-low, cover, and simmer until the rice is partially cooked, about 10 minutes. Drain the liquid from the rice, and set the rice aside.	1	205
763	Bring the leftover water and a pinch of salt to a boil in a saucepan, and stir in the lentils. Bring to a boil, and cook over medium heat until tender, 15 to 20 minutes. Remove from heat.	2	205
764	Heat 1/2 of vegetable oil in a large skillet over medium heat, and fry the onions, stirring frequently, until golden brown, about 20 minutes. Set the onions aside. Dissolve the saffron in some hot water, and set aside.	3	205
765	In a large nonstick pot with deep sides, heat 1/2 of vegetable oil until shimmering, and spoon in half the rice to cover the bottom of the pot. Top the rice with the lentils, and cover the lentils with the remaining rice. Reduce heat to low, cover the pot, and cook until the rice is completely tender and there is a golden brown, crusty layer of rice on the bottom of the pot, about 20 minutes. Pour the saffron water over the rice and lentils, cover, and allow to cook until absorbed, about 10 more minutes.	4	205
766	To serve, spoon the polow into a serving dish, and peel off and place pieces of the crusty rice layer on top of the polow. Decorate the polow with dates, raisins, and fried onions.	5	205
767	Preheat the oven to 350 degrees F (175 degrees C).	1	206
768	Arrange pita bread on a baking sheet.	2	206
769	Bake in the preheated oven until lightly toasted. Cut pita bread into bite-sized pieces; keep warm.	3	206
770	Heat olive oil in a skillet over medium heat. Stir in chicken, onion, and garlic; cook until chicken juices run clear. Mix in tomato pure; season with cumin, salt, and pepper. Continue cooking for 10 minutes.	4	206
771	Arrange toasted pita pieces in a serving dish. Drizzle with butter and top with chicken mixture. Garnish with yogurt and parsley to serve.	5	206
772	Spray a large stockpot with cooking spray and set over medium-high heat. Add pork and sautee until browned, about 7 minutes. Stir in garlic and cook until fragrant, about 1 minute. Add beans, recaito, olives, and sazon seasoning. Reduce the heat and simmer for about 10 minutes.	1	207
773	Add rice to the pot and stir to coat. Add water and bring to a boil. Cover and simmer for 20 minutes. Uncover and stir rice at the top, avoiding the slight crust on the bottom of the pot. Remove from the stove if rice has absorbed most of the liquid; if not, cook for up to 10 minutes longer. Add water carefully in this step. Too much water results in mushy rice while too little will make it dry. You should be able to stir it, and it should look like a dense soup.	2	207
774	Heat olive oil over medium heat in a medium-sized caldero or nonstick pan. Stir in sofrito, garlic, sazon, and adobo; cook for 4 minutes, making sure not to burn garlic. Stir in rice until coated well; pour in chicken broth and water and stir once more.	1	208
775	Bring mixture to a boil and cook over medium-high heat until all liquid has been absorbed and rice looks like it has little holes throughout, 20 to 25 minutes. Reduce heat to low. Stir in peas and cilantro gently from bottom to top, once or twice only. Cover and let sit for 10 minutes.	2	208
776	Turn off heat and let rice sit, uncovered, for 10 minutes more.	3	208
777	Heat oil in a saucepan over low heat. Add tomato sauce, sofrito, sazon, and pepper. Cook, stirring for about 3 minutes. Stir in beans, water, and salt. Increase heat to medium, and cook for 15 minutes, or until sauce has thickened.	1	209
778	In a large bowl, combine 1 tablespoon soy sauce, sesame oil, green onions, garlic, sesame seeds, sugar, and pepper. Stir in sliced beef, and marinate at room temperature for 15 minutes.	1	210
779	Heat wok or large skillet over medium-high heat, then drizzle with oil. Cook beef until evenly brown. Stir in carrots, bamboo shoots, napa cabbage, and spinach. Add cellophane noodles, soy sauce, sugar, salt, and pepper. Reduce heat to medium, and cook until heated through.	2	210
780	Whisk soy sauce, white and light green parts of green onions, onion, sugar, garlic, sesame seeds, sesame oil, red pepper flakes, ginger, and black pepper together in a large glass or ceramic bowl. Add steak slices and toss to evenly coat. Cover the bowl with plastic wrap and marinate in the refrigerator for 1 hour, or up to 1 day.	1	211
781	Heat a wok or large skillet over medium heat. Working in batches, cook and stir steak and marinade together in the hot skillet, adding honey to caramelize the steak, until steak is cooked through, about 5 minutes. Garnish bulgogi with dark green parts of green onions.	2	211
782	Break noodles into small pieces. Place into a deep dish and cover with hot tap water; soak for 10 minutes.	1	212
783	Meanwhile, whisk boiling water, soy sauce, and brown sugar together.	2	212
784	Drain noodles and transfer to a bowl. Pour soy mixture over top and soak for 2 minutes.	3	212
785	Heat oil in a large skillet over medium heat. Add noodles and soy mixture; cook and stir until hot, about 5 minutes.	4	212
786	Transfer noodles and sauce to serving bowls. Garnish with sesame seeds.	5	212
787	Preheat the oven to 350 degrees F (175 degrees C).	1	213
788	Place potatoes, garlic, and salt into a large pot; fill with enough water to cover. Bring to a boil; reduce heat to medium and simmer potatoes until tender but not mushy, 8 to 10 minutes. Use a slotted spoon to transfer about half the potatoes into a baking dish.	2	213
789	Pour 1/2 of the cream over the potatoes and season with black pepper and nutmeg; sprinkle 1/2 of the Gruyere cheese on top. Layer the remaining potatoes on top and season with black pepper and nutmeg. Pour over remaining cream and sprinkle with remaining Gruyere cheese.	3	213
790	Bake in the preheated oven until cheese is golden brown on top, about 1 hour.	4	213
791	Preheat the oven to 400 degrees F (200 degrees C).	1	214
792	Peel potatoes and cut them into 1/2-inch slices. Place in a pot and cover with water; bring to a boil. Boil for 2 minutes, then drain and set aside.	2	214
793	Heat a large oven-proof skillet over medium-high heat. Pour in olive oil, then add onions. Sautee until lightly caramelized, 8 to 10 minutes. Stir in garlic and sautee until onions are deep brown and garlic is soft. Transfer mixture to a bowl.	3	214
833	In a large bowl, toss linguini with sauce. Sprinkle with grated Parmesan cheese.	4	223
794	Place the skillet back on the stove over low heat. Melt butter in the skillet, then cover the bottom with 1/3 of the potatoes. Season with salt and pepper. Cover potatoes with 1/2 of the onion mixture. Cover with 1/2 of the remaining potatoes; season with salt and pepper. Spread remaining onion mixture on top. Cover with remaining potatoes; season with salt and pepper.	4	214
795	Bake in the preheated oven until potatoes are tender and browned on top, 10 to 12 minutes.	5	214
796	Use a spatula to transfer potatoes to a serving platter. Sprinkle with chopped parsley just before serving.	6	214
797	Preheat the oven to 375 degrees F (190 degrees C).	1	215
798	Spread tomato paste onto the bottom of a square baking dish. Sprinkle with onion and garlic. Stir in water and 1/3 of olive oil until thoroughly combined. Season with salt and pepper.	2	215
799	Arrange alternating slices of eggplant, zucchini, yellow squash, red bell pepper, and yellow bell pepper, starting at the outer edge of the dish and working concentrically towards the center. Overlap slices a little to display colors.	3	215
800	Drizzle vegetables with remaining 2/3 of olive oil; season with salt and pepper. Sprinkle with thyme leaves. Cover vegetables with a piece of parchment paper cut to fit inside.	4	215
801	Bake in the preheated oven until vegetables are roasted and tender, about 45 minutes. Serve with dollops of mascarpone cheese.	5	215
802	Heat oil in a large skillet over medium-high heat. Add ground beef and break up into small pieces with a spoon or spatula as it browns. Cook until meat completely loses its pink color, 8 to 10 minutes. Add diced onion and salt. Cook until onions turn translucent, about 5 minutes. Add pepper, cumin, cinnamon, bay leaves, and cayenne pepper. Cook 2 minutes. Add garlic and cook 1 minute.	1	216
803	Stir in red wine vinegar, crushed tomatoes, and water. Cook a few minutes while deglazing pan. Add currants; bring back to a simmer. Reduce heat to medium-low; cover and cook until meat is tender, 15 to 20 minutes.	2	216
804	Gently stir in sliced olives; cover and cook another 10 to 15 minutes.	3	216
805	Cook rice according instructions and serve everything together	4	216
806	Combine water, juice of one lime, thyme sprig, peppercorns, garlic powder, onion powder, and salt in a large pot; bring to a boil. Add pork chops, reduce heat to medium-low, and simmer until meat is very tender, about 1 to 1 1/2 hours. Add more water as necessary to keep chops covered.	1	217
807	Turn off heat and let chops rest in broth for 30 minutes. Remove chops from broth and shred, removing excess fat; set aside.	2	217
808	Heat olive oil in a large frying pan over medium-high heat. Add shredded pork and fry until almost crisp, about 5 minutes. Add onion and garlic; continue to cook until onion is just tender yet slightly crisp, about 10 minutes more.	3	217
809	Stir in juice of one lime and cilantro; serve.	4	217
810	Score fat side of the pork in a crosshatch pattern, cutting about 1/8 inch deep. Season with salt and pepper. Set aside.	1	218
811	Combine orange juice, lime juice, olive oil, cilantro, garlic, orange zest, lime zest, bay leaves, oregano, and cumin in a large resealable bag. Add pork butt and marinate in the refrigerator for at least 6 hours. Flip the bag over occasionally and rub over roast to evenly distribute marinade.	2	218
812	Place roast and marinade in the slow cooker. Cook on Low until meat is fork-tender, 7 to 8 hours.	3	218
813	Set an oven rack about 6 inches from the heat source and preheat the oven's broiler.	4	218
814	Transfer pork into a roasting pan, fat-side up. Broil until lightly browned and the skin has crisped, 4 to 5 minutes.	5	218
815	Heat vegetable oil in a large skillet over medium-high heat. Add flank steak and cook until browned, about 4 minutes per side.	1	219
816	Transfer steak to a slow cooker; pour in beef broth and tomato sauce. Add tomato paste, bell pepper, onion, garlic, cumin, cilantro, olive oil, and vinegar; stir until well blended.	2	219
817	Cover and cook on Low for up to 10 hours, or on High for 4 hours.	3	219
818	Shred steak in the slow cooker with two forks.	4	219
819	Gather all ingredients.	1	220
820	Heat olive oil in a skillet over medium heat; cook and stir onion, bell pepper, and garlic, onion in the hot oil until softened, 5 to 7 minutes.	2	220
821	Add ground beef into the skillet; cook and stir until crumbly and completely browned, 7 to 10 minutes.	3	220
822	Stir tomato sauce, olives, raisins, capers, cumin, sazon seasoning, sugar, and salt into the ground beef mixture. Cover the skillet, reduce heat to low, and cook until the mixture is heated through, 5 to 10 minutes.	4	220
823	Cook rice according instructions and serve everything together	4	220
824	Combine the lentils, water, tomato, onion, cumin, salt, and vegetable oil in a pot over medium heat; bring to a boil. Cook and stir at a boil until the lentils are soft, about 30 minutes. Add the potatoes and cook until the potatoes are tender, about 15 minutes more.	1	221
825	Shred 1/2 mozzarella and cut remaining into 1/2-inch cubes. Transfer shredded cheese to a large bowl and cubed cheese to a medium bowl.	1	222
826	Add cornmeal, 1/2 salt, and warm water to the shredded cheese and mix to combine. Set aside for 10 minutes to allow cornmeal to absorb liquid. The mixture should resemble soft Play-Doh.	2	222
827	Preheat the oven to 200 degrees F (95 degrees C).	3	222
828	With damp palms and fingers, place 1/4 cup arepa mixture into your palm and flatten into a 2 1/2-inch disk. Place a few cubes of the mozzarella into the center. Gently fold edges of dough over to cover mozzarella cubes completely, patting to form a cake. Repeat until all dough and cheese has been used.	4	222
829	Heat some oil in a large nonstick skillet over medium heat. Add arepas and cook until both sides are golden brown and charred in spots, 4 to 5 minutes per side. Remove to a parchment-lined baking sheet and season with a pinch of the remaining salt. Place in the preheated oven to keep warm. Repeat with remaining oil, arepas, and salt.	5	222
830	Bring a large pot of lightly salted water to a boil. Add linguini pasta, and cook for 8 to 10 minutes, or until al dente; drain.	1	223
831	Meanwhile, place chicken and Cajun seasoning in a bowl, and toss to coat.	2	223
832	In a large skillet over medium heat, saute chicken in butter until no longer pink and juices run clear, about 5 to 7 minutes. Add green and red bell peppers, sliced mushrooms and green onions; cook for 2 to 3 minutes. Reduce heat, and stir in heavy cream. Season the sauce with basil, lemon pepper, salt, garlic powder and black pepper, ground, and heat through.	3	223
834	Please note the differences in the recipe name, the use of black pepper for lemon-pepper, and the increased cook time of the cream sauce when using the magazine version of this recipe.	5	223
835	Bring a large pot of lightly salted water to a boil. Add pasta and cook until al dente, 8 to 10 minutes. Drain.	1	224
836	Cut chicken breast into strips. Place chicken and Cajun seasoning in a plastic bag. Shake to coat.	2	224
837	Melt butter in a large skillet over medium heat. Add chicken and cook, stirring, until browned and almost cooked through, 5 to 7 minutes.	3	224
838	Add bell peppers, mushrooms, and green onion. Cook, stirring, 2 to 3 minutes.	4	224
839	Reduce the heat and stir in cream, basil, lemon pepper, salt, garlic powder, and black pepper. Heat through. Add cooked linguine, toss, and heat through.	5	224
840	Sprinkle with Parmesan and serve.	6	224
841	Preheat the oven to 400 degrees F (200 degrees C).	1	225
842	Combine smoked paprika, garlic powder, onion powder, salt, oregano, pepper, cayenne pepper, and thyme in a small bowl. Pat shrimp dry and place in a large bowl. Sprinkle with Cajun seasoning mixture and drizzle with olive oil. Toss to coat evenly.	2	225
843	Place shrimp in a single layer on a sheet pan without overcrowding.	3	225
844	Cook in the preheated oven until shrimp are opaque in the middle, about 8 minutes. Immediately add butter to the hot pan and toss with shrimp until butter is melted. Sprinkle with parsley, if desired and serve with lemon wedges.	4	225
845	Cook rice according instructions.	1	226
846	Preheat the oven to 425 degrees F (220 degrees C). Grease a baking sheet.	2	226
847	Place salmon fillets on the prepared baking sheet. Mix olive oil, brown sugar, garlic, smoked paprika, paprika, and chile powder together in a bowl. Spread mixture over salmon fillets. Squeeze lemon juice on top.	3	226
848	Bake in the preheated oven until fish flakes easily with a fork, 13 to 15 minutes. Serve with rice.	4	226
849	Heat the oil in a large pot over medium heat, and cook the chorizo and ham 2 to 3 minutes. Place the onion in the pot, and cook until tender. Stir in garlic, and cook until tender, then mix in the sweet potatoes, bell pepper, tomatoes with juice, chile pepper, and water. Bring to a boil, reduce heat to low, cover, and simmer 15 minutes, until sweet potatoes are tender.	1	227
850	Stir the beans into the pot, and cook uncovered until heated through. Mix in the mango and cilantro, and season with salt.	2	227
851	Preheat the oven to 420 degrees F (215 degrees C). Line a baking sheet with parchment paper.	1	228
852	Place cubed potatoes in a large bowl and cover with cold water. Soak for at least 5 minutes.	2	228
853	Drain water from potatoes and pat potatoes dry with paper towels or a clean kitchen towel. Return potatoes to the bowl and add 1/2 olive oil and generous pinches salt and pepper. Transfer potatoes to the prepared baking sheet and spread them out evenly.	3	228
854	Bake in the preheated oven until browned on the bottom and edges, about 35 minutes.	4	228
855	Meanwhile, prepare the chimichurri; combine parsley, basil, garlic, remaining olive oil, vinegar, and a pinch salt in a bowl. Stir together and let sit while potatoes finish baking.	5	228
856	Remove potatoes from the oven and transfer to a large serving bowl. Add chimichurri to hot potatoes and mix until covered.	6	228
857	Cut Chocolate	1	229
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."User" (id, "userId", password, role, "createdAt", "updatedAt", state) FROM stdin;
307336d5-5ec5-47ee-8a53-8028ed2c808d	markus.fichtner1999@gmail.com	$2b$10$YfFZUQgxCWu8Jw0meIc4IOOkauDyPVzv2SoxoRTcJyxATQm5rleii	user	2024-01-20 17:30:07.88	2024-01-20 17:35:57.781	finished
4857acf6-f552-4a7e-8a2d-74171dda3ca2	testUser1@test.de	$2b$10$EH3FUAk7nbaPqF9APjDH0eFVS1X143/D.cAfjjXyyUULviDSOUD0O	user	2024-01-29 12:23:20.341	2024-01-30 16:58:03.961	finished
4cdffa96-5ec4-45ae-9eea-8b297b1b35fd	testUser2@test.de	$2b$10$St5QOQvZkMmgr2eN.jA04uftAtKNSd4QtlOXwrxaTuyQ5MFuf04Hy	user	2024-01-30 16:59:50.865	2024-01-30 16:59:50.865	registration
cc73d244-7fc5-4187-b8f8-5078e7346959	testUser3@test.de	$2b$10$52EED.BufHd.vKJPV8sWzuRU8ji8jgzqkaKAoBR2fo0SQNEnGfTHO	user	2024-01-30 17:03:11.931	2024-01-30 17:03:11.931	registration
\.


--
-- Data for Name: Weekplan; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."Weekplan" (id, "userId", "startDate", "endDate", "hasDinner", "hasLunch") FROM stdin;
1	markus.fichtner1999@gmail.com	2024-01-20 00:00:00	2024-01-26 00:00:00	t	t
2	testUser1@test.de	2024-01-29 00:00:00	2024-02-04 00:00:00	t	t
3	testUser2@test.de	2024-01-30 00:00:00	2024-02-05 00:00:00	t	f
\.


--
-- Data for Name: WeekplanEntry; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."WeekplanEntry" (id, date, "weekplanId", "dinnerId", "lunchId") FROM stdin;
1	2024-01-20	1	1	138
2	2024-01-21	1	39	154
3	2024-01-22	1	208	87
4	2024-01-23	1	38	72
5	2024-01-24	1	123	129
6	2024-01-25	1	71	75
7	2024-01-26	1	3	179
8	2024-01-29	2	140	218
9	2024-01-30	2	151	74
10	2024-01-31	2	15	159
12	2024-02-02	2	165	58
14	2024-02-04	2	67	50
11	2024-02-01	2	39	6
13	2024-02-03	2	216	\N
15	2024-01-30	3	172	\N
16	2024-01-31	3	193	\N
17	2024-02-01	3	169	\N
18	2024-02-02	3	203	\N
19	2024-02-03	3	24	\N
20	2024-02-04	3	111	\N
21	2024-02-05	3	10	\N
\.


--
-- Data for Name: _IngredientToPreferences; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public."_IngredientToPreferences" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: username
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
aff15349-3862-4553-92b9-785a16b80bbd	58fe0f1760b19e4e39fbc3829f844a16f6b63583f8c66c7eb38c5fb784d13551	2024-01-20 17:23:00.347523+00	20230929130434_continually_call_serving_in_plural	\N	\N	2024-01-20 17:23:00.337568+00	1
9a19f720-2f8a-4d3f-b328-ab2a20b24343	3d2872848f301a15717d265b8b469b12bbb187dfc0309bb8f8d74ac8f7eb7543	2024-01-20 17:23:00.114569+00	20230330140915_init	\N	\N	2024-01-20 17:22:59.981652+00	1
85073620-b8e9-448f-8a54-bd80d1dab344	368c50840f47582ea283f3d0fbad747566fefbc7e1fd6c4e2fe76b82c093df0a	2024-01-20 17:23:00.148244+00	20230503065351_	\N	\N	2024-01-20 17:23:00.117566+00	1
6812fb9d-704c-45f4-8ed9-3f84fbc290bb	729fe1f069743b852f55346e222a1849d4ef72660b795291d3c08e2a81d0fd6b	2024-01-20 17:23:00.168181+00	20230503074753_shopping_list_update	\N	\N	2024-01-20 17:23:00.151269+00	1
7b786b07-59b6-4f90-b3c2-0a424da5b06a	c304fd489277328d41f30dd8657b8b2b0e96b76d4cb6666a1a65101229a7f287	2024-01-20 17:23:00.36655+00	20231003084826_ingr_cond	\N	\N	2024-01-20 17:23:00.352625+00	1
aaa2651e-74c9-4a76-8a5a-be919cfb5f16	c987ee4c73afcb79f9f44c82c9a5940a0db21d8965d95ce64df328c86f4b2e00	2024-01-20 17:23:00.183569+00	20230503085535_shopping_list_ingredient_name	\N	\N	2024-01-20 17:23:00.171445+00	1
1042cc63-d380-40f3-9e03-39ad1d298035	b3117f4dd6a8832af3c40af7d03eda3320feade9530451700e56e3b8b916560d	2024-01-20 17:23:00.200553+00	20230505073340_remove_constraint	\N	\N	2024-01-20 17:23:00.187697+00	1
7c5b1744-42e7-4942-a902-581e0fbaa9a6	aa048a3ad9b64d67cc18170914de9658fbe9c6064dcd62fc3d0eeda41ab5b2f1	2024-01-20 17:23:00.486781+00	20231218200404_user_id_update_on_recipe	\N	\N	2024-01-20 17:23:00.477444+00	1
fbbc262d-f887-4e84-889d-882caebf08e5	19aa49f6afaabd839b2023e0cff9840c45bbd3726729dfeedac13d862c46268f	2024-01-20 17:23:00.214493+00	20230518114124_user_state	\N	\N	2024-01-20 17:23:00.203879+00	1
1858fda6-a598-4724-9c61-d1c888cd45f8	58d8189f5300f89be264fa189be23236e299fa7b87b3b29b4e05c2024b117d61	2024-01-20 17:23:00.379599+00	20231005091519_change_meals_definition	\N	\N	2024-01-20 17:23:00.369704+00	1
3f7670e1-80c0-40cb-95c5-55df3f86b991	87102b8d1edd2e1aadbec872fb29c6596af86d100b0a26db6fc02780fd3a467c	2024-01-20 17:23:00.227564+00	20230617122359_add_categories	\N	\N	2024-01-20 17:23:00.217739+00	1
90b18584-bafd-4150-ab06-9cba1a4f5d70	6e7a5f3a0ba00f895264af0e478cbec615f19018ad6e01a2055e683e6f5c4004	2024-01-20 17:23:00.252459+00	20230617141815_hash	\N	\N	2024-01-20 17:23:00.230834+00	1
4c523598-b5e9-4cd0-9e4d-2bb05da4b87e	ff4ec52d326f6c47ea3c05c506928a97cabe63c84713d5c29f83baff2207072d	2024-01-20 17:23:00.26591+00	20230617204037_cascade	\N	\N	2024-01-20 17:23:00.255599+00	1
38465e71-c3c2-4af4-b05a-e282a90e2b5d	d7d16d9c7f80972df2e4e4ee44e59cd500e4943e46abc6b34a47a40498e2e101	2024-01-20 17:23:00.393185+00	20231005114807_update_weekplan	\N	\N	2024-01-20 17:23:00.382653+00	1
fee36cc3-c068-4d9f-9b12-2154c9a21356	2565dfa55129259afabfd63ab064d725deac2da6b25e8a319aa26e84f5458fef	2024-01-20 17:23:00.279142+00	20230618065308_relations	\N	\N	2024-01-20 17:23:00.268874+00	1
f27f2f68-62a0-43d6-b9aa-c12e386cf86a	2b738d77114dab8a6336773f8a5f644337936f6e215e48eded546fcc0a3d464a	2024-01-20 17:23:00.291126+00	20230618111153_add_prefernce_fields	\N	\N	2024-01-20 17:23:00.282016+00	1
46bb46da-a7d7-4481-87a2-d4f66b010408	3d2b95bd95359d1bcd224a640ffced38a323fb73e0d12b69b10918d4561213a5	2024-01-20 17:23:00.321163+00	20230618135236_favorites	\N	\N	2024-01-20 17:23:00.294098+00	1
e1003e40-3ddd-48bb-bb4c-e409269362c2	b036fbdb5df07b065e9504ba82aa09c457e9784b1375a5b4cc419425b8f026ae	2024-01-20 17:23:00.405538+00	20231005121324_mail_id	\N	\N	2024-01-20 17:23:00.396158+00	1
df342ab2-6892-4620-bd4e-dcdaf1e07466	627284e943f6d9f56635a12c6429d2ea76c142f138aeaed141bd9ca2aa880edb	2024-01-20 17:23:00.3347+00	20230928132648_change_of_preferences	\N	\N	2024-01-20 17:23:00.324362+00	1
8eb28247-a6fc-4e3e-bf1b-0384cd135d37	cdee30070fdaa7b464ce665d94b2f00ccaf205c231be4b9687bcd4389c8b22a4	2024-01-20 17:23:00.498554+00	20231219073338_chnage_total_time_on_recipe	\N	\N	2024-01-20 17:23:00.489686+00	1
9c90a493-bb6a-4ad0-8ed7-2cd265e78ff9	186ee98f33fe015b9e102fe197fc6b3913b4c8315ed8461397ca98c034c2f3fb	2024-01-20 17:23:00.435982+00	20231108130315_update_meal_and_days	\N	\N	2024-01-20 17:23:00.408636+00	1
ec843523-e722-44f3-b11a-ef69fa77bc9d	e028fa269ddf35aeb0ec94b4caa90edf2530496531b3eecd87469abc603b99ce	2024-01-20 17:23:00.449565+00	20231204085414_add_user_id_to_recipe	\N	\N	2024-01-20 17:23:00.439028+00	1
28df3ad9-efe8-434b-9535-f140804401e6	9c63d40066de4c552ce78a040ed94bd553b575f049a58500531d96b5a3713ec0	2024-01-29 08:21:38.418158+00	20240128172900_remove_shopping_list	\N	\N	2024-01-29 08:21:38.393938+00	1
0de265bf-29da-4c51-933d-73bd5b217998	8c20ba4b4bddc1800ffc73db31194e6af3569441469c5ce0dad13f54020b895d	2024-01-20 17:23:00.462135+00	20231204124951_update_recipe_fields	\N	\N	2024-01-20 17:23:00.452697+00	1
56e53751-2e22-4cde-acb0-9155ff57e43d	5f7132f340ab5d45347f4a5f46ff8af561db9f210540ae4bead91fe644e4b35a	2024-01-20 17:23:00.474371+00	20231204142740_update_user_id_refernce	\N	\N	2024-01-20 17:23:00.465023+00	1
\.


--
-- Name: Favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."Favorites_id_seq"', 2, true);


--
-- Name: IngredientWithAmount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."IngredientWithAmount_id_seq"', 2581, true);


--
-- Name: Ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."Ingredient_id_seq"', 1, false);


--
-- Name: Preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."Preferences_id_seq"', 3, true);


--
-- Name: Recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."Recipe_id_seq"', 229, true);


--
-- Name: Step_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."Step_id_seq"', 857, true);


--
-- Name: WeekplanEntry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."WeekplanEntry_id_seq"', 21, true);


--
-- Name: Weekplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: username
--

SELECT pg_catalog.setval('public."Weekplan_id_seq"', 3, true);


--
-- Name: DataSchema DataSchema_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."DataSchema"
    ADD CONSTRAINT "DataSchema_pkey" PRIMARY KEY (id);


--
-- Name: Favorites Favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);


--
-- Name: IngredientWithAmount IngredientWithAmount_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."IngredientWithAmount"
    ADD CONSTRAINT "IngredientWithAmount_pkey" PRIMARY KEY (id);


--
-- Name: Ingredient Ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY (id);


--
-- Name: Preferences Preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Preferences"
    ADD CONSTRAINT "Preferences_pkey" PRIMARY KEY (id);


--
-- Name: Recipe Recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY (id);


--
-- Name: Step Step_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Step"
    ADD CONSTRAINT "Step_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WeekplanEntry WeekplanEntry_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."WeekplanEntry"
    ADD CONSTRAINT "WeekplanEntry_pkey" PRIMARY KEY (id);


--
-- Name: Weekplan Weekplan_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Weekplan"
    ADD CONSTRAINT "Weekplan_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Favorites_userId_recipeId_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Favorites_userId_recipeId_key" ON public."Favorites" USING btree ("userId", "recipeId");


--
-- Name: Preferences_userId_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "Preferences_userId_key" ON public."Preferences" USING btree ("userId");


--
-- Name: User_userId_key; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "User_userId_key" ON public."User" USING btree ("userId");


--
-- Name: _IngredientToPreferences_AB_unique; Type: INDEX; Schema: public; Owner: username
--

CREATE UNIQUE INDEX "_IngredientToPreferences_AB_unique" ON public."_IngredientToPreferences" USING btree ("A", "B");


--
-- Name: _IngredientToPreferences_B_index; Type: INDEX; Schema: public; Owner: username
--

CREATE INDEX "_IngredientToPreferences_B_index" ON public."_IngredientToPreferences" USING btree ("B");


--
-- Name: Favorites Favorites_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorites Favorites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: IngredientWithAmount IngredientWithAmount_ingredientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."IngredientWithAmount"
    ADD CONSTRAINT "IngredientWithAmount_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES public."Ingredient"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: IngredientWithAmount IngredientWithAmount_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."IngredientWithAmount"
    ADD CONSTRAINT "IngredientWithAmount_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Preferences Preferences_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Preferences"
    ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Recipe Recipe_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Step Step_recipeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Step"
    ADD CONSTRAINT "Step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WeekplanEntry WeekplanEntry_dinnerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."WeekplanEntry"
    ADD CONSTRAINT "WeekplanEntry_dinnerId_fkey" FOREIGN KEY ("dinnerId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: WeekplanEntry WeekplanEntry_lunchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."WeekplanEntry"
    ADD CONSTRAINT "WeekplanEntry_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES public."Recipe"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: WeekplanEntry WeekplanEntry_weekplanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."WeekplanEntry"
    ADD CONSTRAINT "WeekplanEntry_weekplanId_fkey" FOREIGN KEY ("weekplanId") REFERENCES public."Weekplan"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Weekplan Weekplan_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."Weekplan"
    ADD CONSTRAINT "Weekplan_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"("userId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IngredientToPreferences _IngredientToPreferences_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."_IngredientToPreferences"
    ADD CONSTRAINT "_IngredientToPreferences_A_fkey" FOREIGN KEY ("A") REFERENCES public."Ingredient"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _IngredientToPreferences _IngredientToPreferences_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: username
--

ALTER TABLE ONLY public."_IngredientToPreferences"
    ADD CONSTRAINT "_IngredientToPreferences_B_fkey" FOREIGN KEY ("B") REFERENCES public."Preferences"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

