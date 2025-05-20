import { Autocomplete, Button, createFilterOptions, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";

export const AddFromList = ({ list, setList, item, setItem, name, getList }) => {
    const filter = createFilterOptions();

    const saveNew = (newValue) => {
        let newI = { name: newValue, _id: -1 }
        setList([...list, newI])
        setItem(newI);
    }

    useEffect(() => {
        getList()
            .then(data => {
                setList(data.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);

    useEffect(() => {
        if (item) {
            setItem(item); 
        }
    }, [item]); 

    return (
        <>
            <Autocomplete className='editDetails'
                value={item}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setTimeout(() => {
                            saveNew(newValue.inputValue)
                        });
                    } else if (newValue && newValue.inputValue) {
                        saveNew(newValue.inputValue)
                    } else {
                        setItem(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `הוספת ${params.inputValue} לרשימה`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo1"
                options={list}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            {option.name}
                        </li>
                    );
                }}
                freeSolo
                renderInput={(params) => <TextField {...params} label={name} />}
            />
        </>
    );
};

export default AddFromList;

