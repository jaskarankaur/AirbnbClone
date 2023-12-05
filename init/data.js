const sampleListings = [
    {
      title: "Cozy Beachfront Cottage",
      description:
        "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
      image: "https://cdn.wallpapersafari.com/82/77/dov73n.jpg",
      price: 1500,
      location: "Malibu",
      country: "United States",
    },
    {
      title: "Modern Loft in Downtown",
      description:
        "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
      image: "https://wanderluxe.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2020/07/Villa-Vida-at-Canggu-Beachside-Villas-Gorgeous-villa-design.jpg",
      price: 1200,
      location: "New York City",
      country: "United States",
    },
    {
      title: "Mountain Retreat",
      description:
        "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
      image: "https://tse4.mm.bing.net/th?id=OIP.WBnduYJTbRfa-6NAVO7_UAHaFS&pid=Api&P=0&h=180",
      price: 1000,
      location: "Aspen",
      country: "United States",
    },
    {
      title: "Historic Villa in Tuscany",
      description:
        "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
      image: "https://s1.it.atcdn.net/wp-content/uploads/2013/01/Tuscany-Villa-Firenze.jpg",
      price: 2500,
      location: "Florence",
      country: "Italy",
    },
    {
      title: "Secluded Treehouse Getaway",
      description:
        "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
      image: "https://www.fodors.com/wp-content/uploads/2018/11/5-Out-n-About-Treehouses-Treesort.jpg",
      price: 800,
      location: "Portland",
      country: "United States",
    },
    {
      title: "Beachfront Paradise",
      description:
        "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
      image: "https://tse1.mm.bing.net/th?id=OIP.MtZA-HQqeJLYvK1-5Y3ykwHaE8&pid=Api&P=0&h=180",
      price: 2000,
      location: "Cancun",
      country: "Mexico",
    },
    {
      title: "Rustic Cabin by the Lake",
      description:
        "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
      image: "https://tse1.mm.bing.net/th?id=OIP.omuHPxA5aZ1uBbLnAWN0SAHaE8&pid=Api&P=0&h=180",
      price: 900,
      location: "Lake Tahoe",
      country: "United States",
    },
    {
      title: "Luxury Penthouse with City Views",
      description:
        "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
      image: "https://i.pinimg.com/originals/f2/88/01/f28801c975f3d38fe4015bcae7d01cef.jpg",
      price: 3500,
      location: "Los Angeles",
      country: "United States",
    },
    {
      title: "Ski-In/Ski-Out Chalet",
      description:
        "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
      image: "https://tse3.mm.bing.net/th?id=OIP.jmcU7d4vHOzcJKfma3xsVAHaE8&pid=Api&P=0&h=180",
      price: 3000,
      location: "Verbier",
      country: "Switzerland",
    },
    {
      title: "Safari Lodge in the Serengeti",
      description:
        "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
      image: "https://tse1.mm.bing.net/th?id=OIP.KbyGXlUdiAy7aqRl0POi3wHaFO&pid=Api&P=0&h=180",
      price: 4000,
      location: "Serengeti National Park",
      country: "Tanzania",
    },
    {
      title: "Historic Canal House",
      description:
        "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
      image: "http://3.bp.blogspot.com/-ScEiB9F6Okg/UJ0uHR6QY7I/AAAAAAAAKXU/cX_Q2RGVD8w/s1600/Spirit_Lake_Modern_Hillside_Home_by_James_D_LaRue_Architects_Westlake_+Texas_world_of_architecture_worldofarchi_01.jpg",
      price: 1800,
      location: "Amsterdam",
      country: "Netherlands",
    },
    {
      title: "Private Island Retreat",
      description:
        "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Claudehouse1.JPG/1200px-Claudehouse1.JPG",
      price: 10000,
      location: "Fiji",
      country: "Fiji",
    },
    {
      title: "Charming Cottage in the Cotswolds",
      description:
        "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
      image: "https://tse4.mm.bing.net/th?id=OIP.FwcxOEDIpRT6rW3k2UKx0gHaEJ&pid=Api&P=0&h=180",
      price: 1200,
      location: "Cotswolds",
      country: "United Kingdom",
    },
    {
      title: "Historic Brownstone in Boston",
      description:
        "Step back in time in this elegant historic brownstone located in the heart of Boston.",
      image:"https://tse1.explicit.bing.net/th?id=OIP.xGJT_8nV8X9UgljnvQRVcQHaFW&pid=Api&P=0&h=180",
      price: 2200,
      location: "Boston",
      country: "United States",
    },
    {
      title: "Beachfront Bungalow in Bali",
      description:
        "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
      image:"https://tse2.mm.bing.net/th?id=OIP.QI0Co6Dg2Z7V5DaG8R1NrgHaE8&pid=Api&P=0&h=180",
      price: 1800,
      location: "Bali",
      country: "Indonesia",
    },
    {
      title: "Mountain View Cabin in Banff",
      description:
        "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
      image:"https://tse1.mm.bing.net/th?id=OIP.FBWnTk1XbHYVDzeBFCu9OwHaE8&pid=Api&P=0&h=180",
      price: 1500,
      location: "Banff",
      country: "Canada",
    },
    {
      title: "Art Deco Apartment in Miami",
      description:
        "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
      image: "https://www.tripsavvy.com/thmb/YZth1a9GW_7TnHswboSgbXKDlfc=/2095x1431/filters:no_upscale():max_bytes(150000):strip_icc()/miamibeachatnight-5b0df8248023b90036f96119.jpg",
      price: 1600,
      location: "Miami",
      country: "United States",
    },
    {
      title: "Tropical Villa in Phuket",
      description:
        "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
      image: "https://tse4.mm.bing.net/th?id=OIP._fCnMVi32DtALa-pLVhC-AHaDm&pid=Api&P=0&h=180",
      price: 3000,
      location: "Phuket",
      country: "Thailand",
    },
    {
      title: "Historic Castle in Scotland",
      description:
        "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
      image: "https://img.jamesedition.com/listing_images/2018/04/04/08/11/03/1f28f065-aa6d-4d00-8df6-4d6b560f9a90/je/2000xxs.jpg",
      price: 4000,
      location: "Scottish Highlands",
      country: "United Kingdom",
    },
    {
      title: "Desert Oasis in Dubai",
      description:
        "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
      image: "https://cdn.villaway.com/202303/images/60ad6f5ce4b060b1a54c3288/bg_to8t9ve8px_202303.jpg",
      price: 5000,
      location: "Dubai",
      country: "United Arab Emirates",
    },
    {
      title: "Rustic Log Cabin in Montana",
      description:
        "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
      image:"https://homestratosphere.s3.amazonaws.com/wp-content/uploads/2015/04/4-island-home-4-15-15.jpg",
      price: 1100,
      location: "Montana",
      country: "United States",
    },
    {
      title: "Beachfront Villa in Greece",
      description:
        "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
      image:"https://i.pinimg.com/originals/88/24/4d/88244dd8b2f64e9a89c88125da7a2e40.jpg",
      price: 2500,
      location: "Mykonos",
      country: "Greece",
    },
    {
      title: "Eco-Friendly Treehouse Retreat",
      description:
        "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
      image:"https://media.cntraveler.com/photos/59b83a5129d09f763c86542d/master/pass/Lake-Minnewanka-GettyImages-506283284.jpg",
      price: 750,
      location: "Costa Rica",
      country: "Costa Rica",
    },
    {
      title: "Historic Cottage in Charleston",
      description:
        "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
      image:"https://tse3.mm.bing.net/th?id=OIP.5GaIc7xczEKGkvrnG6lRIwHaE8&pid=Api&P=0&h=180",
      price: 1600,
      location: "Charleston",
      country: "United States",
    },
    {
      title: "Modern Apartment in Tokyo",
      description:
        "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
      image:"https://tse3.mm.bing.net/th?id=OIP.9yIw776auPelHiUMykSeWQHaE8&pid=Api&P=0&h=180",
      price: 2000,
      location: "Tokyo",
      country: "Japan",
    },
    {
      title: "Lakefront Cabin in New Hampshire",
      description:
        "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
      image:"https://tse3.mm.bing.net/th?id=OIP.8KA2QfAOfjQB4eWsgMkVswHaE8&pid=Api&P=0&h=180",
      price: 1200,
      location: "New Hampshire",
      country: "United States",
    },
    {
      title: "Luxury Villa in the Maldives",
      description:
        "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
      image: "https://tse1.mm.bing.net/th?id=OIP.4qUOehzWOBIIRmnpLrj1zQHaEK&pid=Api&P=0&h=180",
      price: 6000,
      location: "Maldives",
      country: "Maldives",
    },
    {
      title: "Ski Chalet in Aspen",
      description:
        "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
      image: "https://tse3.mm.bing.net/th?id=OIP.Or1JxLFLytzIyTtaSaC4-QHaEM&pid=Api&P=0&h=180",
      price: 4000,
      location: "Aspen",
      country: "United States",
    },
    {
      title: "Secluded Beach House in Costa Rica",
      description:
        "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
      image: "https://tse1.mm.bing.net/th?id=OIP.-pviXF9Im2crdjheuJyw7wHaE8&pid=Api&P=0&h=180",
      price: 1800,
      location: "Costa Rica",
      country: "Costa Rica",
    },
  ];
  
module.exports = { data: sampleListings };