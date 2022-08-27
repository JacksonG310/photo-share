/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    purge: [
        './src/**/*.html',
        './src/**/*.js',
    ],
    theme: {
        extend: {

            width: {
                '140px': '140px',
                '260px': '260px',
                '800px': '800px',
                '35%': '35%'
            },
            height: {
                '22px': '22px',
                '44px': '44px',
                '56px': '56px',
                '80vh': '80vh',
                '140px': '140px',
                '206px': '206px',
                'headerPC': '72px',
                'mainPC': 'calc(100vh - 72px)'
            },
            maxHeight: {
                '368px': '368px',
            },
            maxWidth: {
                '860px': '860px',
            },
            minWidth: {
                '420px': '420px'
            },
            colors: {
                main: '#f44c58',
                'hover-main': '#f32836',
                'vue-green': '#41b883',
                'vue-gray': '#35495e',
                'success-100': '#F2F9EC',
                'success-200': '#E4F2DB',
                'success-300': '#7EC050',
                'warn-100': '#FCF6ED',
                'warn-200': '#F8ECDA',
                'warn-300': '#DCA550',
                'error-100': '#fef0f0',
                'error-200': '#f3471c',
                'error-300': '#f56c6c',
            },
            backdropBlur: {
                '4xl': '240px'
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
            'l-white': '-10px 0 10px #fff',
            'l-gray': '-10px 0 10px #18181b'
        },

    },
    variants: {},
    plugins: [],
}