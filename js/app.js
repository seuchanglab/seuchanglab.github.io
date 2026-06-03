(function () {
  const config = window.homepageConfig;
  const root = document.getElementById("site-root");

  if (!config || !root) return;

  const pageByFile = {
    "": "home",
    "index.html": "home",
    "academic.html": "academic",
    "members.html": "members",
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

  const getHrefFile = (href) => {
    const file = String(href || "").split("#")[0].toLowerCase();
    return file || "index.html";
  };

  const tagsHtml = (tags = []) =>
    tags.map((tag) => `<span>${esc(tag)}</span>`).join("");

  const isExternalHref = (href) => /^https?:\/\//i.test(String(href || ""));

  const attrsForHref = (href) => {
    if (!href) return "";
    const target = isExternalHref(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
    return ` href="${esc(href)}"${target}`;
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
    <header class="site-hero ${pageKey === "home" ? "" : "site-hero-compact"}" id="home" style="--hero-bg:url('${esc(
      config.images?.heroBackground || ""
    )}')">
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
          <input type="search" placeholder="Search..." aria-label="站内搜索" />
          <button type="submit" aria-label="搜索">
            <span></span>
          </button>
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
    const tagList = tagsHtml(card.tags || []);
    const altHtml = card.alt ? `<span class="research-alt">${esc(card.alt)}</span>` : "";
    const tagListHtml = tagList ? `<span class="research-tags">${tagList}</span>` : "";
    const searchText = [card.title, card.alt, ...(card.tags || [])].join(" ");

    return `
      <a
        class="research-card reveal searchable-card is-clickable"
        ${attrsForHref(card.href)}
        data-search="${esc(searchText)}"
        style="--delay:${index * 70}ms"
      >
        <span class="research-image">
          <img src="${esc(card.image)}" alt="${esc(card.alt || card.title)}" />
        </span>
        <span class="research-copy">
          <span class="research-title">${esc(card.title)}</span>
          ${altHtml}
          ${tagListHtml}
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

  const renderHome = () => `
    <main>
      <section class="intro-section" id="research">
        <div class="section-heading">
          <div class="section-title">
            <img src="${esc(config.images?.sectionIcon)}" alt="" />
            <h2>${esc(config.intro?.title)}</h2>
          </div>
          <a class="more-link" href="${esc(config.intro?.moreHref)}">${esc(config.intro?.moreLabel)}</a>
        </div>

        ${renderCarousel(config.researchCards || [])}

        <div class="intro-copy reveal">
          <p>${config.intro?.bodyHtml || ""}</p>
          <p class="recruit-line" id="recruit">${config.intro?.recruitHtml || ""}</p>
        </div>
      </section>

      <section class="updates-section reveal" id="outputs">
        <div class="updates-copy">
          <h2>最新动态</h2>
          <p>这里可以放论文发表、项目进展、招生信息或组会通知。</p>
        </div>
        <ul class="updates-list">${updateHtml}</ul>
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
                      <div class="mini-tags">${tagsHtml(card.tags || [])}</div>
                    </div>
                  `,
                  ` data-search="${esc([card.title, card.alt, ...(card.tags || [])].join(" "))}"`
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
              (section) => `
                <article class="info-panel reveal searchable-card" data-search="${esc([
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
                          <div>
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
                  ` data-search="${esc([item.title, item.desc, ...(item.specs || [])].join(" "))}"`
                )}
              `
            )
            .join("")}
        </div>
      </section>
    </main>
  `;

  const renderAchievementRecord = (record, group) =>
    linkedCard(
      "article",
      "achievement-item reveal searchable-card",
      record.href,
      `
        <span class="achievement-year">${esc(record.year)}</span>
        <div>
          <span class="achievement-type">${esc(record.type || group.type)}</span>
          <h3>${esc(record.title)}</h3>
          <p>${esc(record.desc)}</p>
          <div class="mini-tags">${tagsHtml(record.tags || [])}</div>
        </div>
      `,
      ` data-search="${esc([
        record.year,
        record.type || group.type,
        group.title,
        record.title,
        record.desc,
        ...(record.tags || []),
      ].join(" "))}"`
    );

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
                  ` data-search="${esc([photo.title, photo.desc].join(" "))}"`
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
                  ` data-search="${esc([position.title, position.desc, ...(position.tags || [])].join(" "))}"`
                )}
              `
            )
            .join("")}
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
  const searchableItems = Array.from(root.querySelectorAll(".searchable-card"));

  const filterItems = () => {
    const query = searchInput?.value.trim().toLowerCase() || "";
    searchableItems.forEach((item) => {
      const text = item.dataset.search.toLowerCase();
      item.hidden = query.length > 0 && !text.includes(query);
    });
    carousels.forEach((carousel) => {
      normalizeCarouselScroll(carousel);
      updateCarouselButtons(carousel);
    });
  };

  searchInput?.addEventListener("input", filterItems);
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    filterItems();
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
