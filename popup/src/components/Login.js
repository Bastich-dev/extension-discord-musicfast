import { getUser, trylogin } from "../_api";
import { setStorage } from "../_storage";
import { useApp } from "./App";

export default function Login() {
    const { setUser, setMessage } = useApp();

    return (
        <>
            <a
                href="https://bastoss.notion.site/Documentation-Discord-Music-Fast-5fcf874944604cf1a13e5f0a0d01c909"
                target="_blank"
                rel="noopenner noreferrer"
                style={{ marginRight: "auto", marginBottom: 15 }}>
                Lien de tuto
            </a>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setUser(null);
                    trylogin({ login: e.target?.["login"].value, password: e.target?.["password"].value })
                        .then((auth) => {
                            setStorage({ token: auth.token });
                            getUser()
                                .then((res) => {
                                    setUser(res);
                                    setMessage({
                                        text: "Connexion réussie",
                                        color: "yellowgreen",
                                    });
                                })
                                .catch(() => {
                                    setMessage({
                                        text: "Erreur identification",
                                        color: "red",
                                    });
                                    setUser(false);
                                });
                        })
                        .catch(() => {
                            setMessage({
                                text: "Erreur identification",
                                color: "red",
                            });
                            setUser(false);
                        });
                }}>
                <label>E-mail :</label>
                <input id="login" name="login" type="email" />
                <label>Mot de passe :</label>
                <input id="password" name="password" type="password" />
                <button
                    children="Connexion"
                    //
                />
            </form>
        </>
    );
}
