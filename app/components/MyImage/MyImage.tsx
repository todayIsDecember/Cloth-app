'use client'

import { MyImageProps } from "./MyImageProps";
import cn from 'classnames';
import styles from './MyImage.module.css';
import { API } from "../../../helpers/api";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import { Modal } from "../modal/Modal";
import Image from 'next/image'

export const MyImage = ({images, description, className, ...props}: MyImageProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={cn(className, styles.imageContainer)} {...props}>
            <Image onClick={openModal} src={`${API.image.get}/${images[0]}`} fill priority sizes="(100vw - 30px)" className={styles.image} alt="image"></Image>
            <Modal type="product" description={description} isOpen={isOpen} onClose={closeModal} images={images}></Modal>
        </div>
    )
}