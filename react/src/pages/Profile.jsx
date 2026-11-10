import cvPublication from '../data/generated/cv.js'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const copy = {
  zh: {
    name: '钱誉文 / Ewan Qian',
    roles: '媒体艺术家 / 实时视听 / 空间影像与交互',
    intro: '钱誉文（Ewan Qian）是一位常驻上海的媒体艺术家，VIRTURA 发起人。创作围绕实时视听、空间影像与交互系统展开，将声音、扫描数据、程序化图像与现场控制组织为空间体验。实践涵盖音乐现场、环形与异形屏幕、沉浸式影像及 XR 原型，并通过作品、工作坊和写作持续发展创作方法。',
    facts: [
      ['常驻', '上海'],
      ['方向', '实时视听 / 空间影像 / 交互演出'],
      ['实践', '个人创作 / VIRTURA'],
      ['工具', 'Blender / WebGL / Max/MSP / Ableton / XR']
    ],
    nav: [['创作', 'practice'], ['陈述', 'longread'], ['作品', 'works'], ['方法', 'method'], ['履历', 'cv'], ['合作', 'network'], ['图像', 'images']],
    sections: [
      {
        id: '创作', anchor: 'practice', title: '以声音、图像与空间共同组织现场',
        body: [
          '他的现场视觉从声音的时间结构出发，通过节奏、亮度、密度与运动建立图像的段落。屏幕比例、灯光、材质和观众的位置共同参与作品，使影像从平面画面延伸为身体可以感知的空间。',
          '近期实践围绕 BPM System 2026、空间手部输入与可表演音乐展开，研究声音、视觉与演奏控制之间的共享结构。XR 输入和可表演音乐持续以实验与原型的形式发展。'
        ]
      },
      {
        id: 'VIRTURA', anchor: 'virtura', title: '跨越作品创作与空间制作',
        body: ['作为 VIRTURA 发起人，钱誉文参与团队的创意发起、视觉系统设计、空间影像制作与现场演出。工作贯穿概念、程序化场景、制作预演和现场控制，并将具体项目中的方法延伸至教学与研究。']
      },
      {
        id: '空间影像', anchor: 'memory', title: '将扫描与数字场景转化为创作材料',
        body: ['水流、植物、雾气、光线、扫描痕迹与点云构成其持续使用的视觉材料。通过采集、重建和程序化组织，现实空间的片段被转译为可以观看、进入与重新演奏的数字场景。']
      }
    ],
    longTitle: '声音、自然记忆与现场判断',
    longIntro: '声音建立时间，图像塑造尺度，现场决定两者如何被感知。',
    longReads: [
      {
        title: '从声音进入图像',
        body: [
          '低频的重量、高频的边缘和停顿中的黑场，成为视觉构成的起点。声音可以驱动画面，也可以与图像保持延迟、对照和各自的速度。同步不是唯一关系，视觉同样能够制造听觉上的期待。',
          '可演奏的视觉系统因此包含自动响应与人的判断：何时改变参数，何时保留画面的运动，何时用一个停顿重组现场的注意力。'
        ]
      },
      {
        title: '从自然记忆到数字场景',
        body: [
          '在 TIMER、Drop Flow 与相关空间影像中，水滴、沙粒、植物、点云和扫描残影，让自然以材料、运动与光的方式重新出现。数字场景既承载被记录的空间，也允许这些记忆在新的声音和场地中重新组合。',
          '扫描数据成为可编辑的图像材料，声音成为场景控制的一部分，屏幕则从矩形画面扩展为观众能够靠近和重新观看的空间。'
        ]
      },
      {
        title: '从工具到现场判断',
        body: [
          'Blender 的时间线、音频曲线、几何节点、点云、灯光与镜头构成主要的程序化制作环境；WebGL、Max/MSP、Ableton 与 XR 则连接实时交互和演奏控制。',
          'AI 参与资料研究、工具开发、参数实验与影像制作。工具最终服务于具体的艺术判断：图像如何变化，声音如何参与，观众如何在空间中经历作品。'
        ]
      }
    ],
    worksTitle: '作品与现场实践',
    works: [
      { title: 'TIMER / 控时者', meta: '时间粒子 / 点云 / 环绕屏幕', body: '围绕时间、节拍与图像结构展开，以音频曲线、点云粒子、灯光和环绕屏幕构成视听关系。', to: '/works/timer' },
      { title: 'Drop Flow / 滴流', meta: '数字自然 / 空间影像 / 音画现场', body: '从“一滴水生成一座花园”的意象出发，将声音、扫描数据、点云与数字植物组织为不断展开的空间场景。', to: '/works/drop-flow' },
      { title: 'KASHIWA Daisuke / TITAN', meta: '音乐现场 / 视觉系统', body: '围绕 KASHIWA Daisuke 的音乐现场开展视觉制作，探索节奏、图像密度与屏幕空间之间的关系。', to: '/projects/kashiwa-titan' },
      { title: '余佳运 45㎡', meta: '演唱会视觉 / 多屏制作', body: '演唱会 opening、部分曲目环绕屏幕与地屏内容制作，以及 Blender 场景预演。', to: '/projects/yujiayun-45m2' },
      { title: 'Rain / Singland Festival', meta: '舞台视觉 / 新加坡', body: '参与 Fortune Art Production 为 Rain《It’s Raining》remix version 制作的舞台大屏幕视觉。', to: '/projects/rain-singapore' },
      { title: 'Gaussian Spatial Archive / 高斯空间档案', meta: '空间采集 / 3DGS / 网页场景', body: '围绕高斯重建、空间保存与网页浏览展开的持续实践，将采集的场景转化为可访问的数字空间。', to: '/gaussian-scenes' }
    ],
    methodTitle: '从材料到可运行的系统',
    methods: [
      '以声音、扫描数据和程序化几何建立视觉材料，连接时间线、节点、灯光与镜头。',
      '通过实时参数、手动控制与空间输入组织演奏，研究声音和图像共享的结构。',
      '在制作阶段进行屏幕适配、空间预演与播控测试，将现场条件纳入创作。',
      '通过写作、工作坊与可复用工具整理实践，使项目经验能够继续发展。'
    ],
    collaborationTitle: '音乐现场与跨学科创作',
    collaboration: ['实践中的声音与视觉交流包括徐昊、KASHIWA Daisuke、RÖ、Shukai / Mark，以及不同演出和展览中的创作团队。电子音乐、实验声音、钢琴与电子乐和流行音乐现场，持续拓展其视觉系统在节奏、材质与空间上的表达。'],
    imageTitle: '肖像与现场',
    imageIntro: '个人肖像、现场工作与公开分享。',
    ctaWorks: '查看作品', ctaCV: '履历与 PDF', ctaWriting: '写作与研究', ctaOpen: '查看项目',
    cvTitle: '履历与入选记录', cvIntro: '完整展览、演出、教学与制作经历，以及中英文 PDF，集中收录于履历页面。',
    apps: '应用与交互实验', workshops: '工作坊', production: '制作项目', team: 'VIRTURA 团队'
  },
  en: {
    name: 'Ewan Qian / 钱誉文',
    roles: 'Media Artist / Realtime Audiovisual / Spatial Image & Interaction',
    intro: 'Ewan Qian is a Shanghai-based media artist and the initiator of VIRTURA. His practice brings sound, scanned data, procedural imagery and live control into spatial experiences. Working across music performance, circular and custom-format screens, immersive moving image and XR prototypes, he develops his methods through artworks, workshops and writing.',
    facts: [
      ['Base', 'Shanghai'],
      ['Focus', 'Realtime audiovisual / spatial image / interactive performance'],
      ['Practice', 'Independent practice / VIRTURA'],
      ['Tools', 'Blender / WebGL / Max/MSP / Ableton / XR']
    ],
    nav: [['Practice', 'practice'], ['Statement', 'longread'], ['Works', 'works'], ['Method', 'method'], ['CV', 'cv'], ['Collaboration', 'network'], ['Images', 'images']],
    sections: [
      {
        id: 'Practice', anchor: 'practice', title: 'Composing live space through sound and image',
        body: [
          'His live visuals begin with the temporal structure of sound, using rhythm, brightness, density and movement to form visual phrases. Screen geometry, lighting, material and the audience’s position shape the work, extending moving image into bodily experience.',
          'Recent practice centres on BPM System 2026, spatial hand input and performable music, exploring shared structures between sound, visuals and performance control. XR input and performable music continue as experiments and prototypes.'
        ]
      },
      {
        id: 'VIRTURA', anchor: 'virtura', title: 'Between artistic practice and spatial production',
        body: ['As the initiator of VIRTURA, Qian works on concepts, visual-system design, spatial imagery and live performance. His practice connects procedural scenes, production previews and live control, extending project-based methods into teaching and research.']
      },
      {
        id: 'Spatial Image', anchor: 'memory', title: 'Working with scans and digital scenes',
        body: ['Water, plants, mist, light, scan traces and point clouds form a recurring material vocabulary. Through capture, reconstruction and procedural composition, fragments of physical places become digital scenes that can be viewed, entered and performed again.']
      }
    ],
    longTitle: 'Sound, natural memory and live judgement',
    longIntro: 'Sound establishes time, the image shapes scale, and the site determines how they are experienced.',
    longReads: [
      {
        title: 'Entering the image through sound',
        body: [
          'The weight of low frequencies, the edge of high frequencies and darkness within a pause become starting points for visual composition. Sound may drive an image or coexist with its own pace, delay and counterpoint. Synchronisation is one possible relationship; the image can also create anticipation for the ear.',
          'A playable visual system combines automatic response with live judgement: when to change a parameter, when to sustain movement, and when a pause can redirect attention.'
        ]
      },
      {
        title: 'From natural memory to digital scenes',
        body: [
          'In TIMER, Drop Flow and related spatial-image work, drops, grains, plants, point clouds and scan residues allow nature to reappear as material, movement and light. A digital scene holds the memory of a recorded place while allowing it to be recomposed through new sounds and sites.',
          'Scan data becomes editable image material, sound becomes part of scene control, and the screen extends beyond a rectangle into a space that can be approached and revisited.'
        ]
      },
      {
        title: 'From tools to live judgement',
        body: [
          'Blender’s timeline, audio curves, geometry nodes, point clouds, lighting and cameras form a procedural production environment. WebGL, Max/MSP, Ableton and XR connect this work with realtime interaction and performance control.',
          'AI supports research, tool development, parameter experiments and image production. These tools serve concrete artistic decisions: how the image changes, how sound participates, and how an audience experiences the work in space.'
        ]
      }
    ],
    worksTitle: 'Works and live practice',
    works: [
      { title: 'TIMER', meta: 'Temporal particles / point clouds / surrounding screens', body: 'A work exploring time, rhythm and image structure through audio curves, point-cloud particles, lighting and surrounding screens.', to: '/works/timer' },
      { title: 'Drop Flow', meta: 'Digital nature / spatial image / audiovisual performance', body: 'Beginning with a garden emerging from a single drop of water, the work brings sound, scanned data, point clouds and digital vegetation into an unfolding spatial scene.', to: '/works/drop-flow' },
      { title: 'KASHIWA Daisuke / TITAN', meta: 'Live music / visual systems', body: 'Visual production for KASHIWA Daisuke’s live music, exploring relationships between rhythm, image density and screen space.', to: '/projects/kashiwa-titan' },
      { title: 'Yu Jiayun 45㎡', meta: 'Concert visuals / multi-screen production', body: 'Opening visuals, selected song material for surrounding and floor screens, and Blender scene previews for the concert production.', to: '/projects/yujiayun-45m2' },
      { title: 'Rain / Singland Festival', meta: 'Stage visuals / Singapore', body: 'Contributions to Fortune Art Production’s stage-screen visuals for Rain’s It’s Raining remix version.', to: '/projects/rain-singapore' },
      { title: 'Gaussian Spatial Archive', meta: 'Spatial capture / 3DGS / web scenes', body: 'An ongoing practice in Gaussian reconstruction, spatial preservation and web viewing, turning captured places into accessible digital scenes.', to: '/gaussian-scenes' }
    ],
    methodTitle: 'From material to a working system',
    methods: [
      'Build image materials from sound, scanned data and procedural geometry, connecting timelines, nodes, lighting and cameras.',
      'Compose performance through realtime parameters, manual control and spatial input, exploring structures shared by sound and image.',
      'Include screen adaptation, spatial previews and show-control tests within the creative process.',
      'Develop project experience through writing, workshops and reusable tools.'
    ],
    collaborationTitle: 'Live music and interdisciplinary practice',
    collaboration: ['Sound and visual exchanges include Hao Xu, KASHIWA Daisuke, RÖ, Shukai / Mark, and creative teams across performances and exhibitions. Electronic music, experimental sound, piano and electronics, and pop concerts continue to extend the rhythmic, material and spatial vocabulary of his visual systems.'],
    imageTitle: 'Portraits and live work', imageIntro: 'Portraits, live-working moments and public sharing.',
    ctaWorks: 'View works', ctaCV: 'CV & PDFs', ctaWriting: 'Writing & research', ctaOpen: 'View project',
    cvTitle: 'CV and recognition', cvIntro: 'The CV page brings together exhibitions, performances, teaching and production credits, with Chinese and English PDFs.',
    apps: 'Applications & interaction studies', workshops: 'Workshops', production: 'Production projects', team: 'VIRTURA team'
  }
}

