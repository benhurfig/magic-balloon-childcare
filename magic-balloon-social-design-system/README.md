# Magic Balloon Social Media Design System

Proposta visual isolada para padronizar futuros posts da Magic Balloon Childcare. Este kit não altera o site principal e não deve ser publicado como conteúdo definitivo sem revisão.

## Arquivos

- `index.html`: documentação visual, dez pranchas de template e simulação do feed 3×3.
- `styles.css`: tokens, componentes e composições responsivas.
- `assets/brand/logo-primary.png`: cópia de trabalho da logo existente.
- `assets/photos/`: cópias de trabalho de quatro fotos reais já existentes no projeto.

## Paleta

- Azul céu: `#DFF3FF`
- Navy: `#102A4C`
- Branco: `#FFFFFF`
- Rosa: `#FF5B87`
- Amarelo: `#FFC436`
- Turquesa: `#20B8B5`
- Roxo: `#8067C8`

Navy organiza textos e contraste. Branco e azul céu dão respiro. Rosa, amarelo, turquesa e roxo devem ser usados como acentos vindos do balão da marca, não todos ao mesmo tempo.

## Tipografia

- Títulos: `Arial Rounded MT Bold`, com `Trebuchet MS` como alternativa.
- Textos: `Avenir Next`, com fontes de sistema como alternativas.

O sistema não baixa fontes externas. Isso mantém a proposta simples, privada e fácil de abrir localmente.

## Regras de uso

1. A logo fica no canto superior esquerdo, com margem aproximada de 6%. Use a cápsula branca quando a foto prejudicar a leitura.
2. Fotos reais devem ocupar aproximadamente 60% a 75% da arte sempre que o formato pedir fotografia.
3. Não coloque textos importantes sobre rostos ou sobre o foco principal da foto.
4. Use um título dominante, uma informação de apoio e no máximo três pequenos destaques.
5. Border radius principal: 32 px na escala de apresentação; raio médio: 20 px.
6. Sombras são suaves, com tom navy e baixa opacidade.
7. Ondas, nuvens e estrelas funcionam como assinatura; evite usar todos os elementos na mesma peça.
8. Preserve cores naturais das fotos. Não aplique filtros fortes.

## Os cinco templates

1. **Foto / Rotina** — fotografia dominante, frase de 5 a 8 palavras, logo e localização opcional.
2. **Vagas disponíveis** — fotografia real com painel de chamada clara, período, localização, Full-Time e voucher quando aplicável.
3. **Informativo** — fundo claro, uma informação principal e até três fatos pequenos.
4. **Dica para famílias** — foto ou elemento visual com pergunta curta e poucos pontos de apoio.
5. **Institucional** — foto da provedora ou do espaço, título simples e até três informações.

Cada template possui uma prévia de **Feed 1080 × 1350 px** e outra de **Story/Reel Cover 1080 × 1920 px**.

## Como substituir fotos

1. Coloque a nova imagem em `assets/photos/`.
2. No `index.html`, localize o template desejado.
3. Substitua somente o valor do atributo `src` da imagem.
4. Atualize o texto `alt` para descrever a nova fotografia.
5. Revise o enquadramento e confirme que nenhum rosto ficou coberto pela área de texto.

## Como trocar textos

Edite o texto diretamente dentro do template correspondente em `index.html`. Mantenha a mesma quantidade de blocos e respeite o limite de 5 a 8 palavras nas frases de rotina. Antes de publicar, revise idioma, fatos, datas e informações operacionais.

## Como exportar ou capturar

1. Abra `index.html` no navegador.
2. Use as pranchas como referência para recriar a arte na ferramenta de produção escolhida ou capture cada prancheta isoladamente.
3. Para o arquivo final, configure exatamente 1080 × 1350 px no Feed ou 1080 × 1920 px em Story/Reel Cover.
4. Exporte em PNG ou JPG de alta qualidade e revise a leitura em um celular antes da publicação.

As pranchas HTML são responsivas e aparecem reduzidas na página para facilitar a comparação. O rótulo sobre cada arte registra a dimensão final correta.

## Feed 3×3

A simulação combina rotina, informativo, vagas, dica, marca e institucional. O objetivo é alternar intensidade de cor, fotografia e espaço negativo para manter unidade sem repetir exatamente a mesma composição.
