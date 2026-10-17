from pathlib import Path

root = Path.cwd()
changed = []
for lang in ('en', 'pt', 'es'):
    path = root / lang / 'index.html'
    if not path.is_file():
        raise SystemExit(f'ERRO: arquivo não encontrado: {path}')
    html = path.read_text(encoding='utf-8')
    header_old = f'class="button site-header__cta" href="/{lang}/enrollment/"'
    header_new = 'class="button site-header__cta" href="#family-request"'
    section_old = 'class="global-final-cta" aria-labelledby="global-final-cta-title"'
    section_new = 'class="global-final-cta" id="family-request" aria-labelledby="global-final-cta-title"'
    if (html.count(header_old), html.count(section_old)) != (1, 1):
        raise SystemExit(f'ERRO: estrutura inesperada em {path}; nenhuma gravação foi efetuada. Esperava 1 header e 1 CTA.')
    if html.count('href="#family-request"') < 1 or 'id="family-request"' in html:
        raise SystemExit(f'ERRO: âncoras inesperadas em {path}; nenhuma gravação foi efetuada.')
    changed.append((path, html.replace(header_old, header_new, 1).replace(section_old, section_new, 1)))
for path, html in changed:
    path.write_text(html, encoding='utf-8')
    print(f'OK: {path.relative_to(root)}')
print('Concluído: links do header e alvo CTA final corrigidos em EN/PT/ES.')
