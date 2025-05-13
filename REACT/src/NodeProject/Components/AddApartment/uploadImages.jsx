import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Box } from "@mui/material";
import { useRef } from "react";

const ImageUploadList = ({ list, setList }) => {

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      file, // שומר את הקובץ עצמו
      preview: URL.createObjectURL(file), // יוצר URL להציג את התמונה
    }));

    setList((prevImages) => [...prevImages, ...newFiles]);

    // נקה את שדה הקלט כדי לאפשר הוספת אותה תמונה שוב
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index) => {
    setList((prevImages) => {
      URL.revokeObjectURL(prevImages[index].preview); // מבטל את ה-URL לאחר הסרת התמונה
      return prevImages.filter((_, i) => i !== index); // מסנן את התמונה הנבחרת
    });
  };

  return (
    <Box className="editDetails" mt={3}>
      <Box mt={2}>
        {list.map((image, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            sx={{ border: "1px solid #ccc", borderRadius: "8px", padding: "8px", width: "300px" }}
          >
            <img
              src={image.preview}
              alt={`תמונה ${index + 1}`}
              style={{ width: "150px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
            />
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => removeImage(index)}
              sx={{ height: "50px", margin: "8px" }}
            >
              הסרה
            </Button>
          </Box>
        ))}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button variant="outlined" size="large" component="span" sx={{ mt: 1}} className='editDetails editDetailsButtons' >
          הוספת תמונה
        </Button>
      </label>
    </Box>
  );
};

export default ImageUploadList;
