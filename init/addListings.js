require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const listings = [
  {
    title: "Glass House Above the Forest",
    description:
      "Wake up above the treetops in a quiet glass cabin with sweeping forest views.",
    image: {
      filename: "glass-house-forest",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2800,
    location: "Manali",
    country: "India",
    geometry: { type: "Point", coordinates: [77.1892, 32.2396] },
  },
  {
    title: "Clifftop Sunlight Villa",
    description:
      "A bright coastal villa with an infinity pool, sea breeze, and unforgettable sunsets.",
    image: {
      filename: "clifftop-villa",
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    },
    price: 4200,
    location: "Santorini",
    country: "Greece",
    geometry: { type: "Point", coordinates: [25.4615, 36.3932] },
  },
  {
    title: "Rainforest Canopy Lodge",
    description:
      "A peaceful wooden lodge surrounded by lush rainforest, birdsong, and mountain mist.",
    image: {
      filename: "rainforest-lodge",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    },
    price: 1900,
    location: "Monteverde",
    country: "Costa Rica",
    geometry: { type: "Point", coordinates: [-84.8258, 10.3157] },
  },
  {
    title: "Minimalist Desert Dome",
    description:
      "Stargaze from a modern desert dome with a private terrace and warm sunset views.",
    image: {
      filename: "desert-dome",
      url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2300,
    location: "Jaisalmer",
    country: "India",
    geometry: { type: "Point", coordinates: [70.9167, 26.9157] },
  },
  {
    title: "Canal-Side Artist Loft",
    description:
      "A character-filled loft in a historic district, filled with art, light, and local charm.",
    image: {
      filename: "artist-loft",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2100,
    location: "Amsterdam",
    country: "Netherlands",
    geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
  },
  {
    title: "Hidden Waterfall Cabin",
    description:
      "A cozy cabin beside a clear mountain stream with hiking trails right outside the door.",
    image: {
      filename: "waterfall-cabin",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
    },
    price: 1700,
    location: "Blue Mountains",
    country: "Australia",
    geometry: { type: "Point", coordinates: [150.3119, -33.7148] },
  },
  {
    title: "Overwater Lagoon Bungalow",
    description:
      "Step straight from your deck into turquoise water at this serene island bungalow.",
    image: {
      filename: "lagoon-bungalow",
      url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    },
    price: 6500,
    location: "Bora Bora",
    country: "French Polynesia",
    geometry: { type: "Point", coordinates: [-151.7415, -16.5004] },
  },
  {
    title: "Old Town Rooftop Riad",
    description:
      "Relax in a colorful riad with a shaded rooftop, courtyard garden, and medina views.",
    image: {
      filename: "rooftop-riad",
      url: "https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=1200&q=80",
    },
    price: 1500,
    location: "Marrakesh",
    country: "Morocco",
    geometry: { type: "Point", coordinates: [-8.0083, 31.6295] },
  },
  {
    title: "Nordic Fjord Retreat",
    description:
      "Find stillness in a design-forward cabin overlooking a dramatic Norwegian fjord.",
    image: {
      filename: "nordic-fjord-retreat",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3200,
    location: "Bergen",
    country: "Norway",
    geometry: { type: "Point", coordinates: [5.3221, 60.39299] },
  },
  {
    title: "Lakeside Sauna Cottage",
    description:
      "A warm timber cottage with a private sauna and glassy lake views in every season.",
    image: {
      filename: "lakeside-sauna",
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2400,
    location: "Queenstown",
    country: "New Zealand",
    geometry: { type: "Point", coordinates: [168.6626, -45.0312] },
  },
  {
    title: "Seaside Cycladic Hideaway",
    description:
      "Whitewashed walls, a private plunge pool, and a quiet corner of the Aegean.",
    image: {
      filename: "cycladic-hideaway",
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3600,
    location: "Paros",
    country: "Greece",
    geometry: { type: "Point", coordinates: [25.15, 37.0853] },
  },
  {
    title: "Volcanic Stone House",
    description:
      "A dramatic stone home carved into the landscape with ocean views and a sunset patio.",
    image: {
      filename: "volcanic-stone-house",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2900,
    location: "Lanzarote",
    country: "Spain",
    geometry: { type: "Point", coordinates: [-13.5899, 29.0469] },
  },
  {
    title: "Alpine Glass Chalet",
    description:
      "A modern alpine retreat with panoramic windows, a fireplace, and snowy peaks outside.",
    image: {
      filename: "alpine-glass-chalet",
      url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
    },
    price: 3900,
    location: "Zermatt",
    country: "Switzerland",
    geometry: { type: "Point", coordinates: [7.7491, 46.0207] },
  },
  {
    title: "Tropical Garden Pavilion",
    description:
      "A private pavilion hidden in a tropical garden, minutes from warm sandy beaches.",
    image: {
      filename: "tropical-pavilion",
      url: "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2200,
    location: "Ubud",
    country: "Indonesia",
    geometry: { type: "Point", coordinates: [115.2625, -8.5069] },
  },
  {
    title: "Historic Lighthouse Keeper's House",
    description:
      "Stay beside the sea in a restored lighthouse home with wild coastal walks all around.",
    image: {
      filename: "lighthouse-house",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    },
    price: 2600,
    location: "Dingle",
    country: "Ireland",
    geometry: { type: "Point", coordinates: [-10.2686, 52.1408] },
  },
];

async function addListings() {
  const mongoUrl = process.env.ATLASDB_URL || process.env.DB_URL;
  await mongoose.connect(mongoUrl);
  const owner = await User.findOne();

  if (!owner) {
    throw new Error("Create a user account before adding sample listings.");
  }

  const records = listings.map((listing) => ({ ...listing, owner: owner._id }));
  await Listing.insertMany(records);
  console.log(`Added ${records.length} listings.`);
  await mongoose.disconnect();
}

addListings().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
