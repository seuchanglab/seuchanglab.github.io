window.homepageConfig = {
  site: {
    title: "常志勇课题组",
    description: "东南大学 机械工程学院 车厘子团队",
  },

  // 图片路径支持 png、jpg、jpeg、webp、gif 等常见格式。
  // 想换素材时，把图片放进 assets 文件夹，然后把这里的路径改成对应文件名即可。
  images: {
    heroBackground: "assets/hero-bg.png",
    logos: [
      { src: "assets/logo-1.png", alt: "东南大学 Logo" },
      { src: "assets/logo-2.png", alt: "东南大学机械工程学院 Logo" },
    ],
    sectionIcon: "assets/icon-flask.png",
  },

  group: {
    name: "常志勇课题组",
    organization: "东南大学 机械工程学院",
    team: "车厘子团队",
  },

  nav: [
    { label: "首页", href: "index.html" },
    { label: "学术科研", href: "academic.html" },
    { label: "研究成员", href: "members.html" },
    { label: "研究平台", href: "platform.html" },
    { label: "研究成果", href: "achievements.html" },
    { label: "学习生活", href: "life.html" },
    { label: "招生招聘", href: "recruit.html" },
  ],

  intro: {
    title: "课题组简介",
    moreLabel: "MORE>>",
    moreHref: "academic.html",
    bodyHtml:
      "本团队面向<strong class='mark-blue'>深海深地能源资源开发与智能装备</strong>的国家战略需求，发展<strong class='mark-blue'>深海油气仿生传感与随钻气测仪器</strong>关键技术；设计和构建<strong class='mark-blue'>钻探机器人、井下传感器与智能探测装备</strong>等特种装备系统；发展<strong class='mark-blue'>复杂环境多物理参量同步感知与精准控制技术</strong>，深刻揭示深海深地钻探过程中装备感知、载荷传递与多参数耦合响应机制，为深海油气开发、极地探测和特深井安全高效钻进提供技术支撑。",
    recruitHtml:
      "欢迎具备<strong class='mark-red'>机械、电子、自动化、仪器、控制、人工智能、海洋工程、石油工程</strong>等不同专业背景的学生报考<strong class='mark-red'>硕士、博士研究生</strong>或<strong class='mark-red'>博士后研究</strong>。",
  },

  researchCards: [
    {
      title: "深海油气水下特种作业机器人",
      image: "assets/research-1.png",
      alt: "水下特种机器人与深海作业研究示意图",
      href: "academic.html#research-1",
      tags: ["水下机器人", "仿生感知"],
    },
    {
      title: "水下传感芯片与仿生感知",
      image: "assets/research-2.png",
      alt: "水下传感芯片与仿生感知研究示意图",
      href: "academic.html#research-2",
      tags: ["传感芯片", "深海油气"],
    },
    {
      title: "仿生嗅觉导航机器人",
      image: "assets/research-3.png",
      alt: "仿生嗅觉导航机器人研究示意图",
      href: "academic.html#research-3",
      tags: ["嗅觉导航", "多传感融合"],
    },
    {
      title: "人机增强与数字孪生",
      image: "assets/research-4.png",
      alt: "脑机接口与数字孪生研究示意图",
      href: "academic.html#research-4",
      tags: ["脑机接口", "数字孪生"],
    },
    {
      title: "高精度气体特异传感阵列",
      image: "assets/research-1.png",
      alt: "气体特异传感阵列研究示意图",
      href: "academic.html#research-5",
      tags: ["气体传感", "阵列芯片"],
    },
    {
      title: "红外激光传感器与仿生电子鼻",
      image: "assets/research-2.png",
      alt: "红外激光传感器与仿生电子鼻研究示意图",
      href: "academic.html#research-6",
      tags: ["红外激光", "电子鼻"],
    },
    {
      title: "复杂条件气体采样与灵敏探测",
      image: "assets/research-3.png",
      alt: "复杂条件气体采样与探测研究示意图",
      href: "academic.html#research-7",
      tags: ["深空深海深地", "灵敏探测"],
    },
    {
      title: "多组分低浓度气体随钻探测",
      image: "assets/research-4.png",
      alt: "随钻气体采样与多组分检测研究示意图",
      href: "academic.html#research-8",
      tags: ["随钻气测", "环境调控"],
    },
  ],

  updates: [
    { date: "2024-2027", text: "承担深地国家科技重大专项专题，面向特深井底钻压精准控制关键理论与技术。" },
    { date: "2023-2027", text: "承担国家重点研发计划“深海和极地关键技术与装备”专项课题。" },
    { date: "2023-2026", text: "承担国家自然科学基金联合重点项目，围绕高温高压高湿多相流体中微量硫化氢气液分离和敏感机理开展研究。" },
  ],

  pages: {
    academic: {
      title: "学术科研",
      kicker: "Research",
      summary:
        "团队围绕深海油气仿生传感与钻探机器人、随钻气测仪器与智能探测装备开展研究，形成从仿生感知、关键传感器、机器人系统到复杂环境验证的连续研究链条。",
      coverImage: "assets/page-academic.png",
      sections: [
        {
          title: "深海油气水下特种作业机器人",
          body:
            "面向深海油气开发和水下作业场景，开展水下传感芯片与仿生感知、水下特种机器人创新设计、人机交互、仿生控制方法与集群协同作业研究。",
          bullets: ["水下传感芯片", "仿生感知", "特种机器人设计", "集群协同作业"],
        },
        {
          title: "仿生嗅觉导航机器人",
          body:
            "围绕复杂环境中的气味源搜索、机器人自主导航和多源信息融合，发展特种机器人多传感仿生融合导航、仿生类脑嗅觉感知导航系统，以及脑机接口驱动的人机增强与数字孪生方法。",
          bullets: ["嗅觉感知", "多传感融合", "类脑导航", "数字孪生"],
        },
        {
          title: "高精度气体特异传感阵列",
          body:
            "面向深海、深地和极地等复杂环境中的痕量气体检测需求，开展气敏电阻式传感芯片、红外激光传感器和仿生电子鼻等高精度气体特异传感阵列研究。",
          bullets: ["气敏电阻芯片", "红外激光传感", "仿生电子鼻", "阵列化检测"],
        },
        {
          title: "复杂条件气体采样与灵敏探测",
          body:
            "围绕深空、深海、深地、极地等特殊环境，发展多组分低浓度气体随钻采样与探测技术，并拓展到座舱气相环境仿生智能调控等应用场景。",
          bullets: ["随钻采样", "痕量气体", "深海深地极地", "座舱环境调控"],
        },
      ],
    },

    members: {
      title: "研究成员",
      kicker: "People",
      summary:
        "成员页面按院士顾问、课题组教师和博士后分组展示。照片、姓名、个人主页和研究方向都可以在配置中直接替换。",
      coverImage: "assets/page-members.png",
      groups: [
        {
          title: "院士顾问",
          people: [
            {
              name: "孙友宏",
              role: "中国工程院院士 / 常志勇教授导师",
              image: "assets/member-1.png",
              href: "https://www.seu.edu.cn/2025/0224/c28449a519266/page.htm",
              desc: "东南大学校长、教授、博士生导师，中国工程院院士；长期致力于深地、深海、极地和国家潜在油气资源等领域研究。",
              tags: ["院士", "导师", "深地深海极地"],
            },
          ],
        },
        {
          title: "课题组教师",
          people: [
            {
              name: "常志勇",
              role: "教授 / 博士生导师",
              image: "assets/member-2.png",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "长期从事深海油气仿生传感与钻探机器人、随钻气测仪器与智能探测装备研究。",
              tags: ["课题组负责人", "深海深地", "钻探机器人"],
            },
            {
              name: "翁小辉",
              role: "教师",
              image: "assets/member-3.png",
              href: "https://me.seu.edu.cn/wxh/list.htm",
              desc: "东南大学机械工程学院教师，可围绕团队的仿生传感、智能探测装备和工程实验方向补充具体承担任务。",
              tags: ["教师", "仿生传感", "智能探测"],
            },
            {
              name: "张涛",
              role: "教师",
              image: "assets/member-4.png",
              href: "https://ins.seu.edu.cn/zt/list.htm",
              desc: "相关主页链接已预留，可在配置中补充其在导航、控制、传感或跨学院合作方向中的具体分工。",
              tags: ["教师", "导航控制", "协同研究"],
            },
          ],
        },
        {
          title: "博士后",
          people: [
            {
              name: "靳宏杨",
              role: "博士后",
              image: "assets/member-5.png",
              href: "https://me.seu.edu.cn/jhy/list.htm",
              desc: "东南大学机械工程学院博士后，参与随钻气测、仿生感知、智能探测装备等方向研究。",
              tags: ["博士后", "随钻气测", "智能探测"],
            },
          ],
        },
      ],
    },

    platform: {
      title: "研究平台",
      kicker: "Facilities",
      summary:
        "研究平台用于承载水下特种机器人、气体传感阵列、随钻气体采样与复杂环境探测等方向的样机研制、标定测试和工程验证。",
      coverImage: "assets/page-platform.png",
      items: [
        {
          title: "水下特种作业机器人平台",
          image: "assets/platform-1.png",
          href: "#platform-1",
          desc: "用于水下机器人结构设计、仿生控制、人机交互和集群协同作业方法验证。",
          specs: ["水下仿生感知", "特种机器人", "集群协同"],
        },
        {
          title: "气体特异传感阵列平台",
          image: "assets/platform-2.png",
          href: "#platform-2",
          desc: "用于气敏电阻式传感芯片、红外激光传感器和仿生电子鼻的标定、阵列集成与多组分识别。",
          specs: ["气敏芯片", "红外激光", "仿生电子鼻"],
        },
        {
          title: "复杂条件气体采样与随钻探测平台",
          image: "assets/platform-3.png",
          href: "#platform-3",
          desc: "用于深空、深海、深地、极地等复杂条件下的气体采样、低浓度组分探测和随钻气测技术验证。",
          specs: ["随钻采样", "痕量气体", "复杂环境"],
        },
      ],
    },

    achievements: {
      title: "研究成果",
      kicker: "Achievements",
      summary:
        "本页展示公开资料中可以核验的论文概况、代表性授权专利和近三年代表性科研项目。具体论文题名可在获得正式清单后继续追加。",
      coverImage: "assets/page-achievements.png",
      groups: [
        {
          title: "代表性论文与学术影响",
          type: "论文",
          records: [
            {
              year: "2023",
              title: "Development of an electronic nose to characterize water quality parameters and odor concentration of wastewater emitted from different phases in a wastewater treatment plant",
              href: "https://bionic.jlu.edu.cn/info/1012/1557.htm",
              desc: "Water Research, 2023, 235:119878；作者包括 Bingyang Wang、Xiaodan Li、Donghui Chen、Xiaohui Weng、Zhiyong Chang。",
              tags: ["Water Research", "电子鼻"],
            },
            {
              year: "2022",
              title: "Diverse scenarios selective perception of H2S via cobalt sensitized MOF filter membrane coated Three-Dimensional metal oxide sensor",
              href: "https://bionic.jlu.edu.cn/info/1012/1557.htm",
              desc: "Chemical Engineering Journal, 2022, 450:138014；面向 H2S 选择性感知与三维金属氧化物传感器。",
              tags: ["CEJ", "H2S 传感"],
            },
            {
              year: "累计",
              title: "第一或通讯作者发表 SCI/EI 检索论文 85 篇",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "东南大学机械工程学院主页显示，常志勇教授以第一或通讯作者发表 SCI/EI 检索论文 85 篇。",
              tags: ["论文", "SCI/EI"],
            },
            {
              year: "期刊",
              title: "《Journal of Bionic Engineering》期刊副主编",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "公开主页显示常志勇教授担任《Journal of Bionic Engineering》期刊副主编，体现团队在仿生工程方向的学术影响。",
              tags: ["学术兼职", "仿生工程"],
            },
            {
              year: "方向",
              title: "高精度气体特异传感阵列与仿生电子鼻",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "可用于归纳气敏电阻式传感芯片、红外激光传感器、仿生电子鼻等方向的代表性论文。",
              tags: ["气体传感", "电子鼻"],
            },
            {
              year: "评审",
              title: "审稿期刊覆盖 Nature Communications 等",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "公开主页列出 Nature Communications、Sensors and Actuators B: Chemical、Chemical Engineering Journal、Journal of Bionic Engineering 等审稿期刊。",
              tags: ["期刊评审", "学术服务"],
            },
          ],
        },
        {
          title: "授权专利",
          type: "专利",
          records: [
            {
              year: "2025",
              title: "一种随钻原位南极冰层痕量气体富集的监测装置和方法",
              href: "#patent-2025-1",
              desc: "授权日期：2025.11.04；专利号：ZL202411457168.5；发明人包括常志勇、陈子豪、孙友宏、靳宏杨等。",
              tags: ["专利", "痕量气体"],
            },
            {
              year: "2025",
              title: "一种随钻原位土壤有机污染检测装置和检测方法",
              href: "#patent-2025-2",
              desc: "授权日期：2025.09.19；专利号：ZL202310232183.9；发明人包括常志勇、孙友宏、靳宏杨、孔铖等。",
              tags: ["专利", "原位检测"],
            },
            {
              year: "2024",
              title: "仿生鱼嗅囊结构的录井脱气器",
              href: "#patent-2024-1",
              desc: "授权日期：2024.01.09；专利号：ZL201710013739.X；面向录井脱气与仿生结构设计。",
              tags: ["专利", "仿生脱气"],
            },
            {
              year: "2024",
              title: "一种油田采出水水质重金属检测装置",
              href: "#patent-2024-2",
              desc: "授权日期：2024.01.30；专利号：ZL201810052007.6；面向油田采出水水质重金属检测。",
              tags: ["专利", "水质检测"],
            },
            {
              year: "2018",
              title: "仿生井下烃类气体随钻检测装置",
              href: "#patent-2024-3",
              desc: "授权日期：2018.10.02；专利号：ZL201510906090.5；面向井下烃类气体随钻检测。",
              tags: ["专利", "随钻检测"],
            },
          ],
        },
        {
          title: "科研项目",
          type: "项目",
          records: [
            {
              year: "2024-2027",
              title: "深地国家科技重大专项“特深井底钻压精准控制”专题",
              href: "#project-2024-1",
              desc: "近三年代表性科研项目；公开主页列示经费 341 万元，常志勇教授为负责人。",
              tags: ["项目", "深地钻探"],
            },
            {
              year: "2023-2027",
              title: "国家重点研发计划“深海和极地关键技术与装备”专项课题",
              href: "#project-2023-1",
              desc: "近三年代表性科研项目；公开主页列示经费 875 万元，常志勇教授为负责人。",
              tags: ["项目", "深海极地"],
            },
            {
              year: "2023-2026",
              title: "国家自然科学基金联合重点项目",
              href: "#project-2023-2",
              desc: "近三年代表性科研项目；公开主页列示经费 306 万元，常志勇教授为负责人。",
              tags: ["项目", "自然科学基金"],
            },
          ],
        },
        {
          title: "获奖与转化",
          type: "成果",
          records: [
            {
              year: "2024",
              title: "中国商业联合会技术发明奖一等奖",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "常志勇教授公开主页列示获中国商业联合会技术发明奖一等奖，排名第 1。",
              tags: ["奖励", "一等奖"],
            },
            {
              year: "2023",
              title: "吉林省科学技术进步奖一等奖",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "常志勇教授公开主页列示获吉林省科学技术进步奖一等奖，排名第 1。",
              tags: ["奖励", "一等奖"],
            },
            {
              year: "应用",
              title: "相关技术在中国石油吉林油田、中国一汽等单位转化应用",
              href: "https://me.seu.edu.cn/czy/list.htm",
              desc: "公开主页提到相关技术服务东北振兴，并在中国石油吉林油田、中国一汽等单位转化应用。",
              tags: ["成果转化", "工程应用"],
            },
          ],
        },
      ],
    },

    life: {
      title: "学习生活",
      kicker: "Life",
      summary:
        "用于展示组会、实验、团建、学术交流和毕业合影，让页面既有科研氛围，也有团队温度。",
      coverImage: "assets/page-life.png",
      photos: [
        { title: "组会交流", image: "assets/life-1.png", href: "#life-1", desc: "每周讨论研究进展，及时梳理问题和下一步计划。" },
        { title: "实验现场", image: "assets/life-2.png", href: "#life-2", desc: "结合真实实验平台开展样机测试和数据分析。" },
        { title: "学术交流", image: "assets/life-3.png", href: "#life-3", desc: "参与会议、报告和合作交流，拓展研究视野。" },
        { title: "团队活动", image: "assets/life-4.png", href: "#life-4", desc: "记录团队生活和成长瞬间。" },
      ],
    },

    recruit: {
      title: "招生招聘",
      kicker: "Join Us",
      summary:
        "常志勇老师主页显示课题组每年招收 3-5 名硕博士研究生，欢迎本科生依托课题组开展深海、极地特种传感与机器人相关项目研究，并长期招聘博士后。",
      coverImage: "assets/page-recruit.png",
      positions: [
        {
          title: "硕士研究生",
          href: "#master",
          desc: "欢迎对深海油气仿生传感、随钻气测仪器、智能探测装备和机器人系统感兴趣的同学报考。",
          tags: ["硕士", "深海深地", "智能装备"],
        },
        {
          title: "博士研究生",
          href: "#phd",
          desc: "适合具备机械、电子、自动化、仪器、控制、人工智能、海洋工程、石油工程等背景的同学。",
          tags: ["博士", "交叉背景", "项目攻关"],
        },
        {
          title: "博士后 / 科研助理",
          href: "#postdoc",
          desc: "聚焦国家重大战略需求，欢迎有科研理想、创新探索能力和工程攻关兴趣的博士加入。",
          tags: ["博士后", "长期招聘", "工程转化"],
        },
      ],
      contact:
        "请将个人简历、研究兴趣和代表性成果发送至 zhiyongchang@seu.edu.cn，邮件标题建议为“姓名-申请方向-学历阶段”。",
    },
  },

  footer: {
    address: "江苏省南京市 东南大学",
    email: "zhiyongchang@seu.edu.cn",
  },
};
