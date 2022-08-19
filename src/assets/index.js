const svgIcons = require.context('@/assets/icons', false, /\.svg$/)
svgIcons.keys().forEach(icon => svgIcons(icon));