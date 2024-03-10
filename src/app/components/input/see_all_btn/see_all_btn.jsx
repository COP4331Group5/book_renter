import styles from "./see_all_btn.module.scss";
import { BsArrowRightShort } from "react-icons/bs";

export default function SeeAllBtn({ href }) {
    return (
        <a className={styles["clear-btn"]}>
            See All <BsArrowRightShort />
        </a>
    );
}
