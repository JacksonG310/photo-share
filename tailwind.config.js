/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.vue"],
    darkMode: 'class',
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
                'slate-50': '#f8fafc',
                'slate-100': '#f1f5f9',
                'slate-200': '#e2e8f0',
                'slate-300': '#cbd5e1',
                'slate-400': '#94a3b8',
                'slate-500': '#64748b',
                'slate-600': '#475569',
                'slate-700': '#334155',
                'slate-800': '#1e293b',
                'slate-900': '#0f172a',
                'zinc-50': '#fafafa',
                'zinc-100': '#f4f4f5',
                'zinc-200': '#e4e4e7',
                'zinc-300': '#d4d4d8',
                'zinc-400': '#a1a1aa',
                'zinc-500': '#71717a',
                'zinc-600': '#52525b',
                'zinc-700': '#3f3f46',
                'zinc-800': '#27272a',
                'zinc-900': '#18181b'

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
            'l-zinc': '-10px 0 10px #18181b'
        },

    },
    variants: {},
    plugins: [],
}