window.onload = () => {
  document.getElementById("suggest").onclick = () => {
    YaAuthSuggest.init(
      {
        client_id: "86fd3489485d4ef6ae2ff608a86640dc",
        response_type: "token",
        redirect_uri: "https://oauth-master-class-git-main-kirmits-projects.vercel.app/token.html",
      },
      "https://oauth-master-class-git-main-kirmits-projects.vercel.app/",
      {
        view: "button",
        parentId: "buttonContainer",
        buttonSize: "m",
        buttonView: "main",
        buttonTheme: "light",
        buttonBorderRadius: "0",
        buttonIcon: "ya",
      }
    )
      .then(({ handler }) => handler())
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);

        authorize(result);
        
        console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так", error));
  };
};
