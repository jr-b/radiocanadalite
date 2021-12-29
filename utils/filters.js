const { DateTime } = require('luxon')

module.exports = {
    dateToFormat: function (date, format) {
        Settings.defaultLocale = "fr";
        return DateTime.fromJSDate(date, { zone: 'Canada/Toronto'}).toFormat(
            String(format)
        );
    },

    dateToISO: function (date) {
        return DateTime.fromJSDate(date, { zone: 'Canada/Toronto'}).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },

    obfuscate: function (str) {
        const chars = []
        for (var i = str.length - 1; i >= 0; i--) {
            chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
        }
        return chars.join('')
    }
}