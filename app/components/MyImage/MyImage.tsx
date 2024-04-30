'use client'

import { MyImageProps } from "./MyImageProps";
import cn from 'classnames';
import styles from './MyImage.module.css';
import Image from 'next/image'
import { API } from "../../../helpers/api";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from "react";
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
            <Image src={`${API.image.get}/${images[0]}`} sizes="(100vw - 30px)" fill alt="image" onClick={openModal} priority className={styles.image}></Image>
            <Modal isOpen={isOpen} onClose={closeModal} images={images}></Modal>
        </div>
    )
}