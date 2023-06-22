/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Same Origin", value: false },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
