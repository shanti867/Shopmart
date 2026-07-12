import React from 'react'

export default function TextValidator(e) {
    let { value, name } = e.target
    switch (name) {
        case "name":
        case "icon":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 2 || value.length > 100)
                return name + " Field Length Must Be 2-100"
            else
                return ""

        case "shortDescription":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 20 || value.length > 300)
                return name + " Field Length Must Be 20-300"
            else
                return ""
        default:
            return ""
    }

}
