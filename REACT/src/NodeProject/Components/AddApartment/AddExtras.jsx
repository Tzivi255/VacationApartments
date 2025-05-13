import { Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const AddExtras = ({ extrasAll, setExtrasAll }) => {
    const handleAddExtra = () => {
        setExtrasAll([...extrasAll, ""]); // הוספת תוסף חדש
    };
    const handleExtraChange = (index, value) => {
        const updatedExtras = [...extrasAll];
        updatedExtras[index] = value;
        setExtrasAll(updatedExtras);
    };
    const handleRemoveExtra = (index) => {
        const updatedExtras = extrasAll.filter((_, i) => i !== index);
        setExtrasAll(updatedExtras);
    };

    return (
        <>
            <div style={{ marginTop: '20px' }} className='editDetails'>
                {extrasAll.map((extra, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TextField
                            name="extras"
                            label={`תוסף ${index + 1}`}
                            variant="outlined"
                            value={extra}
                            onChange={(e) => handleExtraChange(index, e.target.value)}
                            placeholder="הכנס תוסף"
                            style={{ marginRight: '10px', flex: 1 }}
                        />
                        <Button variant="outlined" startIcon={<DeleteIcon />} size="large" onClick={() => handleRemoveExtra(index)} style={{ height: '57px' }}>
                            הסרה
                        </Button>
                    </div>
                ))}
                <Button
                    variant="outlined" size="large"
                    onClick={handleAddExtra}
                    className='editDetailsButtons'>
                    הוספת תוסף
                </Button>
            </div>
        </>
    );
};

export default AddExtras;
