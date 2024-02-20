import { useApp } from "./_index";

export default function Header() {
    const { app, resetApp } = useApp();

    return (
        <>
            <header>
                <h1>Discord Music Fast</h1>
                {!!app?.user && (
                    <button id="logout" onClick={resetApp}>
                        Déconnexion
                    </button>
                )}
            </header>
            {!!app?.user && (
                <div id="profile">
                    <img
                        src={"https://cdn.discordapp.com/avatars/" + app?.user.id + "/" + app?.user.avatar + ".webp?size=32"}
                        width={30}
                        height={30}
                    />
                    <b>{app?.user.global_name}</b>
                    <i>{app?.user.username}</i>
                </div>
            )}
        </>
    );
}
