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
import { Player } from '@lordicon/react'
import { H } from "../h/H";

const IconLoading = require('../../../public/system-regular-720-spinner-half-circles.json')
const IconDone = require('../../../public/done.json')

export const Modal = ({className, type, loading, loaded, recieverName,  description, isOpen, onClose, images, ...props}: ModalProps): JSX.Element => {

    const modalRef = useRef<HTMLDivElement>(null);

    const playerRef = useRef<Player>(null);

    useEffect(() => {
        if (isOpen && playerRef.current) {
            const interval = setInterval(() => {
                playerRef.current?.play();
            }, 1000); // Adjust interval time as needed
            return () => clearInterval(interval);
        }
    }, [isOpen]);


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
            <div className={styles.description}>
                {description}
            </div>
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
                        <Player ref={playerRef}  icon={IconLoading} size={100} />
                        <H tag="h3">{'ваше замовлення уже летить до нас'}</H>
                    </>
                }
                {
                    loaded &&
                    <>
                        <Player ref={playerRef}  icon={IconDone} size={100} />
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