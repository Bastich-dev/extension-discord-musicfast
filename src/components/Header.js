import { setStorage } from "../_storage";
import { useApp } from "./App";

export default function Header() {
    const { setApp, setUser, user } = useApp();

    const logout = () => {
        setStorage({ token: null, app: null }).then(() => {
            setUser(false);
            setApp(false);
        });
    };

    return (
        <>
            <header>
                <h1>Discord Music Fast</h1>
                {!!user && (
                    <button id="logout" onClick={logout}>
                        Déconnexion
                    </button>
                )}
            </header>
            {!!user && (
                <div id="profile">
                    <img src={"https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".webp?size=32"} width={30} height={30} />
                    <b>{user.global_name}</b>
                    <i>{user.username}</i>
                </div>
            )}
        </>
    );
}
