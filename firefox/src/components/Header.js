import DiscordImage from "../assets/discord.png";
import { useApp } from "./App";

export default function Header() {
    const { user, login, logout } = useApp();

    if (user === null) return <></>;
    //
    else if (!user)
        return (
            <header>
                <button id="login" onClick={login}>
                    <img src={DiscordImage} width="20px" height="20px" />
                    Se connecter avec le token
                </button>
            </header>
        );
    //
    else if (user)
        return (
            <header>
                <button id="logout" onClick={logout}>
                    Déconnexion
                </button>
                <div id="profile">
                    <img src={user.avatar} width={30} height={30} />
                    <b>{user.username}</b>
                    <i>#{user.discriminator}</i>
                </div>
            </header>
        );
}
