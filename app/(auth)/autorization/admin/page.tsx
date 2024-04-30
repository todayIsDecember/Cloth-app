'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {H} from '../../../components'

export default function Admin () {
    const router = useRouter()

    useEffect(() => {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))
        if(!token ||token.length <= 1) {
            router.push('/autorization')
            return
        }
    }, [router])


    return (
        <div style={{marginTop: '175px'}}>
            <H tag="h1">Панель Адміністратора</H>
        </div>
    )
}
