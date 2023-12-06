const authorize = ({
  default_avatar_id: defaultAvatarId,
  display_name: displayName,
}) => {
  const avatarHtml = `<div class="avatar" style="background-image:url('https://avatars.mds.yandex.net/get-yapic/${defaultAvatarId}/islands-middle')"></div>`;
  const nameHtml = `<div class="name">${displayName}</div>`;

  document.getElementById("auth").innerHTML = `${avatarHtml}${nameHtml}`;
};

const fetchYandexData = (token) =>
  fetch(`https://login.yandex.ru/info?format=json&oauth_token=${token}`).then(
    (res) => res.json()
  );

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

  document.getElementById("button").onclick = () => {
    window.YaAuthSuggest.init(
      {
        client_id: "86fd3489485d4ef6ae2ff608a86640dc",
        response_type: "token",
        redirect_uri: "https://oauth-master-class-git-main-kirmits-projects.vercel.app/token.html",
      },
      "https://oauth-master-class-git-main-kirmits-projects.vercel.app/",
      {
        parentId: "buttonContainer",
        view: "button",
        buttonTheme: "dark",
        buttonSize: "xxl",
        buttonBorderRadius: 50,
      }
    )
      .then(({ handler }) => handler())
      .then(async (data) => {
        const result = await fetchYandexData(data.access_token);

        authorize(result);

        console.log(result, data);
      })
      .catch((error) => console.log("Что-то пошло не так: ", error));
  };
};
