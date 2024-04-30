'use client'

import { Alert, Button, H, Input } from '../../components'
import styles from './page.module.css'
import { API } from '../../../helpers/api'
import {motion} from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Autorization () {
    const [clicked, setClicked] = useState(false)
    const [inputValue, setInputValue] = useState<number>(0)
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const onClickHandler = async () => {
        await fetch(API.auth.reg)
        setClicked(true)
    }

    const onSubmitHandler = async () => {
        const response = await fetch(API.auth.log, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number: inputValue
            })
        })
        const data = await response.json()
        if(!data.success) {
            setError(data.message)
            return
        }
        document.cookie = `token=${data.token}`
        router.push('./autorization/admin')
    }

    return (
        <div className={styles.wrapper}>
            <H tag="h1">Вітаю у панелі адміністратора</H>
                {!clicked && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button appearance="black" size="l" onClick={onClickHandler}>
                        отримати код
                    </Button>
                </motion.div>
                )}

            {clicked && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.login}
            >
                <input type="text" className={styles.input} maxLength={4} onChange={(e => {setInputValue(Number(e.target.value))})}/>
                <Button appearance="black" size="l" onClick={onSubmitHandler}>
                    відправити код
                </Button>
            </motion.div>}
            {error && <Alert appearance="error">{error}</Alert>}
        </div>
    );
}