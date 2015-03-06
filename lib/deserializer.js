(function (factory) {
    'use strict';

    // node
    if (module && 'exports' in module) {
        module.exports = factory();

    // mongo shell
    } else {
        __modules['views']['deserializer.js'] = factory();
    }

})(function () {
    'use strict';

    return function (input) {
        var parsed = JSON.parse(input);

        function cleanDates(o) {
            // now look for dates
            Object.keys(o).forEach(function (key) {
               if (typeof o[key] === 'string' && o[key].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$/))
               {
                    o[key] = new Date(o[key]);
               } else if (typeof o[key] === 'object') {
                    cleanDates(o[key]);
               }
            });
            return o;
        }

        cleanDates(parsed);

        return parsed;
    };
});
