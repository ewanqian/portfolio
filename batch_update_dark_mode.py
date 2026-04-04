#!/usr/bin/env python3
import os

def update_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace :root and html.dark
    old_vars = '''    :root {
      --bg: #ffffff;
      --panel: #ffffff;
      --text: #111111;
      --muted: #666666;
      --line: rgba(0, 0, 0, 0.12);
      --line-strong: rgba(0, 0, 0, 0.28);
      --accent: #111111;
      --inverse: #ffffff;
      --max: 1240px;
    }

    html.dark {
      --bg: #0a0a0a;
      --panel: #111111;
      --text: #f0f0f0;
      --muted: #a0a0a0;
      --line: rgba(255, 255, 255, 0.12);
      --line-strong: rgba(255, 255, 255, 0.28);
      --accent: #f0f0f0;
      --inverse: #0a0a0a;
    }'''
    
    new_vars = '''    :root {
      --bg: #0a0a0a;
      --panel: #111111;
      --text: #f0f0f0;
      --muted: #a0a0a0;
      --line: rgba(255,255,255,0.12);
      --line-strong: rgba(255,255,255,0.28);
      --accent: #f0f0f0;
      --inverse: #0a0a0a;
      --max: 1240px;
    }

    html.light {
      --bg: #ffffff;
      --panel: #ffffff;
      --text: #111111;
      --muted: #666666;
      --line: rgba(0,0,0,0.12);
      --line-strong: rgba(0,0,0,0.28);
      --accent: #111111;
      --inverse: #ffffff;
    }'''
    
    content = content.replace(old_vars, new_vars)
    
    # Replace JavaScript
    old_js = '''    function setTheme(isDark) {
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      setTheme(!isDark);
    });

    (function initTheme() {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        setTheme(true);
      } else if (saved === 'light') {
        setTheme(false);
      } else {
        setTheme(false);
      }
    })();'''
    
    new_js = '''    function setTheme(isLight) {
      if (isLight) {
        html.classList.add('light');
      } else {
        html.classList.remove('light');
      }
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    themeToggle.addEventListener('click', () => {
      const isLight = html.classList.contains('light');
      setTheme(!isLight);
    });

    (function initTheme() {
      const saved = localStorage.getItem('theme');
      if (saved === 'light') {
        setTheme(true);
      } else {
        setTheme(false);
      }
    })();'''
    
    content = content.replace(old_js, new_js)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated: {file_path}")

# Update all files
files = [
    'works/drop-flow.html',
    'services/faq.html',
    'services/pricing-policy.html',
    'services/project-types.html',
    'services/case-notes.html'
]

for file in files:
    if os.path.exists(file):
        update_file(file)
    else:
        print(f"File not found: {file}")

print("\nAll files updated!")
