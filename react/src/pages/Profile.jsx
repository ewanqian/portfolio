import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const copy = {
  zh: {
    name: '钱誉文 / Ewan Qian',
    roles: '媒体艺术家 / 现场视觉创作者 / 独立制作人',
    intro:
      '钱誉文 / Ewan Qian 是媒体艺术家、现场视觉创作者与独立制作人，Virtura Collective 与 Virtura Spaceport 方向发起人之一。他的工作围绕现场音画、空间影像、程序化图像系统与数字场景展开，关注声音、图像、材质与空间气氛如何在现场形成清晰的演出结构。',
    facts: [
      ['Base', '上海'],
      ['Focus', '现场音画 / 空间影像 / 数字场景'],
      ['Studio', 'Virtura Collective / Virtura Spaceport'],
      ['Tools', 'Blender / Geometry Nodes / AI-assisted workflow']
    ],
    nav: [
      ['概览', 'practice'],
      ['长读', 'longread'],
      ['作品线', 'works'],
      ['方法', 'method'],
      ['合作', 'network'],
      ['图像', 'images']
    ],
    sections: [
      {
        id: '概览',
        anchor: 'practice',
        title: '现场音画、空间影像，以及一种正在形成的个人系统',
        body: [
          '他的创作让视觉进入音乐现场的结构。视觉承担段落、呼吸、冲击、停顿和空间尺度，也承担观众在现场如何看见、靠近、拍摄、转身和记住一段声音。',
          '图像在现场成为一套会被声音、灯光、材质和场地共同改变的系统。一个段落的成立，取决于节奏，也取决于亮度、密度、运动速度、屏幕比例、地屏与主屏关系，以及观众身体所处的位置。'
        ]
      },
      {
        id: 'Virtura',
        anchor: 'virtura',
        title: 'Virtura 是创作容器，也是团队协作和档案结构',
        body: [
          'Virtura 承载现场视觉、空间影像、音乐合作、数字场景实验与长期研究归档。它作为一个工作结构，组织团队、作品、现场、网页档案、工具实验和未来可能出现的演出系统。',
          '涉及团队作品时，钱誉文通常将其视为协作成果。他的角色集中在创作发起、视觉系统设计、空间影像制作、Blender 工作流搭建、现场视觉组织、项目叙事和方法整理。署名需要保留导演、视觉导演、音乐人、制作团队与现场条件之间的关系。'
        ]
      },
      {
        id: '记忆',
        anchor: 'memory',
        title: '自然记忆与数字场景',
        body: [
          '自然在他的作品中很少以完整风景的方式出现。它更多是水流、植物、雾气、颗粒、光线、地形、扫描痕迹、点云和高斯衍生材料。这些东西带着城市经验中的碎片感，也带着被保存、迁移、重组之后重新进入现场的可能。',
          '数字空间在这里成为一种记忆容器：把声音中的时间、自然中的质感、现场中的身体经验，以及制作过程中的数据结构，重新组织成一个可以被观看、演奏和归档的空间。'
        ]
      }
    ],
    longTitle: '一条仍在展开的工作线索',
    longIntro:
      '这一页保留更完整的个人叙事。它可以被当成专栏来读：前半部分说明工作如何形成，后半部分进入作品线、方法和合作网络。',
    longReads: [
      {
        title: '从声音进入图像',
        body: [
          '钱誉文的现场视觉从声音在现场如何占据空间开始。低频会改变身体的重量，高频会改变画面边缘的紧张感，停顿会让黑场、暗部和慢速运动变得重要。视觉在这里与声音共同建立现场时间。',
          '这也让他的工作避免落入简单的频谱可视化。声音可以驱动画面，但不必一直命令画面。某些段落需要同步，某些段落需要延迟，某些段落需要让图像暂时保留自己的速度。作者判断何时让音乐进入参数，何时让手动关键帧接管，何时让画面反过来制造听觉上的期待。',
          '因此，他更关心一种“可演奏的视觉系统”：图像作为一套可以被调度、预览、修改、交付，并在不同场地中重新适配的结构。'
        ]
      },
      {
        title: '从自然记忆到数字场景',
        body: [
          '在 TIMER、Drop Flow 和相关空间影像实践中，水滴、沙粒、植物、温室、扫描残影、点云和透明结构，构成一种被城市生活压缩后的自然记忆。作品让自然以材料、运动和光的方式重新出现。',
          'Drop Flow 从“一滴水生成一座花园”的意象出发，把声音、扫描数据、高斯衍生点云、数字植物、几何结构和屏幕光场组织成不断展开的空间。TIMER 则更早地把时间、节拍和点云粒子连接起来，使时间像沙粒一样围绕观众运动。',
          '这些作品共同推进一套方法：把声音转化为场景控制，把扫描和点云转化为可编辑的图像材料，把屏幕从矩形画面扩展成观众可以靠近和重新观看的空间。'
        ]
      },
      {
        title: '从工具到现场判断',
        body: [
          'Blender 在他的工作中成为一个综合性的音画创作环境。时间线、手动关键帧、音频曲线、Geometry Nodes、Simulation Zone、点云导入、材质控制、灯光、镜头和屏幕输出，被组织在同一个创作过程里。',
          'AI 也被放进这个工作结构中，参与资料整理、结构推演、工具设计、参数测试、文本归档和现场工作流优化。对他来说，AI 的价值包括图像生成，也包括帮助建立自己的工作系统。',
          '这种路径使他的实践介于动画、现场视觉、空间演出、数字档案和程序化场景之间。它既需要艺术判断，也需要制作交付；既要能进入音乐人的现场，也要能沉淀为网页、文档、工具和长期档案。'
        ]
      }
    ],
    worksTitle: '正在展开的作品与实践线',
    works: [
      {
        title: 'TIMER / 控时者',
        meta: '时间粒子 / 音频曲线 / 环绕屏幕',
        body:
          '早期关键作品线，围绕时间、节拍、频段和图像内部结构展开。它让音频曲线、点云粒子、灯光变化、手动关键帧和环绕屏幕在 Blender 工作流中形成稳定关系。'
      },
      {
        title: 'Drop Flow / 滴流',
        meta: '数字自然 / 高斯衍生点云 / 记忆场景',
        body:
          '持续发展的主线作品之一，从“一滴水生成一座花园”的意象出发，将声音、扫描数据、点云、数字植物、几何结构、流场和屏幕光线组织成持续展开的空间场景。'
      },
      {
        title: 'KASHIWA Daisuke / 柏大辅 合作线',
        meta: '现场视听 / 音乐人合作 / 屏幕幻觉',
        body:
          '围绕日本音乐人 KASHIWA Daisuke / 柏大辅的现场语境展开，将视觉系统放入更成熟的音乐现场。相关工作需要清晰保留导演、视觉导演、音乐人和制作团队的署名结构。'
      },
      {
        title: 'Yu Jiayun 45㎡ / 余佳运演唱会视觉制作',
        meta: '演唱会视觉 / opening / PGM 与地屏交付',
        body:
          '面向真实巡演语境的制作与工程交付线，包括 opening、部分曲目的 PGM 环绕屏幕、地屏内容和 Blender 预览。页面以 opening 和曲目状态为主线，使用经过筛选的视觉帧组织公开呈现。'
      },
      {
        title: 'Rain / Singland Festival Singapore',
        meta: '跨年晚会 / 大屏幕舞台视觉 / Fortune Art Production',
        body:
          'Fortune Art Production 为 Rain 郑智薰制作的 It’s Raining remix version 舞台大屏幕视觉，在新加坡 Singland Festival 跨年晚会语境中呈现。此线更适合展示成制作档案与精选视觉帧。'
      },
      {
        title: 'Gaussian Spatial Archive / 高斯空间档案',
        meta: '3DGS / 空间保存 / 网页档案',
        body:
          '围绕高斯重建、空间保存、网页浏览和个人场景档案展开。它连接影像制作、空间扫描和作品集系统，也为 VIRTURA Spaceport 提供更长期的公共档案方向。'
      }
    ],
    methodTitle: '方法与工具',
    methods: [
      '把 Blender 作为音画系统使用：时间线、音频曲线、节点、灯光、材质、镜头和最终输出共同工作。',
      '把声音作为控制材料：它可以影响点云运动、材质亮度、流场强度、粒子密度、闪烁和转场。',
      '把现场交付看作创作的一部分：屏幕比例、PGM、地屏、cue、预览文件和授权边界都会影响最终页面如何呈现。',
      '把 AI 放在工作流内部：辅助归档、分析、工具设计、参数测试和文本整理，服务创作判断。'
    ],
    collaborationTitle: '合作与声音网络',
    collaboration: [
      '近期合作与研究语境包括徐昊、KASHIWA Daisuke / 柏大辅、RÖ、Shukai / Mark，以及演唱会和晚会制作中的视觉导演、导演、制作团队。不同声音实践持续测试其视觉系统在节奏、密度、材质和空间组织上的适应能力。',
      '这些合作构成不同现场条件对视觉系统的测试。电子音乐、实验声音、钢琴与电子乐、流行演唱会、商业晚会和机构展演，都要求视觉在审美、技术和交付边界之间不断调整。'
    ],
    imageTitle: '肖像与现场图像',
    imageIntro: '个人肖像、现场工作、公开分享与空间化影像状态。',
    ctaWorks: '作品',
    ctaProduction: '制作'
  },
  en: {
    name: 'Ewan Qian / 钱誉文',
    roles: 'Media Artist / Live Visual Creator / Independent Producer',
    intro:
      'Ewan Qian’s practice begins with live audiovisual work and extends into spatial images, procedural image systems, digital scenes, production workflows, and long-term archives. He is less interested in whether an image is simply striking than in how sound, image, material, time, light, and bodily perception form a structure in a live environment.',
    facts: [
      ['Base', 'Shanghai'],
      ['Focus', 'Live visuals / spatial image / digital scenes'],
      ['Studio', 'Virtura Collective / Virtura Spaceport'],
      ['Tools', 'Blender / Geometry Nodes / AI-assisted workflow']
    ],
    nav: [
      ['Overview', 'practice'],
      ['Long Read', 'longread'],
      ['Lines', 'works'],
      ['Method', 'method'],
      ['Network', 'network'],
      ['Images', 'images']
    ],
    sections: [
      {
        id: 'Overview',
        anchor: 'practice',
        title: 'Live audiovisual work, spatial images, and an evolving personal system',
        body: [
          'Qian treats visuals as part of the performance structure. The image carries sections, breath, pressure, pause, and spatial scale. It also shapes how an audience sees, approaches, records, turns, and remembers a piece of sound.',
          'The image behaves like a live system affected by sound, light, material, and site. A section works through rhythm, brightness, density, movement, screen ratio, floor LED relationships, and the viewer’s physical position.'
        ]
      },
      {
        id: 'Virtura',
        anchor: 'virtura',
        title: 'Virtura as a container for collaboration, tools, and archives',
        body: [
          'Virtura holds live visual practice, spatial image work, music collaboration, digital-scene experiments, and long-term research archives. It works as a structure for organizing teams, works, live contexts, web archives, tool experiments, and future performance systems.',
          'In collective works, Qian usually frames the result as collaboration. His role often centers on initiating concepts, designing visual systems, producing spatial images, building Blender workflows, organizing live visuals, writing project narratives, and documenting methods.'
        ]
      },
      {
        id: 'Memory',
        anchor: 'memory',
        title: 'Nature as memory material',
        body: [
          'Nature rarely appears in his work as a complete landscape. It arrives through water, plants, mist, particles, light, terrain, scan traces, point clouds, and Gaussian-derived material. These elements carry fragments of urban experience and the possibility of being preserved, displaced, and re-entered in performance.',
          'Digital space therefore becomes more than virtual modeling or screen content. It can function as a memory container: reorganizing sonic time, natural texture, bodily experience, and production data into a space that can be watched, played, and archived.'
        ]
      }
    ],
    longTitle: 'An Ongoing Working Line',
    longIntro:
      'This page keeps a fuller personal narrative in an editorial structure: practice position first, then work lines, methods, and collaboration.',
    longReads: [
      {
        title: 'Entering the image through sound',
        body: [
          'Qian’s live visual work begins with how sound occupies a space. Low frequencies change bodily weight; high frequencies sharpen the edge of an image; pauses make darkness, slow movement, and near-stillness important. Visuals become material for building live time with sound.',
          'Sound may drive the image while still leaving room for delay, resistance, and image-led pacing. Some sections require synchronization, some require delay, and some require the image to keep its own speed. The author decides when music enters the parameters, when manual keyframes take over, and when the image creates expectation for the ear.',
          'The result is a playable visual system: a structure that can be directed, previewed, revised, delivered, and adapted across sites.'
        ]
      },
      {
        title: 'From natural memory to digital scenes',
        body: [
          'In TIMER, Drop Flow, and related spatial-image works, drops, grains, plants, greenhouses, scan residues, point clouds, and transparent structures form a kind of natural memory compressed by urban life. Nature returns as material, movement, and light.',
          'Drop Flow begins with the image of a garden emerging from a single drop of water, organizing sound, scanned data, Gaussian-derived point clouds, digital vegetation, geometry, and screen light into an unfolding space. TIMER earlier connected time, rhythm, and point-cloud particles, letting time move around the audience like grains of sand.',
          'Together these works develop a method: sound becomes scene control, scan data becomes editable image material, and the screen expands from a rectangle into a space that can be approached and rewatched.'
        ]
      },
      {
        title: 'From tools to live judgment',
        body: [
          'Blender is used less as animation software than as an integrated audiovisual authoring environment. Timeline editing, manual keyframes, audio F-curves, Geometry Nodes, Simulation Zone, point-cloud import, material control, lighting, cameras, and screen output are organized in the same creative process.',
          'AI enters this structure as support for research organization, structural reasoning, tool design, parameter testing, text archiving, and live-workflow optimization. Its value includes image generation and the construction of a personal working system.',
          'This places Qian’s practice between animation, live visuals, spatial performance, digital archives, and procedural scenes. It requires artistic judgment and production delivery at the same time.'
        ]
      }
    ],
    worksTitle: 'Work and Practice Lines in Progress',
    works: [
      {
        title: 'TIMER',
        meta: 'Temporal particles / audio F-curves / surrounding screens',
        body:
          'An early key work line around time, rhythm, frequency, and internal image structure. It established a relationship between audio curves, point-cloud particles, lighting shifts, manual keyframes, and surrounding screens inside the Blender workflow.'
      },
      {
        title: 'Drop Flow',
        meta: 'Digital nature / Gaussian-derived point clouds / memory-scene',
        body:
          'A current core work line beginning with the image of a garden emerging from a single drop of water, organizing sound, scan data, point clouds, digital vegetation, geometry, flow fields, and screen light into an evolving spatial scene.'
      },
      {
        title: 'KASHIWA Daisuke Collaboration Line',
        meta: 'Live audiovisual work / musician collaboration / screen illusion',
        body:
          'A live-context collaboration around Japanese musician KASHIWA Daisuke, placing Qian’s visual system inside a more mature concert and audiovisual performance setting while preserving clear direction and production credits.'
      },
      {
        title: 'Yu Jiayun 45㎡ Concert Visual Production',
        meta: 'Concert visuals / opening / PGM and floor LED delivery',
        body:
          'A touring-concert production and delivery line, including opening visuals, selected song states, PGM screen material, floor LED content, and Blender previews. The page should foreground the opening and song structure without exposing raw production files.'
      },
      {
        title: 'Rain / Singland Festival Singapore',
        meta: 'New Year festival / stage screen visual / Fortune Art Production',
        body:
          'Stage-screen visual work for Rain’s It’s Raining remix version at Singland Festival Singapore through Fortune Art Production. This line is best presented through selected visual frames and production-context writing.'
      },
      {
        title: 'Gaussian Spatial Archive',
        meta: '3DGS / spatial preservation / web archive',
        body:
          'A spatial-preservation and web-archive line connecting Gaussian reconstruction, scene viewing, image production, and VIRTURA Spaceport’s longer-term public archive direction.'
      }
    ],
    methodTitle: 'Method and Tools',
    methods: [
      'Use Blender as an audiovisual system: timeline, audio curves, nodes, lighting, materials, cameras, and output work together.',
      'Treat sound as control material: it can shape point-cloud motion, material brightness, flow intensity, particle density, pulses, and transitions.',
      'Treat delivery as part of the work: screen ratios, PGM, floor LED, cueing, preview files, and media permissions affect how a project should be presented.',
      'Place AI inside the workflow: research, analysis, tool design, parameter testing, and writing support without replacing artistic judgment.'
    ],
    collaborationTitle: 'Collaboration and Sound Network',
    collaboration: [
      'Recent collaboration and research contexts include Hao Xu, KASHIWA Daisuke, RÖ, Shukai / Mark, and production teams across concerts, festivals, and live events. Different sound practices test the rhythm, density, materiality, and spatial organization of his visual systems.',
      'These collaborations test the system beyond a resume list. Electronic music, experimental sound, piano and electronics, pop concerts, commercial festivals, and institutional presentations each ask the visual system to adjust its aesthetic, technical, and delivery boundaries.'
    ],
    imageTitle: 'Portraits and Live Images',
    imageIntro: 'Portraits, live-working moments, public sharing contexts, and spatial personal images.',
    ctaWorks: 'Works',
    ctaProduction: 'Production'
  }
}

