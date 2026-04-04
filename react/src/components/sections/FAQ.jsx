import { useState } from 'react'
import { faq } from '../../data/faq'

function FAQ() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="eyebrow">FAQ</div>
        <h2 className="section-title">常见问题</h2>
        <p className="section-intro">
          这部分先解决最容易反复来回沟通的问题。完整 FAQ 后续还可以单独拆页。
        </p>
        <div className="faq-list">
          {faq.map((item) => (
            <div key={item.id} className={`faq-item ${openFaq === item.id ? 'open' : ''}`}>
              <button 
                className="faq-question" 
                type="button"
                onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              >
                {item.question}
                <span>{openFaq === item.id ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
