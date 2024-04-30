'use client'

import { ModalProps } from "./ModalProps";
import cn from 'classnames'
import styles from './Modal.module.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image'
import { API } from "../../../helpers/api";
import { useRef, useState } from "react";

export const Modal = ({className, isOpen, onClose, images, ...props}: ModalProps): JSX.Element => {

    const modalRef = useRef<HTMLDivElement>(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        onClose();
    };

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
    };

    return (
        <div className={cn(className, styles.modal, {[styles.open]: isOpen})} {...props} onClick={handleModalClick} ref={modalRef}>
            <Slider {...settings} className={styles.slider}>
                {images.map((image, index) => (
                    <div key={index} className={styles.image}>
                        <Image src={`${API.image.get}/${image}`} fill sizes="(100vw - 30px)" alt="image"></Image>
                    </div>
                ))}
            </Slider>
        </div>
    )
}