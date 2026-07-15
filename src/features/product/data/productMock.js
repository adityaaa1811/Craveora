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
  }
};
export default productMock;
