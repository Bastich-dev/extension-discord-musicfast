import { useApp } from "./App";

export default function Footer() {
    const { message } = useApp();
    return (
        <>
            <footer>
                <a target="_blank" href="https://bastien-chantrel.com">
                    Bastoss
                </a>
                {!!message && <p style={{ color: message.color, margin: 0 }}>{message.text}</p>}
            </footer>
        </>
    );
}
