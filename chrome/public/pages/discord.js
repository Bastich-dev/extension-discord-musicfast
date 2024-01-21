window.addEventListener("load", async () => {
    // const token = eval(
    //     "(window.webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()"
    // );
    // console.log(token);

    // console.log(window.webpackChunkdiscord_app);

    window.addEventListener("resize", e => {
        console.log("first");
        console.log(e);
    });
});
