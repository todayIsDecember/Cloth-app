import { getThreeReviews } from "../API/getThreeReviews";
import { getTopThreeProducts } from "../API/getTopThreeProducts";
import { Button, H, Product, Review, Text } from "../components";
import styles from "./page.module.css";
import Link from 'next/link';

export default async function Home() {
  const products = await getTopThreeProducts();
  const reviews = await getThreeReviews();
  return (
    <main className={styles.main}>
      <div className={styles.catalogSection}>
        <div className={styles.catalog}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Link className={styles.catalogButton} href={'/catalog'}><Button appearance="black" size="l">Каталог</Button></Link>
      </div>
      <div className={styles.advantagesSection}>
      <H tag="h1">Наші переваги</H>
        <div className={styles.advantages}>
          <Text className={styles.advantage}>Блекаут льон - нова сучасна тканина. Блекаут льон або рогожка має всі переваги сонцезахисної тканини, і водночас має природну структуру лляної тканини</Text>
          <Text className={styles.advantage}>Мода на натуральні та природні матеріали тільки міцнішає з кожним днем і портьєри – не виняток. Тканина льон рогожка повною мірою задовольняє попит на універсальні щільні штори з натуральною лляною текстурою.</Text>
          <Text className={styles.advantage}>Особливості тканини black-out - вона практично не пропускає світло і не втрачає своїх властивостей з плином. часу у процесі її використання. Також тканина має здатність знижувати шуми (до 30%). <br/>
Характеристики: <br/>
-Великий асортимент кольорової гами; <br/>
-тканина блекаут, сонцезахисна, шумоізоляційна; <br/>
-Добре драпірується в склади; <br/>
-Не вибаглива у пранні та побуті; <br/>
-Не вигоряє колір на сонці. <br/>

Можливе пошиття штор на люверси або псевдолюверсну стрічку.</Text>
        </div>
      </div>
      <div className={styles.reviewSection}>
        <H tag="h1">Відгуки</H>
        <div className={styles.reviews}>
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
        <Link className={styles.catalogButton} href={'/reviews'}><Button appearance="black" size="l">Всі відгуки</Button></Link>
      </div>
    </main>
  );
}
