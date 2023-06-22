import { login } from "../../_api";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "POST") {
        try {
            const loginCred = await login(req.body);
            res.status(200).json(loginCred);
        } catch {
            return "Error";
        }
    } else {
        const token = req.url.split("?t=")[1];
        if (token) {
            const data = JSON.parse(atob(token));
            try {
                const loginCred = await login(data);
                res.status(200).json(loginCred);
            } catch (err) {
                res.status(200).json({ error: JSON.stringify(err), token: data });
            }
        } else {
            res.status(200).json({
                status: "API Online",
            });
        }
    }
}
