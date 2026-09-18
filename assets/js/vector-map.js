/* =========================================================
   BROMO VECTOR-WEB
   Interactive Community Observation Map
   Prototype data only
   ========================================================= */


/* =========================================================
   MAP INITIALIZATION
   ========================================================= */

const map = L.map("vectorMap", {
  zoomControl: true,
  minZoom: 4,
  maxZoom: 18
});


/* Indonesia default view */

map.setView([-2.5, 118], 5);


/* =========================================================
   OPENSTREETMAP
   ========================================================= */

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,

    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(map);



/* =========================================================
   PROVINCE / CITY MAP EXTENTS
   Prototype list.
   More Indonesian administrative areas can be added later.
   ========================================================= */

const areas = {

  indonesia: {
    name: "Indonesia",
    center: [-2.5, 118],
    zoom: 5
  },


  dki: {
    name: "DKI Jakarta",
    center: [-6.20, 106.84],
    zoom: 10,

    cities: {

      jakarta_pusat: {
        name: "Central Jakarta",
        center: [-6.1754, 106.8272],
        zoom: 12
      },

      jakarta_utara: {
        name: "North Jakarta",
        center: [-6.1384, 106.8637],
        zoom: 12
      },

      jakarta_barat: {
        name: "West Jakarta",
        center: [-6.1683, 106.7588],
        zoom: 12
      },

      jakarta_selatan: {
        name: "South Jakarta",
        center: [-6.2615, 106.8106],
        zoom: 12
      },

      jakarta_timur: {
        name: "East Jakarta",
        center: [-6.2250, 106.9004],
        zoom: 12
      }

    }
  },


  jabar: {
    name: "West Java",
    center: [-6.90, 107.60],
    zoom: 8,

    cities: {

      bandung: {
        name: "Bandung",
        center: [-6.9175, 107.6191],
        zoom: 12
      },

      bogor: {
        name: "Bogor",
        center: [-6.5950, 106.8166],
        zoom: 12
      },

      depok: {
        name: "Depok",
        center: [-6.4025, 106.7942],
        zoom: 12
      },

      bekasi: {
        name: "Bekasi",
        center: [-6.2383, 106.9756],
        zoom: 12
      }

    }
  },


  banten: {
    name: "Banten",
    center: [-6.40, 106.10],
    zoom: 9,

    cities: {

      tangerang: {
        name: "Tangerang",
        center: [-6.1783, 106.6319],
        zoom: 12
      },

      tangsel: {
        name: "South Tangerang",
        center: [-6.2886, 106.7179],
        zoom: 12
      }

    }
  },


  jateng: {
    name: "Central Java",
    center: [-7.15, 110.15],
    zoom: 8,

    cities: {

      semarang: {
        name: "Semarang",
        center: [-6.9667, 110.4167],
        zoom: 12
      },

      surakarta: {
        name: "Surakarta",
        center: [-7.5755, 110.8243],
        zoom: 12
      }

    }
  },


  jatim: {
    name: "East Java",
    center: [-7.54, 112.24],
    zoom: 8,

    cities: {

      surabaya: {
        name: "Surabaya",
        center: [-7.2575, 112.7521],
        zoom: 12
      },

      malang: {
        name: "Malang",
        center: [-7.9666, 112.6326],
        zoom: 12
      }

    }
  },


  bali: {
    name: "Bali",
    center: [-8.4095, 115.1889],
    zoom: 9,

    cities: {

      denpasar: {
        name: "Denpasar",
        center: [-8.6705, 115.2126],
        zoom: 12
      }

    }
  }

};



/* =========================================================
   DEMONSTRATION REPORT DATA

   IMPORTANT:
   These values are interface demonstration data only.
   They are NOT actual surveillance findings.
   ========================================================= */

