function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="eyebrow">Project Inquiry</div>
        <h2 className="section-title">项目咨询</h2>
        <p className="section-intro">
          如需讨论项目、委托、课程、展览合作或其他形式的交流，可通过下方表单留下基本信息。我会根据项目类型、时间与预算情况尽快回复。
        </p>
        <div className="contact-grid">
          <div className="contact-panel">
            <h3>How to Reach Me</h3>
            <p>
              当前优先通过小红书私信与业务邮箱联系。
              暂不公开微信号和手机号，主要是为了减少无效打扰与隐私风险。
            </p>
            <div className="contact-list">
              <a href="https://www.xiaohongshu.com/user/profile/60d73226000000000101f30e" target="_blank" rel="noreferrer">
                小红书私信 / Preferred Contact
              </a>
              <a href="mailto:qianewan@gmail.com">
                qianewan@gmail.com
              </a>
              <div>
                建议首次联系时说明：项目类型、用途、时长 / 规模、预算范围、时间节点、是否已有素材 / 工程。
              </div>
            </div>
          </div>
          <div className="form-panel">
            <h3>Project Inquiry Form</h3>
            <form id="inquiryForm" action="https://formspree.io/f/your-form-id-here" method="POST">
              <div className="field-grid">
                <label>
                  Name
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" placeholder="you@example.com" required />
                </label>
              </div>
              <div className="field-grid">
                <label>
                  Project Type
                  <select name="projectType" required>
                    <option value="">Select a category</option>
                    <option>AI 视觉短视频 / Brand Content</option>
                    <option>舞台视觉 / Opening Visual</option>
                    <option>空间影像 / 沉浸式内容</option>
                    <option>双目 / Apple Vision Pro / XR</option>
                    <option>数字展览 / 展示系统</option>
                    <option>工程调试 / Workflow 咨询</option>
                    <option>课程 / 培训 / 工作坊</option>
                    <option>Other / 其他</option>
                  </select>
                </label>
                <label>
                  Budget Range
                  <select name="budgetRange">
                    <option value="">Select a range</option>
                    <option>¥1000–3000</option>
                    <option>¥3000–8000</option>
                    <option>¥8000–20000</option>
                    <option>¥20000+</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
              </div>
              <div className="field-grid">
                <label>
                  Timeline
                  <input type="text" name="timeline" placeholder="e.g. within 2 weeks / next month" />
                </label>
                <label>
                  Existing Assets
                  <select name="assets">
                    <option value="">Select</option>
                    <option>已有脚本 / Script ready</option>
                    <option>已有素材 / Assets ready</option>
                    <option>已有工程 / Project file ready</option>
                    <option>还没有，需要从头梳理</option>
                  </select>
                </label>
              </div>
              <label>
                Message
                <textarea name="message" placeholder="Tell me what you want to make, where it will be used, and what kind of result you hope to get." required></textarea>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <button className="button primary" type="submit">Submit Inquiry</button>
                <button className="button" type="button" id="copyFormBtn">Copy to Clipboard</button>
              </div>
              <div className="form-note" id="formStatus"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
