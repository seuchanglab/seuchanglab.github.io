(function () {
  const config = window.homepageConfig;
  const root = document.getElementById("site-root");

  if (!config || !root) return;

  const pageByFile = {
    "": "home",
    "index.html": "home",
    "academic.html": "academic",
    "members.html": "members",
    "profile.html": "profile",
    "platform.html": "platform",
    "achievements.html": "achievements",
    "life.html": "life",
    "recruit.html": "recruit",
  };

  const currentFile = decodeURIComponent(window.location.pathname.split("/").pop() || "").toLowerCase();
  const pageKey = pageByFile[currentFile] || "home";
  const pageConfig = pageKey === "home" ? null : config.pages?.[pageKey];

  document.body.classList.add(`page-${pageKey}`);
  document.title = pageConfig?.title
    ? `${pageConfig.title} - ${config.site?.title || "课题组主页"}`
    : config.site?.title || "课题组主页";

  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription && (pageConfig?.summary || config.site?.description)) {
    metaDescription.setAttribute("content", pageConfig?.summary || config.site.description);
  }

  const esc = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const resolveUrl = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    try {
      return new URL(raw, window.location.href).href;
    } catch {
      return raw;
    }
  };

  const cssUrl = (value) => resolveUrl(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');

  const getHrefFile = (href) => {
    const file = String(href || "").split("#")[0].toLowerCase();
    return file || "index.html";
  };

  const tagsHtml = (tags = []) =>
    tags.map((tag) => `<span>${esc(tag)}</span>`).join("");

  const getHrefHash = (href) => {
    const hash = String(href || "").split("#")[1];
    return hash ? decodeURIComponent(hash).trim() : "";
  };

  const attrsForId = (id) => (id ? ` id="${esc(id)}"` : "");

  const isSafeHref = (href) => {
    const value = String(href || "").trim();
    if (!value) return false;
    if (value.startsWith("#")) return true;
    if (value.startsWith("/") && !value.startsWith("//")) return true;
    if (/^(https?:|mailto:)/i.test(value)) return true;
    return !value.startsWith("//") && !/^[a-z][a-z0-9+.-]*:/i.test(value);
  };

  const isExternalHref = (href) => /^https?:\/\//i.test(String(href || ""));

  const attrsForHref = (href) => {
    const value = String(href || "").trim();
    if (!isSafeHref(value)) return "";
    const target = isExternalHref(value) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return ` href="${esc(value)}"${target}`;
  };

  const pageFiles = {
    home: "index.html",
    academic: "academic.html",
    members: "members.html",
    profile: "profile.html",
    platform: "platform.html",
    achievements: "achievements.html",
    life: "life.html",
    recruit: "recruit.html",
  };

  const withPageHref = (page, href) => {
    const file = pageFiles[page] || "index.html";
    const value = String(href || "").trim();
    if (!value) return file;
    return value.startsWith("#") ? `${file}${value}` : value;
  };

  const stripHtml = (value) => {
    const container = document.createElement("div");
    container.innerHTML = String(value ?? "");
    return (container.textContent || "").replace(/\s+/g, " ").trim();
  };

  const normalizeSearchText = (parts) =>
    parts
      .flat(Infinity)
      .map((part) => stripHtml(part))
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

  const trimText = (value, maxLength = 86) => {
    const text = stripHtml(value);
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const assetSlug = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 64)
      .replace(/-$/g, "");

  const getJournalCover = (record, group) => {
    if ((record.type || group.type) !== "论文") return "";
    const journal = stripHtml(record.desc).split(/[，;]/)[0]?.trim() || record.tags?.[0] || "";
    const slug = assetSlug(journal);
    return slug ? `../assets/journal-covers/${slug}.png` : "";
  };

  const getAllPeople = () =>
    (config.pages?.members?.groups || []).flatMap((group) =>
      (group.people || []).map((person) => ({
        ...person,
        groupTitle: group.title || "研究成员",
      }))
    );

  const getCurrentProfilePerson = () => {
    const id = new URLSearchParams(window.location.search).get("id") || "";
    const cleanId = id.trim().toLowerCase();
    return getAllPeople().find(
      (person) =>
        String(person.id || "").toLowerCase() === cleanId ||
        String(person.name || "").toLowerCase() === cleanId
    );
  };

  const buildSearchIndex = () => {
    const results = [];
    const addResult = ({ category, title, description, href, keywords = [] }) => {
      const safeHref = isSafeHref(href) ? href : "";
      const cleanTitle = stripHtml(title);
      const cleanDescription = trimText(description);
      if (!cleanTitle && !cleanDescription) return;
      results.push({
        category: stripHtml(category || "站内内容"),
        title: cleanTitle || cleanDescription,
        description: cleanDescription,
        href: safeHref,
        categoryText: normalizeSearchText([category]),
        titleText: normalizeSearchText([title]),
        descriptionText: normalizeSearchText([description]),
        keywordText: normalizeSearchText([keywords]),
        searchText: normalizeSearchText([category, title, description, keywords]),
      });
    };

    addResult({
      category: "首页",
      title: config.site?.title,
      description: config.site?.description,
      href: "index.html",
    });
    addResult({
      category: "首页",
      title: config.intro?.title || "课题组简介",
      description: config.intro?.bodyHtml,
      href: "index.html#research",
    });
    (config.updates || []).forEach((item) =>
      addResult({
        category: "最新动态",
        title: item.text,
        description: item.date,
        href: "index.html#outputs",
      })
    );
    (config.reports || []).forEach((item) =>
      addResult({
        category: item.type || "报道获奖",
        title: item.title,
        description: [item.date, item.text].join(" "),
        href: withPageHref("home", item.href || "#reports"),
        keywords: [item.type],
      })
    );
    (config.researchCards || []).forEach((card) =>
      addResult({
        category: "研究方向",
        title: card.title,
        description: card.alt,
        href: withPageHref("academic", card.href),
        keywords: card.tags || [],
      })
    );

    const pages = config.pages || {};
    Object.entries(pages).forEach(([key, page]) => {
      addResult({
        category: "页面",
        title: page.title,
        description: page.summary,
        href: pageFiles[key] || "index.html",
        keywords: page.kicker,
      });
    });

    (pages.academic?.sections || []).forEach((section, index) =>
      addResult({
        category: "科研布局",
        title: section.title,
        description: section.body,
        href: `academic.html#academic-section-${index + 1}`,
        keywords: section.bullets || [],
      })
    );
    (pages.members?.groups || []).forEach((group) =>
      (group.people || []).forEach((person) =>
        addResult({
          category: group.title || "研究成员",
          title: person.name,
          description: [person.role, person.desc].join(" "),
          href: person.href || "members.html",
          keywords: person.tags || [],
        })
      )
    );
    (pages.platform?.items || []).forEach((item) =>
      addResult({
        category: "研究平台",
        title: item.title,
        description: item.desc,
        href: withPageHref("platform", item.href),
        keywords: item.specs || [],
      })
    );
    (pages.achievements?.groups || []).forEach((group) =>
      (group.records || []).forEach((record) =>
        addResult({
          category: group.title || group.type || "研究成果",
          title: record.title,
          description: record.desc,
          href: withPageHref("achievements", record.href),
          keywords: [record.year, record.type || group.type, ...(record.tags || [])],
        })
      )
    );
    (pages.life?.photos || []).forEach((photo) =>
      addResult({
        category: "学习生活",
        title: photo.title,
        description: photo.desc,
        href: withPageHref("life", photo.href),
      })
    );
    (pages.recruit?.positions || []).forEach((position) =>
      addResult({
        category: "招生招聘",
        title: position.title,
        description: position.desc,
        href: withPageHref("recruit", position.href),
        keywords: position.tags || [],
      })
    );

    return results;
  };

  const linkedCard = (tagName, className, href, content, extraAttrs = "") => {
    const tag = href ? "a" : tagName;
    return `<${tag} class="${className}${href ? " is-clickable" : ""}"${attrsForHref(href)}${extraAttrs}>${content}</${tag}>`;
  };

  const logosHtml = (config.images?.logos || [])
    .map(
      (logo) => `
        <span class="brand-logo">
          <img src="${esc(logo.src)}" alt="${esc(logo.alt)}" />
        </span>
      `
    )
    .join("");

  const navHtml = (config.nav || [])
    .map((item) => {
      const active = getHrefFile(item.href) === (currentFile || "index.html");
      return `<a class="${active ? "is-active" : ""}" href="${esc(item.href)}">${esc(item.label)}</a>`;
    })
    .join("");

  const renderHeader = () => `
    <header class="site-hero ${pageKey === "home" ? "" : "site-hero-compact"}" id="home" style="--hero-bg:url(&quot;${esc(
      cssUrl(config.images?.heroBackground || "")
    )}&quot;)">
      <div class="hero-inner">
        <div class="brand-block">
          <div class="brand-logos">${logosHtml}</div>
          <div class="brand-copy">
            <h1>${esc(config.group?.name)}</h1>
            <p>${esc(config.group?.organization)}</p>
            <p>${esc(config.group?.team)}</p>
          </div>
        </div>

        <form class="search-box" role="search">
          <input type="search" placeholder="搜索研究方向、成员、成果..." aria-label="站内搜索" autocomplete="off" aria-controls="search-results" aria-expanded="false" />
          <button type="submit" aria-label="搜索">
            <span></span>
          </button>
          <div class="search-panel" id="search-results" role="listbox" aria-label="搜索结果" hidden></div>
        </form>
      </div>

      <nav class="main-nav" aria-label="主导航">
        <button class="nav-toggle" type="button" aria-label="展开导航">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-links">${navHtml}</div>
      </nav>
    </header>
  `;

  const renderResearchCard = (card, index) => {
    const altHtml = card.alt ? `<span class="research-alt">${esc(card.alt)}</span>` : "";
    const searchText = [card.title, card.alt, ...(card.tags || [])].join(" ");

    return `
      <a
        class="research-card reveal searchable-card is-clickable"
        ${attrsForHref(card.href)}
        ${attrsForId(getHrefHash(card.href))}
        data-search="${esc(searchText)}"
        style="--delay:${index * 70}ms"
      >
        <span class="research-image">
          <img src="${esc(card.image)}" alt="${esc(card.alt || card.title)}" />
        </span>
        <span class="research-copy">
          <span class="research-title">${esc(card.title)}</span>
          ${altHtml}
        </span>
      </a>
    `;
  };

  const renderCarousel = (cards) => `
    <div class="research-carousel">
      <button class="research-scroll-button research-scroll-prev" type="button" aria-label="向左循环滚动研究内容" title="向左滚动">
        <span aria-hidden="true">‹</span>
      </button>
      <div class="research-grid" tabindex="0">${(cards || []).map(renderResearchCard).join("")}</div>
      <button class="research-scroll-button research-scroll-next" type="button" aria-label="向右循环滚动研究内容" title="向右滚动">
        <span aria-hidden="true">›</span>
      </button>
    </div>
  `;

  const updateHtml = (config.updates || [])
    .map(
      (item) => `
        <li>
          <span>${esc(item.date)}</span>
          <p>${esc(item.text)}</p>
        </li>
      `
    )
    .join("");

  const reportHtml = (config.reports || [])
    .map(
      (item) => `
        <li>
          <a${attrsForHref(item.href || "#reports")}>
            <span>${esc(item.date)}</span>
            <p>${esc(item.title)}</p>
            <small>${esc(item.text)}</small>
          </a>
        </li>
      `
    )
    .join("");

  const joinHighlightHtml = (config.joinHighlights || [])
    .map(
      (item) => `
        <article class="join-card reveal searchable-card" data-search="${esc([
          item.title,
          item.text,
          ...(item.tags || []),
        ].join(" "))}">
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
        </article>
      `
    )
    .join("");

  const studentTasksHtml = (tasks = []) =>
    tasks.length
      ? `
        <div class="student-task-list">
          <strong>学生可参与</strong>
          <ul>${tasks.map((task) => `<li>${esc(task)}</li>`).join("")}</ul>
        </div>
      `
      : "";

  const achievementStatsHtml = (stats = []) =>
    stats.length
      ? `
        <section class="module-section achievement-stats-section">
          <div class="stats-grid">
            ${stats
              .map(
                (item) => `
                  <article class="stat-card reveal">
                    <strong>${esc(item.value)}</strong>
                    <span>${esc(item.label)}</span>
                    <p>${esc(item.text)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
      : "";

  const renderHome = () => `
    <main>
      <section class="intro-section" id="research">
        <div class="section-heading">
          <div class="section-title">
            <img src="${esc(config.images?.sectionIcon)}" alt="" />
            <div class="section-title-copy">
              <span>Group Profile</span>
              <h2>${esc(config.intro?.title)}</h2>
            </div>
          </div>
          <a class="more-link" href="${esc(config.intro?.moreHref)}">${esc(config.intro?.moreLabel)}</a>
        </div>

        ${renderCarousel(config.researchCards || [])}

        <div class="intro-copy reveal">
          <p>${config.intro?.bodyHtml || ""}</p>
          <p class="recruit-line" id="recruit">${config.intro?.recruitHtml || ""}</p>
          <div class="home-cta-row">
            <a href="recruit.html">查看招生方向</a>
            <a href="academic.html">了解可参与课题</a>
          </div>
        </div>
      </section>

      <section class="join-section reveal" id="why-join">
        <div class="module-heading">
          <span>Why Join Us</span>
          <h2>为什么加入我们</h2>
        </div>
        <div class="join-grid">${joinHighlightHtml}</div>
      </section>

      <section class="updates-section reveal" id="outputs">
        <div class="updates-copy">
          <span>Latest News</span>
          <h2>最新动态</h2>
          <p>论文发表、项目进展、招生信息或组会通知。</p>
        </div>
        <ul class="updates-list">${updateHtml}</ul>
      </section>

      <section class="reports-section reveal" id="reports">
        <div class="reports-copy">
          <span>Reports & Honors</span>
          <h2>报道与获奖</h2>
          <p>团队报道、奖励、成果转化与代表性授权信息。</p>
        </div>
        <ul class="reports-list">${reportHtml}</ul>
      </section>
    </main>
  `;

  const renderPageCover = (page) => `
    <section class="page-cover reveal">
      <div class="page-cover-copy">
        <span class="page-kicker">${esc(page.kicker)}</span>
        <h2>${esc(page.title)}</h2>
        <p>${esc(page.summary)}</p>
      </div>
      <div class="page-cover-media">
        <img src="${esc(page.coverImage)}" alt="${esc(page.title)}" />
      </div>
    </section>
  `;

  const renderBullets = (bullets = []) =>
    bullets.length
      ? `<ul class="check-list">${bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
      : "";

  const renderAcademic = (page) => `
    <main class="page-main">
      ${renderPageCover(page)}

      <section class="module-section">
        <div class="module-heading">
          <span>Research Areas</span>
          <h2>研究方向</h2>
        </div>
        <div class="direction-grid">
          ${(config.researchCards || [])
            .map(
              (card) => `
                ${linkedCard(
                  "article",
                  "direction-card reveal searchable-card",
                  card.href,
                  `
                    <img src="${esc(card.image)}" alt="${esc(card.alt || card.title)}" />
                    <div>
                      <h3>${esc(card.title)}</h3>
                      <p>${esc(card.alt)}</p>
                      ${studentTasksHtml(card.studentTasks || [])}
                    </div>
                  `,
                  `${attrsForId(getHrefHash(card.href))} data-search="${esc([card.title, card.alt, ...(card.tags || [])].join(" "))}"`
                )}
              `
            )
            .join("")}
        </div>
      </section>

      <section class="module-section">
        <div class="module-heading">
          <span>Methodology</span>
          <h2>科研布局</h2>
        </div>
        <div class="split-panels">
          ${(page.sections || [])
            .map(
              (section, index) => `
                <article class="info-panel reveal searchable-card" id="academic-section-${index + 1}" data-search="${esc([
                  section.title,
                  section.body,
                  ...(section.bullets || []),
                ].join(" "))}">
                  <h3>${esc(section.title)}</h3>
                  <p>${esc(section.body)}</p>
                  ${renderBullets(section.bullets)}
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    </main>
  `;

  const renderMembers = (page) => `
    <main class="page-main">
      ${renderPageCover(page)}
      ${(page.groups || [])
        .map(
          (group) => `
            <section class="module-section member-section">
              <div class="module-heading">
                <span>People</span>
                <h2>${esc(group.title)}</h2>
              </div>
              <div class="member-grid">
                ${(group.people || [])
                  .map(
                    (person) => `
                      ${linkedCard(
                        "article",
                        "member-card reveal searchable-card",
                        person.href,
                        `
                          <img src="${esc(person.image)}" alt="${esc(person.name)}" />
                          <div class="member-copy">
                            <h3>${esc(person.name)}</h3>
                            <strong>${esc(person.role)}</strong>
                            <p>${esc(person.desc)}</p>
                            <div class="mini-tags">${tagsHtml(person.tags || [])}</div>
                          </div>
                        `,
                        ` data-search="${esc([person.name, person.role, person.desc, ...(person.tags || [])].join(" "))}"`
                      )}
                    `
                  )
                  .join("")}
              </div>
            </section>
          `
        )
        .join("")}
      </main>
  `;

  const renderProfile = () => {
    const person = getCurrentProfilePerson();
    if (!person) {
      return `
        <main class="page-main">
          <section class="module-section profile-panel reveal">
            <div class="module-heading">
              <span>Profile</span>
              <h2>个人主页建设中</h2>
            </div>
            <p>研究方向、项目经历和联系方式持续更新。</p>
            <a class="plain-link" href="members.html">返回研究成员</a>
          </section>
        </main>
      `;
    }

    const hasExternalProfile = isExternalHref(person.href);
    return `
      <main class="page-main">
        <section class="module-section profile-panel reveal">
          <div class="profile-card">
            <img class="profile-photo" src="${esc(person.image)}" alt="${esc(person.name)}" />
            <div class="profile-copy searchable-card" data-search="${esc([
              person.name,
              person.role,
              person.desc,
              person.groupTitle,
              ...(person.tags || []),
            ].join(" "))}">
              <span class="profile-kicker">${esc(person.groupTitle)}</span>
              <h2>${esc(person.name)}</h2>
              <strong>${esc(person.role)}</strong>
              <p>${esc(person.desc)}</p>
              <div class="mini-tags">${tagsHtml(person.tags || [])}</div>
              <div class="profile-actions">
                ${
                  hasExternalProfile
                    ? `<a class="plain-link" href="${esc(person.href)}" target="_blank" rel="noopener noreferrer">访问个人主页</a>`
                    : `<span class="profile-placeholder">个人主页建设中</span>`
                }
                <a class="plain-link" href="members.html">返回研究成员</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    `;
  };

  const renderPlatform = (page) => `
    <main class="page-main">
      ${renderPageCover(page)}
      <section class="module-section">
        <div class="module-heading">
          <span>Facilities</span>
          <h2>平台与设备</h2>
        </div>
        <div class="platform-grid">
          ${(page.items || [])
            .map(
              (item) => `
                ${linkedCard(
                  "article",
                  "platform-card reveal searchable-card",
                  item.href,
                  `
                    <img src="${esc(item.image)}" alt="${esc(item.title)}" />
                    <div>
                      <h3>${esc(item.title)}</h3>
                      <p>${esc(item.desc)}</p>
                      ${renderBullets(item.specs)}
                    </div>
                  `,
                  `${attrsForId(getHrefHash(item.href))} data-search="${esc([item.title, item.desc, ...(item.specs || [])].join(" "))}"`
                )}
              `
            )
            .join("")}
        </div>
      </section>
    </main>
  `;

  const renderAchievementRecord = (record, group) => {
    const coverImage = getJournalCover(record, group);
    const coverAttrs = coverImage ? ` style="--paper-cover:url('${esc(coverImage)}')"` : "";
    return linkedCard(
      "article",
      `achievement-item reveal searchable-card${coverImage ? " has-cover" : ""}`,
      record.href,
      `
        <span class="achievement-year">${esc(record.year)}</span>
        <div class="achievement-copy">
          <h3>${esc(record.title)}</h3>
          <p>${esc(record.desc)}</p>
          <div class="mini-tags">${tagsHtml(record.tags || [])}</div>
        </div>
      `,
      `${coverAttrs}${attrsForId(getHrefHash(record.href))} data-search="${esc([
        record.year,
        record.type || group.type,
        group.title,
        record.title,
        record.desc,
        ...(record.tags || []),
      ].join(" "))}"`
    );
  };

  const renderAchievements = (page) => {
    const groups =
      page.groups ||
      [
        {
          title: "代表性成果",
          type: "成果",
          records: page.records || [],
        },
      ];

    return `
      <main class="page-main">
        ${renderPageCover(page)}
        ${achievementStatsHtml(page.stats || [])}
        <section class="module-section">
          <div class="module-heading">
            <span>Outputs</span>
            <h2>代表性成果</h2>
          </div>
          <div class="achievement-groups">
            ${groups
              .map(
                (group) => `
                  <section class="achievement-group">
                    <div class="achievement-group-heading">
                      <div>
                        <span>${esc(group.type || "成果")}</span>
                        <h3>${esc(group.title)}</h3>
                      </div>
                    </div>
                    <div class="achievement-list">
                      ${(group.records || [])
                        .map((record) => renderAchievementRecord(record, group))
                        .join("")}
                    </div>
                  </section>
                `
              )
              .join("")}
          </div>
        </section>
      </main>
    `;
  };

  const renderLife = (page) => `
    <main class="page-main">
      ${renderPageCover(page)}
      <section class="module-section">
        <div class="module-heading">
          <span>Gallery</span>
          <h2>学习生活掠影</h2>
        </div>
        <div class="photo-grid">
          ${(page.photos || [])
            .map(
              (photo) => `
                ${linkedCard(
                  "article",
                  "photo-card reveal searchable-card",
                  photo.href,
                  `
                    <img src="${esc(photo.image)}" alt="${esc(photo.title)}" />
                    <div>
                      <h3>${esc(photo.title)}</h3>
                      <p>${esc(photo.desc)}</p>
                    </div>
                  `,
                  `${attrsForId(getHrefHash(photo.href))} data-search="${esc([photo.title, photo.desc].join(" "))}"`
                )}
              `
            )
            .join("")}
        </div>
      </section>
    </main>
  `;

  const renderRecruit = (page) => `
    <main class="page-main">
      ${renderPageCover(page)}

      <section class="module-section recruit-fit-section">
        <div class="module-heading">
          <span>Fit</span>
          <h2>什么样的同学适合加入</h2>
        </div>
        <div class="join-grid">
          ${(page.fit || [])
            .map(
              (item) => `
                <article class="join-card reveal searchable-card" data-search="${esc([item.title, item.text].join(" "))}">
                  <h3>${esc(item.title)}</h3>
                  <p>${esc(item.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="module-section">
        <div class="module-heading">
          <span>Join Us</span>
          <h2>招生与招聘方向</h2>
        </div>
        <div class="recruit-grid">
          ${(page.positions || [])
            .map(
              (position) => `
                ${linkedCard(
                  "article",
                  "recruit-card reveal searchable-card",
                  position.href,
                  `
                    <h3>${esc(position.title)}</h3>
                    <p>${esc(position.desc)}</p>
                    <div class="mini-tags">${tagsHtml(position.tags || [])}</div>
                  `,
                  `${attrsForId(getHrefHash(position.href))} data-search="${esc([position.title, position.desc, ...(position.tags || [])].join(" "))}"`
                )}
              `
            )
            .join("")}
        </div>
        <div class="recruit-detail-grid">
          <article class="recruit-detail-card reveal">
            <h3>培养路径</h3>
            ${renderBullets(page.training || [])}
          </article>
          <article class="recruit-detail-card reveal">
            <h3>可选课题方向</h3>
            ${renderBullets(page.directions || [])}
          </article>
        </div>
        <div class="contact-band reveal">
          <strong>联系方式</strong>
          <p>${esc(page.contact)}</p>
        </div>
      </section>
    </main>
  `;

  const renderPage = () => {
    if (pageKey === "home") return renderHome();
    if (pageKey === "profile") return renderProfile();
    if (!pageConfig) return renderHome();
    if (pageKey === "academic") return renderAcademic(pageConfig);
    if (pageKey === "members") return renderMembers(pageConfig);
    if (pageKey === "platform") return renderPlatform(pageConfig);
    if (pageKey === "achievements") return renderAchievements(pageConfig);
    if (pageKey === "life") return renderLife(pageConfig);
    if (pageKey === "recruit") return renderRecruit(pageConfig);
    return renderHome();
  };

  const renderFooter = () => `
    <footer class="site-footer">
      <span>${esc(config.footer?.address)}</span>
      <span>${esc(config.footer?.email)}</span>
      <span>${esc(config.footer?.copyright || config.site?.title)}</span>
    </footer>
  `;

  root.innerHTML = `${renderHeader()}${renderPage()}${renderFooter()}`;

  const nav = root.querySelector(".main-nav");
  const toggle = root.querySelector(".nav-toggle");
  toggle?.addEventListener("click", () => nav?.classList.toggle("is-open"));

  root.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => nav?.classList.remove("is-open"));
  });

  const carousels = Array.from(root.querySelectorAll(".research-grid"));

  const getScrollStep = (carousel) => {
    const card = carousel?.querySelector(".research-card:not([hidden])");
    if (!carousel || !card) return 0;
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 20;
    return card.getBoundingClientRect().width + gap;
  };

  const getMaxScroll = (carousel) => {
    if (!carousel) return 0;
    return Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  };

  const updateCarouselButtons = (carousel) => {
    const wrapper = carousel?.closest(".research-carousel");
    if (!carousel || !wrapper) return;
    const buttons = wrapper.querySelectorAll(".research-scroll-button");
    const hasOverflow = carousel.scrollWidth > carousel.clientWidth + 2;
    buttons.forEach((button) => {
      button.hidden = !hasOverflow;
    });
  };

  const normalizeCarouselScroll = (carousel) => {
    if (!carousel) return;
    carousel.scrollLeft = Math.min(carousel.scrollLeft, getMaxScroll(carousel));
  };

  const scrollCarousel = (carousel, direction) => {
    const step = getScrollStep(carousel);
    const maxScroll = getMaxScroll(carousel);
    if (!carousel || !step || maxScroll <= 2) return;

    const edge = Math.max(8, step * 0.16);
    const isAtStart = carousel.scrollLeft <= edge;
    const isAtEnd = carousel.scrollLeft >= maxScroll - edge;

    if (direction > 0 && isAtEnd) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && isAtStart) {
      carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    carousel.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  carousels.forEach((carousel) => {
    const wrapper = carousel.closest(".research-carousel");
    const prevButton = wrapper?.querySelector(".research-scroll-prev");
    const nextButton = wrapper?.querySelector(".research-scroll-next");

    prevButton?.addEventListener("click", () => scrollCarousel(carousel, -1));
    nextButton?.addEventListener("click", () => scrollCarousel(carousel, 1));
    carousel.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      scrollCarousel(carousel, event.key === "ArrowRight" ? 1 : -1);
    });
    carousel.addEventListener("scroll", () => updateCarouselButtons(carousel), { passive: true });
    updateCarouselButtons(carousel);
  });

  window.addEventListener("resize", () => {
    carousels.forEach((carousel) => {
      normalizeCarouselScroll(carousel);
      updateCarouselButtons(carousel);
    });
  });

  const searchForm = root.querySelector(".search-box");
  const searchInput = searchForm?.querySelector("input");
  const searchPanel = searchForm?.querySelector(".search-panel");
  const searchIndex = buildSearchIndex();
  let currentSearchMatches = [];

  const setSearchPanelVisible = (visible) => {
    if (!searchPanel || !searchInput) return;
    searchPanel.hidden = !visible;
    searchInput.setAttribute("aria-expanded", String(visible));
  };

  const renderSearchResults = () => {
    if (!searchInput || !searchPanel) return;
    const query = normalizeSearchText([searchInput.value]);
    const terms = query.split(/\s+/).filter(Boolean);

    if (!terms.length) {
      currentSearchMatches = [];
      searchPanel.innerHTML = "";
      setSearchPanelVisible(false);
      return;
    }

    const matches = searchIndex
      .filter((item) => terms.every((term) => item.searchText.includes(term)))
      .map((item) => {
        const score = terms.reduce((total, term) => {
          const titleScore = item.titleText.includes(term) ? 8 : 0;
          const keywordScore = item.keywordText.includes(term) ? 5 : 0;
          const categoryScore = item.categoryText.includes(term) ? 3 : 0;
          const descriptionScore = item.descriptionText.includes(term) ? 1 : 0;
          return total + titleScore + keywordScore + categoryScore + descriptionScore;
        }, 0);
        return { ...item, score };
      })
      .sort((a, b) => b.score - a.score);
    currentSearchMatches = matches.slice(0, 8);

    if (!currentSearchMatches.length) {
      searchPanel.innerHTML = `<p class="search-empty">没有找到相关内容</p>`;
      setSearchPanelVisible(true);
      return;
    }

    searchPanel.innerHTML = `
      <div class="search-result-count">找到 ${matches.length} 条结果</div>
      ${currentSearchMatches
        .map(
          (item) => `
            <a class="search-result" role="option"${attrsForHref(item.href)}>
              <span>${esc(item.category)}</span>
              <strong>${esc(item.title)}</strong>
              ${item.description ? `<small>${esc(item.description)}</small>` : ""}
            </a>
          `
        )
        .join("")}
    `;
    setSearchPanelVisible(true);
  };

  const navigateToFirstSearchResult = () => {
    const first = currentSearchMatches[0];
    if (!first?.href || !isSafeHref(first.href)) return;
    window.location.href = first.href;
  };

  searchInput?.addEventListener("input", renderSearchResults);
  searchInput?.addEventListener("focus", renderSearchResults);
  searchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setSearchPanelVisible(false);
    searchInput.blur();
  });
  searchPanel?.addEventListener("click", (event) => {
    if (event.target.closest(".search-result")) setSearchPanelVisible(false);
  });
  document.addEventListener("click", (event) => {
    if (!searchForm || searchForm.contains(event.target)) return;
    setSearchPanelVisible(false);
  });
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults();
    navigateToFirstSearchResult();
  });

  const revealItems = root.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((element) => observer.observe(element));
  } else {
    revealItems.forEach((element) => element.classList.add("is-visible"));
  }
})();
