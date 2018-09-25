const CELL_WIDTH = 676;
const CELL_HEIGHT = 720;
const PATTERN_WIDTH = CELL_WIDTH * 8;
const PATTERN_HEIGHT = CELL_HEIGHT * 6;

// TODO: DRY this up
const getSizesFromOptOrDefault = opt => {
  if (opt) {
    const unparsedSizes = Array.isArray(opt) ? opt : [opt];
    return unparsedSizes.map(unparsedSize => {
      const results = /(\d+)x(\d+)/.exec(unparsedSize);
      if (results) {
        const w = parseInt(results[1], 10);
        const h = parseInt(results[2], 10);
        return {
          w,
          h,
        };
      } else {
        throw new Error(`Malformed resolution argument: ${unparsedSize}`);
      }
    });
  } else {
    return [
      {
        w: 2880,
        h: 1800,
      },
      {
        w: 750,
        h: 1334,
      },
    ];
  }
};

// TODO: DRY this up
const deepFlatten = arr =>
  arr.reduce(
    (cumulative, inner) =>
      cumulative.concat(Array.isArray(inner) ? deepFlatten(inner) : inner),
    []
  );

const render = (colors, options) => {
  try {
    var sizes = getSizesFromOptOrDefault(
      options['themer-wallpaper-triangles-size']
    );
  } catch (e) {
    return [Promise.reject(e.message)];
  }

  // TODO: DRY this up
  const colorSets = Object.entries(colors).map(([name, colors]) => ({name, colors}));

  return deepFlatten(
    sizes.map(
      size => colorSets.map(colorSet => {
        const {
          shade0,
          shade1,
          shade2,
          shade3,
          shade4,
          shade5,
          shade6,
          shade7,
          accent0,
          accent1,
          accent2,
          accent3,
          accent4,
          accent5,
          accent6,
          accent7,
        } = colorSet.colors;
        const scaleFactor = 3.25;
        const adjustedCellWidth = CELL_WIDTH / scaleFactor;
        const adjustedCellHeight = CELL_HEIGHT / scaleFactor;
        const cellCountX = size.w / adjustedCellWidth;
        const cellCountY = size.h / adjustedCellHeight;
        const surpriseX = Math.floor(cellCountX / 2) * adjustedCellWidth + (Math.floor(cellCountY / 2) % 2 === 0 ? 0 : (adjustedCellWidth / 2));
        const surpriseY = Math.floor(cellCountY / 2) * adjustedCellHeight;
        return Promise.resolve({
          name: `themer-wallpaper-shirts-${colorSet.name}-${size.w}-${size.h}.svg`,
          contents: Buffer.from(
            `
              <svg width="${size.w}" height="${size.h}" viewBox="0 0 ${size.w} ${size.h}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="bg" width="${PATTERN_WIDTH / scaleFactor}" height="${PATTERN_HEIGHT / scaleFactor}" viewBox="0 0 ${PATTERN_WIDTH} ${PATTERN_HEIGHT}" patternUnits="userSpaceOnUse">
                    <rect width="${PATTERN_WIDTH}" height="${PATTERN_HEIGHT}" fill="${shade0}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M296.113 238.887L204 292.069L236.125 347.71L273 326.42V480.569H335.021H341H403.021V326.42L439.897 347.71L472.021 292.069L380.77 239.385C376.138 258.429 358.97 272.569 338.5 272.569C317.852 272.569 300.564 258.183 296.113 238.887Z" fill="${accent1}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1006.96 280.022C1010.86 283.886 1017.14 283.886 1021.04 280.022L1062.07 239.35L1125 275.82L1102.2 315.468L1077.38 301.085C1072.73 310.807 1065.66 329.016 1065.31 350.255C1064.87 377.153 1076.72 451.89 1080.34 474.047V480.836H1018H1010H947.662V474.047C951.284 451.89 963.131 377.153 962.692 350.255C962.345 329.016 955.266 310.807 950.622 301.085L925.804 315.468L903 275.82L965.928 239.35L1006.96 280.022Z" fill="url(#paint0_linear)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1648.11 238.887L1556 292.069L1588.12 347.71L1625 326.42V480.569H1687.02H1693H1755.02V326.42L1791.9 347.71L1824.02 292.069L1732.77 239.385C1728.14 258.429 1710.97 272.569 1690.5 272.569C1669.85 272.569 1652.56 258.183 1648.11 238.887Z" fill="${accent7}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1734 309H1704V341L1719 345L1734 341V309Z" fill="${shade2}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2324.11 238.887L2232 292.069L2264.12 347.71L2301 326.42V480.569H2363.02H2369H2431.02V326.42L2467.9 347.71L2500.02 292.069L2408.77 239.385C2404.14 258.429 2386.97 272.569 2366.5 272.569C2345.85 272.569 2328.56 258.183 2324.11 238.887Z" fill="url(#paint1_radial)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3034.96 280.022C3038.86 283.886 3045.14 283.886 3049.04 280.022L3090.07 239.35L3153 275.82L3130.2 315.468L3105.38 301.085C3100.73 310.807 3093.66 329.016 3093.31 350.255C3092.87 377.153 3104.72 451.89 3108.34 474.047V480.836H3046H3038H2975.66V474.047C2979.28 451.89 2991.13 377.153 2990.69 350.255C2990.34 329.016 2983.27 310.807 2978.62 301.085L2953.8 315.468L2931 275.82L2993.93 239.35L3034.96 280.022Z" fill="${shade6}"/>
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2931" y="239" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3034.96 280.022C3038.86 283.886 3045.14 283.886 3049.04 280.022L3090.07 239.35L3153 275.82L3130.2 315.468L3105.38 301.085C3100.73 310.807 3093.66 329.016 3093.31 350.255C3092.87 377.153 3104.72 451.89 3108.34 474.047V480.836H3046H3038H2975.66V474.047C2979.28 451.89 2991.13 377.153 2990.69 350.255C2990.34 329.016 2983.27 310.807 2978.62 301.085L2953.8 315.468L2931 275.82L2993.93 239.35L3034.96 280.022Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask0)">
                      <rect x="2915.33" y="269.577" width="199.795" height="290.528" transform="rotate(-34.9168 2915.33 269.577)" fill="${shade4}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3083 301H3053V333L3068 337L3083 333V301Z" fill="${accent7}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M634.113 958.887L542 1012.07L574.125 1067.71L611 1046.42V1200.57H673.021H679H741.021V1046.42L777.897 1067.71L810.021 1012.07L718.77 959.385C714.138 978.43 696.97 992.569 676.5 992.569C655.852 992.569 638.564 978.183 634.113 958.887Z" fill="${shade7}"/>
                    <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="542" y="958" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M634.113 958.887L542 1012.07L574.125 1067.71L611 1046.42V1200.57H673.021H679H741.021V1046.42L777.897 1067.71L810.021 1012.07L718.77 959.385C714.138 978.43 696.97 992.569 676.5 992.569C655.852 992.569 638.564 978.183 634.113 958.887Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask1)">
                      <rect x="559" y="1105.41" width="134" height="49" transform="rotate(-18 559 1105.41)" fill="${shade5}" fill-opacity="0.5"/>
                      <rect x="559" y="1132.41" width="122.167" height="49" transform="rotate(-18 559 1132.41)" fill="${accent5}" fill-opacity="0.5"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1344.96 1000.02C1348.86 1003.89 1355.14 1003.89 1359.04 1000.02L1400.07 959.35L1463 995.82L1440.2 1035.47L1415.38 1021.08C1410.73 1030.81 1403.66 1049.02 1403.31 1070.25C1402.87 1097.15 1414.72 1171.89 1418.34 1194.05V1200.84H1356H1348H1285.66V1194.05C1289.28 1171.89 1301.13 1097.15 1300.69 1070.25C1300.34 1049.02 1293.27 1030.81 1288.62 1021.08L1263.8 1035.47L1241 995.82L1303.93 959.35L1344.96 1000.02Z" fill="${shade1}"/>
                    <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="1241" y="959" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1344.96 1000.02C1348.86 1003.89 1355.14 1003.89 1359.04 1000.02L1400.07 959.35L1463 995.82L1440.2 1035.47L1415.38 1021.08C1410.73 1030.81 1403.66 1049.02 1403.31 1070.25C1402.87 1097.15 1414.72 1171.89 1418.34 1194.05V1200.84H1356H1348H1285.66V1194.05C1289.28 1171.89 1301.13 1097.15 1300.69 1070.25C1300.34 1049.02 1293.27 1030.81 1288.62 1021.08L1263.8 1035.47L1241 995.82L1303.93 959.35L1344.96 1000.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask2)">
                      <circle cx="1351.5" cy="1064.5" r="89.5" fill="${shade2}"/>
                      <circle cx="1351.5" cy="1064.5" r="71.5" fill="${shade3}"/>
                      <circle cx="1351.5" cy="1064.5" r="54.5" fill="${shade4}"/>
                      <circle cx="1351.5" cy="1064.5" r="34.5" fill="${shade5}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2020.96 1000.02C2024.86 1003.89 2031.14 1003.89 2035.04 1000.02L2076.07 959.35L2139 995.82L2116.2 1035.47L2091.38 1021.08C2086.73 1030.81 2079.66 1049.02 2079.31 1070.25C2078.87 1097.15 2090.72 1171.89 2094.34 1194.05V1200.84H2032H2024H1961.66V1194.05C1965.28 1171.89 1977.13 1097.15 1976.69 1070.25C1976.34 1049.02 1969.27 1030.81 1964.62 1021.08L1939.8 1035.47L1917 995.82L1979.93 959.35L2020.96 1000.02Z" fill="${accent0}"/>
                    <rect x="1994" y="1027" width="68" height="73" fill="${shade7}" fill-opacity="0.2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2662.11 958.887L2570 1012.07L2602.12 1067.71L2639 1046.42V1200.57H2701.02H2707H2769.02V1046.42L2805.9 1067.71L2838.02 1012.07L2746.77 959.385C2742.14 978.43 2724.97 992.569 2704.5 992.569C2683.85 992.569 2666.56 978.183 2662.11 958.887Z" fill="${shade6}"/>
                    <mask id="mask3" mask-type="alpha" maskUnits="userSpaceOnUse" x="2570" y="958" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2662.11 958.887L2570 1012.07L2602.12 1067.71L2639 1046.42V1200.57H2701.02H2707H2769.02V1046.42L2805.9 1067.71L2838.02 1012.07L2746.77 959.385C2742.14 978.429 2724.97 992.569 2704.5 992.569C2683.85 992.569 2666.56 978.183 2662.11 958.887Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask3)">
                      <path d="M2704 1045L2804.46 1214.5H2603.54L2704 1045Z" fill="${accent6}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3372.96 1000.02C3376.86 1003.89 3383.14 1003.89 3387.04 1000.02L3428.07 959.35L3491 995.82L3468.2 1035.47L3443.38 1021.08C3438.73 1030.81 3431.66 1049.02 3431.31 1070.25C3430.87 1097.15 3442.72 1171.89 3446.34 1194.05V1200.84H3384H3376H3313.66V1194.05C3317.28 1171.89 3329.13 1097.15 3328.69 1070.25C3328.34 1049.02 3321.27 1030.81 3316.62 1021.08L3291.8 1035.47L3269 995.82L3331.93 959.35L3372.96 1000.02Z" fill="${accent2}"/>
                    <line x1="3345.77" y1="1029.23" x2="3417.77" y2="1101.23" stroke="${shade0}" stroke-width="5"/>
                    <line x1="3342.23" y1="1101.23" x2="3414.23" y2="1029.23" stroke="${shade0}" stroke-width="5"/>
                    <circle cx="3380" cy="1032" r="7" fill="${shade0}" fill-opacity="0.6"/>
                    <circle cx="3380" cy="1092" r="7" fill="${shade0}" fill-opacity="0.6"/>
                    <circle cx="3350" cy="1062" r="7" fill="${shade0}" fill-opacity="0.6"/>
                    <circle cx="3410" cy="1062" r="7" fill="${shade0}" fill-opacity="0.6"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M972.113 1678.89L880 1732.07L912.125 1787.71L949 1766.42V1920.57H1011.02H1017H1079.02V1766.42L1115.9 1787.71L1148.02 1732.07L1056.77 1679.38C1052.14 1698.43 1034.97 1712.57 1014.5 1712.57C993.852 1712.57 976.564 1698.18 972.113 1678.89Z" fill="${accent1}"/>
                    <mask id="mask4" mask-type="alpha" maskUnits="userSpaceOnUse" x="880" y="1678" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M972.113 1678.89L880 1732.07L912.125 1787.71L949 1766.42V1920.57H1011.02H1017H1079.02V1766.42L1115.9 1787.71L1148.02 1732.07L1056.77 1679.38C1052.14 1698.43 1034.97 1712.57 1014.5 1712.57C993.852 1712.57 976.564 1698.18 972.113 1678.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask4)">
                      <rect x="937" y="1811" width="154" height="115" fill="${shade2}"/>
                      <rect x="949" y="1767" width="130" height="44" fill="${shade1}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M330.96 1720.02C334.858 1723.89 341.142 1723.89 345.04 1720.02L386.072 1679.35L449 1715.82L426.197 1755.47L401.378 1741.08C396.734 1750.81 389.655 1769.02 389.308 1790.25C388.869 1817.15 400.717 1891.89 404.338 1914.05V1920.84H342.002H333.998H271.662V1914.05C275.284 1891.89 287.131 1817.15 286.692 1790.25C286.345 1769.02 279.266 1750.81 274.622 1741.08L249.804 1755.47L227 1715.82L289.928 1679.35L330.96 1720.02Z" fill="${accent3}"/>
                    <mask id="mask5" mask-type="alpha" maskUnits="userSpaceOnUse" x="227" y="1679" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M330.96 1720.02C334.858 1723.89 341.142 1723.89 345.04 1720.02L386.072 1679.35L449 1715.82L426.197 1755.47L401.378 1741.08C396.734 1750.81 389.655 1769.02 389.308 1790.25C388.869 1817.15 400.717 1891.89 404.338 1914.05V1920.84H342.002H333.998H271.662V1914.05C275.284 1891.89 287.131 1817.15 286.692 1790.25C286.345 1769.02 279.266 1750.81 274.622 1741.08L249.804 1755.47L227 1715.82L289.928 1679.35L330.96 1720.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask5)">
                      <circle cx="279" cy="1712" r="12" fill="${shade7}"/>
                      <circle cx="279" cy="1762" r="12" fill="${shade7}"/>
                      <circle cx="229" cy="1737" r="12" fill="${shade7}"/>
                      <circle cx="279" cy="1812" r="12" fill="${shade7}"/>
                      <circle cx="279" cy="1862" r="12" fill="${shade7}"/>
                      <circle cx="279" cy="1912" r="12" fill="${shade7}"/>
                      <circle cx="319" cy="1687" r="12" fill="${shade7}"/>
                      <circle cx="319" cy="1737" r="12" fill="${shade7}"/>
                      <circle cx="319" cy="1787" r="12" fill="${shade7}"/>
                      <circle cx="319" cy="1837" r="12" fill="${shade7}"/>
                      <circle cx="319" cy="1887" r="12" fill="${shade7}"/>
                      <circle cx="369" cy="1712" r="12" fill="${shade7}"/>
                      <circle cx="369" cy="1762" r="12" fill="${shade7}"/>
                      <circle cx="369" cy="1812" r="12" fill="${shade7}"/>
                      <circle cx="369" cy="1862" r="12" fill="${shade7}"/>
                      <circle cx="369" cy="1912" r="12" fill="${shade7}"/>
                      <circle cx="419" cy="1687" r="12" fill="${shade7}"/>
                      <circle cx="419" cy="1737" r="12" fill="${shade7}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1648.11 1678.89L1556 1732.07L1588.12 1787.71L1625 1766.42V1920.57H1687.02H1693H1755.02V1766.42L1791.9 1787.71L1824.02 1732.07L1732.77 1679.38C1728.14 1698.43 1710.97 1712.57 1690.5 1712.57C1669.85 1712.57 1652.56 1698.18 1648.11 1678.89Z" fill="${accent4}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2324.11 1678.89L2232 1732.07L2264.12 1787.71L2301 1766.42V1920.57H2363.02H2369H2431.02V1766.42L2467.9 1787.71L2500.02 1732.07L2408.77 1679.38C2404.14 1698.43 2386.97 1712.57 2366.5 1712.57C2345.85 1712.57 2328.56 1698.18 2324.11 1678.89Z" fill="${shade7}"/>
                    <mask id="mask6" mask-type="alpha" maskUnits="userSpaceOnUse" x="2232" y="1678" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2324.11 1678.89L2232 1732.07L2264.12 1787.71L2301 1766.42V1920.57H2363.02H2369H2431.02V1766.42L2467.9 1787.71L2500.02 1732.07L2408.77 1679.38C2404.14 1698.43 2386.97 1712.57 2366.5 1712.57C2345.85 1712.57 2328.56 1698.18 2324.11 1678.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask6)">
                      <line x1="2232" y1="1695" x2="2500" y2="1695" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1725" x2="2500" y2="1725" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1755" x2="2500" y2="1755" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1785" x2="2500" y2="1785" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1815" x2="2500" y2="1815" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1845" x2="2500" y2="1845" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1875" x2="2500" y2="1875" stroke="${accent5}" stroke-width="10"/>
                      <line x1="2232" y1="1905" x2="2500" y2="1905" stroke="${accent5}" stroke-width="10"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3034.96 1720.02C3038.86 1723.89 3045.14 1723.89 3049.04 1720.02L3090.07 1679.35L3153 1715.82L3130.2 1755.47L3105.38 1741.08C3100.73 1750.81 3093.66 1769.02 3093.31 1790.25C3092.87 1817.15 3104.72 1891.89 3108.34 1914.05V1920.84H3046H3038H2975.66V1914.05C2979.28 1891.89 2991.13 1817.15 2990.69 1790.25C2990.34 1769.02 2983.27 1750.81 2978.62 1741.08L2953.8 1755.47L2931 1715.82L2993.93 1679.35L3034.96 1720.02Z" fill="${shade3}"/>
                    <mask id="mask7" mask-type="alpha" maskUnits="userSpaceOnUse" x="2931" y="1679" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3034.96 1720.02C3038.86 1723.89 3045.14 1723.89 3049.04 1720.02L3090.07 1679.35L3153 1715.82L3130.2 1755.47L3105.38 1741.08C3100.73 1750.81 3093.66 1769.02 3093.31 1790.25C3092.87 1817.15 3104.72 1891.89 3108.34 1914.05V1920.84H3046H3038H2975.66V1914.05C2979.28 1891.89 2991.13 1817.15 2990.69 1790.25C2990.34 1769.02 2983.27 1750.81 2978.62 1741.08L2953.8 1755.47L2931 1715.82L2993.93 1679.35L3034.96 1720.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask7)">
                      <rect x="2985" y="1675" width="32" height="250" fill="${accent0}" fill-opacity="0.6"/>
                      <rect x="2925" y="1675" width="32" height="250" fill="${accent0}" fill-opacity="0.6"/>
                      <rect x="3045" y="1675" width="32" height="250" fill="${accent0}" fill-opacity="0.6"/>
                      <rect x="3105" y="1675" width="32" height="250" fill="${accent0}" fill-opacity="0.6"/>
                      <rect x="2920" y="1698" width="237" height="40" fill="${accent5}" fill-opacity="0.54"/>
                      <rect x="2920" y="1758" width="237" height="40" fill="${accent5}" fill-opacity="0.54"/>
                      <rect x="2920" y="1818" width="237" height="40" fill="${accent5}" fill-opacity="0.54"/>
                      <rect x="2920" y="1878" width="237" height="40" fill="${accent5}" fill-opacity="0.54"/>
                      <line x1="2920" y1="1721.5" x2="3157" y2="1721.5" stroke="${accent3}" stroke-opacity="0.5" stroke-width="3"/>
                      <line x1="2920" y1="1781.5" x2="3157" y2="1781.5" stroke="${accent3}" stroke-opacity="0.5" stroke-width="3"/>
                      <line x1="2920" y1="1841.5" x2="3157" y2="1841.5" stroke="${accent3}" stroke-opacity="0.5" stroke-width="3"/>
                      <line x1="2920" y1="1901.5" x2="3157" y2="1901.5" stroke="${accent3}" stroke-opacity="0.5" stroke-width="3"/>
                      <line x1="2970.5" y1="1675" x2="2970.5" y2="1925" stroke="${accent2}" stroke-opacity="0.2" stroke-width="3"/>
                      <line x1="3030.5" y1="1675" x2="3030.5" y2="1925" stroke="${accent2}" stroke-opacity="0.2" stroke-width="3"/>
                      <line x1="3090.5" y1="1675" x2="3090.5" y2="1925" stroke="${accent2}" stroke-opacity="0.2" stroke-width="3"/>
                      <line x1="3150.5" y1="1675" x2="3150.5" y2="1925" stroke="${accent2}" stroke-opacity="0.2" stroke-width="3"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M668.96 2440.02C672.858 2443.89 679.142 2443.89 683.04 2440.02L724.072 2399.35L787 2435.82L764.197 2475.47L739.378 2461.08C734.734 2470.81 727.655 2489.02 727.309 2510.25C726.869 2537.15 738.717 2611.89 742.338 2634.05V2640.84H680.002H671.998H609.662V2634.05C613.284 2611.89 625.131 2537.15 624.692 2510.25C624.345 2489.02 617.266 2470.81 612.622 2461.08L587.804 2475.47L565 2435.82L627.928 2399.35L668.96 2440.02Z" fill="url(#paint2_radial)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1344.96 2440.02C1348.86 2443.89 1355.14 2443.89 1359.04 2440.02L1400.07 2399.35L1463 2435.82L1440.2 2475.47L1415.38 2461.08C1410.73 2470.81 1403.66 2489.02 1403.31 2510.25C1402.87 2537.15 1414.72 2611.89 1418.34 2634.05V2640.84H1356H1348H1285.66V2634.05C1289.28 2611.89 1301.13 2537.15 1300.69 2510.25C1300.34 2489.02 1293.27 2470.81 1288.62 2461.08L1263.8 2475.47L1241 2435.82L1303.93 2399.35L1344.96 2440.02Z" fill="${accent6}"/>
                    <mask id="mask8" mask-type="alpha" maskUnits="userSpaceOnUse" x="1241" y="2399" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1344.96 2440.02C1348.86 2443.89 1355.14 2443.89 1359.04 2440.02L1400.07 2399.35L1463 2435.82L1440.2 2475.47L1415.38 2461.08C1410.73 2470.81 1403.66 2489.02 1403.31 2510.25C1402.87 2537.15 1414.72 2611.89 1418.34 2634.05V2640.84H1356H1348H1285.66V2634.05C1289.28 2611.89 1301.13 2537.15 1300.69 2510.25C1300.34 2489.02 1293.27 2470.81 1288.62 2461.08L1263.8 2475.47L1241 2435.82L1303.93 2399.35L1344.96 2440.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask8)">
                      <line x1="1255" y1="2399" x2="1255" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1275" y1="2399" x2="1275" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1295" y1="2399" x2="1295" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1315" y1="2399" x2="1315" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1335" y1="2399" x2="1335" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1355" y1="2399" x2="1355" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1375" y1="2399" x2="1375" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1395" y1="2399" x2="1395" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1415" y1="2399" x2="1415" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1435" y1="2399" x2="1435" y2="2641" stroke="${shade7}" stroke-width="10"/>
                      <line x1="1455" y1="2399" x2="1455" y2="2641" stroke="${shade7}" stroke-width="10"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1986.11 2398.89L1894 2452.07L1926.12 2507.71L1963 2486.42V2640.57H2025.02H2031H2093.02V2486.42L2129.9 2507.71L2162.02 2452.07L2070.77 2399.38C2066.14 2418.43 2048.97 2432.57 2028.5 2432.57C2007.85 2432.57 1990.56 2418.18 1986.11 2398.89Z" fill="${shade1}"/>
                    <path d="M2028 2464L2061.77 2522.5H1994.23L2028 2464Z" stroke="${accent7}" stroke-opacity="0.61" stroke-width="5"/>
                    <path d="M2028 2495L2061.77 2553.5H1994.23L2028 2495Z" stroke="${accent7}" stroke-opacity="0.61" stroke-width="5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2696.96 2440.02C2700.86 2443.89 2707.14 2443.89 2711.04 2440.02L2752.07 2399.35L2815 2435.82L2792.2 2475.47L2767.38 2461.08C2762.73 2470.81 2755.66 2489.02 2755.31 2510.25C2754.87 2537.15 2766.72 2611.89 2770.34 2634.05V2640.84H2708H2700H2637.66V2634.05C2641.28 2611.89 2653.13 2537.15 2652.69 2510.25C2652.34 2489.02 2645.27 2470.81 2640.62 2461.08L2615.8 2475.47L2593 2435.82L2655.93 2399.35L2696.96 2440.02Z" fill="${shade7}"/>
                    <circle cx="2704" cy="2498" r="37" fill="${accent1}"/>
                    <mask id="mask9" mask-type="alpha" maskUnits="userSpaceOnUse" x="2667" y="2461" width="74" height="74">
                      <circle cx="2704" cy="2498" r="37" fill="${accent1}"/>
                    </mask>
                    <g mask="url(#mask9)">
                      <path d="M2674 2505L2661 2509.5L2672.5 2534.5L2705.5 2548.5L2738.5 2534.5L2751 2506.5L2731.5 2497.5L2721.5 2502L2709.5 2489L2693.5 2500L2688 2493L2674 2505Z" fill="${shade2}" stroke="${shade7}" stroke-width="5"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3338.11 2398.89L3246 2452.07L3278.12 2507.71L3315 2486.42V2640.57H3377.02H3383H3445.02V2486.42L3481.9 2507.71L3514.02 2452.07L3422.77 2399.38C3418.14 2418.43 3400.97 2432.57 3380.5 2432.57C3359.85 2432.57 3342.56 2418.18 3338.11 2398.89Z" fill="${accent4}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3425 2469H3395V2501L3410 2505L3425 2501V2469Z" fill="${shade4}"/>
                    <mask id="mask10" mask-type="alpha" maskUnits="userSpaceOnUse" x="3246" y="2398" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3338.11 2398.89L3246 2452.07L3278.12 2507.71L3315 2486.42V2640.57H3377.02H3383H3445.02V2486.42L3481.9 2507.71L3514.02 2452.07L3422.77 2399.38C3418.14 2418.43 3400.97 2432.57 3380.5 2432.57C3359.85 2432.57 3342.56 2418.18 3338.11 2398.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask10)">
                      <rect x="3246" y="2407" width="69" height="102" fill="${shade4}"/>
                      <rect x="3445" y="2407" width="69" height="102" fill="${shade4}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M296.113 3118.89L204 3172.07L236.125 3227.71L273 3206.42V3360.57H335.021H341H403.021V3206.42L439.897 3227.71L472.021 3172.07L380.77 3119.38C376.138 3138.43 358.97 3152.57 338.5 3152.57C317.852 3152.57 300.564 3138.18 296.113 3118.89Z" fill="${accent6}"/>
                    <mask id="mask11" mask-type="alpha" maskUnits="userSpaceOnUse" x="204" y="3118" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M296.113 3118.89L204 3172.07L236.125 3227.71L273 3206.42V3360.57H335.021H341H403.021V3206.42L439.897 3227.71L472.021 3172.07L380.77 3119.38C376.138 3138.43 358.97 3152.57 338.5 3152.57C317.852 3152.57 300.564 3138.18 296.113 3118.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask11)">
                      <rect x="234.255" y="3147.95" width="42" height="248.77" transform="rotate(-45 234.255 3147.95)" fill="${shade7}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1006.96 3160.02C1010.86 3163.89 1017.14 3163.89 1021.04 3160.02L1062.07 3119.35L1125 3155.82L1102.2 3195.47L1077.38 3181.08C1072.73 3190.81 1065.66 3209.02 1065.31 3230.25C1064.87 3257.15 1076.72 3331.89 1080.34 3354.05V3360.84H1018H1010H947.662V3354.05C951.284 3331.89 963.131 3257.15 962.692 3230.25C962.345 3209.02 955.266 3190.81 950.622 3181.08L925.804 3195.47L903 3155.82L965.928 3119.35L1006.96 3160.02Z" fill="url(#paint3_linear)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1052 3188H1022V3220L1037 3224L1052 3220V3188Z" fill="${accent2}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2358.96 3160.02C2362.86 3163.89 2369.14 3163.89 2373.04 3160.02L2414.07 3119.35L2477 3155.82L2454.2 3195.47L2429.38 3181.08C2424.73 3190.81 2417.66 3209.02 2417.31 3230.25C2416.87 3257.15 2428.72 3331.89 2432.34 3354.05V3360.84H2370H2362H2299.66V3354.05C2303.28 3331.89 2315.13 3257.15 2314.69 3230.25C2314.34 3209.02 2307.27 3190.81 2302.62 3181.08L2277.8 3195.47L2255 3155.82L2317.93 3119.35L2358.96 3160.02Z" fill="${accent1}"/>
                    <mask id="mask12" mask-type="alpha" maskUnits="userSpaceOnUse" x="2255" y="3119" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2358.96 3160.02C2362.86 3163.89 2369.14 3163.89 2373.04 3160.02L2414.07 3119.35L2477 3155.82L2454.2 3195.47L2429.38 3181.08C2424.73 3190.81 2417.66 3209.02 2417.31 3230.25C2416.87 3257.15 2428.72 3331.89 2432.34 3354.05V3360.84H2370H2362H2299.66V3354.05C2303.28 3331.89 2315.13 3257.15 2314.69 3230.25C2314.34 3209.02 2307.27 3190.81 2302.62 3181.08L2277.8 3195.47L2255 3155.82L2317.93 3119.35L2358.96 3160.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask12)">
                      <path d="M2322.5 3319.5L2296.5 3344L2269 3375.5L2451 3378V3319.5L2429.5 3344L2408.5 3319.5L2388.5 3344L2366.5 3319.5L2343.5 3344L2322.5 3319.5Z" stroke="${accent4}" stroke-width="5"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1648.11 3118.89L1556 3172.07L1588.12 3227.71L1625 3206.42V3360.57H1687.02H1693H1755.02V3206.42L1791.9 3227.71L1824.02 3172.07L1732.77 3119.38C1728.14 3138.43 1710.97 3152.57 1690.5 3152.57C1669.85 3152.57 1652.56 3138.18 1648.11 3118.89Z" fill="${accent5}"/>
                    <mask id="mask13" mask-type="alpha" maskUnits="userSpaceOnUse" x="1556" y="3118" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1648.11 3118.89L1556 3172.07L1588.12 3227.71L1625 3206.42V3360.57H1687.02H1693H1755.02V3206.42L1791.9 3227.71L1824.02 3172.07L1732.77 3119.38C1728.14 3138.43 1710.97 3152.57 1690.5 3152.57C1669.85 3152.57 1652.56 3138.18 1648.11 3118.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask13)">
                      <circle cx="1632.5" cy="3286.5" r="88.5" fill="${shade7}" fill-opacity="0.25"/>
                      <circle cx="1721.5" cy="3198.5" r="88.5" fill="${shade7}" fill-opacity="0.25"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3000.11 3118.89L2908 3172.07L2940.12 3227.71L2977 3206.42V3360.57H3039.02H3045H3107.02V3206.42L3143.9 3227.71L3176.02 3172.07L3084.77 3119.38C3080.14 3138.43 3062.97 3152.57 3042.5 3152.57C3021.85 3152.57 3004.56 3138.18 3000.11 3118.89Z" fill="${accent0}"/>
                    <path d="M3065 3230L3043.82 3276.5C3043.11 3278.06 3040.89 3278.06 3040.18 3276.5L3019 3230C2995 3175 3089 3175 3065 3230Z" fill="${shade4}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M668.96 3880.02C672.858 3883.89 679.142 3883.89 683.04 3880.02L724.072 3839.35L787 3875.82L764.197 3915.47L739.378 3901.08C734.734 3910.81 727.655 3929.02 727.309 3950.25C726.869 3977.15 738.717 4051.89 742.338 4074.05V4080.84H680.002H671.998H609.662V4074.05C613.284 4051.89 625.131 3977.15 624.692 3950.25C624.345 3929.02 617.266 3910.81 612.622 3901.08L587.804 3915.47L565 3875.82L627.928 3839.35L668.96 3880.02Z" fill="${shade6}"/>
                    <mask id="mask14" mask-type="alpha" maskUnits="userSpaceOnUse" x="565" y="3839" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M668.96 3880.02C672.858 3883.89 679.142 3883.89 683.04 3880.02L724.072 3839.35L787 3875.82L764.197 3915.47L739.378 3901.08C734.734 3910.81 727.655 3929.02 727.309 3950.25C726.869 3977.15 738.717 4051.89 742.338 4074.05V4080.84H680.002H671.998H609.662V4074.05C613.284 4051.89 625.131 3977.15 624.692 3950.25C624.345 3929.02 617.266 3910.81 612.622 3901.08L587.804 3915.47L565 3875.82L627.928 3839.35L668.96 3880.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask14)">
                      <path d="M648 3849L700.828 3957.75H595.172L648 3849Z" fill="${accent7}" fill-opacity="0.5"/>
                      <path d="M704 3849L756.828 3957.75H651.172L704 3849Z" fill="${accent2}" fill-opacity="0.5"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1310.11 3838.89L1218 3892.07L1250.12 3947.71L1287 3926.42V4080.57H1349.02H1355H1417.02V3926.42L1453.9 3947.71L1486.02 3892.07L1394.77 3839.38C1390.14 3858.43 1372.97 3872.57 1352.5 3872.57C1331.85 3872.57 1314.56 3858.18 1310.11 3838.89Z" fill="url(#paint4_linear)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2020.96 3880.02C2024.86 3883.89 2031.14 3883.89 2035.04 3880.02L2076.07 3839.35L2139 3875.82L2116.2 3915.47L2091.38 3901.08C2086.73 3910.81 2079.66 3929.02 2079.31 3950.25C2078.87 3977.15 2090.72 4051.89 2094.34 4074.05V4080.84H2032H2024H1961.66V4074.05C1965.28 4051.89 1977.13 3977.15 1976.69 3950.25C1976.34 3929.02 1969.27 3910.81 1964.62 3901.08L1939.8 3915.47L1917 3875.82L1979.93 3839.35L2020.96 3880.02Z" fill="${accent2}"/>
                    <circle cx="2028" cy="3896" r="4" fill="${shade0}"/>
                    <circle cx="2028" cy="3909" r="4" fill="${shade0}"/>
                    <circle cx="2028" cy="3922" r="4" fill="${shade0}"/>
                    <circle cx="2028" cy="3935" r="4" fill="${shade0}"/>
                    <circle cx="2028" cy="3948" r="4" fill="${shade0}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2696.96 3880.02C2700.86 3883.89 2707.14 3883.89 2711.04 3880.02L2752.07 3839.35L2815 3875.82L2792.2 3915.47L2767.38 3901.08C2762.73 3910.81 2755.66 3929.02 2755.31 3950.25C2754.87 3977.15 2766.72 4051.89 2770.34 4074.05V4080.84H2708H2700H2637.66V4074.05C2641.28 4051.89 2653.13 3977.15 2652.69 3950.25C2652.34 3929.02 2645.27 3910.81 2640.62 3901.08L2615.8 3915.47L2593 3875.82L2655.93 3839.35L2696.96 3880.02Z" fill="${shade5}"/>
                    <path d="M2670 3945.94L2681.31 3957.25L2692.63 3945.94L2703.94 3957.25L2715.25 3945.94L2726.57 3957.25L2737.88 3945.94L2703.94 3912L2670 3945.94Z" fill="${accent4}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3338.11 3838.89L3246 3892.07L3278.12 3947.71L3315 3926.42V4080.57H3377.02H3383H3445.02V3926.42L3481.9 3947.71L3514.02 3892.07L3422.77 3839.38C3418.14 3858.43 3400.97 3872.57 3380.5 3872.57C3359.85 3872.57 3342.56 3858.18 3338.11 3838.89Z" fill="${accent3}"/>
                    <rect x="3344" y="3911" width="72" height="97" fill="url(#paint5_linear)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3710.96 280.022C3714.86 283.886 3721.14 283.886 3725.04 280.022L3766.07 239.35L3829 275.82L3806.2 315.468L3781.38 301.085C3776.73 310.807 3769.66 329.016 3769.31 350.255C3768.87 377.152 3780.72 451.889 3784.34 474.047V480.836H3722H3714H3651.66V474.047C3655.28 451.889 3667.13 377.152 3666.69 350.255C3666.34 329.016 3659.27 310.807 3654.62 301.085L3629.8 315.468L3607 275.82L3669.93 239.35L3710.96 280.022Z" fill="${shade1}"/>
                    <path d="M3718 301L3724.96 322.42H3747.48L3729.26 335.659L3736.22 357.08L3718 343.841L3699.78 357.08L3706.74 335.659L3688.52 322.42H3711.04L3718 301Z" fill="${accent4}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4014.11 2398.89L3922 2452.07L3954.12 2507.71L3991 2486.42V2640.57H4053.02H4059H4121.02V2486.42L4157.9 2507.71L4190.02 2452.07L4098.77 2399.38C4094.14 2418.43 4076.97 2432.57 4056.5 2432.57C4035.85 2432.57 4018.56 2418.18 4014.11 2398.89Z" fill="${shade4}"/>
                    <mask id="mask15" mask-type="alpha" maskUnits="userSpaceOnUse" x="3922" y="2398" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4014.11 2398.89L3922 2452.07L3954.12 2507.71L3991 2486.42V2640.57H4053.02H4059H4121.02V2486.42L4157.9 2507.71L4190.02 2452.07L4098.77 2399.38C4094.14 2418.43 4076.97 2432.57 4056.5 2432.57C4035.85 2432.57 4018.56 2418.18 4014.11 2398.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask15)">
                      <line y1="-1.5" x2="262" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4156.26 2423)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="241.831" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4142 2417.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="223.446" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4129 2410.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="203.647" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4115 2404.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="189.505" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4105 2394.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="125.865" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4060 2419.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="141.421" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4041.26 2418)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="134.35" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4029.26 2410)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="131.522" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4019.26 2400)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="131.522" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4012.26 2387)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="87.6812" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 3973.26 2406)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="280.014" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4169 2430.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="295.571" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4180 2439.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="291.328" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4193 2446.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="231.931" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4173.26 2486)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="132.936" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4122.26 2557)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="103.238" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4121.26 2578)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="76.3675" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4122 2597.26)" stroke="${shade7}" stroke-width="3"/>
                      <line y1="-1.5" x2="46.669" y2="-1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 4121.26 2618)" stroke="${shade7}" stroke-width="3"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5062.96 280.022C5066.86 283.886 5073.14 283.886 5077.04 280.022L5118.07 239.35L5181 275.82L5158.2 315.468L5133.38 301.085C5128.73 310.807 5121.66 329.016 5121.31 350.255C5120.87 377.152 5132.72 451.889 5136.34 474.047V480.836H5074H5066H5003.66V474.047C5007.28 451.889 5019.13 377.152 5018.69 350.255C5018.34 329.016 5011.27 310.807 5006.62 301.085L4981.8 315.468L4959 275.82L5021.93 239.35L5062.96 280.022Z" fill="${accent6}"/>
                    <rect x="5038" y="310" width="64" height="88" fill="url(#paint6_linear)"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4014.11 958.887L3922 1012.07L3954.12 1067.71L3991 1046.42V1200.57H4053.02H4059H4121.02V1046.42L4157.9 1067.71L4190.02 1012.07L4098.77 959.385C4094.14 978.43 4076.97 992.569 4056.5 992.569C4035.85 992.569 4018.56 978.183 4014.11 958.887Z" fill="url(#paint7_linear)"/>
                    <circle cx="4056" cy="1057" r="35" stroke="${shade7}" stroke-width="8"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3676.11 3118.89L3584 3172.07L3616.12 3227.71L3653 3206.42V3360.57H3715.02H3721H3783.02V3206.42L3819.9 3227.71L3852.02 3172.07L3760.77 3119.38C3756.14 3138.43 3738.97 3152.57 3718.5 3152.57C3697.85 3152.57 3680.56 3138.18 3676.11 3118.89Z" fill="${accent7}"/>
                    <mask id="mask16" mask-type="alpha" maskUnits="userSpaceOnUse" x="3584" y="3118" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3676.11 3118.89L3584 3172.07L3616.12 3227.71L3653 3206.42V3360.57H3715.02H3721H3783.02V3206.42L3819.9 3227.71L3852.02 3172.07L3760.77 3119.38C3756.14 3138.43 3738.97 3152.57 3718.5 3152.57C3697.85 3152.57 3680.56 3138.18 3676.11 3118.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask16)">
                      <circle cx="3633" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3633" cy="3143" r="6" fill="${shade6}"/>
                      <circle cx="3633" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3633" cy="3203" r="6" fill="${shade6}"/>
                      <circle cx="3633" cy="3223" r="6" fill="${shade6}"/>
                      <circle cx="3613" cy="3173" r="6" fill="${shade6}"/>
                      <circle cx="3613" cy="3153" r="6" fill="${shade6}"/>
                      <circle cx="3613" cy="3193" r="6" fill="${shade6}"/>
                      <circle cx="3613" cy="3213" r="6" fill="${shade6}"/>
                      <circle cx="3593" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3593" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3173" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3153" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3193" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3213" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3253" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3233" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3273" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3293" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3333" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3313" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3353" r="6" fill="${shade6}"/>
                      <circle cx="3653" cy="3133" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3143" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3203" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3243" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3223" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3263" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3283" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3323" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3303" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3343" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3363" r="6" fill="${shade6}"/>
                      <circle cx="3673" cy="3123" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3173" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3153" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3193" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3213" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3253" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3233" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3273" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3293" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3333" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3313" r="6" fill="${shade6}"/>
                      <circle cx="3693" cy="3353" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3203" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3243" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3223" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3263" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3283" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3323" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3303" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3343" r="6" fill="${shade6}"/>
                      <circle cx="3713" cy="3363" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3173" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3153" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3193" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3213" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3253" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3233" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3273" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3293" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3333" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3313" r="6" fill="${shade6}"/>
                      <circle cx="3733" cy="3353" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3143" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3203" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3243" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3223" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3263" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3283" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3323" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3303" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3343" r="6" fill="${shade6}"/>
                      <circle cx="3753" cy="3363" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3173" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3153" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3193" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3213" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3253" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3233" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3273" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3293" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3333" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3313" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3353" r="6" fill="${shade6}"/>
                      <circle cx="3773" cy="3133" r="6" fill="${shade6}"/>
                      <circle cx="3793" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3793" cy="3143" r="6" fill="${shade6}"/>
                      <circle cx="3793" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3793" cy="3203" r="6" fill="${shade6}"/>
                      <circle cx="3813" cy="3173" r="6" fill="${shade6}"/>
                      <circle cx="3813" cy="3153" r="6" fill="${shade6}"/>
                      <circle cx="3813" cy="3193" r="6" fill="${shade6}"/>
                      <circle cx="3813" cy="3213" r="6" fill="${shade6}"/>
                      <circle cx="3833" cy="3163" r="6" fill="${shade6}"/>
                      <circle cx="3833" cy="3183" r="6" fill="${shade6}"/>
                      <circle cx="3833" cy="3203" r="6" fill="${shade6}"/>
                      <circle cx="3853" cy="3173" r="6" fill="${shade6}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3710.96 1720.02C3714.86 1723.89 3721.14 1723.89 3725.04 1720.02L3766.07 1679.35L3829 1715.82L3806.2 1755.47L3781.38 1741.08C3776.73 1750.81 3769.66 1769.02 3769.31 1790.25C3768.87 1817.15 3780.72 1891.89 3784.34 1914.05V1920.84H3722H3714H3651.66V1914.05C3655.28 1891.89 3667.13 1817.15 3666.69 1790.25C3666.34 1769.02 3659.27 1750.81 3654.62 1741.08L3629.8 1755.47L3607 1715.82L3669.93 1679.35L3710.96 1720.02Z" fill="url(#paint8_linear)"/>
                    <path d="M3727 1745V1743.5H3725.5V1745H3727ZM3757 1745H3758.5V1743.5H3757V1745ZM3727 1777H3725.5V1778.15L3726.61 1778.45L3727 1777ZM3742 1781L3741.61 1782.45L3742 1782.55L3742.39 1782.45L3742 1781ZM3757 1777L3757.39 1778.45L3758.5 1778.15V1777H3757ZM3727 1746.5H3757V1743.5H3727V1746.5ZM3728.5 1777V1745H3725.5V1777H3728.5ZM3742.39 1779.55L3727.39 1775.55L3726.61 1778.45L3741.61 1782.45L3742.39 1779.55ZM3756.61 1775.55L3741.61 1779.55L3742.39 1782.45L3757.39 1778.45L3756.61 1775.55ZM3755.5 1745V1777H3758.5V1745H3755.5Z" fill="${shade5}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M-7.03987 1000.02C-3.14187 1003.89 3.14188 1003.89 7.03987 1000.02L48.0718 959.35L111 995.82L88.1965 1035.47L63.3783 1021.08C58.7337 1030.81 51.6553 1049.02 51.3085 1070.25C50.8692 1097.15 62.7165 1171.89 66.3382 1194.05V1200.84H4.00199H-4.00181H-66.338V1194.05C-62.7164 1171.89 -50.869 1097.15 -51.3083 1070.25C-51.6551 1049.02 -58.7336 1030.81 -63.3781 1021.08L-88.1963 1035.47L-111 995.82L-48.0717 959.35L-7.03987 1000.02Z" fill="${shade6}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40 1020H10V1052L25 1056L40 1052V1020Z" fill="${accent5}"/>
                    <mask id="mask17" mask-type="alpha" maskUnits="userSpaceOnUse" x="-111" y="959" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M-7.03987 1000.02C-3.14187 1003.89 3.14188 1003.89 7.03987 1000.02L48.0718 959.35L111 995.82L88.1965 1035.47L63.3783 1021.08C58.7337 1030.81 51.6553 1049.02 51.3085 1070.25C50.8692 1097.15 62.7165 1171.89 66.3382 1194.05V1200.84H4.00199H-4.00181H-66.338V1194.05C-62.7164 1171.89 -50.869 1097.15 -51.3083 1070.25C-51.6551 1049.02 -58.7336 1030.81 -63.3781 1021.08L-88.1963 1035.47L-111 995.82L-48.0717 959.35L-7.03987 1000.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask17)">
                      <rect x="63" y="962" width="50" height="77" fill="${accent5}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5400.96 1000.02C5404.86 1003.89 5411.14 1003.89 5415.04 1000.02L5456.07 959.35L5519 995.82L5496.2 1035.47L5471.38 1021.08C5466.73 1030.81 5459.66 1049.02 5459.31 1070.25C5458.87 1097.15 5470.72 1171.89 5474.34 1194.05V1200.84H5412H5404H5341.66V1194.05C5345.28 1171.89 5357.13 1097.15 5356.69 1070.25C5356.34 1049.02 5349.27 1030.81 5344.62 1021.08L5319.8 1035.47L5297 995.82L5359.93 959.35L5400.96 1000.02Z" fill="${shade6}"/>
                    <mask id="mask18" mask-type="alpha" maskUnits="userSpaceOnUse" x="5297" y="959" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5400.96 1000.02C5404.86 1003.89 5411.14 1003.89 5415.04 1000.02L5456.07 959.35L5519 995.82L5496.2 1035.47L5471.38 1021.08C5466.73 1030.81 5459.66 1049.02 5459.31 1070.25C5458.87 1097.15 5470.72 1171.89 5474.34 1194.05V1200.84H5412H5404H5341.66V1194.05C5345.28 1171.89 5357.13 1097.15 5356.69 1070.25C5356.34 1049.02 5349.27 1030.81 5344.62 1021.08L5319.8 1035.47L5297 995.82L5359.93 959.35L5400.96 1000.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask18)">
                      <rect x="5295" y="962" width="50" height="77" fill="${accent5}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4014.11 3838.89L3922 3892.07L3954.12 3947.71L3991 3926.42V4080.57H4053.02H4059H4121.02V3926.42L4157.9 3947.71L4190.02 3892.07L4098.77 3839.38C4094.14 3858.43 4076.97 3872.57 4056.5 3872.57C4035.85 3872.57 4018.56 3858.18 4014.11 3838.89Z" fill="${shade3}"/>
                    <mask id="mask19" mask-type="alpha" maskUnits="userSpaceOnUse" x="3922" y="3838" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4014.11 3838.89L3922 3892.07L3954.12 3947.71L3991 3926.42V4080.57H4053.02H4059H4121.02V3926.42L4157.9 3947.71L4190.02 3892.07L4098.77 3839.38C4094.14 3858.43 4076.97 3872.57 4056.5 3872.57C4035.85 3872.57 4018.56 3858.18 4014.11 3838.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask19)">
                      <rect x="4088" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4108" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4128" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4148" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4168" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4188" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4068" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4048" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4028" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="4008" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="3988" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="3968" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="3948" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="3928" y="3831" width="10" height="256" fill="${accent1}" fill-opacity="0.5"/>
                      <rect x="3916" y="3834" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3854" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3874" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3894" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3914" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3934" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3952" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3972" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="3992" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3916" y="4012" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3917" y="4032" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3917" y="4052" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3917" y="4072" width="282" height="10" fill="${shade2}" fill-opacity="0.5"/>
                      <rect x="3932" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="3952" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="3972" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="3992" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4012" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4032" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4052" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4072" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4092" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4112" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4132" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4152" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                      <rect x="4172" y="3831" width="2" height="256" fill="${accent2}" fill-opacity="0.75"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4386.96 3160.02C4390.86 3163.89 4397.14 3163.89 4401.04 3160.02L4442.07 3119.35L4505 3155.82L4482.2 3195.47L4457.38 3181.08C4452.73 3190.81 4445.66 3209.02 4445.31 3230.25C4444.87 3257.15 4456.72 3331.89 4460.34 3354.05V3360.84H4398H4390H4327.66V3354.05C4331.28 3331.89 4343.13 3257.15 4342.69 3230.25C4342.34 3209.02 4335.27 3190.81 4330.62 3181.08L4305.8 3195.47L4283 3155.82L4345.93 3119.35L4386.96 3160.02Z" fill="${shade7}"/>
                    <mask id="mask20" mask-type="alpha" maskUnits="userSpaceOnUse" x="4283" y="3119" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4386.96 3160.02C4390.86 3163.89 4397.14 3163.89 4401.04 3160.02L4442.07 3119.35L4505 3155.82L4482.2 3195.47L4457.38 3181.08C4452.73 3190.81 4445.66 3209.02 4445.31 3230.25C4444.87 3257.15 4456.72 3331.89 4460.34 3354.05V3360.84H4398H4390H4327.66V3354.05C4331.28 3331.89 4343.13 3257.15 4342.69 3230.25C4342.34 3209.02 4335.27 3190.81 4330.62 3181.08L4305.8 3195.47L4283 3155.82L4345.93 3119.35L4386.96 3160.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask20)">
                      <rect x="4290" y="3138" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4320" y="3168" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4440" y="3168" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4470" y="3138" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4440" y="3108" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4350" y="3198" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4380" y="3228" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4410" y="3198" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4380" y="3168" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4410" y="3138" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4350" y="3258" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4320" y="3228" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4320" y="3288" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4350" y="3318" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4410" y="3318" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4380" y="3288" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4410" y="3258" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4440" y="3228" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4440" y="3288" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4440" y="3348" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4320" y="3348" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4380" y="3348" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4350" y="3138" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                      <rect x="4320" y="3108" width="30" height="30" stroke="${shade2}" stroke-width="2"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4724.96 1000.02C4728.86 1003.89 4735.14 1003.89 4739.04 1000.02L4780.07 959.35L4843 995.82L4820.2 1035.47L4795.38 1021.08C4790.73 1030.81 4783.66 1049.02 4783.31 1070.25C4782.87 1097.15 4794.72 1171.89 4798.34 1194.05V1200.84H4736H4728H4665.66V1194.05C4669.28 1171.89 4681.13 1097.15 4680.69 1070.25C4680.34 1049.02 4673.27 1030.81 4668.62 1021.08L4643.8 1035.47L4621 995.82L4683.93 959.35L4724.96 1000.02Z" fill="url(#paint9_linear)"/>
                    <mask id="mask21" mask-type="alpha" maskUnits="userSpaceOnUse" x="4621" y="959" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4724.96 1000.02C4728.86 1003.89 4735.14 1003.89 4739.04 1000.02L4780.07 959.35L4843 995.82L4820.2 1035.47L4795.38 1021.08C4790.73 1030.81 4783.66 1049.02 4783.31 1070.25C4782.87 1097.15 4794.72 1171.89 4798.34 1194.05V1200.84H4736H4728H4665.66V1194.05C4669.28 1171.89 4681.13 1097.15 4680.69 1070.25C4680.34 1049.02 4673.27 1030.81 4668.62 1021.08L4643.8 1035.47L4621 995.82L4683.93 959.35L4724.96 1000.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask21)">
                      <rect x="4668" y="1022" width="128" height="47" fill="${shade7}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5062.96 3160.02C5066.86 3163.89 5073.14 3163.89 5077.04 3160.02L5118.07 3119.35L5181 3155.82L5158.2 3195.47L5133.38 3181.08C5128.73 3190.81 5121.66 3209.02 5121.31 3230.25C5120.87 3257.15 5132.72 3331.89 5136.34 3354.05V3360.84H5074H5066H5003.66V3354.05C5007.28 3331.89 5019.13 3257.15 5018.69 3230.25C5018.34 3209.02 5011.27 3190.81 5006.62 3181.08L4981.8 3195.47L4959 3155.82L5021.93 3119.35L5062.96 3160.02Z" fill="${shade3}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5028.11 1678.89L4936 1732.07L4968.12 1787.71L5005 1766.42V1920.57H5067.02H5073H5135.02V1766.42L5171.9 1787.71L5204.02 1732.07L5112.77 1679.38C5108.14 1698.43 5090.97 1712.57 5070.5 1712.57C5049.85 1712.57 5032.56 1698.18 5028.11 1678.89Z" fill="${shade6}"/>
                    <path d="M5040 1771C5048 1762 5062 1762 5070 1771C5078 1780 5092 1780 5100 1771" stroke="${accent6}" stroke-width="5"/>
                    <path d="M5040 1786C5048 1777 5062 1777 5070 1786C5078 1795 5092 1795 5100 1786" stroke="${accent6}" stroke-width="5"/>
                    <path d="M5040 1756C5048 1747 5062 1747 5070 1756C5078 1765 5092 1765 5100 1756" stroke="${accent6}" stroke-width="5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4724.96 3880.02C4728.86 3883.89 4735.14 3883.89 4739.04 3880.02L4780.07 3839.35L4843 3875.82L4820.2 3915.47L4795.38 3901.08C4790.73 3910.81 4783.66 3929.02 4783.31 3950.25C4782.87 3977.15 4794.72 4051.89 4798.34 4074.05V4080.84H4736H4728H4665.66V4074.05C4669.28 4051.89 4681.13 3977.15 4680.69 3950.25C4680.34 3929.02 4673.27 3910.81 4668.62 3901.08L4643.8 3915.47L4621 3875.82L4683.93 3839.35L4724.96 3880.02Z" fill="url(#paint10_linear)"/>
                    <mask id="mask22" mask-type="alpha" maskUnits="userSpaceOnUse" x="4621" y="3839" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4724.96 3880.02C4728.86 3883.89 4735.14 3883.89 4739.04 3880.02L4780.07 3839.35L4843 3875.82L4820.2 3915.47L4795.38 3901.08C4790.73 3910.81 4783.66 3929.02 4783.31 3950.25C4782.87 3977.15 4794.72 4051.89 4798.34 4074.05V4080.84H4736H4728H4665.66V4074.05C4669.28 4051.89 4681.13 3977.15 4680.69 3950.25C4680.34 3929.02 4673.27 3910.81 4668.62 3901.08L4643.8 3915.47L4621 3875.82L4683.93 3839.35L4724.96 3880.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask22)">
                      <line x1="4645.06" y1="3849.94" x2="4803.06" y2="4007.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4633.06" y1="3857.94" x2="4803.06" y2="4027.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4622.06" y1="3866.94" x2="4803.06" y2="4047.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4622.06" y1="3886.94" x2="4803.06" y2="4067.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4672.06" y1="3956.94" x2="4803.06" y2="4087.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4672.06" y1="3976.94" x2="4784.06" y2="4088.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4672.06" y1="3996.94" x2="4763.06" y2="4087.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4672.06" y1="4016.94" x2="4741.06" y2="4085.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4672.06" y1="4036.94" x2="4721.06" y2="4085.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4662.06" y1="4046.94" x2="4702.06" y2="4086.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4662.06" y1="4066.94" x2="4680.06" y2="4084.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4658.06" y1="3842.94" x2="4803.06" y2="3987.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4670.06" y1="3834.94" x2="4803.06" y2="3967.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4730.06" y1="3874.94" x2="4803.06" y2="3947.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4739.06" y1="3863.94" x2="4803.06" y2="3927.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4749.06" y1="3853.94" x2="4811.06" y2="3915.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4761.06" y1="3845.94" x2="4828.06" y2="3912.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4771.06" y1="3835.94" x2="4836.06" y2="3900.94" stroke="${shade7}" stroke-width="3"/>
                      <line x1="4795.06" y1="3839.94" x2="4843.06" y2="3887.94" stroke="${shade7}" stroke-width="3"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4352.11 238.887L4260 292.069L4292.12 347.71L4329 326.42V480.569H4391.02H4397H4459.02V326.42L4495.9 347.71L4528.02 292.069L4436.77 239.385C4432.14 258.43 4414.97 272.569 4394.5 272.569C4373.85 272.569 4356.56 258.183 4352.11 238.887Z" fill="${accent7}"/>
                    <mask id="mask23" mask-type="alpha" maskUnits="userSpaceOnUse" x="4260" y="238" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4352.11 238.887L4260 292.069L4292.12 347.71L4329 326.42V480.569H4391.02H4397H4459.02V326.42L4495.9 347.71L4528.02 292.069L4436.77 239.385C4432.14 258.43 4414.97 272.569 4394.5 272.569C4373.85 272.569 4356.56 258.183 4352.11 238.887Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask23)">
                      <path d="M4378.5 370L4455.5 230L4549 283L4482.5 496.5L4449.5 508.5L4378.5 370Z" fill="url(#paint11_linear)"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M-7.03987 2440.02C-3.14187 2443.89 3.14188 2443.89 7.03987 2440.02L48.0718 2399.35L111 2435.82L88.1965 2475.47L63.3783 2461.08C58.7338 2470.81 51.6553 2489.02 51.3085 2510.25C50.8692 2537.15 62.7165 2611.89 66.3382 2634.05V2640.84H4.00199H-4.00181H-66.338V2634.05C-62.7164 2611.89 -50.869 2537.15 -51.3083 2510.25C-51.6551 2489.02 -58.7336 2470.81 -63.3781 2461.08L-88.1963 2475.47L-111 2435.82L-48.0718 2399.35L-7.03987 2440.02Z" fill="${shade2}"/>
                    <rect x="-30" y="2469" width="60" height="14" fill="${accent0}"/>
                    <rect x="-30" y="2483" width="60" height="14" fill="${accent1}"/>
                    <rect x="-30" y="2497" width="60" height="14" fill="${accent2}"/>
                    <rect x="-30" y="2511" width="60" height="14" fill="${accent3}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5400.96 2440.02C5404.86 2443.89 5411.14 2443.89 5415.04 2440.02L5456.07 2399.35L5519 2435.82L5496.2 2475.47L5471.38 2461.08C5466.73 2470.81 5459.66 2489.02 5459.31 2510.25C5458.87 2537.15 5470.72 2611.89 5474.34 2634.05V2640.84H5412H5404H5341.66V2634.05C5345.28 2611.89 5357.13 2537.15 5356.69 2510.25C5356.34 2489.02 5349.27 2470.81 5344.62 2461.08L5319.8 2475.47L5297 2435.82L5359.93 2399.35L5400.96 2440.02Z" fill="${shade2}"/>
                    <rect x="5378" y="2469" width="60" height="14" fill="${accent0}"/>
                    <rect x="5378" y="2483" width="60" height="14" fill="${accent1}"/>
                    <rect x="5378" y="2497" width="60" height="14" fill="${accent2}"/>
                    <rect x="5378" y="2511" width="60" height="14" fill="${accent3}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M-41.8873 3838.89L-134 3892.07L-101.875 3947.71L-65 3926.42V4080.57H-2.97888H3H65.0211V3926.42L101.897 3947.71L134.021 3892.07L42.7695 3839.38C38.1379 3858.43 20.9702 3872.57 0.5 3872.57C-20.1479 3872.57 -37.4357 3858.18 -41.8873 3838.89Z" fill="${accent4}"/>
                    <mask id="mask24" mask-type="alpha" maskUnits="userSpaceOnUse" x="-134" y="3838" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M-41.8873 3838.89L-134 3892.07L-101.875 3947.71L-65 3926.42V4080.57H-2.97888H3H65.0211V3926.42L101.897 3947.71L134.021 3892.07L42.7695 3839.38C38.1379 3858.43 20.9702 3872.57 0.5 3872.57C-20.1479 3872.57 -37.4357 3858.18 -41.8873 3838.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask24)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3898V3908H13V3898H23V3895H13V3885H10V3895H0V3898H10Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3940V3950H13V3940H23V3937H13V3927H10V3937H0V3940H10Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3982V3992H13V3982H23V3979H13V3969H10V3979H0V3982H10Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4024V4034H13V4024H23V4021H13V4011H10V4021H0V4024H10Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4066V4076H13V4066H23V4063H13V4053H10V4063H0V4066H10Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M33 3919V3929H36V3919H46V3916H36V3906H33V3916H23V3919H33Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M33 3877V3887H36V3877H46V3874H36V3864H33V3874H23V3877H33Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M33 3961V3971H36V3961H46V3958H36V3948H33V3958H23V3961H33Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M33 4003V4013H36V4003H46V4000H36V3990H33V4000H23V4003H33Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M33 4045V4055H36V4045H46V4042H36V4032H33V4042H23V4045H33Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M33 4087V4097H36V4087H46V4084H36V4074H33V4084H23V4087H33Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M56 3898V3908H59V3898H69V3895H59V3885H56V3895H46V3898H56Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M56 3856V3866H59V3856H69V3853H59V3843H56V3853H46V3856H56Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M56 3940V3950H59V3940H69V3937H59V3927H56V3937H46V3940H56Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M56 3982V3992H59V3982H69V3979H59V3969H56V3979H46V3982H56Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M56 4024V4034H59V4024H69V4021H59V4011H56V4021H46V4024H56Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M56 4066V4076H59V4066H69V4063H59V4053H56V4063H46V4066H56Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M79 3919V3929H82V3919H92V3916H82V3906H79V3916H69V3919H79Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M79 3877V3887H82V3877H92V3874H82V3864H79V3874H69V3877H79Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M102 3898V3908H105V3898H115V3895H105V3885H102V3895H92V3898H102Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M102 3940V3950H105V3940H115V3937H105V3927H102V3937H92V3940H102Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M125 3919V3929H128V3919H138V3916H128V3906H125V3916H115V3919H125Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M125 3877V3887H128V3877H138V3874H128V3864H125V3874H115V3877H125Z" fill="${shade1}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5366.11 3838.89L5274 3892.07L5306.12 3947.71L5343 3926.42V4080.57H5405.02H5411H5473.02V3926.42L5509.9 3947.71L5542.02 3892.07L5450.77 3839.38C5446.14 3858.43 5428.97 3872.57 5408.5 3872.57C5387.85 3872.57 5370.56 3858.18 5366.11 3838.89Z" fill="${accent4}"/>
                    <mask id="mask25" mask-type="alpha" maskUnits="userSpaceOnUse" x="5274" y="3838" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5366.11 3838.89L5274 3892.07L5306.12 3947.71L5343 3926.42V4080.57H5405.02H5411H5473.02V3926.42L5509.9 3947.71L5542.02 3892.07L5450.77 3839.38C5446.14 3858.43 5428.97 3872.57 5408.5 3872.57C5387.85 3872.57 5370.56 3858.18 5366.11 3838.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask25)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5372 3898V3908H5375V3898H5385V3895H5375V3885H5372V3895H5362V3898H5372Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5372 3856V3866H5375V3856H5385V3853H5375V3843H5372V3853H5362V3856H5372Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5372 3940V3950H5375V3940H5385V3937H5375V3927H5372V3937H5362V3940H5372Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5372 3982V3992H5375V3982H5385V3979H5375V3969H5372V3979H5362V3982H5372Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5372 4024V4034H5375V4024H5385V4021H5375V4011H5372V4021H5362V4024H5372Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5372 4066V4076H5375V4066H5385V4063H5375V4053H5372V4063H5362V4066H5372Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5395 3919V3929H5398V3919H5408V3916H5398V3906H5395V3916H5385V3919H5395Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5395 3877V3887H5398V3877H5408V3874H5398V3864H5395V3874H5385V3877H5395Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5395 3961V3971H5398V3961H5408V3958H5398V3948H5395V3958H5385V3961H5395Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5395 4003V4013H5398V4003H5408V4000H5398V3990H5395V4000H5385V4003H5395Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5395 4045V4055H5398V4045H5408V4042H5398V4032H5395V4042H5385V4045H5395Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5395 4087V4097H5398V4087H5408V4084H5398V4074H5395V4084H5385V4087H5395Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5326 3898V3908H5329V3898H5339V3895H5329V3885H5326V3895H5316V3898H5326Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5326 3856V3866H5329V3856H5339V3853H5329V3843H5326V3853H5316V3856H5326Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5326 3940V3950H5329V3940H5339V3937H5329V3927H5326V3937H5316V3940H5326Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5349 3919V3929H5352V3919H5362V3916H5352V3906H5349V3916H5339V3919H5349Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5349 3877V3887H5352V3877H5362V3874H5352V3864H5349V3874H5339V3877H5349Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5349 3961V3971H5352V3961H5362V3958H5352V3948H5349V3958H5339V3961H5349Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5349 4003V4013H5352V4003H5362V4000H5352V3990H5349V4000H5339V4003H5349Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5349 4045V4055H5352V4045H5362V4042H5352V4032H5349V4042H5339V4045H5349Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5349 4087V4097H5352V4087H5362V4084H5352V4074H5349V4084H5339V4087H5349Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5280 3898V3908H5283V3898H5293V3895H5283V3885H5280V3895H5270V3898H5280Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5303 3919V3929H5306V3919H5316V3916H5306V3906H5303V3916H5293V3919H5303Z" fill="${shade1}"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5303 3877V3887H5306V3877H5316V3874H5306V3864H5303V3874H5293V3877H5303Z" fill="${shade1}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4386.96 1720.02C4390.86 1723.89 4397.14 1723.89 4401.04 1720.02L4442.07 1679.35L4505 1715.82L4482.2 1755.47L4457.38 1741.08C4452.73 1750.81 4445.66 1769.02 4445.31 1790.25C4444.87 1817.15 4456.72 1891.89 4460.34 1914.05V1920.84H4398H4390H4327.66V1914.05C4331.28 1891.89 4343.13 1817.15 4342.69 1790.25C4342.34 1769.02 4335.27 1750.81 4330.62 1741.08L4305.8 1755.47L4283 1715.82L4345.93 1679.35L4386.96 1720.02Z" fill="${accent2}"/>
                    <mask id="mask26" mask-type="alpha" maskUnits="userSpaceOnUse" x="4283" y="1679" width="223" height="242">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4386.96 1720.02C4390.86 1723.89 4397.14 1723.89 4401.04 1720.02L4442.07 1679.35L4505 1715.82L4482.2 1755.47L4457.38 1741.08C4452.73 1750.81 4445.66 1769.02 4445.31 1790.25C4444.87 1817.15 4456.72 1891.89 4460.34 1914.05V1920.84H4398H4390H4327.66V1914.05C4331.28 1891.89 4343.13 1817.15 4342.69 1790.25C4342.34 1769.02 4335.27 1750.81 4330.62 1741.08L4305.8 1755.47L4283 1715.82L4345.93 1679.35L4386.96 1720.02Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask26)">
                      <path d="M4326 1921.5C4338.5 1815 4355 1785 4323 1691.5L4339 1682.5C4356.31 1734.31 4376.5 1741.5 4395 1741.5V1921.5H4326Z" fill="${shade7}"/>
                      <path d="M4462 1921.5C4449.5 1815 4433 1785 4465 1691.5L4449 1682.5C4431.69 1734.31 4411.5 1741.5 4393 1741.5V1921.5H4462Z" fill="${shade7}"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4690.11 2398.89L4598 2452.07L4630.12 2507.71L4667 2486.42V2640.57H4729.02H4735H4797.02V2486.42L4833.9 2507.71L4866.02 2452.07L4774.77 2399.38C4770.14 2418.43 4752.97 2432.57 4732.5 2432.57C4711.85 2432.57 4694.56 2418.18 4690.11 2398.89Z" fill="${accent1}"/>
                    <mask id="mask27" mask-type="alpha" maskUnits="userSpaceOnUse" x="4598" y="2398" width="269" height="243">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4690.11 2398.89L4598 2452.07L4630.12 2507.71L4667 2486.42V2640.57H4729.02H4735H4797.02V2486.42L4833.9 2507.71L4866.02 2452.07L4774.77 2399.38C4770.14 2418.43 4752.97 2432.57 4732.5 2432.57C4711.85 2432.57 4694.56 2418.18 4690.11 2398.89Z" fill="#C4C4C4"/>
                    </mask>
                    <g mask="url(#mask27)">
                      <rect x="4729" y="2426" width="6" height="66" rx="3" fill="${shade7}"/>
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear" x1="1014" y1="239.35" x2="1014" y2="480.836" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent5}"/>
                        <stop offset="1" stop-color="${accent4}"/>
                      </linearGradient>
                      <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(2366.01 359.728) rotate(90) scale(120.841 134.011)">
                        <stop stop-color="${accent2}"/>
                        <stop offset="1" stop-color="${accent2}" stop-opacity="0.71"/>
                      </radialGradient>
                      <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(676 2520.09) rotate(90) scale(120.743 111)">
                        <stop stop-color="${accent2}"/>
                        <stop offset="1" stop-color="${accent3}"/>
                      </radialGradient>
                      <linearGradient id="paint3_linear" x1="1014" y1="3119.35" x2="1014" y2="3360.84" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${shade4}"/>
                        <stop offset="1" stop-color="${shade3}"/>
                      </linearGradient>
                      <linearGradient id="paint4_linear" x1="1352.01" y1="3838.89" x2="1352.01" y2="4080.57" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent0}"/>
                        <stop offset="1" stop-color="${accent0}" stop-opacity="0.75"/>
                      </linearGradient>
                      <linearGradient id="paint5_linear" x1="3380" y1="3911" x2="3380" y2="4008" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent2}"/>
                        <stop offset="1" stop-color="${accent2}" stop-opacity="0"/>
                      </linearGradient>
                      <linearGradient id="paint6_linear" x1="5070" y1="310" x2="5070" y2="398" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent5}"/>
                        <stop offset="1" stop-color="${accent5}" stop-opacity="0"/>
                      </linearGradient>
                      <linearGradient id="paint7_linear" x1="4056.01" y1="958.887" x2="4056.01" y2="1200.57" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent5}"/>
                        <stop offset="1" stop-color="${accent5}" stop-opacity="0.6"/>
                      </linearGradient>
                      <linearGradient id="paint8_linear" x1="3718" y1="1679.35" x2="3718" y2="1920.84" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent7}"/>
                        <stop offset="1" stop-color="${accent7}" stop-opacity="0.67"/>
                      </linearGradient>
                      <linearGradient id="paint9_linear" x1="4732" y1="959.35" x2="4732" y2="1200.84" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent0}"/>
                        <stop offset="1" stop-color="${accent0}" stop-opacity="0.75"/>
                      </linearGradient>
                      <linearGradient id="paint10_linear" x1="4732" y1="3839.35" x2="4732" y2="4080.84" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent3}"/>
                        <stop offset="1" stop-color="${accent4}"/>
                      </linearGradient>
                      <linearGradient id="paint11_linear" x1="4463.75" y1="230" x2="4463.75" y2="508.5" gradientUnits="userSpaceOnUse">
                        <stop stop-color="${accent3}"/>
                        <stop offset="1" stop-color="${accent3}" stop-opacity="0.4"/>
                      </linearGradient>
                    </defs>
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#bg)" />
                  <svg x="${surpriseX}" y="${surpriseY}" width="${adjustedCellWidth}" height="${adjustedCellHeight}" viewBox="0 0 ${CELL_WIDTH} ${CELL_HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="676" height="720" fill="${shade0}"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M276.304 281.14L273.067 476.934C273.03 479.169 274.832 481 277.067 481H314.317C316.399 481 318.132 479.404 318.304 477.329L332.463 306H338V239H289.995L276.304 281.14ZM292.532 275.275C294.125 270.535 294.81 265.516 295.315 258.823L298.307 259.049C297.797 265.806 297.091 271.127 295.375 276.231C293.654 281.352 290.947 286.17 286.539 291.99L284.148 290.179C288.425 284.531 290.944 280 292.532 275.275Z" fill="url(#pant0_linear)"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M386.005 239L399.696 281.14L402.933 476.934C402.97 479.169 401.168 481 398.933 481H361.683C359.601 481 357.868 479.404 357.696 477.329L343.537 306H338V239H386.005ZM383.468 275.275C381.875 270.535 381.19 265.516 380.685 258.823L377.693 259.049C378.203 265.806 378.909 271.127 380.625 276.231C382.346 281.352 385.053 286.17 389.461 291.99L391.852 290.179C387.575 284.531 385.056 280 383.468 275.275Z" fill="url(#pant1_linear)"/>
                  <defs>
                    <linearGradient id="pant0_linear" x1="305.533" y1="239" x2="305.533" y2="481" gradientUnits="userSpaceOnUse">
                      <stop stop-color="${accent5}"/>
                      <stop offset="1" stop-color="${accent5}" stop-opacity="0.67"/>
                    </linearGradient>
                    <linearGradient id="pant1_linear" x1="370.467" y1="239" x2="370.467" y2="481" gradientUnits="userSpaceOnUse">
                      <stop stop-color="${accent5}"/>
                      <stop offset="1" stop-color="${accent5}" stop-opacity="0.67"/>
                    </linearGradient>
                  </defs>
                </svg>
              </svg>
            `,
            'utf8'
          ),
        });
      }),
    ),
  );
};

module.exports = {
  render,
};