const reports = [

  {
    province: "dki",
    city: "jakarta_timur",

    lat: -6.225,
    lng: 106.900,

    total: 100,
    verified: 62,
    pending: 25,
    reported: 13
  },


  {
    province: "dki",
    city: "jakarta_selatan",

    lat: -6.261,
    lng: 106.811,

    total: 72,
    verified: 39,
    pending: 21,
    reported: 12
  },


  {
    province: "jabar",
    city: "bandung",

    lat: -6.917,
    lng: 107.619,

    total: 88,
    verified: 48,
    pending: 24,
    reported: 16
  },


  {
    province: "jabar",
    city: "bogor",

    lat: -6.595,
    lng: 106.817,

    total: 46,
    verified: 21,
    pending: 15,
    reported: 10
  },


  {
    province: "jabar",
    city: "depok",

    lat: -6.403,
    lng: 106.794,

    total: 61,
    verified: 31,
    pending: 18,
    reported: 12
  },


  {
    province: "banten",
    city: "tangerang",

    lat: -6.178,
    lng: 106.632,

    total: 53,
    verified: 26,
    pending: 17,
    reported: 10
  },


  {
    province: "jateng",
    city: "semarang",

    lat: -6.967,
    lng: 110.417,

    total: 34,
    verified: 15,
    pending: 12,
    reported: 7
  },


  {
    province: "jatim",
    city: "surabaya",

    lat: -7.258,
    lng: 112.752,

    total: 67,
    verified: 35,
    pending: 19,
    reported: 13
  },


  {
    province: "bali",
    city: "denpasar",

    lat: -8.671,
    lng: 115.213,

    total: 28,
    verified: 14,
    pending: 8,
    reported: 6
  }

];



/* =========================================================
   REPORT DENSITY COLOR
   ========================================================= */

function getDensityColor(total) {

  if (total >= 80) {
    return "#a61919";
  }

  if (total >= 50) {
    return "#ef6c35";
  }

  return "#f0c84b";
}



/* =========================================================
   REPORT CIRCLE SIZE
   ========================================================= */

function getRadius(total) {

  return Math.max(
    12,
    Math.min(32, 10 + total * 0.20)
  );

}



/* =========================================================
   MAP LAYER
   ========================================================= */

const reportLayer = L.layerGroup().addTo(map);



/* =========================================================
   FILTER ELEMENTS
   ========================================================= */

const provinceFilter =
  document.getElementById("provinceFilter");

const cityFilter =
  document.getElementById("cityFilter");

const periodFilter =
  document.getElementById("periodFilter");



/* =========================================================
   GET CITY NAME
   ========================================================= */

function getCityName(province, city) {

  if (
    areas[province] &&
    areas[province].cities &&
    areas[province].cities[city]
  ) {

    return areas[province].cities[city].name;

  }

  return city;

}



/* =========================================================
   GET PROVINCE NAME
   ========================================================= */

function getProvinceName(province) {

  if (areas[province]) {
    return areas[province].name;
  }

  return province;

}



/* =========================================================
   POPUP
   ========================================================= */

function createPopup(report) {

  const verifiedPercentage =
    report.total > 0
      ? Math.round(
          (report.verified / report.total) * 100
        )
      : 0;


  return `

    <div style="min-width:220px">

      <div
        style="
          font-size:11px;
          font-weight:700;
          letter-spacing:.08em;
          color:#a61919;
          margin-bottom:5px;
        "
      >
        SUSPECTED VECTOR REPORTS
      </div>

      <div
        style="
          font-size:18px;
          font-weight:700;
          margin-bottom:2px;
        "
      >
        ${getCityName(report.province, report.city)}
      </div>

      <div
        style="
          font-size:12px;
          color:#6f6a67;
          margin-bottom:14px;
        "
      >
        ${getProvinceName(report.province)}
      </div>


      <div
        style="
          font-size:25px;
          font-weight:700;
          margin-bottom:12px;
        "
      >
        ${report.total} Reports
      </div>


      <div>
        Verified:
        <strong>${report.verified}</strong>
      </div>

      <div>
        Pending Verification:
        <strong>${report.pending}</strong>
      </div>

      <div>
        Reported Only:
        <strong>${report.reported}</strong>
      </div>


      <div
        style="
          margin-top:10px;
          padding-top:10px;
          border-top:1px solid #eee;
        "
      >
        Verified proportion:
        <strong>${verifiedPercentage}%</strong>
      </div>

    </div>

  `;

}



/* =========================================================
   FILTER REPORTS
   ========================================================= */

function getFilteredReports() {

  const province =
    provinceFilter.value;

  const city =
    cityFilter.value;


  return reports.filter(report => {

    const provinceMatch =
      province === "all" ||
      report.province === province;

    const cityMatch =
      city === "all" ||
      report.city === city;

    return provinceMatch && cityMatch;

  });

}



/* =========================================================
   DRAW REPORTS
   ========================================================= */

