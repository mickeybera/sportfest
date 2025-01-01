import React, { useState } from 'react';

const galleryImages = [
    { id: 1, src: '/opening cerimony 2k24.JPG', alt: 'Opening Ceremony 2k24' },
    { id: 2, src: '/auction cricket 2k24.JPG', alt: 'Auction Cricket Match 2k24' },
    { id: 3, src: '/women cricket 2k24.JPG', alt: 'Women Cricket 2k24' },
    { id: 4, src: '/mix double badminton 2k24.JPG', alt: 'Badminton Mix Double 2k24' },
    { id: 5, src: '/badminton double 2k24.JPG', alt: 'Badminton Double 2k24' },
    { id: 6, src: '/auction cricket opening cerimony 2k24.JPG', alt: 'Auction Cricket Opening Cerimony 2k24' },
    {id: 7, src:'/chess 2k24.JPG', alt:'Chess 2k24'},
    {id: 8, src:'/carrom 2k24.JPG', alt:'Carrom 2k24'},
    {id: 9, src:'/yearly volley 2k24.JPG',alt:'Yearly Volley 2k24'}
];

function Gallery24() {
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <section className='py-10 bg-white dark:bg-gray-900'>
            <div className='container mx-auto px-4'>
                <h2 className='mt-10 text-3xl md:text-4xl font-bold text-center mb-6 text-violet-600'>
                    📸 Sport Fest Gallery
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className='group overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300'
                            onClick={() => openLightbox(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className='w-full h-56 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300'
                            />
                            <p className='text-center mt-2 font-medium'>{image.alt}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50'>
                    <button
                        onClick={closeLightbox}
                        className='absolute top-5 right-5 text-white text-4xl z-50 hover:scale-110 transition-transform duration-200'
                    >
                        ✖
                    </button>
                    <div className='max-w-screen-lg mx-auto p-4'>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className='w-auto max-h-[80vh] object-contain rounded-lg shadow-lg'
                        />
                        <p className='text-center mt-4 text-white text-lg'>{selectedImage.alt}</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Gallery24;
