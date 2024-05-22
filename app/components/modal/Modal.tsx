'use client'

import { ModalProps } from "./ModalProps";
import cn from 'classnames'
import styles from './Modal.module.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image'
import { API } from "../../../helpers/api";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button/Button";
import ExitIcon from '../../../public/exit.svg'
import { H } from "../h/H";

export const Modal = ({className, type, loading, loaded, recieverName, isOpen, onClose, images, ...props}: ModalProps): JSX.Element => {

    const modalRef = useRef<HTMLDivElement>(null);



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

    if(type === 'product') {
    return (
        <div className={cn(className, styles.modal, styles[type], {[styles.open]: isOpen})} {...props} onClick={handleModalClick} ref={modalRef}>
            <Slider {...settings} className={styles.slider}>
                {images && images.map((image, index) => (
                    <div key={index} className={styles.image}>
                        <Image src={`${API.image.get}/${image}`} fill sizes="(100vw - 30px)" alt="image"></Image>
                    </div>
                ))}
            </Slider>
            <ExitIcon className={styles.exit} onClick={onClose}/>
        </div>
    )
    }
    else {
        return (
            <div className={cn(className, styles.modal, styles[type], {[styles.open]: isOpen})} {...props} onClick={handleModalClick} ref={modalRef}>
                {
                    loading &&
                    <>
                        <Image src={'/loading.webp'} width={100} height={100} alt="image"/>
                        <H tag="h3">{'ваше замовлення уже летить до нас'}</H>
                    </>
                }
                {
                    loaded &&
                    <>
                        <Image src={'/done.webp'} width={100} height={100} alt="image"/>
                        <H tag="h2">{`${recieverName}, Дякуємо за ваше замовлення`}</H>
                        <H tag="h3">{'ближчим часом з вами зв`яжеться наш менеджер для уточнення даних'}</H>
                        <H tag="h3">{'Всього найкращого 💙💛'}</H>
                        <Button appearance="black" size="l" onClick={() =>onClose()}>закрити</Button>
                    </>
                }
            </div>
        )
    }
}