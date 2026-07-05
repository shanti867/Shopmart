import React from 'react'

export default function TextValidator(e) {
    let { value, name } = e.target
    switch (name) {
        case "name":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 2 || value.length > 100)
                return name + " Field Length Must Be 2-100"
            else
                return ""
        default:
            return ""
    }

}
