'use client'

import { MyImageProps } from "./MyImageProps";
import cn from 'classnames';
import styles from './MyImage.module.css';
import NextImage from 'next/image'; // Перейменовано з Image на NextImage
import { API } from "../../../helpers/api";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";

export const MyImage = ({images, className, ...props}: MyImageProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={cn(className, styles.imageContainer)} {...props}>
            <span
                onClick={openModal} 
                className={styles.image} 
                style={{ backgroundImage: `url(${API.image.get}/${images[0]})` }}
            >
            </span>
            <Modal isOpen={isOpen} onClose={closeModal} images={images}></Modal>
        </div>
    )
}