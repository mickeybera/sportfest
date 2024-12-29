import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gate from "/gate.jpg";
import ground from "/ground.jpg";
import hostel from "/hostel.jpg";
import { ReactTyped } from 'react-typed';

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };

    return (
        <>
            <div className='h-auto overflow-x-hidden'>
                {/* Header */}
                <h2 className='mt-3 text-center text-2xl md:text-3xl font-bold mb-6 text-violet-600'>
                    Welcome to SportFest 2<span className='text-violet-600'>k</span>2<span className='text-violet-600'>5</span>
                </h2>
                <div className='ml-2 w-full lg:w-3/3 mr-2 mt-5 px-2 md:px-4 sm:mr-4'>
                    {/* Carousel */}
                    <Slider {...settings}>
                        <div>
                            <img
                                src={gate}
                                alt='Gate Slide'
                                className='w-full h-80 object-cover rounded-lg shadow-md'
                            />
                        </div>
                        <div>
                            <img
                                src={hostel}
                                alt='Hostel Slide'
                                className='w-full h-80 object-cover rounded-lg shadow-md'
                            />
                        </div>
                        <div>
                            <img
                                src={ground}
                                alt='Ground Slide'
                                className='w-full h-80 object-cover rounded-lg shadow-md'
                            />
                        </div>
                    </Slider>
                </div>
                <div>
                    {/* React Typed Text before paragraph */}
                    <div className='text-center mt-4'>
                        <ReactTyped
                            strings={["Get Ready for SportFest 2k25 🎉", "The Ultimate Sports Festival! 🏅"]}
                            typeSpeed={40}
                            backSpeed={50}
                            backDelay={1000}
                            startDelay={500}
                            loop
                            className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-violet-600 mb-6"
                        />
                    </div>
                    <p className='mt-5 ml-4 mr-4 text-base sm:text-lg md:text-xl leading-relaxed'>
                        Welcome to <strong>SportFest 2k25</strong> 🎉, the most anticipated college sports festival of the year! This exciting event brings together athletes 🏃‍♂️, sports enthusiasts 🏀, and students from all over to celebrate talent, teamwork, and sportsmanship. With a variety of competitive events 🏅 ranging from track and field to team sports ⚽, SportFest 2k25 offers something for everyone. Whether you're an aspiring athlete looking to showcase your skills 💪 or a fan cheering on your peers 👏, this festival is the perfect platform to make memories, build camaraderie, and push your limits. Join us for a vibrant, action-packed celebration of sportsmanship, enthusiasm, and team spirit as we make <strong>SportFest 2k25</strong> the best one yet! 🏆
                    </p>
                </div>
            </div>
        </>
    );
}

export default Carousel;
