export const productMock = {
  p1: {
    id: "p1",
    title: "Truffle Burrata Salad",
    description: "Experience the ultimate Italian indulgence. Our signature Burrata features a thick outer shell of fresh mozzarella, filled with rich, creamy stracciatella and fresh cream. Placed on a bed of peppery wild organic arugula, accompanied by heirloom cherry tomatoes, drizzled with a decadent house-made black truffle balsamic reduction and premium cold-pressed extra virgin olive oil. Served with a side of toasted artisanal sourdough bread.",
    price: 18.00,
    oldPrice: 22.00,
    rating: 4.9,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Chef's Choice",
    category: "starters",
    ingredients: [
      "Fresh Mozzarella Burrata",
      "Organic Wild Arugula",
      "Heirloom Cherry Tomatoes",
      "Black Truffle Balsamic Glaze",
      "Artisanal Olive Oil",
      "Flaky Sea Salt & Pepper"
    ],
    nutrition: {
      calories: "420 kcal",
      fat: "32g",
      protein: "14g",
      carbs: "18g"
    },
    deliveryInfo: {
      prepTime: "10-12 min",
      availability: "In Stock",
      estimatedDelivery: "20-30 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Elena Rostova",
        rating: 5,
        comment: "Absolutely outstanding. The burrata was incredibly creamy, and the truffle glaze has a perfect depth. Will definitely order this again!",
        date: "2026-07-01"
      },
      {
        id: "r2",
        userName: "Marcus Vance",
        rating: 4.8,
        comment: "Delicious burrata. High-quality ingredients are obvious. Sourdough bread was a bit tough but overall great starter.",
        date: "2026-06-25"
      }
    ]
  },
  p2: {
    id: "p2",
    title: "Wagyu Beef Ribeye",
    description: "An extraordinary sensory masterpiece. We source hand-selected A5 grade Japanese Wagyu beef, renowned for its dense, snowflake-like intramuscular marbling. Hand-cut and seasoned simply with coarse sea salt and cracked black pepper, then seared to a perfect medium-rare in butter with smashed garlic cloves and fresh rosemary sprigs. Served with roasted fingerling potatoes, grilled asparagus, and a side of red wine reduction sauce.",
    price: 64.00,
    oldPrice: 75.00,
    rating: 4.95,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Best Seller",
    category: "mains",
    ingredients: [
      "A5 Grade Japanese Wagyu Beef",
      "Roasted Fingerling Potatoes",
      "Organic Asparagus",
      "Garlic Herb Butter",
      "Rosemary & Thyme",
      "House Red Wine Jus"
    ],
    nutrition: {
      calories: "890 kcal",
      fat: "68g",
      protein: "58g",
      carbs: "12g"
    },
    deliveryInfo: {
      prepTime: "20-25 min",
      availability: "In Stock",
      estimatedDelivery: "35-45 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Julian Mercer",
        rating: 5,
        comment: "Melts in your mouth like butter. Worth every single dollar. Cooked to a flawless medium-rare. Absolutely brilliant.",
        date: "2026-07-10"
      },
      {
        id: "r2",
        userName: "Sophia Loren",
        rating: 5,
        comment: "Unbelievable quality of meat. Craveora has nailed the packaging, steak arrived perfectly warm and intact.",
        date: "2026-07-03"
      }
    ]
  },
  p3: {
    id: "p3",
    title: "Pan-Seared Sea Bass",
    description: "Light, flaky, and delicate. Our wild-caught sea bass is lightly pan-seared skin-on to achieve a crisp golden-brown crust while maintaining its buttery, tender interior. Bathed in a vibrant reduction of organic lemon juice, salted butter, dry white wine, and baby capers. Served alongside seasoned grilled asparagus spears and wild saffron rice pilaf.",
    price: 42.00,
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "New",
    category: "mains",
    ingredients: [
      "Wild caught Sea Bass Fillet",
      "Organic Lemon Butter Sauce",
      "Capers & Parsley",
      "Seasoned Wild Rice",
      "Grilled Asparagus",
      "White Wine Glaze"
    ],
    nutrition: {
      calories: "510 kcal",
      fat: "24g",
      protein: "42g",
      carbs: "22g"
    },
    deliveryInfo: {
      prepTime: "15-18 min",
      availability: "In Stock",
      estimatedDelivery: "30-40 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Alexander Kim",
        rating: 4.5,
        comment: "Excellent flavor, fish was flaky and delicious. The caper butter sauce is spectacular.",
        date: "2026-07-08"
      }
    ]
  },
  p4: {
    id: "p4",
    title: "Lobster Thermidor",
    description: "A decadent French classic. Succulent chunks of native lobster meat, sautéed with shallots and wild mushrooms, then folded into a rich, velvety cognac-infused cream sauce with a touch of Dijon mustard. Stuffed back into the shell, covered with aged Swiss Gruyère and Parmigiano-Reggiano cheese, and broiled to a perfect golden-brown blistered crust. Served with house greens.",
    price: 78.00,
    rating: 5.0,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1559742811-82410b510429?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1559742811-82410b510429?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590759013727-b586c5db5258?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Limited",
    category: "specials",
    ingredients: [
      "Native Whole Lobster",
      "Cognac Cream Sauce",
      "Chanterelle Mushrooms",
      "Swiss Gruyère Cheese",
      "Dijon Mustard",
      "Herbed Mixed Greens"
    ],
    nutrition: {
      calories: "720 kcal",
      fat: "46g",
      protein: "52g",
      carbs: "14g"
    },
    deliveryInfo: {
      prepTime: "25-30 min",
      availability: "Limited",
      estimatedDelivery: "40-50 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Diana Prince",
        rating: 5,
        comment: "Out of this world. Luxurious taste, very rich and filling. The cognac flavor really highlights the fresh lobster.",
        date: "2026-07-12"
      }
    ]
  },
  p5: {
    id: "p5",
    title: "Saffron Risotto",
    description: "Smooth, aromatic, and rich. Slow-cooked Acquerello Carnaroli rice, gently stirred with white wine and hot vegetable stock, slowly absorbing the complex flavor and vibrant golden hue of premium Iranian saffron threads. Finished with a heavy hand of cold butter and 24-month aged Parmigiano-Reggiano cheese, creating a perfectly creamy consistency. Garnished with edible 24k gold leaf.",
    price: 32.00,
    oldPrice: 38.00,
    rating: 4.8,
    reviewCount: 165,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Chef's Choice",
    category: "mains",
    ingredients: [
      "Acquerello Carnaroli Rice",
      "Iranian Saffron Threads",
      "Aged Parmigiano-Reggiano",
      "Dry White Wine",
      "Shallot Stock",
      "Edible 24k Gold Leaf"
    ],
    nutrition: {
      calories: "580 kcal",
      fat: "22g",
      protein: "12g",
      carbs: "78g"
    },
    deliveryInfo: {
      prepTime: "18-20 min",
      availability: "In Stock",
      estimatedDelivery: "30-40 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Vittorio Rossi",
        rating: 5,
        comment: "Magnificent! The rice had the perfect al dente texture and the saffron aroma was very authentic.",
        date: "2026-07-04"
      }
    ]
  },
  p6: {
    id: "p6",
    title: "Chocolate Lava Fondant",
    description: "Decadence in every bite. Our signature dessert is a warm, rich chocolate cake crafted from 70% dark Belgian cocoa. Baked to order to maintain a molten, liquid chocolate core that spills out at the first spoon cut. Served alongside a scoop of premium Madagascan vanilla bean gelato, fresh raspberries, and a light dusting of powdered sugar.",
    price: 14.00,
    rating: 4.9,
    reviewCount: 423,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Best Seller",
    category: "desserts",
    ingredients: [
      "70% Dark Belgian Chocolate",
      "Organic Egg Yolks & Butter",
      "Madagascan Vanilla Bean Gelato",
      "Fresh Raspberries",
      "Powdered Cane Sugar"
    ],
    nutrition: {
      calories: "620 kcal",
      fat: "38g",
      protein: "8g",
      carbs: "54g"
    },
    deliveryInfo: {
      prepTime: "8-10 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Clara Oswald",
        rating: 5,
        comment: "Absolutely amazing. The center was perfectly warm and runny. The contrast with the cold vanilla gelato is heavenly.",
        date: "2026-07-14"
      }
    ]
  },
  p7: {
    id: "p7",
    title: "Matcha Panna Cotta",
    description: "A velvety, modern fusion dessert. Silky Japanese green tea panna cotta made with ceremonial grade Uji matcha, giving it a bright, grassy flavor with sweet creamy undertones. Layered neatly over a sweet red azuki bean paste, topped with fresh strawberries and garnished with gold leaf.",
    price: 12.00,
    rating: 4.65,
    reviewCount: 52,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "New",
    category: "desserts",
    ingredients: [
      "Ceremonial Grade Uji Matcha",
      "Fresh Milk Cream & Gelatin",
      "Sweetened Azuki Red Beans",
      "Fresh Strawberries",
      "Edible Gold Flakes"
    ],
    nutrition: {
      calories: "340 kcal",
      fat: "16g",
      protein: "6g",
      carbs: "38g"
    },
    deliveryInfo: {
      prepTime: "5 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Kenji Sato",
        rating: 4.7,
        comment: "Nicely balanced. Not overly sweet, and the matcha quality is indeed exceptional. Highly recommended.",
        date: "2026-07-06"
      }
    ]
  },
  p8: {
    id: "p8",
    title: "Smoked Old Fashioned",
    description: "Our signature cocktail creation. Crafted with premium small-batch Kentucky bourbon, aromatic bitters, a splash of raw dark cherry syrup, and orange peel oils. Smoked table-side with toasted cherrywood chips inside a glass decanter, releasing rich, warm smoky notes. Served over a single crystal-clear ice sphere.",
    price: 18.00,
    rating: 4.85,
    reviewCount: 184,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Chef's Choice",
    category: "beverages",
    ingredients: [
      "Kentucky Small-Batch Bourbon",
      "Angostura Bitters",
      "Dark Cherry Syrup",
      "Orange Peel & Oils",
      "Toasted Cherrywood Smoke"
    ],
    nutrition: {
      calories: "160 kcal",
      fat: "0g",
      protein: "0g",
      carbs: "8g"
    },
    deliveryInfo: {
      prepTime: "5 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "David Cole",
        rating: 5,
        comment: "Excellent balance of smoke and bourbon. The single ice sphere is a nice touch. Best old fashioned in town.",
        date: "2026-07-11"
      }
    ]
  },
  p9: {
    id: "p9",
    title: "Crispy Calamari Fritti",
    description: "Perfect starter for sharing. Tender rings of wild Monterey Bay squid, lightly dredged in seasoned flour and flash-fried to a crisp golden finish. Tossed with fried parsley sprigs and red pepper flakes. Served with a side of house-made garlic-citrus aioli and lemon wedges.",
    price: 16.00,
    rating: 4.75,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "New",
    category: "starters",
    ingredients: [
      "Monterey Bay Squid Rings",
      "Citrus Garlic Aioli",
      "Seasoned Flour Dredge",
      "Fresh Parsley & Chili Flakes",
      "Fresh Lemon Slices"
    ],
    nutrition: {
      calories: "380 kcal",
      fat: "18g",
      protein: "24g",
      carbs: "28g"
    },
    deliveryInfo: {
      prepTime: "8-10 min",
      availability: "In Stock",
      estimatedDelivery: "20-30 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Sarah Jenkins",
        rating: 4.8,
        comment: "Light, crispy, and not greasy at all! The garlic aioli has just the right amount of tang. Recommend!",
        date: "2026-07-02"
      }
    ]
  },
  p10: {
    id: "p10",
    title: "Hibiscus Rose Mocktail",
    description: "Vibrant, refreshing, and floral. A carbonated botanic brew of brewed hibiscus tea flowers, fresh squeezed lime juice, organic rosewater, and a touch of raw agave nectar. Topped with cold club soda and garnished with edible organic dried rose petals.",
    price: 10.00,
    rating: 4.6,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Limited",
    category: "beverages",
    ingredients: [
      "Brewed Hibiscus Flowers",
      "Organic Rosewater Essence",
      "Freshly Squeezed Lime",
      "Organic Agave Nectar",
      "Sparkling Club Soda",
      "Dried Rose Petals"
    ],
    nutrition: {
      calories: "85 kcal",
      fat: "0g",
      protein: "0g",
      carbs: "22g"
    },
    deliveryInfo: {
      prepTime: "3-5 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Mia Thompson",
        rating: 4.5,
        comment: "Very refreshing and floral. Not too sweet, which I love. The hibiscus color is gorgeous.",
        date: "2026-06-29"
      }
    ]
  },
  p11: {
    id: "p11",
    title: "Caviar Blinis",
    description: "Indulge in a classic Russian luxury. House-made warm blinis topped with premium Osetra caviar, rich crème fraîche, and finely chopped micro chives. Perfect starting bite for a grand dinner.",
    price: 48.00,
    rating: 4.95,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Exclusive",
    category: "starters",
    ingredients: [
      "Premium Osetra Caviar",
      "Warm Blinis",
      "Crème Fraîche",
      "Chives"
    ],
    nutrition: {
      calories: "280 kcal",
      fat: "14g",
      protein: "12g",
      carbs: "18g"
    },
    deliveryInfo: {
      prepTime: "8-10 min",
      availability: "In Stock",
      estimatedDelivery: "20-30 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "James Bond",
        rating: 5,
        comment: "Exceptional caviar, perfectly chilled and presented.",
        date: "2026-07-07"
      }
    ]
  },
  p12: {
    id: "p12",
    title: "Wild Mushroom Velouté",
    description: "Warm and earthy. Puréed seasonal wild forest mushrooms, enriched with fresh organic cream, drizzled with white truffle oil, and topped with crispy sage leaves.",
    price: 14.00,
    rating: 4.75,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1547592165-e1d17fed6005?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Seasonal",
    category: "starters",
    ingredients: [
      "Porcini & Chanterelle Mushrooms",
      "Organic Heavy Cream",
      "White Truffle Oil",
      "Crispy Sage"
    ],
    nutrition: {
      calories: "320 kcal",
      fat: "26g",
      protein: "6g",
      carbs: "14g"
    },
    deliveryInfo: {
      prepTime: "10-12 min",
      availability: "In Stock",
      estimatedDelivery: "20-30 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Alice Cooper",
        rating: 4.8,
        comment: "Rich mushroom flavor, feels extremely cozy and gourmet.",
        date: "2026-07-05"
      }
    ]
  },
  p13: {
    id: "p13",
    title: "Duck Confit",
    description: "Classic gascon delicacy. Slow-cooked duck leg in its own fat until fall-apart tender, then roasted until skin is perfectly crisp. Served over buttery parsnip purée and sweet dark cherry glaze.",
    price: 38.00,
    rating: 4.85,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Chef's Choice",
    category: "mains",
    ingredients: [
      "Duck Leg",
      "Duck Fat",
      "Parsnip Purée",
      "Dark Cherry Glaze"
    ],
    nutrition: {
      calories: "690 kcal",
      fat: "48g",
      protein: "38g",
      carbs: "24g"
    },
    deliveryInfo: {
      prepTime: "20-22 min",
      availability: "In Stock",
      estimatedDelivery: "30-40 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Gaston Leroux",
        rating: 5,
        comment: "Perfect crisp on the skin, duck was extremely tender.",
        date: "2026-07-02"
      }
    ]
  },
  p14: {
    id: "p14",
    title: "Herb-Crusted Rack of Lamb",
    description: "A tender feast. Premium grass-fed rack of lamb with a roasted Dijon mustard and aromatic fresh herb crust. Roasted to medium-rare and served with roasted garlic baby potatoes and rich mint jus.",
    price: 46.00,
    rating: 4.9,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Best Seller",
    category: "mains",
    ingredients: [
      "Rack of Lamb",
      "Dijon Mustard",
      "Fresh Rosemary & Thyme Crumbs",
      "Garlic Mint Jus"
    ],
    nutrition: {
      calories: "780 kcal",
      fat: "52g",
      protein: "48g",
      carbs: "10g"
    },
    deliveryInfo: {
      prepTime: "22-25 min",
      availability: "In Stock",
      estimatedDelivery: "35-45 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Gordon R.",
        rating: 5,
        comment: "Superb pink center, crust is beautiful and seasoned beautifully.",
        date: "2026-07-09"
      }
    ]
  },
  p15: {
    id: "p15",
    title: "Lobster Tail Tagliatelle",
    description: "An elegant seafood pairing. Handmade egg tagliatelle pasta tossed in a velvety, reduction sauce of lobster broth and butter, topped with a butter-poached Maine lobster tail.",
    price: 52.00,
    rating: 4.95,
    reviewCount: 110,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "New",
    category: "specials",
    ingredients: [
      "Maine Lobster Tail",
      "Egg Tagliatelle Pasta",
      "Lobster Butter reduction",
      "Fresh Basil"
    ],
    nutrition: {
      calories: "670 kcal",
      fat: "32g",
      protein: "39g",
      carbs: "54g"
    },
    deliveryInfo: {
      prepTime: "18-20 min",
      availability: "In Stock",
      estimatedDelivery: "30-40 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Marcella Hazan",
        rating: 5,
        comment: "Tagliatelle had perfect bite, sauce is velvety and coats the pasta beautifully.",
        date: "2026-07-11"
      }
    ]
  },
  p16: {
    id: "p16",
    title: "Truffle Beef Wellington",
    description: "The gold standard of dinners. Center-cut beef tenderloin seared and coated in a truffle mushroom duxelles and parma ham, wrapped in puff pastry and baked golden. Served with bordelaise sauce.",
    price: 72.00,
    rating: 5.0,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Exclusive",
    category: "specials",
    ingredients: [
      "Beef Tenderloin",
      "Truffle Mushroom Duxelles",
      "Parma Ham",
      "Puff Pastry Shell"
    ],
    nutrition: {
      calories: "850 kcal",
      fat: "49g",
      protein: "54g",
      carbs: "36g"
    },
    deliveryInfo: {
      prepTime: "25-30 min",
      availability: "Exclusive",
      estimatedDelivery: "40-50 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Charles Spencer",
        rating: 5,
        comment: "Absolutely outstanding. Puff pastry was crisp, meat was perfectly rare. Extraordinary delivery.",
        date: "2026-07-13"
      }
    ]
  },
  p17: {
    id: "p17",
    title: "Black Truffle Fries",
    description: "Gourmet fries. Double-cooked russet potatoes tossed in aromatic black truffle oil, aged Parmigiano-Reggiano, and chopped micro parsley.",
    price: 12.00,
    rating: 4.6,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Popular",
    category: "starters",
    ingredients: [
      "Russet Potatoes",
      "Truffle Oil",
      "Parmigiano-Reggiano",
      "Parsley"
    ],
    nutrition: {
      calories: "340 kcal",
      fat: "18g",
      protein: "5g",
      carbs: "42g"
    },
    deliveryInfo: {
      prepTime: "5-8 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Toby Maguire",
        rating: 4.6,
        comment: "Crispy and perfect amount of truffle oil.",
        date: "2026-07-01"
      }
    ]
  },
  p18: {
    id: "p18",
    title: "Grand Marnier Soufflé",
    description: "An elegant French classic. A warm, puffed soufflé flavored with orange Grand Marnier liqueur, served straight from the oven with a dusting of vanilla bean powder.",
    price: 16.00,
    rating: 4.8,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Chef's Choice",
    category: "desserts",
    ingredients: [
      "Grand Marnier Liqueur",
      "Egg Whites & Sugar",
      "Vanilla Bean Powder",
      "Orange Zest"
    ],
    nutrition: {
      calories: "290 kcal",
      fat: "8g",
      protein: "6g",
      carbs: "38g"
    },
    deliveryInfo: {
      prepTime: "12-15 min",
      availability: "In Stock",
      estimatedDelivery: "25-35 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Julia Child",
        rating: 5,
        comment: "Excellent rise and structure. Grand Marnier flavor is sublime.",
        date: "2026-07-06"
      }
    ]
  },
  p19: {
    id: "p19",
    title: "Vanilla Crème Brûlée",
    description: "Classic French indulgence. Custard infused with Madagascar vanilla beans, topped with a hard crack layer of hand-torched sugar.",
    price: 13.00,
    rating: 4.85,
    reviewCount: 167,
    image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Best Seller",
    category: "desserts",
    ingredients: [
      "Madagascan Vanilla Beans",
      "Heavy Egg Custard",
      "Caramelized Sugar"
    ],
    nutrition: {
      calories: "380 kcal",
      fat: "22g",
      protein: "5g",
      carbs: "28g"
    },
    deliveryInfo: {
      prepTime: "5 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Marie A.",
        rating: 5,
        comment: "Amazing caramelized sugar shell, custard is silken and perfect.",
        date: "2026-07-03"
      }
    ]
  },
  p20: {
    id: "p20",
    title: "Earl Grey Lavender Tea",
    description: "Premium brewed black tea scented with oil of bergamot, infused with dried French lavender blossoms and a hint of wildflower honey.",
    price: 9.00,
    rating: 4.7,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "New",
    category: "beverages",
    ingredients: [
      "Bergamot Black Tea Leaves",
      "Culinary Lavender Blossoms",
      "Wildflower Honey"
    ],
    nutrition: {
      calories: "45 kcal",
      fat: "0g",
      protein: "0g",
      carbs: "11g"
    },
    deliveryInfo: {
      prepTime: "3-5 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Queen Elizabeth",
        rating: 5,
        comment: "Extremely delicate and soothing. Perfect morning brew.",
        date: "2026-07-10"
      }
    ]
  },
  p21: {
    id: "p21",
    title: "Champagne Royal",
    description: "Premium sparkling dry champagne topped with a splash of sweet house-made wild blackberry reduction.",
    price: 22.00,
    rating: 4.9,
    reviewCount: 88,
    image: "https://images.unsplash.com/photo-1594487981504-20ed6bc294a8?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1594487981504-20ed6bc294a8?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Exclusive",
    category: "beverages",
    ingredients: [
      "French Champagne",
      "Wild Blackberry Reduction"
    ],
    nutrition: {
      calories: "140 kcal",
      fat: "0g",
      protein: "0g",
      carbs: "12g"
    },
    deliveryInfo: {
      prepTime: "3 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Gatsby",
        rating: 5,
        comment: "Vibrant bubbles, delightful berry sweetness.",
        date: "2026-07-08"
      }
    ]
  },
  p22: {
    id: "p22",
    title: "Espresso Martini",
    description: "Chilled vodka, freshly pulled organic espresso shot, and Kahlúa coffee liqueur, shaken with ice and garnished with espresso beans.",
    price: 16.00,
    rating: 4.8,
    reviewCount: 154,
    image: "https://images.unsplash.com/photo-1545696911-c436a55b97a0?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1545696911-c436a55b97a0?auto=format&fit=crop&q=80&w=800"
    ],
    badge: "Popular",
    category: "beverages",
    ingredients: [
      "Vodka",
      "Organic Espresso Shot",
      "Kahlúa Liqueur",
      "Martini Beans"
    ],
    nutrition: {
      calories: "210 kcal",
      fat: "0g",
      protein: "0.2g",
      carbs: "14g"
    },
    deliveryInfo: {
      prepTime: "3-5 min",
      availability: "In Stock",
      estimatedDelivery: "15-25 min"
    },
    reviews: [
      {
        id: "r1",
        userName: "Tony Stark",
        rating: 5,
        comment: "Excellent crema on top, packs a robust punch. Beautifully balanced cocktail.",
        date: "2026-07-12"
      }
    ]
  }
};
export default productMock;
