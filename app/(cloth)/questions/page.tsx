import { Metadata } from "next"
import styles from './page.module.css'
import { DropBox } from "../../components"

export const metadata: Metadata = {
    title: "FAQ",

}

export default async function Questions ():Promise<JSX.Element> {
    return (
        <div className={styles.questions}>
            <DropBox value="Як вираховується ціна?" elements={['зразу вам показується ціна тільки за матеріал, якщо ви переключили повзунок на "готовий матеріал" тоді до ціни додається ціна на додаткові матеріали та роботу']} isEditable={false}></DropBox>
            <DropBox value="Як з нами зв'язатися?" elements={['внизу сайту є посилання на наші соц мережі де ми зрадістю відповімо на ваші запитання']} isEditable={false}></DropBox>
            <DropBox value="як оформити замовлення?" elements={['на кожному продукту є кнопка "купити" нажимаючи її відкривається форма де потрібно вказати особисті дані та можна відредагувати дані продукту, після цих дій нажимайте "замовити" після чого ми зв`яжемось з вами для уточнення деталей']} isEditable={false}></DropBox>
            <DropBox value="як замовити комплект?" elements={['для замовлення комплекту вам необхідно добавити 2 чи більше продукта в кошик після чого в кошику вказати всі необхідні дані, також в коментарі до замовлення вказати "комплект" натиснути "замовити"']} isEditable={false}></DropBox>
            <DropBox value="чи можна оформити самовивіз?" elements={['Звісно, можна самостійно забрати товар, для цього необхідно вимкнути повзунок "доставка новою поштою"']} isEditable={false}></DropBox>
        </div>
    )
}