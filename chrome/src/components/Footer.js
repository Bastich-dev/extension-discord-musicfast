import { useApp } from "./App";

export default function Footer() {
    const { message } = useApp();

    return (
        <>
            {!!message && <p style={{ color: message.color }}>{message.text}</p>}

            <footer>
                <a target="_blank" href="https://bastien-chantrel.com">
                    Bastoss
                </a>
            </footer>
        </>
    );
}
