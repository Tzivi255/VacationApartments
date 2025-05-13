import { useState } from 'react';
import './Galery_CSS.css'
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

export const Gallery = ({ apartment }) => {
    const images = apartment.images || [];
    const [currentIndex, setCurrentIndex] = useState(0); 

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return <>
        <div className="slider">
            <ul>
                {images.map((img, index) => (
                    <li id={`no-js-slider-${index + 1}`} className="slide" key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                        <img src={img.data} alt={`Apartment image ${index + 1}`} />
                        <a className="prev" onClick={prevImage}>
                            <i className="fas fa-chevron-left"></i>
                        </a>
                        <a className="next" onClick={nextImage}>
                            <i className="fas fa-chevron-right"></i> 
                        </a>
                    </li>
                ))}
            </ul>
        </div>

    </>
};
