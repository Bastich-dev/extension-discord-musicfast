import { useApp } from "./App";
import SelectChannel from "./SelectChannel";
import SelectPrefix from "./SelectPrefix";
import SelectServer from "./SelectServer";

export default function Form() {
    const { user, setApp } = useApp();

    function lol(text) {
        setApp(k => ({ ...k, token: formatToken(text) }));
    }
    if (user === null)
        return (
            <form>
                <img src="https://memorial.cfm.org.br/application/img/loading.gif" width={60} height={60} />
            </form>
        );
    else if (!user) {
        return (
            <form>
                <label>Token :</label>
                <textarea
                    rows={4}
                    onBlur={e => setApp(k => ({ ...k, token: formatToken(e.target.value) }))}
                    onKeyDown={e => {
                        const code = e.which || e.keyCode;
                        let charCode = String.fromCharCode(code).toLowerCase();
                        if ((e.ctrlKey || e.metaKey) && charCode === "v") {
                            setTimeout(() => {
                                e.target.blur();
                            }, 200);
                        }
                    }}
                />

                <a href="https://scribehow.com/shared/Discord_Fast_Music_Workflow__m6rwC5w0RWeKQ0frOQUVwA" target="_blank" rel="noopenner noreferrer">
                    Comment obtenir mon token ?
                </a>
            </form>
        );
    } else if (user)
        return (
            <form>
                <SelectPrefix />
                <SelectServer />
                <SelectChannel />
            </form>
        );
}

const formatToken = token => {
    if (token.includes("'")) return token.split("'")[1];
    else
        return token
            .replace(/(\r\n|\n|\r)/gm, "")
            .replaceAll('"', "")
            .replaceAll("'", "")
            .replaceAll("`", "");
};
