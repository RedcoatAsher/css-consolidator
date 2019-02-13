export default function(stylesheet, callback) {
    const readRules = list => Array.from(list.cssRules).forEach(rule => {
        callback(rule)
        if (rule.cssRules !== undefined) {
            readRules(rule)
        }
    })
    if (
        [stylesheet, stylesheet.cssRules, callback].every(thing => thing !== undefined) &&
        callback.constructor.name === 'Function'
    ) {
        readRules(stylesheet)
        return stylesheet
    }
}
