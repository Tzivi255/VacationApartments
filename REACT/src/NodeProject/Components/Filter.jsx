import { FormControl, MenuItem, Select } from "@mui/material"
import { InputLabel, OutlinedInput } from "@mui/material"
import { useEffect, useState } from "react"

export const Filter = (props) => {
    const filters = props.f
    const category = props.category
    const [filter, setFilter] = useState('')

    function sendData() {
        props.onSendData(filter);
    };

    async function handleChange(event) {
        if (event.target.value == "ללא סינון" || event.target.value == "") {
            if (category == "ערים") {
                await setFilter("city");
            }
            else {
                await setFilter("category")
            }
        }
        else {
            await setFilter(event.target.value);
        }
    };

    useEffect(() => {
        sendData()
    }, [filter]);
    return <>
        <div>
            <FormControl sx={{ m: 1, width: 300, marginTop: '0px' }} id="filter">
                <InputLabel id="filterSelectLabel">{category}</InputLabel>
                <Select
                    // labelId="companySelectLabel"
                    id="filterSelectLabel"
                    value={filter}
                    label={category}
                    onChange={handleChange} // העברת האירוע ישירות
                >
                    <MenuItem value="ללא סינון">
                        <em>ללא סינון</em>
                    </MenuItem>
                    {filters.map(f => <MenuItem key={f._id} value={f.name} >{f.name}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    </>
}