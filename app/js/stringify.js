import stringifyRule from '/app/js/stringifyRule.js'

export default function(stylesheet) {
    return stylesheet.cssRules ?
        Array.from(stylesheet.cssRules)
        .map(rule => stringifyRule(rule))
        .join('\n') :
        ''
}
