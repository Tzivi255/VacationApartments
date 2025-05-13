import { Link, NavLink } from "react-router-dom"
import '../css.css'
import { Box, List, Tab, Tabs } from "@mui/joy"
import { useState } from "react";

export const Nav = () => {

    return <>
        <div className="nav">
            <NavLink to="/" className="link">דף הבית</NavLink>
            <NavLink to="/apartmentDetails" className="link">דירות</NavLink>

        </div>
    </>
}

//     const [value, setValue] = useState(0);

// const handleChange = (event, newValue) => {
//     setValue(newValue);
// };
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//             <Tabs value={value} onChange={handleChange} centered>
//                 <Tab component={Link} to="/home" label="דף הבית" />
//                 <Tab component={Link} to="/apartmentDetails" label="דירות" />
//             </Tabs>
//         </Box>