function drawReports() {

  reportLayer.clearLayers();

  const filteredReports =
    getFilteredReports();


  filteredReports.forEach(report => {

    const color =
      getDensityColor(report.total);


    const circle =
      L.circleMarker(
        [report.lat, report.lng],
        {
          radius: getRadius(report.total),

          fillColor: color,
          color: "#ffffff",

          weight: 2,

          opacity: 1,
          fillOpacity: 0.78
        }
      );


    circle.bindPopup(
      createPopup(report)
    );


    circle.addTo(reportLayer);

  });


  updateSummary(filteredReports);

}



/* =========================================================
   SUMMARY
   ========================================================= */

function updateSummary(filteredReports) {

  const totals =
    filteredReports.reduce(

      (acc, report) => {

        acc.total += report.total;
        acc.verified += report.verified;
        acc.pending += report.pending;
        acc.reported += report.reported;

        return acc;

      },

      {
        total: 0,
        verified: 0,
        pending: 0,
        reported: 0
      }

    );


  document.getElementById("totalReports").textContent =
    totals.total;

  document.getElementById("verifiedReports").textContent =
    totals.verified;

  document.getElementById("pendingReports").textContent =
    totals.pending;

  document.getElementById("reportedOnly").textContent =
    totals.reported;


  document.getElementById("areaTotal").textContent =
    totals.total;

  document.getElementById("areaVerified").textContent =
    totals.verified;

  document.getElementById("areaPending").textContent =
    totals.pending;

  document.getElementById("areaReported").textContent =
    totals.reported;


  const percentage = value => {

    if (totals.total === 0) {
      return 0;
    }

    return Math.round(
      value / totals.total * 100
    );

  };


  document.getElementById(
    "verifiedPercent"
  ).textContent =
    `${percentage(totals.verified)}% of reports`;


  document.getElementById(
    "pendingPercent"
  ).textContent =
    `${percentage(totals.pending)}% of reports`;


  document.getElementById(
    "reportedPercent"
  ).textContent =
    `${percentage(totals.reported)}% of reports`;

}



/* =========================================================
   UPDATE CITY OPTIONS
   ========================================================= */

function updateCityOptions() {

  const province =
    provinceFilter.value;


  cityFilter.innerHTML =
    '<option value="all">All Cities / Regencies</option>';


  if (
    province !== "all" &&
    areas[province] &&
    areas[province].cities
  ) {

    Object.entries(
      areas[province].cities
    ).forEach(([key, city]) => {

      const option =
        document.createElement("option");

      option.value = key;
      option.textContent = city.name;

      cityFilter.appendChild(option);

    });

  }

}



/* =========================================================
   UPDATE SELECTED AREA LABEL
   ========================================================= */

function updateSelectedArea() {

  const province =
    provinceFilter.value;

  const city =
    cityFilter.value;


  let label = "Indonesia";


  if (
    province !== "all" &&
    city === "all"
  ) {

    label =
      areas[province].name;

  }


  if (
    province !== "all" &&
    city !== "all"
  ) {

    label =
      `${areas[province].cities[city].name}, ${areas[province].name}`;

  }


  document.getElementById(
    "selectedArea"
  ).textContent = label;

}



/* =========================================================
   MAP NAVIGATION
   ========================================================= */

function updateMapView() {

  const province =
    provinceFilter.value;

  const city =
    cityFilter.value;


  if (province === "all") {

    map.flyTo(
      areas.indonesia.center,
      areas.indonesia.zoom,
      {
        duration: 1.2
      }
    );

    return;

  }


  if (
    city !== "all" &&
    areas[province].cities &&
    areas[province].cities[city]
  ) {

    const selectedCity =
      areas[province].cities[city];


    map.flyTo(
      selectedCity.center,
      selectedCity.zoom,
      {
        duration: 1.2
      }
    );

    return;

  }


  map.flyTo(
    areas[province].center,
    areas[province].zoom,
    {
      duration: 1.2
    }
  );

}



/* =========================================================
   PROVINCE CHANGE
   ========================================================= */

provinceFilter.addEventListener(
  "change",
  function () {

    updateCityOptions();

    updateMapView();

    updateSelectedArea();

    drawReports();

  }
);



/* =========================================================
   CITY CHANGE
   ========================================================= */

cityFilter.addEventListener(
  "change",
  function () {

    updateMapView();

    updateSelectedArea();

    drawReports();

  }
);



/* =========================================================
   PERIOD CHANGE
   Placeholder until reports contain timestamps.
   ========================================================= */

periodFilter.addEventListener(
  "change",
  function () {

    drawReports();

  }
);



/* =========================================================
   INITIAL RENDER
   ========================================================= */

updateCityOptions();

updateSelectedArea();

drawReports();
