(function () {
  const replacements = [
    [
      'Ewan Qian’s practice unfolds through the continuous relation between time, image, space, and perception. Websites, stages, panoramic screens, digital exhibitions, archives, and interface research are not separate media branches here, but one ongoing network of artistic practice.',
      'Ewan Qian’s practice unfolds through the continuous relation between time, image, space, and perception. Websites, stages, panoramic screens, digital exhibitions, archives, and interface research form one ongoing network of artistic practice.'
    ],
    [
      '钱誉文的实践围绕时间、图像、空间与感知之间的连续关系展开。网页、舞台、环幕、数字展览、档案与接口研究，在这里构成的并非彼此独立的媒介分支，而是一条持续推进的创作网络。',
      '钱誉文的实践围绕时间、图像、空间与感知之间的连续关系展开。网页、舞台、环幕、数字展览、档案与接口研究，共同构成一条持续推进的创作网络。'
    ],
    ['draft', 'Coming Soon'],
    ['planned', 'Coming Soon'],
    ['Dropflow Collection', 'Drop Flow Collection'],
    ['DropFlow 2', 'Drop Flow 2'],
    ['Dropflow 集合', 'Drop Flow 集合'],
    ['It is not an internal progress board but a readable public module for spatial samples and ongoing research.', 'Together they form a readable public module for spatial samples and ongoing research.'],
    ['These columns are not internal status notes. They help an external reader quickly understand', 'These columns help an external reader quickly understand'],
    ['They do not replace video; they open a different, more spatial way of entering the work.', 'They open a different, more spatial way of entering the work.'],
    ['If the next question is really about collaboration structure, pricing logic, or delivery path, the Production page is the better next step. This page is better used to inspect the samples themselves.', 'Production explains collaboration structure, pricing logic, and delivery path. This page focuses on inspecting the samples themselves.'],
    ['If this needs to move toward collaboration', 'Move toward collaboration'],
    ['This page works best as a sample entry. If the conversation needs to move into pricing, delivery scope, or project fit, the next page to open should be Production.', 'This page works as a sample entry. Production covers pricing, delivery scope, and project fit.'],
    ['If you want to move a collaboration forward, it helps to bring:', 'For a faster collaboration start, bring:'],
    ['If you want to continue into spatial preservation, web embedding, and Vision Pro / XR paths, the Gaussian Archive is the supporting sample-and-method branch rather than the main collaboration page.', 'The Gaussian Archive supports spatial preservation, web embedding, and Vision Pro / XR paths through public samples and method notes.'],
    ['These categories are not a list of generic skills. They are here so a reader can quickly judge what kind of collaboration structure a project is actually asking for.', 'These categories help a reader quickly judge what kind of collaboration structure a project is actually asking for.']
  ];

  const crossLinks = {
    Collective: '//virtura.space/',
    SpacePort: '//spaceport.virtura.space/',
    Newsroom: '//newsroom.virtura.space/'
  };

  function patchTextNode(node) {
    let value = node.nodeValue;
    let changed = false;
    replacements.forEach(([from, to]) => {
      if (value.includes(from)) {
        value = value.split(from).join(to);
        changed = true;
      }
    });
    if (changed) {
      node.nodeValue = value;
    }
  }

  function walkText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node = walker.nextNode();
    while (node) {
      patchTextNode(node);
      node = walker.nextNode();
    }
  }

  function patchLinks() {
    document.querySelectorAll('a').forEach((link) => {
      const label = link.textContent.trim();
      if (crossLinks[label]) {
        link.setAttribute('href', crossLinks[label]);
      }
    });
  }

  function applyPatch() {
    if (!document.body) {
      return;
    }
    walkText(document.body);
    patchLinks();
  }

  window.addEventListener('DOMContentLoaded', () => {
    applyPatch();
    const observer = new MutationObserver(() => applyPatch());
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(applyPatch, 250);
    setTimeout(applyPatch, 1000);
  });
})();
