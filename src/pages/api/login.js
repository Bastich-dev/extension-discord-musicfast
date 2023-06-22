import { login } from "../../_api";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const loginCred = await login(req.body);
            res.status(200).json(loginCred);
        } catch {
            return "Error";
        }
    } else {
        res.status(200).json({ status: "API Online" });
    }
}