const portraits = [
  ['ewan-portrait-formal.webp', 'Portrait', '个人肖像'],
  ['ewan-portrait-outdoor-woods.webp', 'Field portrait', '场域肖像'],
  ['ewan-strawberry-live.webp', 'Live visual work', '现场视觉工作'],
  ['ewan-ufo-sharing.webp', 'Public sharing', '公开分享'],
  ['ewan-portrait-main.webp', 'Process', '工作状态'],
  ['ewan-profile-board.webp', 'Profile record', '资料记录']
]

function Paragraphs({ items }) {
  return <>{items.map((item) => <p key={item}>{item}</p>)}</>
}

function Profile() {
  const { language } = useLanguage()
  const c = copy[language]
  const isZh = language === 'zh'
  const base = window.location.pathname.indexOf('/portfolio') === 0 ? '/portfolio' : ''
  const portraitUrl = (file) => `${base}/assets/profile/${file}`

  return (
    <>
      <Header />
      <main className="profile-editorial-page">
        <section className="profile-editorial-hero">
          <div className="container profile-editorial-grid">
            <div className="profile-editorial-copy">
              <p className="eyebrow">{c.roles}</p>
              <h1>{c.name}</h1>
              <p>{c.intro}</p>
              <div className="hero-cta">
                <Link className="button primary" to="/works">{c.ctaWorks}</Link>
                <a className="button" href="/works/cv.html">{c.ctaCV}</a>
                <Link className="button" to="/writing">{c.ctaWriting}</Link>
              </div>
            </div>
            <figure className="profile-editorial-image">
              <img src={portraitUrl('ewan-portrait-formal.webp')} alt={c.name} />
            </figure>
          </div>
        </section>
        <section className="profile-editorial-body">
          <div className="container profile-body-grid">
            <aside className="profile-index">
              <div className="profile-facts">
                {c.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <nav aria-label={isZh ? '个人介绍章节' : 'Profile sections'}>
                {c.nav.map(([label, anchor]) => (
                  <Link to="/profile" state={{ scrollTo: `profile-${anchor}` }} key={anchor}>{label}</Link>
                ))}
              </nav>
            </aside>
            <div className="profile-essay">
              {c.sections.map((section) => (
                <section id={`profile-${section.anchor}`} key={section.anchor} className="profile-essay-section">
                  <span>{section.id}</span><h2>{section.title}</h2>
                  <div className="profile-paragraphs"><Paragraphs items={section.body} /></div>
                </section>
              ))}
              <section id="profile-longread" className="profile-essay-section profile-longread-section">
                <span>{isZh ? '艺术家陈述' : 'Artist statement'}</span>
                <h2>{c.longTitle}</h2><p>{c.longIntro}</p>
                <div className="profile-column-list">
                  {c.longReads.map((item) => <article key={item.title}><h3>{item.title}</h3><Paragraphs items={item.body} /></article>)}
                </div>
              </section>
              <section id="profile-works" className="profile-essay-section">
                <span>{isZh ? '作品' : 'Works'}</span><h2>{c.worksTitle}</h2>
                <div className="profile-work-list">
                  {c.works.map((work) => (
                    <article key={work.to}>
                      <small>{work.meta}</small><h3><Link to={work.to}>{work.title}</Link></h3>
                      <p>{work.body}</p><Link to={work.to}>{c.ctaOpen} ↗</Link>
                    </article>
                  ))}
                </div>
              </section>
              <section id="profile-method" className="profile-essay-section">
                <span>{isZh ? '方法' : 'Method'}</span><h2>{c.methodTitle}</h2>
                <ol className="profile-methods">{c.methods.map((method) => <li key={method}>{method}</li>)}</ol>
                <div className="hero-cta">
                  <Link className="button" to="/writing">{c.ctaWriting}</Link>
                  <Link className="button" to="/apps">{c.apps}</Link>
                  <Link className="button" to="/workshops">{c.workshops}</Link>
                </div>
              </section>
              <section id="profile-cv" className="profile-essay-section">
                <span>CV</span><h2>{c.cvTitle}</h2>
                <div className="profile-paragraphs">
                  <p>{c.cvIntro}</p>
                  {cvPublication.records.filter(record => record.section === 'awards').map(record => (
                    <p key={record.id}><a href={'/works/records/' + record.id + '.html'}>{record.year} · {isZh ? record.zh : record.en}</a></p>
                  ))}
                  <a className="button" href="/works/cv.html">{c.ctaCV} ↗</a>
                </div>
              </section>
              <section id="profile-network" className="profile-essay-section profile-network">
                <span>{isZh ? '合作' : 'Collaboration'}</span><h2>{c.collaborationTitle}</h2>
                <div className="profile-paragraphs"><Paragraphs items={c.collaboration} /></div>
                <div className="hero-cta">
                  <Link className="button" to="/production">{c.production}</Link>
                  <a className="button" href="https://virtura.space/#people" target="_blank" rel="noopener noreferrer">{c.team} ↗</a>
                </div>
              </section>
            </div>
          </div>
        </section>
        <section id="profile-images" className="section">
          <div className="container">
            <div className="section-heading-row">
              <div><div className="eyebrow">{isZh ? '图像' : 'Images'}</div><h2 className="section-title">{c.imageTitle}</h2></div>
              <p className="section-intro">{c.imageIntro}</p>
            </div>
            <div className="profile-photo-grid">
              {portraits.map(([file, title, titleZh], index) => (
                <article key={file} className={`profile-photo-card profile-photo-card-${index + 1}`}>
                  <img src={portraitUrl(file)} alt={isZh ? titleZh : title} loading="lazy" />
                  <div><span>{String(index + 1).padStart(2, '0')}</span><h3>{isZh ? titleZh : title}</h3></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile
