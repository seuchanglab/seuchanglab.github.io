# 课题组主页模板配置说明

直接打开 `index.html` 即可预览页面。

## 快速替换图片

所有默认图片都在 `assets` 文件夹中。页面不限制图片格式，`png`、`jpg`、`jpeg`、`webp`、`gif` 都可以用。

最省事的方式是使用默认文件名，直接把自己的图片覆盖进去：

- `hero-bg.png`：顶部蓝色横幅背景，建议使用宽图。
- `logo-1.png`、`logo-2.png`：左上角两个 Logo。
- `research-1.png` 到 `research-4.png`：四个研究方向展示图。
- `icon-flask.png`：简介标题旁的小图标。

如果你的图片不是 `.png`，也可以不改文件名，直接在 `config.js` 里把对应路径改成新图片路径，例如：

```js
researchCards: [
  {
    title: "你的研究方向标题",
    image: "assets/my-photo.jpg",
    alt: "图片说明",
    href: "#research-1",
    tags: ["关键词"],
  },
]
```

## 修改文字

页面标题、组织名称、导航、简介正文、招生信息和最新动态都在 `config.js` 中。通常只需要改这个文件，不需要动 `index.html`、`css/styles.css` 或 `js/app.js`。

## 增加研究卡片

`researchCards` 可以放任意数量的内容。页面会自动横向循环滚动，不再限制只显示四个。

每个卡片字段的含义：

- `title`：卡片居中显示的标题。
- `image`：卡片图片路径，支持 `png`、`jpg`、`jpeg`、`webp`、`gif`。
- `alt`：图片说明，会显示在标题下面。
- `tags`：关键词标签，会显示在卡片底部。
- `href`：点击卡片跳转的位置。

## 配置各个页面

导航栏已经改成多个独立页面：

- `index.html`：首页。
- `academic.html`：学术科研，对应 `config.js` 里的 `pages.academic`。
- `members.html`：研究成员，对应 `pages.members`。
- `platform.html`：研究平台，对应 `pages.platform`。
- `achievements.html`：研究成果，对应 `pages.achievements`。
- `life.html`：学习生活，对应 `pages.life`。
- `recruit.html`：招生招聘，对应 `pages.recruit`。

每个页面的标题、简介、封面图和具体内容都在 `config.js` 中。新增成员、平台设备、成果、生活照片或招生方向时，复制同类对象并修改文字和图片路径即可。

研究成果页使用 `pages.achievements.groups` 分组配置。每个分组可以设置：

- `title`：分组标题，例如“最新论文”“授权专利”“科研项目”。
- `type`：条目类型，会显示在每条成果上。
- `records`：该分组下的成果条目，可以继续追加；内容较多时会在分组内部上下滚动。

## 配置点击跳转

研究方向、研究成员、研究平台、研究成果、学习生活和招生招聘里的每个条目都可以配置 `href`。

示例：

```js
{
  name: "常志勇",
  role: "课题组负责人",
  image: "assets/member-1.png",
  href: "https://me.seu.edu.cn/czy/list.htm",
  desc: "研究方向简介",
  tags: ["导师", "机械工程"],
}
```

如果 `href` 是 `https://...` 这种外部链接，页面会自动新窗口打开；如果是 `academic.html#research-1` 或 `#platform-1`，则会在当前页面跳转。

## 建议图片尺寸

- 横幅背景：`1800 × 360` 或更宽。
- Logo：正方形透明底图更好，建议 `400 × 400`。
- 研究图：建议统一比例，约 `640 × 500`。
- 内页封面图：建议 `900 × 560`。
- 成员头像：建议正方形。
- 生活照片和平台图：建议统一比例，避免页面高低不齐。
