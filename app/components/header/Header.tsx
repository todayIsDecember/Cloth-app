'use client'

import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";
import { Button } from "../button/Button";
import { useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { motion } from 'framer-motion'

export const Header = ({className, ...props}: HeaderProps):JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: '-200%',
            transition: {
                stiffness: 20
            }
        }

    }

    return (
        <header className={cn(className, styles.header)} {...props}>
            <motion.div className={cn(styles.mobileMenu)} variants={variants} initial="closed" animate={isOpen ? 'opened' : 'closed'} onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen)}}>
                <Sidebar/>
            </motion.div>
            <button className={styles.button} onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen)}}><div className={cn(styles.burger, {[styles.open]: isOpen})}><span className={styles.line}></span></div></button>
        </header>
    )
}