"use client"
import Button from '@/components/Button'
import { accordionData } from '@/data/accordion-data';
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/swiper-bundle.css';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import SectionHeader from '@/components/SectionHeader';
import { truncateString } from '@/lib/truncateString';
import { News } from '@/components/news/NewsCard';
import NewsCard from '@/components/news/NewsCard'

interface AccordionType{
    icon: string,
    iconColor: string,
    title: string,
    content: string
}

export default function Home(){
    const [news, setNews] = useState<News[]>();
    const [scrollValue, setScrollValue] = useState<number>(0);
    const newsScrollerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        AOS.init();
        new Typewriter('#title', {
            strings: ['Hello!', 'We are from the HyperX Team', 'Find High Quality Console Game In HyperX Gaming Portal'],
            delay: 40,
            deleteSpeed: 40,
            loop: true,
            autoStart: true,
        });
        const intervalID = setInterval(handleNewsScroll, 4000);

        async function fetchData(){
            try{
                const response = await fetch('https://newsapi.org/v2/everything?q=console&from=2024-06-10&sortBy=publishedAt&apiKey=a99156ba02dd4efaa60455cb0b6f5426');
                const data = await response.json();
                setNews(data.articles)
            }catch(err){
                console.log(err);
            }
        }

        fetchData();

        return () => clearInterval(intervalID);
    }, []);

    const handleNewsScroll = () => {
        const element = newsScrollerRef?.current;
        setScrollValue((prevState: number) => {
            if(element) element.scrollTo({
                left: prevState + 400,
                behavior: "smooth"
            });
            return prevState + 400;
        });
    }

    
    return (
        <>
            <section id="home" className="mb-11">
                <div className="min-w-full min-h-screen container px-20 grid grid-cols-2 items-center">
                    <div className="w-full flex-1">
                        <h1 id="title" className="text-4xl text-left text-slate-900 font-['Rubik'] font-semibold leading-relaxed"></h1>
                        <div className="cta mt-5 flex flex-row gap-3 items-center justify-start">
                            <Button type="button" className={"!text-base !px-5 !py-3 !font-normal !rounded-full"} handleClick={() => router.push('/discover')}>Get Started <i className="bi bi-arrow-right"></i></Button>
                            <Button type="button" className={"!text-base !px-5 !py-3 !font-normal !rounded-full !bg-white !text-slate-900 border border-slate-900"} handleClick={() => null}>Learn More</Button>
                        </div>
                    </div>
                    <div>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            spaceBetween={50}
                            slidesPerView={'auto'}
                            coverflowEffect={
                                {
                                    rotate: 15,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                    slideShadows: true
                                }
                            }
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                            className={``}
                        >
                            <SwiperSlide className=""><img src="https://image.api.playstation.com/vulcan/img/rnd/202011/0302/8jomNsyMYDoJnzFkBrr9Rit2.jpg" alt="" className='block w-full h-[400px] rounded-md' /></SwiperSlide>
                            <SwiperSlide className=""><img src="https://image.api.playstation.com/vulcan/ap/rnd/202206/0307/CFAf8koMK6B49DCY5Zk6xFYj.jpg" alt="" className='block w-full h-[400px] object-cover rounded-md' /></SwiperSlide>
                            <SwiperSlide className=""><img src="https://image.api.playstation.com/vulcan/ap/rnd/202305/2515/15b67906c6f22a7f51bba05fdd817f1554d3c732ba542721.png" alt="" className='block w-full h-[400px] object-cover rounded-md' /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            <section id="feature" className="mb-20">
                <div className="container min-w-full px-20">
                    <SectionHeader
                        firstTitle='FEATURED'
                        secondTitle='Find every game from any developers and any genres'
                        thirdTitle='We are opened to work together with indie or big developer and makes this industry in another level'
                    />
                    <div className="w-full grid grid-cols-2 gap-10 mt-20">
                        <div className="w-full flex-1 bg-white shadow-lg rounded-lg p-5" data-aos="fade-down">
                            <i className='bi bi-people-fill text-green-400 drop-shadow-md block mb-2 text-3xl'></i>
                            <h3 className='text-xl font-semibold'>Indie Developer</h3>
                            <p className='text-base text-slate-600 mb-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, ducimus fuga. Quos, consequatur dignissimos dolorem aliquid modi deserunt veritatis debitis.</p>
                            <Link className='text-blue-600' href={'/discover/indie-games'}>More Information {">>"}</Link>
                        </div>  
                        <div className="w-full flex-1 bg-white shadow-lg rounded-lg p-5" data-aos="fade-down" data-aos-delay="300">
                            <i className='bi bi-buildings text-blue-400 drop-shadow-md block mb-2 text-3xl'></i>
                            <h3 className='text-xl font-semibold'>Big Company</h3>
                            <p className='text-base text-slate-600 mb-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, ducimus fuga. Quos, consequatur dignissimos dolorem aliquid modi deserunt veritatis debitis.</p>
                            <Link className='text-blue-600' href={'/discover'}>More Information {">>"}</Link>
                        </div>  
                        <div className="w-full flex-1 bg-white shadow-lg rounded-lg p-5" data-aos="fade-down">
                            <i className='bi bi-joystick text-red-400 drop-shadow-md block mb-2 text-3xl'></i>
                            <h3 className='text-xl font-semibold'>Arcade Games</h3>
                            <p className='text-base text-slate-600 mb-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, ducimus fuga. Quos, consequatur dignissimos dolorem aliquid modi deserunt veritatis debitis.</p>
                            <Link className='text-blue-600' href={'/discover/indie-games'}>More Information {">>"}</Link>
                        </div>  
                        <div className="w-full flex-1 bg-white shadow-lg rounded-lg p-5" data-aos="fade-down" data-aos-delay="300">
                            <i className='bi bi-controller text-yellow-400 drop-shadow-md block mb-2 text-3xl'></i>
                            <h3 className='text-xl font-semibold'>Triple A</h3>
                            <p className='text-base text-slate-600 mb-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, ducimus fuga. Quos, consequatur dignissimos dolorem aliquid modi deserunt veritatis debitis.</p>
                            <Link className='text-blue-600' href={'/discover'}>More Information {">>"}</Link>
                        </div>  
                    </div>
                </div>
            </section>  
            <section id="community" className="mb-11">
                <div className="container min-w-full px-20">
                    <SectionHeader
                        firstTitle='COMMUNITY'
                        secondTitle='Fun and competitive community and latest news'
                        thirdTitle='We are opened to work together with indie or big developer and makes this industry in another level'
                    />
                    <div className="w-full grid grid-cols-2 items-center gap-10 mt-20">
                       <div className="w-full h-full flex-1 rounded-md shadow-lg" data-aos="fade-right">
                       <img src="https://t4.ftcdn.net/jpg/01/69/65/95/360_F_169659584_9ceyeq50tXPgHxXbemAMYCVWTXCZDGlC.jpg" className="w-full flex-1 h-full object-cover rounded-lg shadow-md" />
                       </div>
                       <Accordion className="flex flex-col gap-5">
                          {accordionData.map((data: AccordionType, index: number) => (
                            <AccordionItem className="bg-white p-3 shadow-md border border-slate-300 rounded-md" data-aos="fade-down">
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <div className={`w-full flex flex-row justify-between items-center`}>
                                            <i className={`bi ${data.icon} ${index === 0 ? "text-red-600" : ""} ${index === 1 ? "text-yellow-500 " : ""} ${index === 2 ? "text-slate-900" : ""} ${index === 3 ? "text-green-600" : ""} text-xl drop-shadow-md shadow-blue-600`}></i>
                                            <h3 className="font-['Poppins'] text-base">{data.title}</h3>
                                            <i className="bi bi-arrow-down-circle text-xl"></i>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p className="mt-3 text-sm">{data.content}</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                          ))}     
                       </Accordion>
                    </div>
                </div>
            </section>  
            <section id='news' className='mb-11'>
                <div className="container min-w-full px-20">
                    <SectionHeader
                        firstTitle='NEWS'
                        secondTitle='Updated and trusted news every day'
                        thirdTitle='We are opened to work together with indie or big developer and makes this industry in another level'
                    />
                    <div className="w-full grid grid-cols-6 gap-5 items-center mt-10">
                        {news?.map((news, index) => {
                            if(index < 2) return <NewsCard news={news} className="!w-full !h-full col-span-3" />
                        })}
                    </div>
                    <div className="w-full grid grid-cols-1 gap-5 items-center mt-5 overflow-scroll" ref={newsScrollerRef}>
                        <div className="min-w-fit max-h-fit flex flex-row gap-5 items-center" id="newsScroller">
                            {news?.map((news, index) => {
                                if(index >= 2) return <NewsCard news={news} />
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}