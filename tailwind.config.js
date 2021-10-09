const colors = require('tailwindcss/colors')

module.exports = {
    prefix: "",
    purge: {
        enabled: false,
        content: [
            "**/*.html", "**/*.ts"
        ],
        options: {
            safelist: [
                "type" // [type='checkbox']
            ]
        },
        preserveHtmlElements: true
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ({ after }) => after(['disabled']),
            backgroundColor: [
                "disabled"
            ],
            cursor: [
                "disabled"
            ],
            ringWidth: ['hover', 'active'],
            borderColor: ['active'],
            backgroundColor: ['active'],
        }
    },
    theme: {
        borderColor: theme => ({
            ...theme('colors'),
                DEFAULT: theme('colors.gray.300', 'currentColor'),
            'primary': '#3490dc',
            'secondary': '#ffed4a',
            'danger': '#e3342f',
        }),
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            gray: colors.coolGray,
            blue: colors.lightBlue,
            red: colors.rose,
            pink: colors.fuchsia,
            white: colors.white,
            indigo: colors.indigo,
            black: colors.black,
            green: colors.green,
            purple: colors.purple,
            yellow: colors.yellow
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            oswald: ['Oswald', 'sans-serif'],
            ubuntu: ['Ubuntu', 'sans-serif'],
            caveat: ['Caveat', 'cursive', 'sans-serif'],
            mukta: ['Mukta', 'sans-serif'],
            rampart: ['Rampart One', 'cursive'],
            dancing_script: ['Dancing Script', 'cursive']
        },
        extend: {
            opacity: ['disabled'],
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            transitionDuration: {
                '0': '0ms',
                '2000': '2000ms',
            },
            ringWidth: {
                'DEFAULT': '2px',
                '4': '4px',
                '6': '6px',
                '10': '10px',
            }
        }
    },
}