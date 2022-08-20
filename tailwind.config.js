/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                '140px': '140px',
            },
            height: {
                '22px': '22px',
                '44px': '44px',
                '80vh': '80vh',
                'headerPC': '72px',
                'mainPC': 'calc(100vh - 72px)'
            },
            maxHeight: {
                '368px': '368px',
            },
            colors: {
                main: '#f44c58',
                'hover-main': '#f32836',
                'vue-green': '#41b883',
                'vue-gray': '#35495e'
            }
        },

        fontSize: {
            //字体大小和行高
            xs: ['0.25rem', '0.35rem'],
            sm: ['0.35rem', '0.45rem'],
            base: ['0.45rem', '0.55rem'],
            lg: ['0.55rem', '0.65rem'],
            xl: ['0.65rem', '0.75rem'],
        },
        boxShadow: {
            'l-white': '-10px 0 10px #fff'
        }
    },
    variants: {},
    plugins: [],
}