import styles from "./cover_btn.module.scss";

import Image from "next/image";

export default async function CoverBtn({ name, img, href }) {
    return (
        <a href={href} className={styles.button}>
            <Image src={img} alt={name} width={200} height={200} />
            <h3>{name}</h3>
        </a>
    );
}
