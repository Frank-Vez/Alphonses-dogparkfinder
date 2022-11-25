const dogParks = [
  {
    name: "arthur-peloquin",
    position: {
      address: "4755 Rue Arthur-Péloquin, Montréal, QC H1R 3G1",
      geo: { lat: 45.578918, lng: -73.596624 },
    },
    dogs: [],
    amenities: ["trees", "bench", "tables", "water fountain"],
    mainPicture:
      "url(https://res.cloudinary.com/villemontreal/image/upload/f_auto,dpr_auto,q_auto,w_1170,c_fill/v1/portail/d4zrhvoh7muwqjm5dkcf.jpg)",
    otherPicture: [],
  },
  {
    name: "Parc Ahuntsic",
    position: {
      address: "10555, rue Lajeunesse, Montréal, QC H3L 2E5",
      geo: { lat: 45.578918, lng: -73.596624 },
    },
    dogs: [],
    amenities: [
      "bench",
      "water fountain",
      "space for small dogs",
      "parkour",
      "poo bags",
    ],
    mainPicture:
      "url(https://res.cloudinary.com/villemontreal/image/upload/f_auto,dpr_auto,q_auto,w_1170,c_fill/v1/portail/cgz5buorimoreutibw4e.jpg)",
    otherPicture: [],
  },
  {
    name: "Parc Lafontaine",
    position: {
      address: "3819 Avenue Calixa-Lavallée, Montréal, QC H2L 3A7",
      geo: { lat: 45.527068, lng: -73.569396 },
    },
    dogs: [],
    amenities: ["trees", "tables", "double doors"],
    mainPicture:
      "url(https://res.cloudinary.com/villemontreal/image/upload/f_auto,dpr_auto,q_auto,w_1170,c_fill/v1/portail/cgz5buorimoreutibw4e.jpg)",
    otherPicture: [],
  },
];

module.exports = { dogParks };
