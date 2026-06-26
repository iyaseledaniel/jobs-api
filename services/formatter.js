//Format String,object and array
const format = (variable) => {
    //console.log(typeof variable)
    if (Array.isArray(variable) && variable !== null) {
        return variable.map(element => {
            for (let key in element) {
                if (key === "company" || key === "position") {
                    let formattedValue = element[key].charAt(0).toUpperCase() + element[key].slice(1)
                    element[key] = formattedValue
                }
            }
            return element
        });
    } else if (typeof variable === "object" && variable !== null) {
        for (let key in variable) {
            if (key === "company" || key === "position") {
                let formattedOutput = variable[key].charAt(0).toUpperCase() + variable[key].slice(1)
                variable[key] = formattedOutput
            }
        }
        return variable
    } else if (typeof variable === "string") {
        return variable.charAt(0).toUpperCase() + variable.slice(1,)
    }
}

module.exports = format