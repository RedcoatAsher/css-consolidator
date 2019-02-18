import parseStylesheet from "/app/js/parse.js"
import processRules from "/app/js/process.js"
import stringifyStylesheet from "/app/js/stringify.js"

function render() {
    let input = document.querySelector("#input")
    let output = document.querySelector("#output")

    output.value = stringifyStylesheet(
        processRules(
            processRules(
                parseStylesheet(input.value),
                rule => consolidateRules(rule)
            ),
            rule => pruneEmptyRules(rule)
        )
    )

}

function consolidateRules(rule) {

    // if another rule on the same level shares the same selector…
    if (
        rule.selectorText !== undefined &&
        listSiblingRules(rule)
        .map(found => found.selectorText || "")
        .includes(rule.selectorText)
    ) {

        combineRules(rule)

        // otherwise if they contain the same media text
    } else if (
        rule.constructor.name === "CSSMediaRule" &&
        listSiblingRules(rule)
        .map(found => rule.media.mediaText || "")
        .includes(rule.media.mediaText)
    ) {

        combineMediaRules(rule)

    }

}

function listSiblingRules(rule) {
    return Array.from(
        rule.parentRule ?
        rule.parentRule.cssRules :
        rule.parentStyleSheet.cssRules
    ).filter(found => found !== rule)
}

function combineRules(rule) {
    return listSiblingRules(rule)
        .filter(sibling =>
            sibling.selectorText !== undefined &&
            sibling.selectorText === rule.selectorText
        )
        .forEach(sibling => {
            Array.from(sibling.style).forEach(property => {
                rule.style.setProperty(property, sibling.style.getPropertyValue(property))
                sibling.style.removeProperty(property)
            })
        })
}

function combineMediaRules(rule) {
    return listSiblingRules(rule)
        .filter(sibling =>
            sibling.media &&
            sibling.media.mediaText === rule.media.mediaText
        )
        .forEach(sibling => {
            const parent = rule.parentStyleSheet
            const index = Array.from(parent.cssRules).indexOf(rule)
            const newRule = `@media ${rule.media.mediaText} { ${
        stringifyStylesheet(
          processRules(
            processRules(
              parseStylesheet(
                [
                  stringifyStylesheet(rule),
                  stringifyStylesheet(sibling)
                ].join("\n")
              ),
              rule => combineRules(rule)
            ),
            rule => pruneEmptyRules(rule)
          )
        )
      } }`

            // Add sibling
            Array.from(sibling.cssRules).forEach(child =>
                rule.insertRule(child.cssText, rule.cssRules.length)
            )

            Array.from(sibling.cssRules).forEach(child => child.parentRule.deleteRule(
                Array.from(child.parentRule.cssRules).indexOf(child)
            ))

        })
}

function pruneEmptyRules(rule) {

    // Empty style rule
    if (
        rule.style !== undefined &&
        rule.style.length === 0
    ) {

        const parent = rule.parentRule !== null ?
            rule.parentRule :
            rule.parentStyleSheet

        parent.deleteRule(
            Array.from(parent.cssRules).indexOf(rule)
        )

    }

    // Empty media rule
    if (
        rule.constructor.name === "CSSMediaRule" &&
        rule.cssRules.length === 0 &&
        rule.parentStyleSheet
    ) {

        rule.parentStyleSheet.deleteRule(
            Array.from(rule.parentStyleSheet.cssRules).indexOf(rule)
        )

    }

}

// Run once on load
window.addEventListener("load", render);

// Run every time the textareas are updates
["input", "paste", "blur"].forEach(action =>
    document.querySelector("#input").addEventListener(action, render)
)