const portraits = [
  ['/portfolio/assets/profile/ewan-portrait-formal.webp', 'Portrait', '个人肖像'],
  ['/portfolio/assets/profile/ewan-portrait-outdoor-woods.webp', 'Field Portrait', '场域肖像'],
  ['/portfolio/assets/profile/ewan-strawberry-live.webp', 'Live Visual Work', '现场视觉工作'],
  ['/portfolio/assets/profile/ewan-ufo-sharing.webp', 'Public Sharing', '公开分享'],
  ['/portfolio/assets/profile/ewan-portrait-main.webp', 'Process', '工作状态'],
  ['/portfolio/assets/profile/ewan-profile-board.webp', 'Profile Record', '资料记录']
]

function Paragraphs({ items }) {
  return (
    <>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  )
}

function Profile() {
  const { language } = useLanguage()
  const c = copy[language]
  const isZh = language === 'zh'

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
                <Link className="button" to="/production">{c.ctaProduction}</Link>
              </div>
            </div>
            <figure className="profile-editorial-image">
              <img src="/portfolio/assets/profile/ewan-portrait-formal.webp" alt={c.name} />
            </figure>
          </div>
        </section>

        <section className="profile-editorial-body">
          <div className="container profile-body-grid">
            <aside className="profile-index">
              <div className="profile-facts">
                {c.facts.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <nav aria-label={isZh ? '个人介绍章节' : 'Profile sections'}>
                {c.nav.map(([label, anchor]) => (
                  <a href={`#profile-${anchor}`} key={anchor}>{label}</a>
                ))}
              </nav>
            </aside>

            <div className="profile-essay">
              {c.sections.map((section) => (
                <section id={`profile-${section.anchor}`} key={section.title} className="profile-essay-section">
                  <span>{section.id}</span>
                  <h2>{section.title}</h2>
                  <div className="profile-paragraphs">
                    <Paragraphs items={section.body} />
                  </div>
                </section>
              ))}

              <section id="profile-longread" className="profile-essay-section profile-longread-section">
                <span>{isZh ? '长读' : 'Long Read'}</span>
                <h2>{c.longTitle}</h2>
                <p>{c.longIntro}</p>
                <div className="profile-column-list">
                  {c.longReads.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <Paragraphs items={item.body} />
                    </article>
                  ))}
                </div>
              </section>

              <section id="profile-works" className="profile-essay-section">
                <span>{isZh ? '作品线' : 'Lines'}</span>
                <h2>{c.worksTitle}</h2>
                <div className="profile-work-list">
                  {c.works.map((work) => (
                    <article key={work.title}>
                      <small>{work.meta}</small>
                      <h3>{work.title}</h3>
                      <p>{work.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section id="profile-method" className="profile-essay-section">
                <span>{isZh ? '方法' : 'Method'}</span>
                <h2>{c.methodTitle}</h2>
                <ol className="profile-methods">
                  {c.methods.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ol>
              </section>

              <section id="profile-network" className="profile-essay-section profile-network">
                <span>{isZh ? '合作' : 'Network'}</span>
                <h2>{c.collaborationTitle}</h2>
                <div className="profile-paragraphs">
                  <Paragraphs items={c.collaboration} />
                </div>
              </section>
            </div>
          </div>
        </section>

        <section id="profile-images" className="section">
          <div className="container">
            <div className="section-heading-row">
              <div>
                <div className="eyebrow">{isZh ? '图像' : 'Images'}</div>
                <h2 className="section-title">{c.imageTitle}</h2>
              </div>
              <p className="section-intro">{c.imageIntro}</p>
            </div>
            <div className="profile-photo-grid">
              {portraits.map(([src, title, titleZh], index) => (
                <article key={src} className={`profile-photo-card profile-photo-card-${index + 1}`}>
                  <img src={src} alt={isZh ? titleZh : title} loading="lazy" />
                  <div>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{isZh ? titleZh : title}</h3>
                  </div>
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
