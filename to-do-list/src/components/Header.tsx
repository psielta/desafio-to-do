import styles from "./Header.module.css"
import logo from "../assets/logo-todolist.svg"
export function Header() {
    return (
        <>
            <header className={styles.header}>
                <img src={logo} alt="Logo"></img>
            </header>
        </>
    );
}