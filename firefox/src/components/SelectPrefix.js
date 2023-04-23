import { useApp } from "./App";

export default function SelectPrefix() {
    const { app, setApp } = useApp();

    return (
        <>
            <label>Préfixe :</label>
            <input defaultValue={app.prefix} onBlur={e => setApp(k => ({ ...k, prefix: e.target.value }))} />
        </>
    );
}
